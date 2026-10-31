import { useState, useEffect } from "react";
import {
  getSessionStatus,
  SessionNotFoundError,
} from "../services/participantService";

/*
  useSessionStatus.js
  --------------------
  Polls the backend for session liveness + participant list.

  Responsibilities:
  - Fetch GET /api/session/:id every POLL_INTERVAL_MS
  - Surface the participant list to consumers
  - Detect session revocation (404) and stop polling
  - Tolerate transient network errors (keep polling)
  - Optimistically inject the current user so they see themselves
    immediately on join, even before the first poll lands

  Returns:
  - participants: tagged list with isYou flag applied
  - sessionEnded: true once a 404 has been observed
  - error: most recent transient error (null when healthy)

  Future:
  - Internals can be swapped for a SpacetimeDB subscription without
    changing the hook's return shape — consumers stay unchanged.
*/

// poll cadence — 3s balances responsiveness vs server load
const POLL_INTERVAL_MS = 3000;

export function useSessionStatus(sessionId, displayName, isOwner) {
  // optimistic seed — caller sees themselves before any poll runs
  const [participants, setParticipants] = useState(() => [
    { displayName, isOwner, isYou: true },
  ]);

  // flips to true the moment a 404 is observed; never goes back
  const [sessionEnded, setSessionEnded] = useState(false);

  // most recent transient error — kept for debugging, no UI surface
  const [error, setError] = useState(null);

  useEffect(() => {
    // bail early if we have no session to poll for
    if (!sessionId) return;

    // captured by the closure so cleanup can ignore late responses
    let cancelled = false;

    // local — clearable from inside the catch block on 404
    let intervalId = null;

    /*
      poll — single round-trip to the backend.
      On success: tag participants with isYou + inject self if missing.
      On 404: mark session ended and stop the interval.
      On other error: log + record, but keep polling (transient blip).
    */
    async function poll() {
      // skip if the effect has already cleaned up
      if (cancelled) return;

      try {
        const data = await getSessionStatus(sessionId);

        // race guard: hook may have unmounted while fetch was in flight
        if (cancelled) return;

        const list = data.participants || [];

        // tag each entry with isYou based on display name match
        const tagged = list.map((p) => ({
          ...p,
          isYou: p.displayName === displayName,
        }));

        // backend may not yet have registered our join — inject self
        const backendHasMe = list.some(
          (p) => p.displayName === displayName,
        );
        if (!backendHasMe && displayName) {
          // unshift so we appear at the front during the optimistic gap
          tagged.unshift({ displayName, isOwner, isYou: true });
        }

        setParticipants(tagged);
        // clear any prior transient error on a successful poll
        setError(null);
      } catch (err) {
        // late response after unmount — drop it
        if (cancelled) return;

        if (err instanceof SessionNotFoundError) {
          // session has been revoked — stop polling, signal consumers
          setSessionEnded(true);
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        } else {
          // transient (network blip, server hiccup) — keep polling
          console.error("Session status poll error:", err);
          setError(err);
        }
      }
    }

    // fire immediately so the first data lands before the interval delay
    poll();

    // then on a fixed cadence
    intervalId = setInterval(poll, POLL_INTERVAL_MS);

    // cleanup runs on unmount or when dependencies change
    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
    };
  }, [sessionId, displayName, isOwner]);

  return { participants, sessionEnded, error };
}
/*
  participantService.js
  ----------------------
  Service layer for session liveness + participant list.

  Provides one entry point: getSessionStatus(sessionId).
  Used by useSessionStatus hook to drive polling.

  Backend API contract (target):
    GET /api/session/:sessionId
    200 OK:
      {
        sessionId: string,
        participants: [{ displayName: string, isOwner: boolean }]
      }
    404 Not Found:
      Session has been revoked or never existed.


  Currently Implemented with a MOCK for testing
  ==============================================
  To Remove:
    - MOCK_MODE = false  OR
    - Delete everything in the "MOCK" comment fences including constants
      and the mock branch inside getSessionStatus().
*/

// ---------- MOCK START ----------
// flip to false (or delete this whole block) when backend is live
const MOCK_MODE = true;

/*
  Test helper: when set to a number N, the mock will throw
  SessionNotFoundError after N polls. Lets you verify the
  "session ended" UX without an actual revoke. Set to null
  to disable. Counter resets on full page refresh.
*/
const MOCK_REVOKE_AFTER_POLLS = null;

// poll counter for the revoke-after-N-polls test helper
let pollCount = 0;
// ---------- MOCK END ----------

/*
  SessionNotFoundError — error class so the hook can
  distinguish "session is gone" from "network blip"
  Throw this on 404; throw plain Error on anything else.
*/
export class SessionNotFoundError extends Error {
  constructor() {
    super("Session not found");
    this.name = "SessionNotFoundError";
  }
}

/*
  getSessionStatus — fetches session liveness + participants.
  Returns: { sessionId, participants: [{ displayName, isOwner }] }
  Throws SessionNotFoundError on 404, generic Error on other failures.
*/
export async function getSessionStatus(sessionId) {
  // ---------- MOCK — DELETE WHEN BACKEND IS LIVE ----------
  if (MOCK_MODE) {
    pollCount += 1;

    // simulate a revoke after N polls (when test flag is set)
    if (
      MOCK_REVOKE_AFTER_POLLS !== null &&
      pollCount > MOCK_REVOKE_AFTER_POLLS
    ) {
      // small fake delay so it feels like a real round-trip
      await new Promise((r) => setTimeout(r, 100));
      throw new SessionNotFoundError();
    }

    // small fake delay so polling feels async, not synchronous
    await new Promise((r) => setTimeout(r, 150));

    /*
      Mock participant list. Does NOT represent real session state —
      these names are placeholders so the avatar cluster renders with
      multiple entries during local testing. Real list comes from the
      backend once MOCK_MODE = false.
    */
    return {
      sessionId,
      participants: [
        { displayName: "Demo Peer", isOwner: false },
      ],
    };
  }
  // ---------- END MOCK BRANCH ----------

  // real implementation
  const response = await fetch(`/api/session/${sessionId}`);

  // 404 = session revoked or never existed -> revoked/no session error
  if (response.status === 404) {
    throw new SessionNotFoundError();
  }

  // any other non-2xx is treated as transient
  if (!response.ok) {
    throw new Error(`Session status check failed: ${response.status}`);
  }

  return await response.json();
}
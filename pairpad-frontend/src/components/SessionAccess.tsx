import { useState } from "react";
import { createSession, joinSession } from "../services/sessionService";
import ParticipantIdentity from "./ParticipantIdentity";
import Banner from "./Banner";
import { useReducer, useTable } from 'spacetimedb/react';
import { reducers, tables } from '../module_bindings';

/*
  SessionAccess.tsx
  ------------------
  Core UI component for the User Access subsystem.

  Responsibilities:
  - Allow users to create or join sessions
  - Collect user identity (display name)
  - Auto-fill session ID from URL (US2)
  - Validate inputs before submission (US3)
  - Show loading feedback during async backend calls
  - Communicate with backend via sessionService

  Data flow: User Input → State → Service → Backend → Response → UI
*/

// hard cap on display name length — keeps UI tidy, prevents abuse
const MAX_NAME_LENGTH = 30;
const SESSION_ID_LENGTH = 8;
const SESSION_ID_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

function SessionAccess({ onEnterSession }: any) {
  // display name input
  const [name, setName] = useState("");

  // session ID input — lazy initial state reads "?session=<id>" from URL once
  const [sessionID, setSessionID] = useState("");

  /*
    submitting — which async action is in flight, if any.
    Values: null (idle) | "create" | "join"
  */
  const [submitting, setSubmitting] = useState(null);
  const isLoading = submitting !== null;

  /* 
    inline error/warning surfaced to the user — replaces alert()
    shape: { variant: "error" | "warning" | "info", message: string }
  */
  const [banner, setBanner] = useState(null);

  /*
    Pre-computed trimmed values used for validation and submission.
    trimmedName strips whitespace so "   " isn't treated as valid input.
    trimmedSessionId does the same for IDs pasted with stray whitespace.
  */
  const trimmedName = name.trim();
  const trimmedSessionId = sessionID.trim();

  // validity flags drive both button states and submit logic
  const nameIsValid =
    trimmedName.length > 0 && trimmedName.length <= MAX_NAME_LENGTH;
  const sessionIdIsValid = trimmedSessionId.length > 0;

  const createSession = useReducer(reducers.createSession);
  const [sessions, areYouLoading] = useTable(tables.sessions);
  const [members, isReady] = useTable(tables.members);
  
  /*
    handleCreate — requests a new session from the backend, then hands
    off session info (incl. ownership) to parent for routing.
  */
  const handleCreate = async () => {
    // clear any prior banner so the user knows this is a fresh attempt
    setBanner(null);

    const candidateID = generateSessionID();
    console.log(candidateID);
    try {
      await createSession({ displayName: trimmedName, sessionId: candidateID });
      onEnterSession(candidateID, true, null, trimmedName);
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  /*
    handleJoin — asks backend to join the current session ID under the
    given name, then hands off to parent. Joiners are never owners.
  */
//   const handleJoin = async () => {
//     // clear any prior banner so the user knows this is a fresh attempt
//     setBanner(null);
//     // mark as submitting so UI disables controls and shows cursor
//     setSubmitting("join");
//     try {
//       // send trimmed values to avoid whitespace-caused lookup failures
//       const session = await joinSession(trimmedSessionId, trimmedName);
//       // joiners are never owners, so pass false
//       onEnterSession(session.id, false, null, trimmedName);
//     } catch (error) {
//       console.error("Error joining session:", error);
//       // join failure (not found, full, revoked) — recoverable, warning
//       setBanner({ variant: "warning", message: error.message });
//     } finally {
//       // always clear loading state, even on error (so user can retry)
//       setSubmitting(null);
//     }
//   };

  /*
    handleSubmit — fires when the form submits (via the hidden submit
    button when Enter is pressed). Branches based on state:
      - empty session ID → create a new session
      - session ID filled → join that session
  */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // stop browser's default form submit

    // ignore Enter while a request is already in flight
    if (isLoading) return;

    // abort if name isn't valid — belt-and-suspenders with button disabled state
    if (!nameIsValid) return;

    if (sessionIdIsValid) {
      // session ID present → user wants to join
      //handleJoin();
    } else {
      // session ID empty → user wants to create
      handleCreate();
    }
  };

    const generateSessionID = (): string => {
        let sessionID = "";
        for (let i = 0; i < SESSION_ID_LENGTH; i++) {
        const index = Math.floor(Math.random() * (SESSION_ID_ALPHABET.length));
        sessionID += SESSION_ID_ALPHABET[index];
        }
        return sessionID;
    }

  return (
    <div style={{ marginTop: "20px" }}>
      {/* inline error/warning surface — sits above the form */}
      {/* <Banner
        variant={banner?.variant}
        message={banner?.message}
        onDismiss={() => setBanner(null)}
      /> */}

      <form onSubmit={handleSubmit}>
        {/* 
          Hidden submit button acts as the form's default button for
          Enter-to-submit. Enabled whenever name is valid, so Enter
          always works. handleSubmit branches to the right action.
        */}
        <button
          type="submit"
          disabled={!nameIsValid || isLoading}
          aria-hidden="true"
          tabIndex={-1}
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            opacity: 0,
            pointerEvents: "none",
          }}
        />

        {/* shared display name input — disabled during submission */}
        <ParticipantIdentity
          name={name}
          setName={setName}
          disabled={isLoading}
          maxLength={MAX_NAME_LENGTH}
        />

        {/* 
          Character counter — subtle hint that appears as user approaches
          the limit. Only shown when there's meaningful content to count.
        */}
        {trimmedName.length > 0 && (
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: "11px",
              color:
                trimmedName.length > MAX_NAME_LENGTH
                  ? "var(--danger)"
                  : "var(--text-muted)",
              marginTop: "4px",
            }}
          >
            {trimmedName.length} / {MAX_NAME_LENGTH}
          </div>
        )}

        {/* Join section */}
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>
            Join an existing session
          </h3>
          <input
            type="text"
            placeholder="Enter session ID"
            value={sessionID}
            onChange={(e) => setSessionID(e.target.value)}
            disabled={isLoading}
          />
          {/* 
            Join button — disabled unless name AND session ID are valid
            AND not currently submitting. Shows "Joining▊" during wait.
          */}
          <button
            type="button"
            // onClick={handleJoin}
            disabled={!nameIsValid || !sessionIdIsValid || isLoading}
            style={{ marginLeft: "8px" }}
          >
            {submitting === "join" ? (
              // terminal-style loading label with blinking cursor
              <>
                Joining
                <span className="blink-cursor" aria-hidden="true" />
              </>
            ) : (
              "Join Session"
            )}
          </button>
        </div>

        {/* visual separator */}
        <div style={{ margin: "30px 0", color: "var(--text)" }}>— or —</div>

        {/* Create section */}
        <div>
          <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>
            Start a new session
          </h3>
          {/* 
            Create button — disabled unless name is valid AND session ID is
            empty AND not currently submitting. Shows "Creating▊" during wait.
          */}
          <button
            type="button"
            onClick={handleCreate}
            disabled={!nameIsValid || sessionIdIsValid || isLoading}
          >
            {submitting === "create" ? (
              // terminal-style loading label with blinking cursor
              <>
                Creating
                <span className="blink-cursor" aria-hidden="true" />
              </>
            ) : (
              "Create New Session"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
export default SessionAccess;

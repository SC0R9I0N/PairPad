import { useState } from "react";
import { createSession, joinSession } from "../services/sessionService";
import ParticipantIdentity from "./ParticipantIdentity";

/*
  SessionAccess.jsx
  ------------------
  Core UI component for the User Access subsystem.

  Responsibilities:
  - Allow users to create or join sessions
  - Collect user identity (display name)
  - Auto-fill session ID from URL (US2)
  - Show loading feedback during async backend calls
  - Communicate with backend via sessionService

  Data flow: User Input → State → Service → Backend → Response → UI
*/
function SessionAccess({ onEnterSession }) {
  // display name input
  const [name, setName] = useState("");

  // session ID input — lazy initial state reads "?session=<id>" from URL once
  const [sessionId, setSessionId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("session") || "";
  });

  /*
    submitting — which async action is in flight, if any.
    Values: null (idle) | "create" | "join"
    Used to disable inputs/buttons and flip button labels during the wait.
  */
  const [submitting, setSubmitting] = useState(null);
  const isLoading = submitting !== null;

  /*
    handleCreate — requests a new session from the backend, then hands
    off session info (incl. ownership) to parent for routing.
    Marks "create" as submitting so UI shows loading feedback.
  */
  const handleCreate = async () => {
    // mark as submitting so UI disables controls and shows cursor
    setSubmitting("create");
    try {
      // request new session from backend
      const session = await createSession(name);
      // hand off session info (incl. ownership) to parent for routing
      onEnterSession(session.id, session.isOwner, session.ownershipToken);
    } catch (error) {
      console.error("Error creating session:", error);
      alert(error.message);
    } finally {
      // always clear loading state, even on error (so user can retry)
      setSubmitting(null);
    }
  };

  /*
    handleJoin — asks backend to join the current session ID under the
    given name, then hands off to parent. Joiners are never owners.
    Marks "join" as submitting so UI shows loading feedback.
  */
  const handleJoin = async () => {
    // mark as submitting so UI disables controls and shows cursor
    setSubmitting("join");
    try {
      // ask backend to join the session with current name + ID
      const session = await joinSession(sessionId, name);
      // joiners are never owners, so pass false
      onEnterSession(session.id, false);
    } catch (error) {
      console.error("Error joining session:", error);
      alert(error.message);
    } finally {
      // always clear loading state, even on error (so user can retry)
      setSubmitting(null);
    }
  };

  /*
    handleSubmit — fires when the form submits (via the hidden submit
    button when Enter is pressed). Branches based on state:
      - empty session ID → create a new session
      - session ID filled → join that session
    e.preventDefault() stops the default page reload.
  */
  const handleSubmit = (e) => {
    e.preventDefault(); // stop browser's default form submit

    // ignore Enter while a request is already in flight
    if (isLoading) return;

    // .trim() guards against whitespace-only input being treated as "filled"
    if (sessionId.trim()) {
      // session ID present → user wants to join
      handleJoin();
    } else {
      // session ID empty → user wants to create
      handleCreate();
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        {/* 
          Hidden submit button acts as the form's default button for
          Enter-to-submit. Enabled whenever name is filled, so Enter
          always works. handleSubmit branches to the right action.
        */}
        <button
          type="submit"
          disabled={!name || isLoading}
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
        />

        {/* Join section */}
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>
            Join an existing session
          </h3>
          <input
            type="text"
            placeholder="Enter session ID"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            disabled={isLoading}
          />
          {/* 
            Join button — disabled unless name AND session ID are filled
            AND not currently submitting. Shows "Joining▊" during wait.
          */}
          <button
            type="button"
            onClick={handleJoin}
            disabled={!name || !sessionId || isLoading}
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
            Create button — disabled unless name filled AND session ID empty
            AND not currently submitting. Shows "Creating▊" during wait.
          */}
          <button
            type="button"
            onClick={handleCreate}
            disabled={!name || sessionId || isLoading}
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

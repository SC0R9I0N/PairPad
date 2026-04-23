import { useState } from "react";
import { createSession, joinSession } from "../services/sessionService";
import ParticipantIdentity from "./ParticipantIdentity";

/*
  SessionAccess.jsx
  ------------------
  CORE UI COMPONENT for User Access subsystem.

  RESPONSIBILITY:
  - Allow users to create or join sessions
  - Collect user identity (display name)
  - Communicate with backend via sessionService

  STATE VARIABLES:
  - name: user's display name
  - sessionLink: session identifier input

  DATA FLOW:
  User Input → Component State → Service Call → Backend → Response → UI Update

  FUTURE IMPROVEMENTS:
  - Input validation (empty name, invalid link)
  - Error handling (session full, invalid session)
  - Display generated session link (FR2)
*/

function SessionAccess({ onEnterSession }) {
  // Stores the user's display name
  const [name, setName] = useState("");

  // Stores session link input for joining sessions
  const [sessionLink, setSessionLink] = useState("");

  /*
    handleCreate
    -------------
    Triggered when user clicks "Create Session"

    FLOW:
    1. Calls createSession service
    2. Receives session ID from backend (or mock)
    3. Passes session ID to parent (App.jsx)
    4. App navigates to SessionPage

    BACKEND EXPECTATION:
    - Server generates unique session ID
    - Assigns user as session owner
  */
  const handleCreate = async () => {
    try {
      const session = await createSession(name);
      // Notify parent component to transition to session view with ownership info
      onEnterSession(session.id, session.isOwner, session.ownershipToken);
    } catch (error) {
      console.error("Error creating session:", error);
      alert(error.message);
    }
  };

  /*
    handleJoin
    -----------
    Triggered when user clicks "Join Session"

    FLOW:
    1. Calls joinSession service with link + name
    2. Backend validates session and user capacity
    3. Returns session ID
    4. App navigates to SessionPage

    BACKEND EXPECTATION:
    - Validate session exists
    - Enforce user limit (C3)
  */
  const handleJoin = async () => {
    try {
      const session = await joinSession(sessionLink, name);
      onEnterSession(session.id, false);
    } catch (error) {
      console.error("Error joining session:", error);
      alert(error.message);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {/* 
        ParticipantIdentity Component
        Handles display name input
      */}
      <ParticipantIdentity name={name} setName={setName} />

      {/* Create Session Button */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleCreate}>
          Create Session
        </button>
      </div>

      {/* Join Session Section */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter session link"
          value={sessionLink}
          onChange={(e) => setSessionLink(e.target.value)}
        />

        <button onClick={handleJoin}>
          Join Session
        </button>
      </div>
    </div>
  );
}

export default SessionAccess;
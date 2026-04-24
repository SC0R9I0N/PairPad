import { useState } from "react";
import HomePage from "./pages/HomePage";
import SessionPage from "./pages/SessionPage";

/*
  App.jsx
  --------
  Root component. Controls high-level navigation between pages and
  maintains the current user's session identity in state.

  Current design: state-based routing (no React Router yet).
  Future: replace with real routing and global state management.
*/
function App() {
  // current session identity — null until a session is entered
  const [sessionId, setSessionId] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [ownershipToken, setOwnershipToken] = useState(null);
  // display name of the current user in this session (needed for
  // identifying "you" in the participant list, cursor labels, etc.)
  const [displayName, setDisplayName] = useState("");

  /*
    handleEnterSession — called by SessionAccess on successful
    create or join. Stores everything App needs to render the session.
  */
  const handleEnterSession = (
    id,
    ownerStatus = false,
    token = null,
    name = "",
  ) => {
    setSessionId(id);
    setIsOwner(ownerStatus);
    setOwnershipToken(token);
    setDisplayName(name);
  };

  /*
    handleLeaveSession — resets all session state, sending the user
    back to HomePage. Triggered by revoke or (future) disconnect.
  */
  const handleLeaveSession = () => {
    setSessionId(null);
    setIsOwner(false);
    setOwnershipToken(null);
    setDisplayName("");
  };

  return (
    <div>
      {!sessionId ? (
        <HomePage onEnterSession={handleEnterSession} />
      ) : (
        <SessionPage
          sessionId={sessionId}
          isOwner={isOwner}
          ownershipToken={ownershipToken}
          displayName={displayName}
          onRevoke={handleLeaveSession}
        />
      )}
    </div>
  );
}

export default App;

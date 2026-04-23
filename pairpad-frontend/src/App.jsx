import { useState } from "react";
import HomePage from "./pages/HomePage";
import SessionPage from "./pages/SessionPage";

/*
  App.jsx
  --------
  Root component of the frontend application.

  RESPONSIBILITY:
  - Controls high-level navigation between pages
  - Maintains global session state (sessionId)

  CURRENT DESIGN:
  - Uses simple state-based routing (no React Router yet)
  - If sessionId is null → user is on HomePage
  - If sessionId exists → user is inside a session

  FUTURE WORK:
  - Replace with proper routing (React Router)
  - Add global state management (Context or Redux) for:
      - user identity
      - session metadata
      - shared state

  BACKEND INTERACTION:
  - Indirect (delegated to child components/services)
*/

function App() {
  const [sessionId, setSessionId] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const handleEnterSession = (id, ownerStatus = false) => {
    setSessionId(id);
    setIsOwner(ownerStatus);
  };

  const handleLeaveSession = () => {
    setSessionId(null);
    setIsOwner(false);
  };

  return (
    <div>
      {!sessionId ? (
        <HomePage onEnterSession={handleEnterSession} />
      ) : (
        <SessionPage 
          sessionId={sessionId} 
          isOwner={isOwner} 
          onRevoke={handleLeaveSession} 
        />
      )}
    </div>
  );
}

export default App;
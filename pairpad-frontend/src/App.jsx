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

  return (
    <div>
      {!sessionId ? (
        <HomePage onEnterSession={setSessionId} />
      ) : (
        <SessionPage sessionId={sessionId} />
      )}
    </div>
  );
}

export default App;
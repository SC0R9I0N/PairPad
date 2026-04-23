import OwnershipToken from "../components/OwnershipToken";

/*
  SessionPage.jsx
  ----------------
  Main workspace view after joining a session.

  RESPONSIBILITY:
  - Display collaborative environment:
      - Code editor
      - Participant list
      - Output console

  BACKEND INTERFACES (future):
  ----------------------------
  - WebSocket connection for:
      - real-time edits (FR9)
      - cursor updates (FR11)
      - participant updates (FR6)

  - Code execution:
      → POST /execute
      → request: { sessionId, code }
      → response: { output }

  FUTURE WORK:
  - Replace placeholders with real components:
      - Editor (Monaco)
      - ParticipantList
      - OutputConsole
  - Integrate WebSockets
*/

function SessionPage({ sessionId, isOwner, onRevoke }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Session: {sessionId}</h2>

      <OwnershipToken 
        isOwner={isOwner} 
        sessionId={sessionId} 
        onRevoke={onRevoke} 
      />

      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ flex: 3, border: "1px solid black", padding: "10px" }}>
          <h3>Code Editor</h3>
          <p>(Editor coming soon)</p>
        </div>

        <div style={{ flex: 1, marginLeft: "10px", border: "1px solid black", padding: "10px" }}>
          <h3>Participants</h3>
          <p>(List coming soon)</p>
        </div>
      </div>

      <div style={{ marginTop: "20px", border: "1px solid black", padding: "10px" }}>
        <h3>Output Console</h3>
        <p>(Execution output here)</p>
      </div>
    </div>
  );
}

export default SessionPage;
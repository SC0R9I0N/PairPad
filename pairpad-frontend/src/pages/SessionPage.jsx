import { useState, useEffect } from "react";
import OwnershipToken from "../components/OwnershipToken";
import ParticipantList from "../components/ParticipantList";
import { getParticipants } from "../services/participantService";

/*
  SessionPage.jsx
  ----------------
  Main workspace view after joining a session.

  Responsibilities:
  - Display shareable session link (US2)
  - Show active participants as avatar cluster (US4)
  - Provide placeholders for editor and output console
  - Expose owner-only revoke via OwnershipToken

  Future work:
  - Replace placeholders with real components (Monaco editor, etc.)
  - Wire up WebSocket for real-time participant updates (FR6)
  - POST /execute for code execution
*/
function SessionPage({
  sessionId,
  isOwner,
  ownershipToken,
  displayName,
  onRevoke,
}) {
  // tracks brief "Copied!" feedback after clicking Copy Link
  const [copied, setCopied] = useState(false);

  // controls whether the full share URL is visible on screen
  const [showLink, setShowLink] = useState(false);

  // list of participants in this session — empty until fetched
  const [participants, setParticipants] = useState([]);

  // build the full share URL from current origin + session ID
  const shareableLink = `${window.location.origin}/?session=${sessionId}`;

  /*
    Fetch participants when session or user identity changes.
    Currently pulls stubbed data. When real-time lands, this effect
    will likely be replaced by a WebSocket subscription.
  */
  useEffect(() => {
    // build the caller's identity object for the service
    const currentUser = { displayName, isOwner };
    getParticipants(sessionId, currentUser)
      .then((result) => setParticipants(result))
      .catch((error) => {
        console.error("Error fetching participants:", error);
      });
  }, [sessionId, displayName, isOwner]);

  /*
    handleCopy — copies the share URL using the browser Clipboard API.
    Flashes "Copied!" for 2s on success. Requires HTTPS or localhost.
  */
  const handleCopy = async () => {
    try {
      // writeText returns a Promise, so await it
      await navigator.clipboard.writeText(shareableLink);
      // show feedback
      setCopied(true);
      // reset feedback after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      alert("Could not copy to clipboard. Please copy the link manually.");
    }
  };

  // shared panel styling for the workspace cards
  const panelStyle = {
    background: "var(--bg-elevated)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: "16px",
    textAlign: "left",
  };

  // style for muted placeholder text inside empty panels
  const placeholderText = {
    color: "var(--text-muted)",
    fontSize: "14px",
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* Top row: session heading on the left, participants on the right */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ margin: 0 }}>Session</h2>
        <ParticipantList participants={participants} />
      </div>

      {/* Share link bar with optional revoke */}
      <div
        style={{
          marginBottom: "24px",
          padding: "12px 16px",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* terminal-style section label */}
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--text-muted)",
          }}
        >
          Share link
        </span>

        {/* primary action: copy. Label flips based on `copied` state */}
        <button onClick={handleCopy}>{copied ? "Copied!" : "Copy Link"}</button>

        {/* secondary action: toggle the full URL visibility */}
        <button className="secondary" onClick={() => setShowLink(!showLink)}>
          {showLink ? "Hide Link" : "Show Link"}
        </button>

        {/* owner-only revoke (renders nothing for non-owners) */}
        <OwnershipToken
          isOwner={isOwner}
          sessionId={sessionId}
          ownershipToken={ownershipToken}
          onRevoke={onRevoke}
        />

        {/* conditional render: URL only appears when showLink is true */}
        {showLink && (
          <input
            type="text"
            value={shareableLink}
            readOnly
            onFocus={(e) => e.target.select()}
            style={{
              flex: 1,
              minWidth: "240px",
              fontSize: "13px",
            }}
          />
        )}
      </div>

      {/* Full-width editor panel (participants no longer share the row) */}
      <div style={{ ...panelStyle, minHeight: "400px" }}>
        <h3>Code Editor</h3>
        <p style={placeholderText}>Editor coming soon</p>
      </div>

      {/* Output console spans full width below */}
      <div style={{ ...panelStyle, marginTop: "16px", minHeight: "140px" }}>
        <h3>Output Console</h3>
        <p style={placeholderText}>Execution output will appear here</p>
      </div>
    </div>
  );
}

export default SessionPage;

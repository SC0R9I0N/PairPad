import { useState } from "react";
import OwnershipToken from "../components/OwnershipToken";

/*
  SessionPage.jsx
  ----------------
  Main workspace view after joining a session.

  Responsibilities:
  - Display shareable session link (US2)
  - Provide placeholders for editor, participant list, output console
  - Expose owner-only revoke action via OwnershipToken

  Future work:
  - Replace placeholders with real components (Monaco editor, etc.)
  - Wire up WebSocket for real-time updates (FR6, FR9, FR11)
  - POST /execute for code execution
*/
function SessionPage({ sessionId, isOwner, ownershipToken, onRevoke }) {
  // tracks brief "Copied!" feedback after clicking Copy Link
  const [copied, setCopied] = useState(false);

  // controls whether the full share URL is visible on screen
  const [showLink, setShowLink] = useState(false);

  // build the full share URL from current origin + session ID
  const shareableLink = `${window.location.origin}/?session=${sessionId}`;

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
    minHeight: "280px",
    textAlign: "left",
  };

  // style for the muted placeholder text inside empty panels
  const placeholderText = {
    color: "var(--text-muted)",
    fontSize: "14px",
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Session</h2>

      {/* Share link section (US2) */}
      <div
        style={{
          marginTop: "12px",
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
        {/* section label styled like a terminal tag */}
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

        {/* secondary action: toggle visibility of the full URL */}
        <button className="secondary" onClick={() => setShowLink(!showLink)}>
          {showLink ? "Hide Link" : "Show Link"}
        </button>

        {/* conditional render: URL only appears when showLink is true */}
        {showLink && (
          <input
            type="text"
            value={shareableLink}
            readOnly
            // auto-select on focus for easy manual copy
            onFocus={(e) => e.target.select()}
            style={{
              flex: 1,
              minWidth: "240px",
              fontSize: "13px",
            }}
          />
        )}
      </div>

      {/* owner-only revoke button (renders nothing for non-owners) */}
      <OwnershipToken
        isOwner={isOwner}
        sessionId={sessionId}
        ownershipToken={ownershipToken}
        onRevoke={onRevoke}
      />

      {/* main workspace row: editor (wide) + participants (narrow) */}
      <div style={{ display: "flex", marginTop: "24px", gap: "16px" }}>
        <div style={{ ...panelStyle, flex: 3 }}>
          <h3>Code Editor</h3>
          <p style={placeholderText}>Editor coming soon</p>
        </div>

        <div style={{ ...panelStyle, flex: 1 }}>
          <h3>Participants</h3>
          <p style={placeholderText}>List coming soon</p>
        </div>
      </div>

      {/* output console spans full width below */}
      <div style={{ ...panelStyle, marginTop: "16px", minHeight: "140px" }}>
        <h3>Output Console</h3>
        <p style={placeholderText}>Execution output will appear here</p>
      </div>
    </div>
  );
}

export default SessionPage;

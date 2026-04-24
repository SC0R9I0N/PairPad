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
    handleCopy — copies the share URL to clipboard using the browser's
    Clipboard API. Flashes "Copied!" for 2 seconds on success.
    Note: navigator.clipboard only works on HTTPS or localhost.
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

  return (
    <div style={{ padding: "20px" }}>
      {/* header stays clean — raw UUID hidden behind "Show Link" */}
      <h2>Session</h2>

      {/* Share link section (US2) */}
      <div
        style={{
          marginTop: "10px",
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid var(--border)",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontWeight: "500" }}>Share link:</span>

        {/* primary action: copy. Label flips based on `copied` state */}
        <button onClick={handleCopy}>{copied ? "Copied!" : "Copy Link"}</button>

        {/* secondary action: toggle visibility of the full URL */}
        <button onClick={() => setShowLink(!showLink)}>
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
              minWidth: "200px",
              padding: "6px 8px",
              fontFamily: "var(--mono)",
              fontSize: "14px",
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

      {/* main workspace placeholders */}
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ flex: 3, border: "1px solid black", padding: "10px" }}>
          <h3>Code Editor</h3>
          <p>(Editor coming soon)</p>
        </div>

        <div
          style={{
            flex: 1,
            marginLeft: "10px",
            border: "1px solid black",
            padding: "10px",
          }}
        >
          <h3>Participants</h3>
          <p>(List coming soon)</p>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          border: "1px solid black",
          padding: "10px",
        }}
      >
        <h3>Output Console</h3>
        <p>(Execution output here)</p>
      </div>
    </div>
  );
}

export default SessionPage;

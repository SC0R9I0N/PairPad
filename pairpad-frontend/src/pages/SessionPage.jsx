import { useState, useEffect } from "react";
import OwnershipToken from "../components/OwnershipToken";
import ParticipantList from "../components/ParticipantList";
import Banner from "../components/Banner";
import { useSessionStatus } from "../hooks/useSessionStatus";

/*
  SessionPage.jsx
  ----------------
  Main workspace view after joining a session.

  Responsibilities:
  - Display shareable session link (US2)
  - Show active participants as avatar cluster (US4) via polling
  - Detect owner-initiated revocation via polling and route home (US5)
  - Provide placeholders for editor and output console
  - Expose owner-only revoke via OwnershipToken
  - Surface in-session errors/warnings via Banner

  Future work:
  - Replace placeholders with real components (Monaco editor, etc.)
  - Replace polling with backend subscription
  - POST /execute for code execution
*/

// how long the "session ended" banner shows before redirect (ms)
const SESSION_ENDED_REDIRECT_DELAY = 3000;

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

  // inline error/warning surfaced to the user — replaces alert()
  // shape: { variant: "error" | "warning" | "info", message: string }
  const [banner, setBanner] = useState(null);

  /*
    Drive the participant list and revocation detection from the
    polling hook.
  */
  const { participants, sessionEnded } = useSessionStatus(
    sessionId,
    displayName,
    isOwner,
  );

  // build the full share URL from current origin + session ID
  const shareableLink = `${window.location.origin}/?session=${sessionId}`;

  /*
    React to the polling hook detecting revoked session:
    - Route home after a short delay
    - The owner who initiated the revoke unmounts immediately via onRevoke() in OwnershipToken
    - The banner for "session ended" rendered below.
  */
  useEffect(() => {
    // owners navigate via OwnershipToken's onRevoke — skip the polling path
    if (!sessionEnded || isOwner) return;

    // redirect to home after a short delay
    const timer = setTimeout(onRevoke, SESSION_ENDED_REDIRECT_DELAY);
    return () => clearTimeout(timer);
  }, [sessionEnded, isOwner, onRevoke]);

  /*
  Displayed banner = 
    - the session-ended message, otherwise:
    - the user-controlled banner
*/
  const displayedBanner =
    sessionEnded && !isOwner
      ? {
          variant: "error",
          message: "This session has been ended by the owner.",
        }
      : banner;

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
      // recoverable — user can manually select the URL via "Show Link"
      setBanner({
        variant: "warning",
        message: "Could not copy to clipboard. Please copy the link manually.",
      });
    }
  };

  /*
    handleRevokeError — receives revoke failure messages from
    OwnershipToken and surfaces them via the banner.
  */
  const handleRevokeError = (message) => {
    // revoke failure is recoverable (network blip etc.) — warning, not error
    setBanner({ variant: "warning", message });
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

      {/* in-session banner — sits above the share bar so it's prominent */}
      <Banner
        variant={displayedBanner?.variant}
        message={displayedBanner?.message}
        onDismiss={sessionEnded ? undefined : () => setBanner(null)}
      />

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
          onError={handleRevokeError}
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

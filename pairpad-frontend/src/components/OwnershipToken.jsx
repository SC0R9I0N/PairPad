import { useState } from "react";
import { revokeSession } from "../services/sessionService";
import ConfirmDialog from "./ConfirmDialog";

/*
  OwnershipToken.jsx
  -------------------
  Owner-only controls. Currently exposes Revoke Session.
  Renders as an inline button to sit alongside other header controls.

  Props:
  - isOwner: boolean — component returns null if false
  - sessionId, ownershipToken: needed for the revoke call
  - onRevoke: parent callback after successful revoke
  - onError: parent callback for surfacing failures via banner

  Backend interface:
    revokeSession() → DELETE /api/session/:sessionId/revoke
    Effect: disconnects all users, invalidates the session.
*/
function OwnershipToken({
  isOwner,
  sessionId,
  ownershipToken,
  onRevoke,
  onError,
}) {
  // controls whether the confirmation dialog is currently open
  const [isConfirming, setIsConfirming] = useState(false);

  // non-owners see nothing from this component
  if (!isOwner) return null;

  /*
    handleConfirm — fires when the user confirms revocation in the
    dialog. Closes the dialog first, then calls the backend.
  */
  const handleConfirm = async () => {
    // close dialog immediately so it doesn't linger during the request
    setIsConfirming(false);
    try {
      // call backend to tear down the session
      await revokeSession(sessionId, ownershipToken);
      // notify parent — resets session state and returns home
      onRevoke();
    } catch (error) {
      console.error("Error revoking session:", error);
      // bubble error up so SessionPage's banner can surface it
      if (onError) {
        onError("Failed to revoke session: " + error.message);
      }
    }
  };

  return (
    // fragment so the trigger button + dialog can sit as siblings
    <>
      {/* danger class gives this button red styling for destructive intent */}
      <button className="danger" onClick={() => setIsConfirming(true)}>
        Revoke Session
      </button>

      {/* on-theme replacement for native window.confirm() */}
      <ConfirmDialog
        isOpen={isConfirming}
        variant="danger"
        title="Revoke Session"
        message="Are you sure you want to revoke this session? All participants will be disconnected."
        confirmLabel="Revoke"
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirming(false)}
      />
    </>
  );
}

export default OwnershipToken;

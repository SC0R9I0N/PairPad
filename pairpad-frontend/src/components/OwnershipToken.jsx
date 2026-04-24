import { revokeSession } from "../services/sessionService";

/*
  OwnershipToken.jsx
  -------------------
  Owner-only controls. Currently exposes Revoke Session.

  Props:
  - isOwner: boolean — component returns null if false
  - sessionId, ownershipToken: needed for the revoke call
  - onRevoke: parent callback after successful revoke

  Backend interface:
    revokeSession() → DELETE /api/session/:sessionId/revoke
    Effect: disconnects all users, invalidates the session.
*/
function OwnershipToken({ isOwner, sessionId, ownershipToken, onRevoke }) {
  // non-owners see nothing from this component
  if (!isOwner) return null;

  /*
    handleRevoke — confirms with the user, then calls the backend.
    On success, notifies parent via onRevoke() which routes back to home.
  */
  const handleRevoke = async () => {
    // double-check with user before destructive action
    if (
      window.confirm(
        "Are you sure you want to revoke this session? All participants will be disconnected.",
      )
    ) {
      try {
        // call backend to tear down the session
        await revokeSession(sessionId, ownershipToken);
        // notify parent — typically resets session state and returns to HomePage
        onRevoke();
      } catch (error) {
        console.error("Error revoking session:", error);
        alert("Failed to revoke session: " + error.message);
      }
    }
  };

  return (
    <div style={{ textAlign: "left" }}>
      {/* danger class gives this button red styling for destructive intent */}
      <button className="danger" onClick={handleRevoke}>
        Revoke Session
      </button>
    </div>
  );
}
export default OwnershipToken;

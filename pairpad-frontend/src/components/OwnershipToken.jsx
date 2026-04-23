import { revokeSession } from "../services/sessionService";

/*
  OwnershipToken.jsx
  -------------------
  Represents session owner privileges.

  RESPONSIBILITY:
  - Provide UI for owner-specific actions

  PROPERTIES:
  - isOwner: boolean indicating if user is session owner
  - sessionId: ID of the current session
  - ownershipToken: token to prove ownership
  - onRevoke: callback to notify parent of session revocation

  BACKEND INTERFACE:
  revokeSession():
    → DELETE /session/:sessionId/revoke
    → effect: disconnect all users, invalidate link
*/

function OwnershipToken({ isOwner, sessionId, ownershipToken, onRevoke }) {
  if (!isOwner) return null;

  const handleRevoke = async () => {
    if (window.confirm("Are you sure you want to revoke this session? All participants will be disconnected.")) {
      try {
        await revokeSession(sessionId, ownershipToken);
        onRevoke();
      } catch (error) {
        console.error("Error revoking session:", error);
        alert("Failed to revoke session: " + error.message);
      }
    }
  };

  return (
    <div>
      <button onClick={handleRevoke}>
        Revoke Session
      </button>
    </div>
  );
}

export default OwnershipToken;
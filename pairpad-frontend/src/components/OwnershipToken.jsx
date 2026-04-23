/*
  OwnershipToken.jsx
  -------------------
  Represents session owner privileges.

  RESPONSIBILITY:
  - Provide UI for owner-specific actions

  PROPERTIES:
  - isOwner: boolean indicating if user is session owner

  BACKEND INTERFACE (future):
  ---------------------------
  revokeSession():
    → POST /session/revoke
    → request: { sessionId }
    → effect: disconnect all users, invalidate link

  FUTURE WORK:
  - Implement revoke logic
  - Add confirmation dialog
*/

function OwnershipToken({ isOwner }) {
  if (!isOwner) return null;

  return (
    <div>
      <button>Revoke Session</button>
    </div>
  );
}

export default OwnershipToken;
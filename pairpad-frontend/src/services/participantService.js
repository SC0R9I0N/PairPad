/*
  participantService.js
  ----------------------
  Service layer for participant-related backend communication.

  Current state: uses STUBBED data — backend endpoint not yet built.
  Returns the current user + 2 mock participants for demo purposes.

  Future backend API contract:
    GET /api/session/:sessionId/participants
    Response: [{ displayName: string, isOwner: boolean }]

  Real-time updates will eventually arrive via WebSocket subscription
*/

/*
  getParticipants — returns the session's participant list.

  Inputs:
  - sessionId: string
  - currentUser: { displayName, isOwner }

  Output: Array<{ displayName, isOwner, isYou }>

  Stub behavior: always returns 3 entries, arranged differently
  depending on whether the current user is the owner.
*/
export async function getParticipants(sessionId, currentUser) {
  // TODO: Replace with real API / WebSocket subscription.
  // Planned endpoint: GET /api/session/:sessionId/participants
  console.log("Fetching participants for session:", sessionId);

  // tiny simulated delay so stubs feel slightly async, not instant
  await new Promise((resolve) => setTimeout(resolve, 150));

  if (currentUser.isOwner) {
    // caller is the owner — add two mock non-owners
    return [
      { ...currentUser, isYou: true },
      { displayName: "Jordan", isOwner: false, isYou: false },
      { displayName: "Sam", isOwner: false, isYou: false },
    ];
  } else {
    // caller joined someone else's session — mock an owner + one peer
    return [
      { displayName: "Alex", isOwner: true, isYou: false },
      { ...currentUser, isYou: true },
      { displayName: "Jordan", isOwner: false, isYou: false },
    ];
  }
}
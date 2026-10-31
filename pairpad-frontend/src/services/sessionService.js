/*
  sessionService.js
  ------------------
  SERVICE LAYER for session-related backend communication.

  PURPOSE:
  - Encapsulate all API calls related to session management
  - Provide a clean interface for frontend components
  - Decouple UI from backend implementation details

  DESIGN:
  - Components never call fetch() directly
  - All HTTP/WebSocket communication flows through services


/*
  createSession
  --------------
  Called when a user clicks "Create Session"

  INPUT:
  - name (string): user display name

  OUTPUT:
  - session object containing:
      { id: string }

  BACKEND INTERACTION:
  - Sends POST request to server
  - Server creates session and assigns ownership
*/
export async function createSession(name) {
  // Debug log to verify function is being triggered
  console.log("Creating session for:", name);

  const response = await fetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ displayName: name })
  });

  if (!response.ok) {
    throw new Error("Failed to create session");
  }

  const data = await response.json();
  return { 
    id: data.sessionId, 
    isOwner: data.isOwner,
    ownershipToken: data.ownershipToken 
  };
  }

  /*
  joinSession
  ------------
  Called when a user clicks "Join Session"

  INPUT:
  - link (string): session identifier (from URL or input)
  - name (string): user display name

  OUTPUT:
  - session object containing:
      { id: string }

  BACKEND INTERACTION (future):
  - Validates session exists
  - Checks user limit (C3)
  - Registers participant
  */
  export async function joinSession(link, name) {
  console.log("Joining session:", link, "as", name);

  const response = await fetch("/api/session/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sessionId: link,
      displayName: name
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to join session");
  }

  const data = await response.json();
  return { id: data.sessionId };
  }

  /*
  revokeSession
  --------------
  Called by the owner to end the session.
  */
  export async function revokeSession(sessionId, ownershipToken) {
  console.log("Revoking session:", sessionId);

  const response = await fetch(`/api/session/${sessionId}/revoke`, {
    method: "DELETE",
    headers: {
      "X-Ownership-Token": ownershipToken
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to revoke session");
  }

  return await response.json();
  }

  /*
    disconnectSession
    ------------------
    Called on browser tab close to remove a participant from the session.

    INPUT:
    - sessionId (string): which session to leave
    - displayName (string): who is leaving

    BACKEND INTERACTION:
    - Sends POST to /api/session/:sessionId/disconnect
    - Body: { displayName }
    - Uses navigator.sendBeacon instead of fetch (fetch gets cancelled on page unload)
    - Fire-and-forget — no response is read, no errors are caught
  */
  export function disconnectSession(sessionId, displayName) {
    // pack identity into JSON
    const payload = JSON.stringify({ displayName });

    // Blob with explicit content-type so Flask's get_json() parses it
    const blob = new Blob([payload], { type: "application/json" });

    // queue the request — browser guarantees delivery even after tab closes
    navigator.sendBeacon(`/api/session/${sessionId}/disconnect`, blob);
  }
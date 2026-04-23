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

  CURRENT STATE:
  - Uses MOCK responses (no real backend yet)
  - Allows frontend to function independently during development

  FUTURE BACKEND API CONTRACT:
  ----------------------------

  createSession(name):
    POST /session
    Request Body:
      {
        displayName: string
      }
    Response:
      {
        sessionId: string,
        isOwner: boolean
      }

  joinSession(link, name):
    POST /session/join
    Request Body:
      {
        sessionId: string,
        displayName: string
      }
    Response:
      {
        sessionId: string
      }
*/

/*
  createSession
  --------------
  Called when a user clicks "Create Session"

  INPUT:
  - name (string): user display name

  OUTPUT:
  - session object containing:
      { id: string }

  BACKEND INTERACTION (future):
  - Sends POST request to server
  - Server creates session and assigns ownership
*/
export async function createSession(name) {
  // Debug log to verify function is being triggered
  console.log("Creating session for:", name);

  // TODO: Replace with real API call
  /*
  const response = await fetch("/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ displayName: name })
  });

  const data = await response.json();
  return { id: data.sessionId };
  */

  // TEMP MOCK RESPONSE (used for frontend testing)
  return { id: "session-123" };
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

  // TODO: Replace with real API call
  /*
  const response = await fetch("/session/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sessionId: link,
      displayName: name
    })
  });

  const data = await response.json();
  return { id: data.sessionId };
  */

  // TEMP MOCK RESPONSE
  return { id: link || "session-123" };
}
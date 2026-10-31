/*
  participantService.js
  ----------------------
  Service layer for session liveness + participant list.

  Provides one entry point: getSessionStatus(sessionId).
  Used by useSessionStatus hook to drive polling.

  Backend API contract (target):
    GET /api/session/:sessionId
    200 OK:
      {
        sessionId: string,
        participants: [{ displayName: string, isOwner: boolean }]
      }
    404 Not Found:
      Session has been revoked or never existed.
*/

/*
  SessionNotFoundError — error class so the hook can
  distinguish "session is gone" from "network blip"
  Throw this on 404; throw plain Error on anything else.
*/
export class SessionNotFoundError extends Error {
  constructor() {
    super("Session not found");
    this.name = "SessionNotFoundError";
  }
}

/*
  getSessionStatus — fetches session liveness + participants.
  Returns: { sessionId, participants: [{ displayName, isOwner }] }
  Throws SessionNotFoundError on 404, generic Error on other failures.
*/
export async function getSessionStatus(sessionId) {
  // real implementation
  const response = await fetch(`/api/session/${sessionId}`);

  // 404 = session revoked or never existed -> revoked/no session error
  if (response.status === 404) {
    throw new SessionNotFoundError();
  }

  // any other non-2xx is treated as transient
  if (!response.ok) {
    throw new Error(`Session status check failed: ${response.status}`);
  }

  return await response.json();
}
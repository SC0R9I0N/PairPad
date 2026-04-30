import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
from models import Session

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize the Flask application
app = Flask(__name__)
CORS(app)

# Temporary in-memory session store
# TODO: Replace with Spacetime DB
sessions: dict[str, Session] = {}

# Health Check
@app.route("/health", methods=["GET"])
def health():
    """Simple liveness check — confirms Flask is running."""
    logger.info("Health check requested")
    return jsonify({"status": "ok"}), 200


'''Session Management Endpoints'''

# Create session
@app.route("/session", methods=["POST"])
def create_session():
    data = request.get_json()
    display_name = data.get("displayName")
    
    logger.info(f"Create session request received for user: {display_name}")

    if not display_name:
        logger.warning("Create session failed: displayName is missing")
        return jsonify({"error": "displayName is required"}), 400

    session = Session.create_session(display_name)
    sessions[session.session_id] = session
    
    return jsonify({
        "sessionId": session.session_id,
        "ownershipToken": session.ownership_token,
        "isOwner": True,
        "sessionLink": session.session_link,
        "owner": session.owner.display_name
    }), 201


# Join sessions
@app.route("/session/join", methods=["POST"])
def join_session():
    data = request.get_json()
    session_id = data.get("sessionId")
    display_name = data.get("displayName")

    logger.info(f"Join session request received: user={display_name}, sessionId={session_id}")

    if not session_id or not display_name:
        logger.warning("Join session failed: sessionId or displayName missing")
        return jsonify({"error": "sessionId and displayName are required"}), 400

    session = sessions.get(session_id)
    if not session:
        logger.warning(f"Join session failed: Session {session_id} not found")
        return jsonify({"error": "Session not found."}), 404
    
    try:
        participant = session.join_session(display_name)
        logger.info(f"User {display_name} joined session {session_id} successfully")
        return jsonify({
            "sessionId": session_id,
            "displayName": participant.display_name
        }), 200
    except ValueError as e:
        logger.error(f"Join session error: {str(e)}")
        return jsonify({"error": str(e)}), 400


# Revoke session
@app.route("/session/<session_id>/revoke", methods=["DELETE"])
def revoke_session(session_id):
    logger.info(f"Revoke session request received for sessionId: {session_id}")

    # Verify ownership token
    token = request.headers.get("X-Ownership-Token")

    session = sessions.get(session_id)
    if not session:
        logger.warning(f"Revoke session failed: Session {session_id} not found")
        return jsonify({"error": "Session not found."}), 404

    if session.ownership_token != token:
        logger.warning(f"Revoke session failed: Invalid ownership token for session {session_id}")
        return jsonify({"error": "Unauthorized. Only the owner can revoke the session."}), 403

    sessions.pop(session_id)
    logger.info(f"Session {session_id} revoked successfully")
    return jsonify({"message": "Session revoked."}), 200


# Disconnect (browser close / tab close)
# Called via navigator.sendBeacon from the frontend — fire-and-forget,
# so the frontend never reads these responses.
@app.route("/session/<session_id>/disconnect", methods=["POST"])
def disconnect(session_id):
    # silent=True prevents a 400 if JSON parsing fails unexpectedly
    data = request.get_json(silent=True) or {}
    display_name = data.get("displayName")

    logger.info(f"Disconnect request: user={display_name}, sessionId={session_id}")

    # displayName is required so we know who to remove
    if not display_name:
        logger.warning("Disconnect failed: displayName missing")
        return jsonify({"error": "displayName is required."}), 400

    # look up the session — may already be gone if owner revoked first
    session = sessions.get(session_id)
    if not session:
        logger.warning(f"Disconnect failed: Session {session_id} not found")
        return jsonify({"error": "Session not found."}), 404

    # remove the participant from the session's list
    removed = session.leave_session(display_name)
    if removed:
        logger.info(f"Participant {display_name} removed from session {session_id}")
    else:
        # already gone, or name didn't match — not an error worth crashing over
        logger.warning(f"Participant {display_name} not found in session {session_id}")

    # always 200 — frontend can't read this anyway (fire-and-forget)
    return jsonify({"message": "Participant removed."}), 200


# Get session status
@app.route("/session/<session_id>", methods=["GET"])
def get_session_status(session_id):
    logger.debug(f"Session status requested for sessionId: {session_id}")

    session = sessions.get(session_id)
    if not session:
        logger.warning(f"Session status failed: Session {session_id} not found")
        return jsonify({"error": "Session not found."}), 404

    participants = [{"displayName": session.owner.display_name, "isOwner": True}]
    participants.extend(
        {"displayName": participant.display_name, "isOwner": False}
        for participant in session.participants
    )

    return jsonify({
        "sessionId": session.session_id,
        "participants": participants,
    }), 200


# Run app
if __name__ == "__main__":
    app.run(debug=True)

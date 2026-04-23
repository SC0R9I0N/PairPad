from flask import Flask, jsonify, request
from models import Session

# Initialize the Flask application
app = Flask(__name__)

# Temporary in-memory session store
# TODO: Replace with Spacetime DB
sessions: dict[str, Session] = {}

# Health Check
@app.route("/health", methods=["GET"])
def health():
    """Simple liveness check — confirms Flask is running."""
    return jsonify({"status": "ok"}), 200

'''
Session Management Endpoints:
'''

# Create session
@app.route("/session", methods=["POST"])
def create_session():
    data = request.get_json()
    session = Session.create_session(data["display_name"])
    sessions[session.session_id] = session
    return jsonify({
        "session_id": session.session_id,
        "session_link": session.session_link,
        "owner": session.owner.display_name
    }), 201


# Join sessions
@app.route("/session/<session_id>/join", methods=["POST"])
def join_session(session_id):
    session = sessions.get(session_id)
    if not session:
        return jsonify({"error": "Session not found."}), 404
    data = request.get_json()
    participant = session.join_session(data["display_name"])
    return jsonify({
        "session_id": session_id,
        "display_name": participant.display_name
    }), 200


# Revoke session
@app.route("/session/<session_id>/revoke", methods=["DELETE"])
def revoke_session(session_id):
    session = sessions.get(session_id)
    if not session:
        return jsonify({"error": "Session not found."}), 404
    sessions.pop(session_id)
    return jsonify({"message": "Session revoked."}), 200


# Run app
if __name__ == "__main__":
    app.run(debug=True)

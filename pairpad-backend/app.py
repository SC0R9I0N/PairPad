from flask import Flask, jsonify

# Initialize the Flask application
app = Flask(__name__)

# Health Check
@app.route("/health", methods=["GET"])
def health():
    """Simple liveness check — confirms Flask is running."""
    return jsonify({"status": "ok"}), 200

# Rest of API Endpoints go here

# Run app
if __name__ == "__main__":
    app.run(debug=True)

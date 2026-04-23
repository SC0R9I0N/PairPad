# imports
import sys
from pathlib import Path
from types import SimpleNamespace
import pytest

# set up backend directory
BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

import app as backend_app
import models.session as session_module
from models.participant import Participant
from models.session import Session
from models.session_owner import SessionOwner

# to maintain the highest readability and maintainability, all tests have been written with possible changes in mind,
# so they have all been written in the Arrange-Act-Assert pattern.
# Arrange: setting up test data/objects
# Act: execute function under test
# Assert: verify the outcome is as expected

# replaces UUID generation with deterministic values for session model tests
def _patch_session_ids(monkeypatch, *values):
    ids = iter(values)
    monkeypatch.setattr(session_module.uuid, "uuid4", lambda: next(ids))

# builds a lightweight session stub for route tests without real backend state
def _make_fake_session(
    session_id="session-123",
    owner_name="Alice",
    ownership_token="owner-token",
    session_link="session-link",
    join_error=None,
):
    fake_session = SimpleNamespace(
        session_id=session_id,
        ownership_token=ownership_token,
        session_link=session_link,
        owner=SimpleNamespace(display_name=owner_name),
        join_calls=[],
    )

    def join_session(display_name):
        fake_session.join_calls.append(display_name)
        if join_error is not None:
            raise ValueError(join_error)
        return SimpleNamespace(display_name=display_name)

    fake_session.join_session = join_session
    return fake_session

# provides an isolated in-memory session store for each test
@pytest.fixture
def session_store(monkeypatch):
    store = {}
    monkeypatch.setattr(backend_app, "sessions", store)
    return store

# creates a Flask test client wired to the patched session store
@pytest.fixture
def client(session_store):
    backend_app.app.config.update(TESTING=True)
    with backend_app.app.test_client() as test_client:
        yield test_client

# verifies the health endpoint returns the expected success payload
def test_health_returns_ok_status(client):
    # Arrange

    # Act
    response = client.get("/health")

    # Assert
    assert response.status_code == 200
    assert response.get_json() == {"status": "ok"}

# confirms session creation returns owner data and persists the created session
def test_create_session_returns_session_payload_and_stores_session(client, session_store, monkeypatch):
    # Arrange
    fake_session = _make_fake_session()
    monkeypatch.setattr(
        backend_app.Session,
        "create_session",
        staticmethod(lambda display_name: fake_session),
    )

    # Act
    response = client.post("/session", json={"displayName": "Alice"})

    # Assert
    assert response.status_code == 201
    assert response.get_json() == {
        "sessionId": "session-123",
        "ownershipToken": "owner-token",
        "isOwner": True,
        "sessionLink": "session-link",
        "owner": "Alice",
    }
    assert session_store == {"session-123": fake_session}

# ensures session creation fails when the display name is omitted
def test_create_session_rejects_missing_display_name(client, monkeypatch):
    # Arrange
    monkeypatch.setattr(
        backend_app.Session,
        "create_session",
        staticmethod(lambda display_name: pytest.fail("create_session should not be called")),
    )

    # Act
    response = client.post("/session", json={})

    # Assert
    assert response.status_code == 400
    assert response.get_json() == {"error": "displayName is required"}

# checks join requests are rejected when required fields are missing
def test_join_session_rejects_missing_required_fields(client):
    # Arrange

    # Act
    response = client.post("/session/join", json={"sessionId": "session-123"})

    # Assert
    assert response.status_code == 400
    assert response.get_json() == {"error": "sessionId and displayName are required"}

# verifies joining a session fails when the target session does not exist
def test_join_session_returns_not_found_for_unknown_session(client):
    # Arrange

    # Act
    response = client.post(
        "/session/join",
        json={"sessionId": "missing-session", "displayName": "Bob"},
    )

    # Assert
    assert response.status_code == 404
    assert response.get_json() == {"error": "Session not found."}

# confirms joining a valid session returns the participant details
def test_join_session_returns_participant_payload_on_success(client, session_store):
    # Arrange
    fake_session = _make_fake_session()
    session_store["session-123"] = fake_session

    # Act
    response = client.post(
        "/session/join",
        json={"sessionId": "session-123", "displayName": "Bob"},
    )

    # Assert
    assert response.status_code == 200
    assert response.get_json() == {"sessionId": "session-123", "displayName": "Bob"}
    assert fake_session.join_calls == ["Bob"]

# ensures join validation errors from the session model are returned to the client
def test_join_session_returns_validation_error_from_session(client, session_store):
    # Arrange
    fake_session = _make_fake_session(join_error="Session is full.")
    session_store["session-123"] = fake_session

    # Act
    response = client.post(
        "/session/join",
        json={"sessionId": "session-123", "displayName": "Bob"},
    )

    # Assert
    assert response.status_code == 400
    assert response.get_json() == {"error": "Session is full."}
    assert fake_session.join_calls == ["Bob"]

# verifies revoking a missing session returns a not-found response
def test_revoke_session_returns_not_found_for_unknown_session(client):
    # Arrange

    # Act
    response = client.delete(
        "/session/missing-session/revoke",
        headers={"X-Ownership-Token": "owner-token"},
    )

    # Assert
    assert response.status_code == 404
    assert response.get_json() == {"error": "Session not found."}

# checks revoke requests fail when the ownership token is invalid
def test_revoke_session_rejects_invalid_ownership_token(client, session_store):
    # Arrange
    session_store["session-123"] = _make_fake_session()

    # Act
    response = client.delete(
        "/session/session-123/revoke",
        headers={"X-Ownership-Token": "wrong-token"},
    )

    # Assert
    assert response.status_code == 403
    assert response.get_json() == {
        "error": "Unauthorized. Only the owner can revoke the session."
    }
    assert "session-123" in session_store

# confirms a valid revoke request removes the session from storage
def test_revoke_session_removes_session_when_token_matches(client, session_store):
    # Arrange
    session_store["session-123"] = _make_fake_session()

    # Act
    response = client.delete(
        "/session/session-123/revoke",
        headers={"X-Ownership-Token": "owner-token"},
    )

    # Assert
    assert response.status_code == 200
    assert response.get_json() == {"message": "Session revoked."}
    assert session_store == {}

# verifies the session owner model stores the provided display name
def test_session_owner_stores_display_name():
    # Arrange

    # Act
    owner = SessionOwner("Alice")

    # Assert
    assert owner.display_name == "Alice"

# verifies the participant model stores the provided display name
def test_participant_stores_display_name():
    # Arrange

    # Act
    participant = Participant("Bob")

    # Assert
    assert participant.display_name == "Bob"

# confirms session creation initializes IDs, owner data, and default state
def test_create_session_builds_expected_session_fields(monkeypatch):
    # Arrange
    _patch_session_ids(monkeypatch, "session-id", "owner-token", "session-link")

    # Act
    session = Session.create_session("Alice")

    # Assert
    assert session.session_id == "session-id"
    assert session.ownership_token == "owner-token"
    assert session.session_link == "session-link"
    assert session.is_active is True
    assert session.owner.display_name == "Alice"
    assert session.participants == []

# ensures an active session accepts a new participant and stores it
def test_join_session_adds_participant_to_active_session(monkeypatch):
    # Arrange
    _patch_session_ids(monkeypatch, "session-id", "owner-token", "session-link")
    session = Session("Alice")

    # Act
    participant = session.join_session("Bob")

    # Assert
    assert participant.display_name == "Bob"
    assert session.participants == [participant]

# verifies the final available participant slot can still be filled
def test_join_session_allows_last_available_slot(monkeypatch):
    # Arrange
    _patch_session_ids(monkeypatch, "session-id", "owner-token", "session-link")
    session = Session("Alice")
    session.participants = [Participant(f"user-{index}") for index in range(Session.MAX_USERS - 2)]

    # Act
    participant = session.join_session("last-seat")

    # Assert
    assert participant.display_name == "last-seat"
    assert len(session.participants) == Session.MAX_USERS - 1

# ensures joining an inactive session raises the expected validation error
def test_join_session_raises_when_session_is_inactive(monkeypatch):
    # Arrange
    _patch_session_ids(monkeypatch, "session-id", "owner-token", "session-link")
    session = Session("Alice")
    session.is_active = False

    # Act / Assert
    with pytest.raises(ValueError, match="Session is not active."):
        session.join_session("Bob")

# ensures joining a full session raises the expected validation error
def test_join_session_raises_when_session_is_full(monkeypatch):
    # Arrange
    _patch_session_ids(monkeypatch, "session-id", "owner-token", "session-link")
    session = Session("Alice")
    session.participants = [Participant(f"user-{index}") for index in range(Session.MAX_USERS - 1)]

    # Act / Assert
    with pytest.raises(ValueError, match="Session is full."):
        session.join_session("overflow-user")

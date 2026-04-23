import uuid
from .session_owner import SessionOwner
from .participant import Participant


class Session:
    MAX_USERS = 5

    def __init__(self, owner_display_name: str):
        self.session_id = str(uuid.uuid4())
        self.ownership_token = str(uuid.uuid4())
        self.session_link = str(uuid.uuid4())
        self.is_active = True
        self.owner = SessionOwner(owner_display_name)
        self.participants: list[Participant] = []

    @classmethod
    def create_session(cls, owner_display_name: str) -> "Session":
        return cls(owner_display_name)

    def join_session(self, display_name: str) -> Participant:
        if not self.is_active:
            raise ValueError("Session is not active.")
        if len(self.participants) + 1 >= self.MAX_USERS:
            raise ValueError("Session is full.")
        participant = Participant(display_name)
        self.participants.append(participant)
        return participant

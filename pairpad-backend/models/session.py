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
        
        # reject if the display name is already in use by the owner
        if self.owner.display_name == display_name:
            raise ValueError("Display name is already taken.")

        # reject if the display name is already in use by a participant
        for p in self.participants:
            if p.display_name == display_name:
                raise ValueError("Display name is already taken.")

        participant = Participant(display_name)
        self.participants.append(participant)
        return participant


    def leave_session(self, display_name: str) -> bool:
        """
        Remove a participant by display name.
        Returns True if found and removed, False if not found.
        Does NOT handle owner departure — that's done by deleting the
        session from the sessions dict in app.py.
        """
        # walk the participant list looking for a matching name
        for i, participant in enumerate(self.participants):
            if participant.display_name == display_name:
                # remove from list — polling will reflect this on next cycle
                self.participants.pop(i)
                return True
        # name wasn't in the list (already left, or was the owner)
        return False
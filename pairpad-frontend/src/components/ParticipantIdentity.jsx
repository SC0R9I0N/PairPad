/*
  ParticipantIdentity.jsx
  ------------------------
  Handles user display name input.

  RESPONSIBILITY:
  - Capture and update participant identity
  - Provide reusable identity input component

  PROPERTIESS:
  - name: current display name
  - setName: function to update name

  FUTURE WORK:
  - Validate non-empty input
  - Enforce naming rules (length, characters)
*/

function ParticipantIdentity({ name, setName }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter display name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

export default ParticipantIdentity;
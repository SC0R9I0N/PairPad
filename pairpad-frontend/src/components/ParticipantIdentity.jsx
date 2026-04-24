/*
  ParticipantIdentity.jsx
  ------------------------
  Shared display name input.

  Props:
  - name: current display name
  - setName: function to update name
  - disabled: optional — disables input during async operations
*/
function ParticipantIdentity({ name, setName, disabled = false }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter display name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}
export default ParticipantIdentity;

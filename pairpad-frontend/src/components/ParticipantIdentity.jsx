/*
  ParticipantIdentity.jsx
  ------------------------
  Shared display name input.

  Props:
  - name: current display name
  - setName: function to update name
  - disabled: optional — disables input during async operations
  - maxLength: optional — hard cap on input length (browser-enforced)
*/
function ParticipantIdentity({ name, setName, disabled = false, maxLength }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter display name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={disabled}
        maxLength={maxLength}
      />
    </div>
  );
}
export default ParticipantIdentity;

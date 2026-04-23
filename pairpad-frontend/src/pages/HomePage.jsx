import SessionAccess from "../components/SessionAccess";

/*
  HomePage.jsx
  -------------
  Entry point UI for users.

  RESPONSIBILITY:
  - Display application title and purpose
  - Provide access to session creation/join functionality

  DESIGN:
  - Delegates all logic to SessionAccess component

  FUTURE WORK:
  - Improve UI/UX (styling, layout)
  - Add validation/error messages
*/

function HomePage({ onEnterSession }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>PairPad</h1>
      <p>Real-Time Collaborative Code Editor</p>

      <SessionAccess onEnterSession={onEnterSession} />
    </div>
  );
}

export default HomePage;
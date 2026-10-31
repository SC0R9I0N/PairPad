import SessionAccess from "../components/SessionAccess";

/*
  HomePage.jsx
  -------------
  Entry point UI. Displays app title and delegates to SessionAccess
  for create/join logic.
*/
function HomePage({ onEnterSession }) {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>PairPad</h1>

      {/* tagline styled as terminal-subtitle for aesthetic consistency */}
      <p
        style={{
          fontFamily: "var(--mono)",
          fontSize: "12px",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          marginBottom: "48px",
        }}
      >
        real-time collaborative code editor
      </p>

      <SessionAccess onEnterSession={onEnterSession} />
    </div>
  );
}

export default HomePage;

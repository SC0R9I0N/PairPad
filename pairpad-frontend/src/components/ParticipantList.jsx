import { useState, useRef, useEffect } from "react";

/*
  ParticipantList.jsx
  --------------------
  Google Docs-style stacked avatar cluster with an expandable full list.

  Props:
  - participants: array of { displayName, isOwner, isYou }

  Responsibilities:
  - Render a compact cluster of colored avatars using display name initial letter
  - Highlight the current user with a phosphor-green ring to match theme
  - Mark the session owner's avatar with a `>` glyph badge (can change later if we don't like it)
  - Expose an expand button that opens a labeled dropdown
  - Close the dropdown when the user clicks outside
*/

// 5-color palette for avatars. Excludes phosphor green so the
// current-user ring stands out. Assigned deterministically by index.
const AVATAR_COLORS = [
  "#22d3ee", // cyan
  "#fbbf24", // amber
  "#e879f9", // magenta
  "#fb7185", // coral
  "#a78bfa", // violet
];

// first letter of a display name, uppercased — '?' for empty/missing
function initialOf(name) {
  return (name?.trim().charAt(0) || "?").toUpperCase();
}

// stable color assignment based on list position
function colorAt(index) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

function ParticipantList({ participants }) {
  // whether the expanded dropdown is open
  const [isExpanded, setIsExpanded] = useState(false);

  // ref to the outer wrapper so we can detect clicks outside of it
  const containerRef = useRef(null);

  /*
    Close the dropdown when the user clicks anywhere outside our
    container. Only attach the listener while the dropdown is open.
  */
  useEffect(() => {
    // nothing to listen for when closed — skip
    if (!isExpanded) return;

    // fires on any mousedown anywhere in the document
    function handleClickOutside(event) {
      // if the click target is NOT inside our wrapper, close the dropdown
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    }

    // attach while open
    document.addEventListener("mousedown", handleClickOutside);

    // cleanup runs on close or unmount — critical to avoid stacking listeners
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      {/* cluster + expand button sit side-by-side */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* stacked avatars with overlap */}
        <div className="avatar-cluster">
          {participants.map((p, index) => (
            // wrapper is the hover target for the custom tooltip
            <div className="avatar-tooltip-wrapper" key={p.displayName + index}>
              {/* colored circle with the user's initial */}
              <div
                className={`avatar ${p.isYou ? "is-you" : ""}`}
                style={{ background: colorAt(index) }}
              >
                {initialOf(p.displayName)}
                {/* owner glyph badge in bottom-right corner */}
                {p.isOwner && <span className="owner-glyph">&gt;</span>}
              </div>
              {/* tooltip revealed on hover — shows full name + flags */}
              <div className="avatar-tooltip">
                {p.displayName}
                {p.isYou && " (you)"}
                {p.isOwner && " · owner"}
              </div>
            </div>
          ))}
        </div>

        {/* expand toggle — count + chevron, reuses secondary style */}
        <button
          type="button"
          className="secondary"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ padding: "6px 10px", fontSize: "12px" }}
        >
          {participants.length} {isExpanded ? "▴" : "▾"}
        </button>
      </div>

      {/* dropdown — conditionally rendered below the cluster */}
      {isExpanded && (
        <div className="participants-dropdown">
          <div className="dropdown-title">Participants</div>

          {/* one row per participant */}
          {participants.map((p, index) => (
            <div className="dropdown-entry" key={p.displayName + index}>
              {/* small color dot matches the avatar color */}
              <span
                className="dropdown-dot"
                style={{ background: colorAt(index) }}
              />
              {/* name always sits flush against the color dot */}
              <span>{p.displayName}</span>
              {/* owner glyph sits directly after the name */}
              {p.isOwner && <span className="dropdown-glyph">&gt;</span>}
              {/* "(you)" marker still gets pushed to the far right via margin-left: auto */}
              {p.isYou && <span className="dropdown-you">(you)</span>}
            </div>
          ))}

          {/* legend explains the glyph */}
          <div className="dropdown-footer">
            <span className="dropdown-glyph">&gt;</span> indicates session owner
          </div>
        </div>
      )}
    </div>
  );
}

export default ParticipantList;

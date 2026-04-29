/*
  Banner.jsx
  -----------
  Reusable inline notification component. Replaces native alert()
  popups with on-theme messaging that fits the phosphor aesthetic.

  Variants:
  - "error"   — red, for terminal/shutdown events (e.g., session ended)
  - "warning" — amber, for recoverable failures (e.g., join failed)
  - "info"    — phosphor green, for neutral status messages

  Props:
  - variant: "error" | "warning" | "info" (defaults to "info")
  - message: string to display (renders nothing if falsy)
  - onDismiss: callback fired when user clicks the close button.
               If omitted, the close button does not render.
*/
function Banner({ variant = "info", message, onDismiss }) {
  // nothing to show — render nothing rather than an empty container
  if (!message) return null;

  // severity character — error/warning share "!", info uses "i"
  const icon = variant === "info" ? "i" : "!";

  // "alert" interrupts screen readers; "status" is polite
  // errors/warnings should interrupt, info should not
  const role = variant === "info" ? "status" : "alert";

  return (
    <div className={`banner banner-${variant}`} role={role}>
      {/* circular badge — color comes from the variant CSS rule */}
      <span className="banner-icon" aria-hidden="true">
        {icon}
      </span>

      {/* message text — flexes to fill space between icon and close */}
      <span className="banner-message">{message}</span>

      {/* manual dismiss — only renders if a handler was provided */}
      {onDismiss && (
        <button
          type="button"
          className="banner-close"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Banner;

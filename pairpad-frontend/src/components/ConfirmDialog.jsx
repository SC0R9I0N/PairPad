import { useEffect } from "react";

/*
  ConfirmDialog.jsx
  ------------------
  Reusable confirmation dialog. Replaces native window.confirm()
  popups with on-theme dialogs that fit the phosphor aesthetic.

  Variants:
  - "danger"  — red accent, for destructive actions (revoke, delete)
  - "default" — phosphor green, for neutral confirmations

  Props:
  - isOpen: boolean — controls visibility
  - title: string — optional heading text
  - message: string — body text shown to user
  - confirmLabel: string — text on the confirm button (default "Confirm")
  - cancelLabel: string — text on the cancel button (default "Cancel")
  - variant: "danger" | "default" — controls confirm button styling
  - onConfirm: callback fired when user clicks confirm
  - onCancel: callback fired on cancel button, Escape, or backdrop click
*/
function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
}) {
  /*
    Close on Escape key — standard modal behavior.
    Listener only attaches while the dialog is open.
  */
  useEffect(() => {
    // nothing to listen for when closed — skip
    if (!isOpen) return;

    // fires on any keydown anywhere in the document
    function handleKeyDown(event) {
      // only react to Escape — ignore other keys (intentional for safety)
      if (event.key === "Escape") {
        onCancel();
      }
    }

    // attach while open
    document.addEventListener("keydown", handleKeyDown);

    // cleanup on close or unmount — avoids stacking listeners
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  // render nothing when closed
  if (!isOpen) return null;

  // severity icon — danger uses "!", default uses "?"
  const icon = variant === "danger" ? "!" : "?";

  // confirm button class — danger gets red treatment, default is primary
  const confirmClass = variant === "danger" ? "danger" : "";

  /*
    handleBackdropClick — clicking the overlay (but not the dialog
    itself) cancels. Prevents accidental dismiss when clicking inside.
  */
  const handleBackdropClick = (event) => {
    // only cancel if click hit the backdrop, not the dialog
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    /* backdrop — full-viewport overlay catches outside clicks */
    <div
      className="dialog-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "dialog-title" : undefined}
    >
      {/* dialog box — phosphor terminal styling, centered */}
      <div className={`dialog dialog-${variant}`}>
        {/* header row — icon + title sit side by side */}
        {title && (
          <div className="dialog-header">
            {/* circular badge — color comes from the variant CSS rule */}
            <span className="dialog-icon" aria-hidden="true">
              {icon}
            </span>
            <h3 id="dialog-title" className="dialog-title">
              {title}
            </h3>
          </div>
        )}

        {/* body text — primary message to user */}
        <p className="dialog-message">{message}</p>

        {/* button row — cancel on left, confirm on right */}
        <div className="dialog-actions">
          <button type="button" className="secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className={confirmClass} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;

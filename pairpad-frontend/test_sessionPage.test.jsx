import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
 
// ─── Mocks ────────────────────────────────────────────────────────────────────
afterEach(() => {
  vi.restoreAllMocks();
});

vi.mock("./src/components/OwnershipToken", () => ({
  default: function MockOwnershipToken({ isOwner, onRevoke, onError }) {
    return isOwner ? (
      <button onClick={onRevoke}>Revoke Session</button>
    ) : null;
  },
}));
 
vi.mock("./src/components/ParticipantList", () => ({
  default: function MockParticipantList({ participants }) {
    return (
      <div data-testid="participant-list">
        {participants?.length ?? 0} participants
      </div>
    );
  },
}));
 
vi.mock("./src/components/Banner", () => ({
  default: function MockBanner({ message, onDismiss }) {
    return message ? (
      <div data-testid="banner">
        {message}
        {onDismiss && <button onClick={onDismiss}>Dismiss</button>}
      </div>
    ) : null;
  },
}));
 
vi.mock("./src/hooks/useSessionStatus", () => ({
  useSessionStatus: vi.fn(),
}));
 
import { useSessionStatus } from "./src/hooks/useSessionStatus";
import SessionPage from "./src/pages/SessionPage";
 
// ─── Helpers ──────────────────────────────────────────────────────────────────
 
function mockSession(overrides = {}) {
  useSessionStatus.mockReturnValue({
    participants: [],
    sessionEnded: false,
    ...overrides,
  });
}
 
const defaultProps = {
  sessionId: "session-123",
  isOwner: false,
  ownershipToken: null,
  displayName: "Alice",
  onRevoke: vi.fn(),
};
 
// ─── Show / hide link ─────────────────────────────────────────────────────────
 
it("renders Copy Link and Show Link buttons", () => {
  mockSession();
  render(<SessionPage {...defaultProps} />);
 
  expect(screen.getByRole("button", { name: "Copy Link" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Show Link" })).toBeInTheDocument();
});
 
it("does not show the share URL input by default", () => {
  mockSession();
  render(<SessionPage {...defaultProps} />);
 
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
});
 
it("shows the share URL input after clicking Show Link", async () => {
  mockSession();
  const user = userEvent.setup();
  render(<SessionPage {...defaultProps} />);
 
  await user.click(screen.getByRole("button", { name: "Show Link" }));
 
  expect(screen.getByRole("textbox")).toHaveValue(
  "http://localhost:3000/?session=session-123"
    );
});
 
it("hides the share URL input after clicking Hide Link", async () => {
  mockSession();
  const user = userEvent.setup();
  render(<SessionPage {...defaultProps} />);
 
  await user.click(screen.getByRole("button", { name: "Show Link" }));
  await user.click(screen.getByRole("button", { name: "Hide Link" }));
 
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
});
 
// ─── Copy link ────────────────────────────────────────────────────────────────
 
it("flips button label to 'Copied!' after a successful copy", async () => {
  mockSession();
  vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
  const user = userEvent.setup();
  render(<SessionPage {...defaultProps} />);

  await user.click(screen.getByRole("button", { name: "Copy Link" }));
  expect(screen.getByRole("button", { name: "Copied!" })).toBeInTheDocument();
});

it("shows a warning banner if clipboard write fails", async () => {
  mockSession();
  vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("denied"));
  const user = userEvent.setup();
  render(<SessionPage {...defaultProps} />);

  await user.click(screen.getByRole("button", { name: "Copy Link" }));
  expect(screen.getByTestId("banner")).toHaveTextContent("copy the link manually");
});
 
// ─── Session ended (non-owner) ────────────────────────────────────────────────
 
it("shows session-ended banner for non-owner when session ends", () => {
  mockSession({ sessionEnded: true });
  render(<SessionPage {...defaultProps} isOwner={false} />);
 
  expect(screen.getByTestId("banner")).toHaveTextContent("ended by the owner");
});
 
it("calls onRevoke after 3s delay when session ends for non-owner", () => {
  vi.useFakeTimers();
  mockSession({ sessionEnded: true });
  const onRevoke = vi.fn();
  render(<SessionPage {...defaultProps} isOwner={false} onRevoke={onRevoke} />);
 
  expect(onRevoke).not.toHaveBeenCalled();
  act(() => vi.advanceTimersByTime(3000));
  expect(onRevoke).toHaveBeenCalledOnce();
 
  vi.useRealTimers();
});
 
it("does not auto-redirect the owner when session ends", () => {
  vi.useFakeTimers();
  mockSession({ sessionEnded: true });
  const onRevoke = vi.fn();
  render(<SessionPage {...defaultProps} isOwner={true} onRevoke={onRevoke} />);
 
  act(() => vi.advanceTimersByTime(3000));
  expect(onRevoke).not.toHaveBeenCalled();
 
  vi.useRealTimers();
});
 
it("session-ended banner is not dismissible for non-owner", () => {
  mockSession({ sessionEnded: true });
  render(<SessionPage {...defaultProps} isOwner={false} />);
 
  expect(screen.queryByRole("button", { name: "Dismiss" })).not.toBeInTheDocument();
});
 
// ─── Banner dismissal ─────────────────────────────────────────────────────────
 
it("dismisses a user-triggered banner", async () => {
  mockSession();
  vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("denied"));
  const user = userEvent.setup();
  render(<SessionPage {...defaultProps} />);

  await user.click(screen.getByRole("button", { name: "Copy Link" }));
  expect(screen.getByTestId("banner")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Dismiss" }));
  expect(screen.queryByTestId("banner")).not.toBeInTheDocument();
});
 
// ─── Owner-only UI ────────────────────────────────────────────────────────────
 
it("shows Revoke Session button for owner", () => {
  mockSession();
  render(
    <SessionPage {...defaultProps} isOwner={true} ownershipToken="tok-xyz" />
  );
 
  expect(
    screen.getByRole("button", { name: "Revoke Session" })
  ).toBeInTheDocument();
});
 
it("does not show Revoke Session button for non-owner", () => {
  mockSession();
  render(<SessionPage {...defaultProps} isOwner={false} />);
 
  expect(
    screen.queryByRole("button", { name: "Revoke Session" })
  ).not.toBeInTheDocument();
});
 
// ─── Participant list ─────────────────────────────────────────────────────────
 
it("renders the participant list", () => {
  mockSession({ participants: ["Alice", "Bob"] });
  render(<SessionPage {...defaultProps} />);
 
  expect(screen.getByTestId("participant-list")).toHaveTextContent(
    "2 participants"
  );
});
 
it("renders zero participants when list is empty", () => {
  mockSession({ participants: [] });
  render(<SessionPage {...defaultProps} />);
 
  expect(screen.getByTestId("participant-list")).toHaveTextContent(
    "0 participants"
  );
});
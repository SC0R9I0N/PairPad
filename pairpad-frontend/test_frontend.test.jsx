import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "./src/App";

// ─── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("./src/pages/HomePage", () => ({
  default: function MockHomePage({ onEnterSession }) {
    return (
      <div data-testid="home-page">
        <button
          onClick={() =>
            onEnterSession("session-123", true, "token-abc", "Alice")
          }
        >
          Enter Session
        </button>
      </div>
    );
  },
}));

vi.mock("./src/pages/SessionPage", () => ({
  default: function MockSessionPage({
    sessionId,
    isOwner,
    ownershipToken,
    displayName,
    onRevoke,
  }) {
    return (
      <div data-testid="session-page">
        <span data-testid="session-id">{sessionId}</span>
        <span data-testid="is-owner">{String(isOwner)}</span>
        <span data-testid="ownership-token">{String(ownershipToken)}</span>
        <span data-testid="display-name">{displayName}</span>
        <button onClick={onRevoke}>Leave Session</button>
      </div>
    );
  },
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function enterSession() {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: "Enter Session" }));
  return user;
}

// ─── Initial render ───────────────────────────────────────────────────────────

it("app renders HomePage on initial load", () => {
  render(<App />);

  expect(screen.getByTestId("home-page")).toBeInTheDocument();
  expect(screen.queryByTestId("session-page")).not.toBeInTheDocument();
});

// ─── Entering a session ───────────────────────────────────────────────────────

it("app switches to SessionPage after entering a session", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "Enter Session" }));

  expect(screen.queryByTestId("home-page")).not.toBeInTheDocument();
  expect(screen.getByTestId("session-page")).toBeInTheDocument();
});

it("app passes sessionId down to SessionPage", async () => {
  await enterSession();
  expect(screen.getByTestId("session-id")).toHaveTextContent("session-123");
});

it("app passes isOwner down to SessionPage", async () => {
  await enterSession();
  expect(screen.getByTestId("is-owner")).toHaveTextContent("true");
});

it("app passes ownershipToken down to SessionPage", async () => {
  await enterSession();
  expect(screen.getByTestId("ownership-token")).toHaveTextContent("token-abc");
});

it("app passes displayName down to SessionPage", async () => {
  await enterSession();
  expect(screen.getByTestId("display-name")).toHaveTextContent("Alice");
});

// ─── Default argument handling ────────────────────────────────────────────────

it("app defaults isOwner, ownershipToken, and displayName when not provided", async () => {
  vi.resetModules();

  vi.doMock("./src/pages/HomePage", () => ({
    default: ({ onEnterSession }) => (
      <div data-testid="home-page">
        <button onClick={() => onEnterSession("session-only")}>
          Enter Minimal
        </button>
      </div>
    ),
  }));

  const { default: FreshApp } = await import("./src/App");

  const user = userEvent.setup();
  render(<FreshApp />);

  await user.click(screen.getByRole("button", { name: "Enter Minimal" }));

  expect(screen.getByTestId("is-owner")).toHaveTextContent("false");
  expect(screen.getByTestId("ownership-token")).toHaveTextContent("null");
  expect(screen.getByTestId("display-name")).toHaveTextContent("");
});

// ─── Leaving a session ───────────────────────────────────────────────────────

it("app returns to HomePage after leaving a session", async () => {
  const user = await enterSession();

  await user.click(screen.getByRole("button", { name: "Leave Session" }));

  expect(screen.getByTestId("home-page")).toBeInTheDocument();
  expect(screen.queryByTestId("session-page")).not.toBeInTheDocument();
});

it("app clears session fields after leaving a session", async () => {
  const user = await enterSession();

  await user.click(screen.getByRole("button", { name: "Leave Session" }));
  await user.click(screen.getByRole("button", { name: "Enter Session" }));

  expect(screen.getByTestId("session-id")).toHaveTextContent("session-123");
  expect(screen.getByTestId("is-owner")).toHaveTextContent("true");
  expect(screen.getByTestId("ownership-token")).toHaveTextContent("token-abc");
  expect(screen.getByTestId("display-name")).toHaveTextContent("Alice");
});

it("app allows re-entering a session after leaving", async () => {
  const user = await enterSession();

  await user.click(screen.getByRole("button", { name: "Leave Session" }));
  await user.click(screen.getByRole("button", { name: "Enter Session" }));

  expect(screen.getByTestId("session-page")).toBeInTheDocument();
});
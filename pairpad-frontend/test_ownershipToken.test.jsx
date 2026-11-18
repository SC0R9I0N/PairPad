import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

const { revokeSession } = vi.hoisted(() => ({
  revokeSession: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("spacetimedb/react", () => ({
  useReducer: () => revokeSession,
}));

vi.mock("./src/module_bindings", () => ({
  reducers: { revokeSession: "revokeSession" },
}));

import OwnershipToken from "./src/components/OwnershipToken";

afterEach(() => {
  vi.clearAllMocks();
});

it("calls the revoke reducer with its required arguments", async () => {
  const user = userEvent.setup();
  render(
    <OwnershipToken
      isOwner
      sessionId="session-123"
      displayName="Alice"
      onRevoke={vi.fn()}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Revoke Session" }));
  await user.click(screen.getByRole("button", { name: "Revoke" }));

  expect(revokeSession).toHaveBeenCalledWith({
    displayName: "Alice",
    candidateId: "session-123",
  });
});

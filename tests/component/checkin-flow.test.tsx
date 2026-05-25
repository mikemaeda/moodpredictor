import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CheckInPage } from "../../src/pages/CheckInPage";

describe("check-in flow", () => {
  it("lets a user select a mood and save", async () => {
    const user = userEvent.setup();
    const onSaved = vi.fn();
    render(<CheckInPage onSaved={onSaved} />);

    await user.click(screen.getByRole("button", { name: /Good\. Pleasantness 8, energy 7/i }));
    await user.click(screen.getAllByRole("button", { name: "Joyful" })[0]);
    await user.click(screen.getByRole("button", { name: "Save check-in" }));

    expect(onSaved).toHaveBeenCalled();
    expect(screen.getByText(/Saved/i)).toBeInTheDocument();
  });
});

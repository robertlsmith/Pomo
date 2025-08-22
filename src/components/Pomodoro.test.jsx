import { afterEach, beforeEach, test, vi, expect, describe } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Pomodoro from "./Pomodoro";
import userEvent from "@testing-library/user-event";

describe("Pomodoro Timer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

//   test("Renders Pomodoro component", () => {
//     render(<Pomodoro />);
//   });

  test("Starts countdown", async () => {
    render(<Pomodoro/>);
    const startButton = screen.getByRole("button", { name: /start/i });

    await act(async () => {
        await userEvent.click(startButton);
        vi.advanceTimersByTime(5000);
        vi.runOnlyPendingTimers();
        await Promise.resolve();
    });

    expect(screen.getByLabelText("time-display").textContent).toBe("24:55");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccessibilityControls, { STORAGE_KEY } from "./AccessibilityControls";

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("style");
  document.documentElement.className = "";
});

test("larger text sets the root font size and a size class, and is remembered", () => {
  render(<AccessibilityControls />);
  userEvent.click(screen.getByRole("button", { name: /accessibility options/i }));
  userEvent.click(screen.getByRole("button", { name: /increase text size/i }));

  expect(document.documentElement.style.fontSize).toBe("20px");
  expect(document.documentElement.classList.contains("a11y-size-1")).toBe(true);
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).size).toBe(1);
});

test("high contrast and underlined links toggle classes; reset undoes everything", () => {
  render(<AccessibilityControls />);
  userEvent.click(screen.getByRole("button", { name: /accessibility options/i }));
  userEvent.click(screen.getByRole("switch", { name: /high contrast/i }));
  userEvent.click(screen.getByRole("switch", { name: /underline all links/i }));
  expect(document.documentElement.classList.contains("a11y-contrast")).toBe(true);
  expect(document.documentElement.classList.contains("a11y-links")).toBe(true);

  userEvent.click(screen.getByRole("button", { name: /reset to default/i }));
  expect(document.documentElement.classList.contains("a11y-contrast")).toBe(false);
  expect(document.documentElement.classList.contains("a11y-links")).toBe(false);
  expect(document.documentElement.style.fontSize).toBe("");
});

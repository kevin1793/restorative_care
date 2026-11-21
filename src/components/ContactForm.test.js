import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

test("submitting an empty form explains every problem and sends nothing", () => {
  render(<ContactForm />);
  userEvent.click(screen.getByRole("button", { name: /send message/i }));

  const summary = screen.getByRole("alert");
  expect(summary).toHaveTextContent(/5 problems/i);
  expect(screen.getAllByText(/please enter your name/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/please select at least one service/i).length).toBeGreaterThan(0);
});

test("a bad email and a short phone number get specific messages", () => {
  render(<ContactForm />);
  userEvent.type(screen.getByLabelText(/name/i, { selector: "#name" }), "Pat");
  userEvent.type(screen.getByLabelText(/email address/i), "not-an-email");
  userEvent.type(screen.getByLabelText(/phone number/i), "555-1234");
  userEvent.click(screen.getByRole("button", { name: /send message/i }));

  expect(screen.getAllByText(/valid email address/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/10-digit phone number/i).length).toBeGreaterThan(0);
});

test("the spam-trap field exists, is empty, and is hidden from keyboard and screen readers", () => {
  render(<ContactForm />);
  const trap = screen.getByLabelText(/leave this field empty/i);
  expect(trap).toHaveValue("");
  expect(trap).toHaveAttribute("name", "_gotcha");
  expect(trap).toHaveAttribute("tabindex", "-1");
  // aria-hidden keeps it out of the accessibility tree entirely
  expect(
    screen.queryByRole("textbox", { name: /leave this field empty/i })
  ).toBeNull();
});

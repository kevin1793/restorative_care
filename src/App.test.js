import { render, screen } from "@testing-library/react";
import App from "./App";

test("the home page renders with the main navigation and a call button", () => {
  window.history.pushState({}, "", "/");
  render(<App />);

  expect(
    screen.getByRole("navigation", { name: /main navigation/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 1, name: /home health care/i })
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole("link", { name: /call us/i })[0]
  ).toHaveAttribute("href", "tel:8172858515");
});

test("an unknown address shows the not-found page", () => {
  window.history.pushState({}, "", "/no-such-page");
  render(<App />);

  expect(
    screen.getByRole("heading", { level: 1, name: /page not found/i })
  ).toBeInTheDocument();
});

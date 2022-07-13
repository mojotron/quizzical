import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Intro from "../Intro";

describe("Intro component", () => {
  test("renders heading", () => {
    render(<Intro />);
    expect(screen.getByRole("heading").textContent).toBe("Quizzical");
  });
  test("renders info paragraph", () => {
    render(<Intro />);
    expect(
      screen.getByText(/have fun answering trivia questions/i)
    ).toBeInTheDocument();
  });
  test("renders button", () => {
    render(<Intro />);
    expect(
      screen.getByRole("button", { name: /start quiz/i })
    ).toBeInTheDocument();
  });
});

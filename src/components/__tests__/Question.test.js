import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Question from "../Question";

const questionMock = {
  question: "How many manned moon landings have there been?",
  answers: ["1", "3", "6", "7"],
};

describe("Question component", () => {
  test("renders question as heading", () => {
    render(<Question data={questionMock} />);
    expect(screen.getByRole("heading").textContent).toBe(
      "How many manned moon landings have there been?"
    );
  });
  test("renders four answer buttons", () => {
    render(<Question data={questionMock} />);
    expect(screen.getAllByRole("button").length).toBe(4);
  });
  // test("selecting answer change class name", () => {
  //   render(<Question data={questionMock} />);
  //   const buttons = screen.getAllByRole("button");
  //   userEvent.click(buttons[1]);
  //   expect(buttons[1].className).toBe("Answer--active");
  // });
});

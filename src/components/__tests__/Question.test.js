import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Question from "../Question";

const questionMock = {
  id: "kjif80",
  question: "How many manned moon landings have there been?",
  answers: ["1", "3", "6", "7"],
  selected: false,
};

describe("Question component", () => {
  test("renders question as heading", () => {
    render(<Question data={questionMock} handleAnswerClick={jest.fn()} />);
    expect(screen.getByRole("heading").textContent).toBe(
      "How many manned moon landings have there been?"
    );
  });
  test("renders four answer buttons", () => {
    render(<Question data={questionMock} handleAnswerClick={jest.fn()} />);
    expect(screen.getAllByRole("button").length).toBe(4);
  });
});

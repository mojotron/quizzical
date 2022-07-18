import { render, screen } from "@testing-library/react";
import Question from "../Question";

const questionMockUnselected = {
  id: "kjif80",
  question: "How many manned moon landings have there been?",
  answers: ["1", "3", "6", "7"],
  selected: "",
  correct: "6",
};

const questionMockCorrect = {
  id: "kjif80",
  question: "How many manned moon landings have there been?",
  answers: ["1", "3", "6", "7"],
  selected: "6",
  correct: "6",
};

const questionMockIncorrect = {
  id: "kjif80",
  question: "How many manned moon landings have there been?",
  answers: ["1", "3", "6", "7"],
  selected: "1",
  correct: "6",
};

describe("Question component", () => {
  test("renders question as heading", () => {
    render(
      <Question
        data={questionMockUnselected}
        displayAnswer={false}
        handleAnswerClick={jest.fn()}
      />
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
  test("renders four answer buttons", () => {
    render(
      <Question
        data={questionMockUnselected}
        displayAnswer={false}
        handleAnswerClick={jest.fn()}
      />
    );
    expect(screen.getAllByRole("button").length).toBe(4);
  });

  describe("Display answers flag false", () => {
    test("all buttons have 'Answer' class when data.selected=''", () => {
      render(
        <Question
          data={questionMockUnselected}
          displayAnswer={false}
          handleAnswerClick={jest.fn()}
        />
      );
      const btnElements = screen.getAllByRole("button");
      expect(btnElements.every((btn) => btn.className === "Answer")).toBe(true);
    });
    test("one button have class active when one answer is selected", () => {
      render(
        <Question
          data={questionMockCorrect}
          displayAnswer={false}
          handleAnswerClick={jest.fn()}
        />
      );
      const btnElements = screen.getAllByRole("button");
      expect(
        btnElements.filter((btn) => btn.className === "Answer").length
      ).toBe(3);
      expect(
        btnElements.filter((btn) => btn.className === "Answer active").length
      ).toBe(1);
    });
  });

  describe("Display answers flag true", () => {
    test("correct answer", () => {
      render(
        <Question
          data={questionMockCorrect}
          displayAnswer={true}
          handleAnswerClick={jest.fn()}
        />
      );
      const btnElements = screen.getAllByRole("button");
      expect(
        btnElements.filter((btn) => btn.className === "Answer opacity").length
      ).toBe(3);
      expect(
        btnElements.filter((btn) => btn.className === "Answer green").length
      ).toBe(1);
    });
    test("incorrect answer", () => {
      render(
        <Question
          data={questionMockIncorrect}
          displayAnswer={true}
          handleAnswerClick={jest.fn()}
        />
      );
      const btnElements = screen.getAllByRole("button");
      expect(
        btnElements.filter((btn) => btn.className === "Answer green opacity")
          .length
      ).toBe(1);
      expect(
        btnElements.filter((btn) => btn.className === "Answer red opacity")
          .length
      ).toBe(1);
      expect(
        btnElements.filter((btn) => btn.className === "Answer opacity").length
      ).toBe(2);
    });
  });
});

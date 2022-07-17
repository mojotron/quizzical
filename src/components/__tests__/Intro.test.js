import { render, screen } from "@testing-library/react";
import Intro from "../Intro";

const categoriesMock = [
  {
    id: 20,
    name: "Mythology",
  },
  {
    id: 21,
    name: "Sports",
  },
  {
    id: 23,
    name: "History",
  },
];

describe("Intro component", () => {
  test("renders heading", () => {
    render(
      <Intro
        categories={categoriesMock}
        numberOfQuestions={"5"}
        difficulty={"any"}
        category={"any"}
        handleQuizRunning={jest.fn()}
        handleChange={jest.fn()}
      />
    );
    expect(screen.getByRole("heading").textContent).toBe("Quizzical");
  });

  test("renders info paragraph", () => {
    render(
      <Intro
        categories={categoriesMock}
        numberOfQuestions={"5"}
        difficulty={"any"}
        category={"any"}
        handleQuizRunning={jest.fn()}
        handleChange={jest.fn()}
      />
    );
    expect(
      screen.getByText(/have fun answering trivia questions/i)
    ).toBeInTheDocument();
  });

  test("renders snapshot", () => {
    const { component } = render(
      <Intro
        categories={categoriesMock}
        numberOfQuestions={"5"}
        difficulty={"any"}
        category={"any"}
        handleQuizRunning={jest.fn()}
        handleChange={jest.fn()}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test("categories options", () => {
    render(
      <Intro
        categories={categoriesMock}
        numberOfQuestions={"5"}
        difficulty={"any"}
        category={"any"}
        handleQuizRunning={jest.fn()}
        handleChange={jest.fn()}
      />
    );
    const optionElements = screen.getAllByRole("option");
    expect(optionElements.length).toBe(4);
    expect(optionElements[0].textContent).toBe("Any");
    expect(optionElements[1].textContent).toBe("Mythology");
    expect(optionElements[2].textContent).toBe("Sports");
    expect(optionElements[3].textContent).toBe("History");
  });

  test("start quiz button", () => {
    render(
      <Intro
        categories={categoriesMock}
        numberOfQuestions={"5"}
        difficulty={"any"}
        category={"any"}
        handleQuizRunning={jest.fn()}
        handleChange={jest.fn()}
      />
    );
    expect(
      screen.getByRole("button", { name: "Start quiz" })
    ).toBeInTheDocument();
  });
});

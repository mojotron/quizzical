import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Questions from "../Questions";
import data from "../../mocks/data";
import userEvent from "@testing-library/user-event";

const dataMock = {
  numberOfQuestion: "5",
  difficulty: "any",
  category: "any",
};

const server = setupServer(
  rest.get("https://opentdb.com/api.php", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  })
);

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Questions container component", () => {
  // loading spinner
  test("renders Loading spinner before api request resolves", () => {
    render(<Questions data={dataMock} handleQuizRunning={jest.fn()} />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
  // close btn
  test("renders close btn", async () => {
    render(<Questions data={dataMock} handleQuizRunning={jest.fn()} />);
    const closeBtnElement = await screen.findByRole("button", { name: "x" });
    expect(closeBtnElement).toBeInTheDocument();
  });
  // check answers btn
  test("renders check answers btn", async () => {
    render(<Questions data={dataMock} handleQuizRunning={jest.fn()} />);
    const checkAnswersBtnElement = await screen.findByRole("button", {
      name: "Check Answers",
    });
    expect(checkAnswersBtnElement).toBeInTheDocument();
  });

  test("renders error when questions not selected", async () => {
    render(<Questions data={dataMock} handleQuizRunning={jest.fn()} />);
    const checkAnswersBtnElement = await screen.findByRole("button", {
      name: "Check Answers",
    });
    userEvent.click(checkAnswersBtnElement);
    expect(
      screen.getByText("Please answer on all questions!")
    ).toBeInTheDocument();
  });

  test("render score when all selected HAPPY PATH", async () => {
    render(<Questions data={dataMock} handleQuizRunning={jest.fn()} />);
    userEvent.click(await screen.findByRole("button", { name: "6" }));
    userEvent.click(await screen.findByRole("button", { name: "2017" }));
    userEvent.click(await screen.findByRole("button", { name: "56" }));
    userEvent.click(
      await screen.findByRole("button", { name: "Real Madrid C.F." })
    );
    userEvent.click(
      await screen.findByRole("button", {
        name: "Mierfa Durgas and Nektan Whelan",
      })
    );
    userEvent.click(
      await screen.findByRole("button", {
        name: "Check Answers",
      })
    );
    expect(
      screen.getByText("You scored 5/5 correct answers")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Play again" })
    ).toBeInTheDocument();
    // start new game
    userEvent.click(screen.getByRole("button", { name: "Play again" }));
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(
      await screen.findByRole("button", {
        name: "Check Answers",
      })
    ).toBeInTheDocument();
  });
  // check questions
  test("renders 5 question elements", async () => {
    render(<Questions data={dataMock} handleQuizRunning={jest.fn()} />);
    const questionElements = await screen.findAllByTestId("question");
    expect(questionElements.length).toBe(5);
  });
});

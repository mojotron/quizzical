import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Questions from "../Questions";
import data from "../../data";

const server = setupServer(
  rest.get("https://opentdb.com/api.php", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  })
);

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Questions container component", () => {
  test("renders five questions", async () => {
    render(<Questions />);
    const questionElements = await screen.findAllByTitle("question");
    expect(questionElements.length).toBe(5);
  });
});

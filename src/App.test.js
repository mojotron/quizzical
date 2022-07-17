import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";
import data from "./mocks/categories.json";
import data2 from "./mocks/data";

const server = setupServer(
  rest.get("https://opentdb.com/api_category.php", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data));
  })
);

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("App component", () => {
  test("renders loading spinner, then intro", async () => {
    render(<App />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: "Quizzical" })
    ).toBeInTheDocument();
  });

  test("loads category data", async () => {
    render(<App />);
    const optionElements = await screen.findAllByRole("option");
    expect(optionElements.length).toBe(6);
    expect(optionElements[0].textContent).toBe("Any");
    expect(optionElements[5].textContent).toBe("Art");
  });

  test("start quiz btn", async () => {
    server.use(
      rest.get("https://opentdb.com/api.php", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(data2));
      })
    );
    render(<App />);
    const btn = await screen.findByRole("button", { name: "Start quiz" });
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("quit/close quiz btn", async () => {
    server.use(
      rest.get("https://opentdb.com/api.php", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(data2));
      })
    );
    render(<App />);
    userEvent.click(await screen.findByRole("button", { name: "Start quiz" }));
    const closeBtn = await screen.findByRole("button", { name: "x" });
    expect(closeBtn).toBeInTheDocument();
    userEvent.click(closeBtn);
    expect(
      await screen.findByRole("heading", { name: "Quizzical" })
    ).toBeInTheDocument();
  });
});

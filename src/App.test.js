import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";
import categoriesMock from "./mocks/categories.json";
import questionsMock from "./mocks/questions.json";

const server = setupServer(
  rest.get("https://opentdb.com/api_category.php", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(categoriesMock));
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
        return res(ctx.status(200), ctx.json(questionsMock));
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
        return res(ctx.status(200), ctx.json(questionsMock));
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
  // test form handle change
  test("number of question radio inputs", async () => {
    render(<App />);
    expect(await screen.findByRole("radio", { name: "5" })).toBeChecked();
    userEvent.click(screen.getByRole("radio", { name: "10" }));
    expect(screen.getByRole("radio", { name: "10" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "5" })).not.toBeChecked();
  });

  test("difficulty radio inputs", async () => {
    render(<App />);
    expect(await screen.findByRole("radio", { name: "any" })).toBeChecked();
    userEvent.click(screen.getByRole("radio", { name: "medium" }));
    expect(screen.getByRole("radio", { name: "medium" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "any" })).not.toBeChecked();
  });

  test("categories options", async () => {
    render(<App />);
    expect(await screen.findByTestId("category-select")).toHaveValue("Any");
    userEvent.selectOptions(screen.getByTestId("category-select"), [
      screen.getByText("Sports"),
    ]);
    const categorySelect = screen.getByTestId("category-select");
    // NOTE 21 is id for database, any is special value when there is no lookup in
    // database check up url in fetch in questions component
    expect(categorySelect).toHaveValue("21");
  });
});

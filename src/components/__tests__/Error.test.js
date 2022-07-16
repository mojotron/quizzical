import { render, screen } from "@testing-library/react";
import Error from "../Error";

describe("Error component", () => {
  test("renders error paragraph with class error", () => {
    render(<Error message={"Ups, Error!"} />);
    expect(screen.getByText("Ups, Error!")).toHaveClass("error");
  });
});

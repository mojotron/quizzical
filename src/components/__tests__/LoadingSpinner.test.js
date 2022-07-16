import { render } from "@testing-library/react";
import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner component", () => {
  test("render snapshot", () => {
    const { component } = render(<LoadingSpinner />);
    expect(component).toMatchSnapshot();
  });
});

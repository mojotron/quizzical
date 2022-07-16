import { render } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer component", () => {
  test("render snapshot", () => {
    const { component } = render(<Footer />);
    expect(component).toMatchSnapshot();
  });
});

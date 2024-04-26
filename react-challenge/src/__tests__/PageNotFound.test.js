import { render, screen } from "@testing-library/react";
import PageNotFound from "../components/PageNotFound";

describe("PageNotFound Component", () => {
  test("renders without crashing", () => {
    render(<PageNotFound />);
  });

  test("displays correct error message", () => {
    render(<PageNotFound />);
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });
});

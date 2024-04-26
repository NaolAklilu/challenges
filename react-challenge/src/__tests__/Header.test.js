import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Header Component", () => {
  test("renders without crashing", () => {
    render(<Header />);
  });

  test("displays correct title", () => {
    render(<Header />);
    expect(screen.getByText("Actors")).toBeInTheDocument();
  });
});

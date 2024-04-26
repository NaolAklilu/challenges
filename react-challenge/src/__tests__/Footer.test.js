import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer Component", () => {
  test("renders without crashing", () => {
    render(<Footer />);
  });

  test("displays correct copyright information", () => {
    render(<Footer />);
    expect(screen.getByText("Copyright ©2024")).toBeInTheDocument();
  });
});

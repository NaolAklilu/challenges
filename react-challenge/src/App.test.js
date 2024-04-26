import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./components/Header";

describe("App Component", () => {
  test("renders Header", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const headerElement = screen.getByText(/Actors/i);
    expect(headerElement).toBeInTheDocument();
  });
});

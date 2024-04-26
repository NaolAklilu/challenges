import { render, screen } from "@testing-library/react";
import ActorCard from "../components/ActorCard";
import { MemoryRouter, BrowserRouter as Router } from "react-router-dom";

describe("ActorCard Component", () => {
  const actor = {
    name: "Luke Skywalker",
    height: "172",
    birth_year: "19BBY",
  };

  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <ActorCard actor={actor} />
      </MemoryRouter>
    );
  });

    test('displays actor details correctly', () => {
      render(
        <MemoryRouter>
          <ActorCard actor={actor} />
        </MemoryRouter>
      );
      expect(screen.getByText(actor.name)).toBeInTheDocument();
      expect(screen.getByText(`height: ${actor.height}`)).toBeInTheDocument();
      expect(screen.getByText(`DOB: ${actor.birth_year}`)).toBeInTheDocument();
    });

    test('renders "Detail" button', () => {
      render(
        <MemoryRouter>
          <ActorCard actor={actor} />
        </MemoryRouter>
      );
      expect(screen.getByText('Detail')).toBeInTheDocument();
    });
});

import { render, screen, waitFor } from "@testing-library/react";
import ActorList from "../components/ActorList";
import { MemoryRouter } from "react-router-dom";

describe("ActorList Component", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test("renders without crashing", () => {
    render(<ActorList />);
  });

  test("displays loading message when loading", () => {
    render(<ActorList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error message when there is an error", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <MemoryRouter>
        <ActorList />
      </MemoryRouter>
    );

    await screen.findByText("Error: Failed to fetch");
  });

  test("renders ActorCard components when data is loaded", async () => {
    const mockActors = [
      { name: "Luke Skywalker", height: "172", birth_year: "19BBY" },
      { name: "Leia Organa", height: "150", birth_year: "19BBY" },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockActors }),
    });

    render(
      <MemoryRouter>
        <ActorList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(
        screen.queryByText("Error: Failed to fetch")
      ).not.toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText(mockActors[0].name)).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText(mockActors[1].name)).toBeInTheDocument();
    });
  });

  test("passes correct props to ActorCard components", async () => {
    const mockActors = [
      { name: "Luke Skywalker", height: "172", birth_year: "19BBY" },
      { name: "Leia Organa", height: "150", birth_year: "19BBY" },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockActors }),
    });

    render(
      <MemoryRouter>
        <ActorList />
      </MemoryRouter>
    );

    await waitFor(() => {
      const actorCards = screen.getAllByTestId("actor-card");
      expect(actorCards.length).toBe(mockActors.length);

      actorCards.forEach((card, index) => {
        expect(card).toHaveTextContent(mockActors[index].name);
        expect(card).toHaveTextContent(`height: ${mockActors[index].height}`);
        expect(card).toHaveTextContent(`DOB: ${mockActors[index].birth_year}`);
      });
    });
  });
});

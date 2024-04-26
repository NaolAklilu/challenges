import { render, screen, waitFor } from "@testing-library/react";
import ActorDetail from "../components/ActorDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("ActorDetail Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter initialEntries={["/actor/1"]}>
        <Routes>
          <Route path="/actor/:id" element={<ActorDetail />} />
        </Routes>
      </MemoryRouter>
    );
  });

  test("displays loading message when loading", () => {
    render(
      <MemoryRouter initialEntries={["/actor/1"]}>
        <Routes>
          <Route path="/actor/:id" element={<ActorDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error message when there is an error", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    render(
      <MemoryRouter initialEntries={["/actor/1"]}>
        <Routes>
          <Route path="/actor/:id" element={<ActorDetail />}></Route>
        </Routes>
      </MemoryRouter>
    );

    const errorText = await screen.findByText(/Error/i);
    expect(errorText).toBeInTheDocument();

    global.fetch.mockRestore();
  });

  test("displays actor details correctly when data is loaded", async () => {
    const mockActor = {
      name: "Luke Skywalker",
      height: "172",
      birth_year: "19BBY",
      gender: "male",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockActor),
      })
    );

    render(
      <MemoryRouter initialEntries={["/actor/1"]}>
        <Routes>
          <Route path="/actor/:id" element={<ActorDetail />}></Route>
        </Routes>
      </MemoryRouter>
    );

    const actorName = await screen.findByText(mockActor.name);
    const actorGender = screen.getByText(mockActor.gender);
    const actorHairColor = screen.getByText(mockActor.hair_color);
    const actorSkinColor = screen.getByText(mockActor.skin_color);
    const actorEyeColor = screen.getByText(mockActor.eye_color);

    expect(actorName).toBeInTheDocument();
    expect(actorGender).toBeInTheDocument();
    expect(actorHairColor).toBeInTheDocument();
    expect(actorSkinColor).toBeInTheDocument();
    expect(actorEyeColor).toBeInTheDocument();

    global.fetch.mockRestore();
  });
});

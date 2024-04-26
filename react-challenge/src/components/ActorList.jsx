import { useEffect, useState } from "react";
import ActorCard from "./ActorCard";

const ActorList = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = async () => {
    try {
      const response = await fetch("https://swapi.py4e.com/api/people/");
      const data = await response.json();
      setActors(data.results);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  console.log("Actors", actors);
  return (
    <div className="flex justify-center">
      {loading && <div>Loading...</div>}
      {error && <p>Error: {error.message}</p>}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center my-16">
          {actors.map((actor, index) => (
            <ActorCard
              key={index}
              actor={actor}
              index={index + 1}
              data-testid="actor-card"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActorList;

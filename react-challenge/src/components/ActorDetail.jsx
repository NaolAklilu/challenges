import avatar from "../assets/svg/avatar.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActorDetail = () => {
  let { id } = useParams();

  const [actor, setActor] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActor();
  }, []);

  const fetchActor = async () => {
    try {
      const response = await fetch(`https://swapi.py4e.com/api/people/${id}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch person");
      }
      const data = await response.json();
      setActor(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <div>Loading...</div>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <div className="flex flex-col gap-3 border rounded-lg p-5 bg-white text-black">
          <div className="flex flex-col gap-3 items-center text-center">
            <div className="flex rounded-full">
              <img className="h-24 w-24" src={avatar} alt="User profile" />
            </div>
            <h1 className="text-lg font-bold">{actor.name}</h1>
            <hr />
            <div className="flex flex-row w-full h-fit gap-4">
              <div className="flex flex-row items-start justify-start gap-2">
                <div className="flex flex-col items-start">
                  <p className="font-semibold">Gender:</p>
                  <p className="font-semibold">Height:</p>
                  <p className="font-semibold">Mass:</p>
                </div>
                <div className="flex flex-col items-start">
                  <p> {actor.gender}</p>
                  <p> {actor.height} cm</p>
                  <p> {actor.mass} Kg</p>
                </div>
              </div>
              <div className="w-0.5 h-100 bg-blue-400"></div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col items-start ">
                  <p className="font-semibold">Hair Color:</p>
                  <p className="font-semibold">Skin Color:</p>
                  <p className="font-semibold">Eye Color: </p>
                </div>
                <div className="flex flex-col items-start">
                  <p> {actor.hair_color}</p>
                  <p> {actor.skin_color}</p>
                  <p>{actor.eye_color}</p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center p-3">
              <p className="font-semibold">Date of Birth</p>
              <p>{actor.birth_year}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActorDetail;

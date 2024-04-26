import avatar from "../assets/svg/avatar.svg";
import { Link } from "react-router-dom";

const ActorCard = ({ actor, index }) => {
  return (
    <div
      className="w-64 flex flex-col gap-3 border rounded-lg p-5 bg-white text-black"
      data-testid="actor-card"
    >
      <div className="flex flex-col gap-3 items-center text-center">
        <div className="flex h-16 w-16 rounded-full">
          <img src={avatar} alt="User profile" />
        </div>
        <div>
          <h1 className="text-lg font-bold">{actor.name}</h1>
          <p>height: {actor.height}</p>
          <p>DOB: {actor.birth_year}</p>
        </div>
      </div>
      <hr />
      <div className="flex justify-center">
        <Link
          to={`/actor/${index}`}
          className="flex items-center justify-center w-full p-3 border-none rounded-lg bg-blue-600 text-bold text-lg text-white"
        >
          Detail
        </Link>
      </div>
    </div>
  );
};

export default ActorCard;

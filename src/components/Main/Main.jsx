import GameCard from "../GameCard/GameCard";
import FeaturedGame from "../FeaturedGame/FeaturedGame";

import "./Main.css";

const Main = () => {
  return (
    <div className="main">
      {/* FEATURED GAME */}
      <div className="main__featured-card">
        <FeaturedGame />
      </div>
      {/* GAME CARD GRID */}
      <ul className="main__card-list">
        <GameCard />
      </ul>
    </div>
  );
};

export default Main;

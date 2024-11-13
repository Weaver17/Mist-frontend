import GameCard from "../GameCard/GameCard";
import FeaturedGame from "../FeaturedGame/FeaturedGame";

import "./Main.css";

const Main = ({ handleGameTitleClick }) => {
  return (
    <div className="main">
      {/* FEATURED GAME */}
      <div className="main__featured-card">
        <FeaturedGame onGameTitleClick={handleGameTitleClick} />
      </div>
      {/* GAME CARD GRID */}
      <ul className="main__card-list">
        <GameCard onGameTitleClick={handleGameTitleClick} />
        <GameCard onGameTitleClick={handleGameTitleClick} />
        <GameCard onGameTitleClick={handleGameTitleClick} />
        <GameCard onGameTitleClick={handleGameTitleClick} />
        <GameCard onGameTitleClick={handleGameTitleClick} />
      </ul>
    </div>
  );
};

export default Main;

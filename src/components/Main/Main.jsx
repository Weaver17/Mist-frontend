import GameCard from "../GameCard/GameCard";
import FeaturedGame from "../FeaturedGame/FeaturedGame";

import "./Main.css";

const Main = ({ handleGameClick, games, isLoading }) => {
  return (
    <section className="main">
      {/* FEATURED GAME */}
      <div className="main__featured-card">
        <FeaturedGame onGameClick={handleGameClick} />
      </div>

      <h2 className="main__card-list-title">Newest Releases:</h2>

      {/* GAME CARD GRID */}
      <ul className="main__card-list">
        {games.map((game) => {
          return (
            <GameCard key={game.id} game={game} onGameClick={handleGameClick} />
          );
        })}
      </ul>
    </section>
  );
};

export default Main;

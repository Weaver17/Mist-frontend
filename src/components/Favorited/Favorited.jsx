import { useState, useContext } from "react";

import FavoriteGameContext from "../../contexts/FavoriteGameContext";
import SavedGamesContext from "../../contexts/SavedGamesContext";

import GameCard from "../GameCard/GameCard";

import "./Favorited.css";

const Favorited = ({
  isLoading,
  games,
  handleGameClick,
  handleFavoriteGame,
  handleSaveGame,
}) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const { favoritedGames, setFavoritedGames } = useContext(FavoriteGameContext);
  const { savedGames } = useContext(SavedGamesContext);

  const onShowMoreClick = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <section className="favorited">
      <ul className="favorited__list">
        {isLoading ? (
          <Preloader />
        ) : (
          games.slice(0, visibleCount).map((game) => {
            const isFavorited = favoritedGames.some(
              (favGame) => favGame.id === game.id
            );
            const isSaved = savedGames.some(
              (savGame) => savGame.id === game.id
            );
            return (
              <GameCard
                key={game.id}
                game={game}
                onGameClick={handleGameClick}
                onFavoriteGame={handleFavoriteGame}
                onSaveGame={handleSaveGame}
                isFavorited={isFavorited}
                isSaved={isSaved}
              />
            );
          })
        )}
      </ul>
      {!isLoading && (
        <button
          type="button"
          onClick={onShowMoreClick}
          className="favorited__show-more-btn"
        >
          Show More
        </button>
      )}
    </section>
  );
};

export default Favorited;

import React, { useState } from "react";

import "./FavoritedGames.css";
import GameCard from "../GameCard/GameCard";
import Preloader from "../Preloader/Preloader";

const FavoritedGames = ({
  isLoading,
  favoritedGames,
  handleGameClick,
  setFavoritedGames,
  savedGames,
  setSavedGames,
}) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const onShowMoreClick = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="favorites">
      <h3 className="favorites__title">Favorite Games</h3>
      <ul className="favorites__list">
        {isLoading ? (
          <Preloader />
        ) : (
          favoritedGames
            .slice(0, visibleCount)
            .map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onGameClick={handleGameClick}
                favoritedGames={favoritedGames}
                setFavoritedGames={setFavoritedGames}
                savedGames={savedGames}
                setSavedGames={setSavedGames}
              />
            ))
        )}
      </ul>
      {!isLoading && visibleCount < favoritedGames.length && (
        <button
          type="button"
          onClick={onShowMoreClick}
          className="favorites__show-more-btn"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default FavoritedGames;

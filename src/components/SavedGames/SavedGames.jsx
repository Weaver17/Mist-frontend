import React, { useState } from "react";

import "./SavedGames.css";
import GameCard from "../GameCard/GameCard";
import Preloader from "../Preloader/Preloader";

const SavedGames = ({
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
    <div className="saved">
      <h3 className="saved__title">Saved Games</h3>
      <ul className="saved__list">
        {isLoading ? (
          <Preloader />
        ) : (
          savedGames
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
      {!isLoading && visibleCount < savedGames.length && (
        <button
          type="button"
          onClick={onShowMoreClick}
          className="saved__show-more-btn"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default SavedGames;

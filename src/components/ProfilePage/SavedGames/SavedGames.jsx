import React, { useState } from "react";

import "./SavedGames.css";
import GameCard from "../../GameCard/GameCard";
import Preloader from "../../Preloader/Preloader";
import ShowMoreBtn from "../../Buttons/ShowMoreBtn/ShowMoreBtn";
import { useGames } from "../../../contexts/GameContext";
import ToTopBtn from "../../Buttons/ToTopBtn/ToTopBtn";

const SavedGames = ({
  isLoading,
  favoritedGames,
  handleGameClick,
  setFavoritedGames,
  savedGames,
  setSavedGames,
  onToTopClick,
  scrollPosition,
}) => {
  const { visibleCount } = useGames();

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
        <ShowMoreBtn type="button" classModifier="saved" />
      )}
      <ToTopBtn onToTopClick={onToTopClick} scrollPosition={scrollPosition} />
    </div>
  );
};

export default SavedGames;

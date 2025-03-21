import React, { useEffect, useState } from "react";

import "./FavoritedGames.css";
import GameCard from "../../GameCard/GameCard";
import Preloader from "../../Preloader/Preloader";
import ShowMoreBtn from "../../Buttons/ShowMoreBtn/ShowMoreBtn";
import { useGames } from "../../../contexts/GameContext";
import ToTopBtn from "../../Buttons/ToTopBtn/ToTopBtn";

const FavoritedGames = ({
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
    <div className="favorites">
      <h3 className="favorites__title">Favorited Games</h3>
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
        <ShowMoreBtn type="button" classModifier="favorite" />
      )}
      <ToTopBtn onToTopClick={onToTopClick} scrollPosition={scrollPosition} />
    </div>
  );
};

export default FavoritedGames;

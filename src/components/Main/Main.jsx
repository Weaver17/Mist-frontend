import { useState, useEffect, useContext } from "react";

import GameCard from "../GameCard/GameCard";
import Preloader from "../Preloader/Preloader";

import * as gameApi from "../../utils/gameApi";

import "./Main.css";
import ShowMoreBtn from "../Buttons/ShowMoreBtn/ShowMoreBtn";
import { useGames } from "../../contexts/GameContext";

const Main = ({
  handleGameClick,
  favoritedGames,
  setFavoritedGames,
  savedGames,
  setSavedGames,
}) => {
  const { games, getNewestGames, isLoading, visibleCount } = useGames();

  useEffect(() => {
    getNewestGames();
  }, []);

  return (
    <section className="main">
      {/* FEATURED GAME */}

      <h2 className="main__card-list-title">Newest Releases:</h2>

      {/* GAME CARD GRID */}
      <ul className="main__card-list">
        {isLoading ? (
          <Preloader />
        ) : (
          games.slice(0, visibleCount).map((game) => {
            return (
              <GameCard
                key={game.id}
                game={game}
                onGameClick={handleGameClick}
                favoritedGames={favoritedGames}
                setFavoritedGames={setFavoritedGames}
                savedGames={savedGames}
                setSavedGames={setSavedGames}
              />
            );
          })
        )}
      </ul>
      {!isLoading && visibleCount < games.length && (
        <ShowMoreBtn type="button" classModifier="main" />
      )}
    </section>
  );
};

export default Main;

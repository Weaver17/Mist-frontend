import { useState, useEffect } from "react";

import GameCard from "../GameCard/GameCard";
import Preloader from "../Preloader/Preloader";

import * as gameApi from "../../utils/gameApi";

import "./Main.css";
import ShowMoreBtn from "../Buttons/ShowMoreBtn/ShowMoreBtn";

const Main = ({
  handleGameClick,
  isLoading,
  setIsLoading,
  games,
  setGames,

  favoritedGames,
  setFavoritedGames,
  savedGames,
  setSavedGames,
  handleRemoveFromFavorites,
}) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const onShowMoreClick = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  useEffect(() => {
    gameApi
      .getGamesByReleaseDate()
      .then((items) => {
        setGames(items);
      })
      .catch(console.error)
      .finally(setIsLoading(false));
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
                handleRemoveFromFavorites={handleRemoveFromFavorites}
              />
            );
          })
        )}
      </ul>
      {!isLoading && visibleCount < games.length && (
        <ShowMoreBtn
          type="button"
          onClick={onShowMoreClick}
          classModifier="main"
        />
      )}
    </section>
  );
};

export default Main;

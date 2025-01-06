import { useState, useContext, useEffect } from "react";

// import FavoriteGameContext from "../../contexts/FavoriteGameContext";
// import SavedGamesContext from "../../contexts/SavedGamesContext";

import GameCard from "../GameCard/GameCard";
import FeaturedGame from "../FeaturedGame/FeaturedGame";
import Preloader from "../Preloader/Preloader";

import * as gameApi from "../../utils/gameApi";

import "./Main.css";

const Main = ({
  handleGameClick,
  games,
  setGames,
  isLoading,
  setIsLoading,
  handleFavoriteGame,
  handleSaveGame,
}) => {
  const [visibleCount, setVisibleCount] = useState(6);

  // const { favoritedGames, setFavoritedGames } = useContext(FavoriteGameContext);
  // const { savedGames, setSavedGames } = useContext(SavedGamesContext);

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
      <div className="main__featured-card">
        {/* <FeaturedGame
          onFavoriteGame={handleFavoriteGame}
          onGameClick={handleGameClick}
          games={games}
          setGames={setGames}
          onSaveGame={handleSaveGame}
        /> */}
      </div>

      <h2 className="main__card-list-title">Newest Releases:</h2>

      {/* GAME CARD GRID */}
      <ul className="main__card-list">
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
      {!isLoading && visibleCount < games.length && (
        <button
          type="button"
          onClick={onShowMoreClick}
          className="main__show-more-btn"
        >
          Show More
        </button>
      )}
    </section>
  );
};

export default Main;

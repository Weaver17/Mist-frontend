import React, { useContext, useState } from "react";
import * as gameApi from "../utils/gameApi";
import { DEFAULT_VISIBLE_COUNT, VISIBLE_COUNT_ADD } from "../utils/constants";

const GameContext = React.createContext();

export function useGames() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [favoritedGames, setFavoritedGames] = useState([]);
  const [savedGames, setSavedGames] = useState([]);
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE_COUNT);

  // GET GAMES BY RELEASE DATE
  function getNewestGames() {
    setIsLoading(true);
    gameApi
      .getGamesByReleaseDate()
      .then((items) => {
        setGames(items);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  // GET GAMES BY RELEVANCE
  function getPopularGames() {
    gameApi
      .getGamesByRelevance()
      .then((items) => {
        setGames(items);
      })
      .catch(console.error)
      .finally(setIsLoading(false));
  }

  const onShowMoreClick = () => {
    setVisibleCount((prevCount) => prevCount + VISIBLE_COUNT_ADD);
  };

  // RERENDER FAVE GAMES
  const handleRemoveFromFavorites = (gameId, mongoId) => {
    setFavoritedGames((prevGames) =>
      prevGames.filter((game) => game.id !== gameId && game._id !== mongoId)
    );
  };

  // RERENDER SAVE GAMES
  const handleRemoveFromSavedGames = (gameId, mongoId) => {
    setSavedGames((prevGames) =>
      prevGames.filter((game) => game.id !== gameId && game._id !== mongoId)
    );
  };

  return (
    <GameContext.Provider
      value={{
        isLoading,
        setIsLoading,
        games,
        setGames,
        getNewestGames,
        getPopularGames,
        handleRemoveFromFavorites,
        handleRemoveFromSavedGames,
        visibleCount,
        onShowMoreClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

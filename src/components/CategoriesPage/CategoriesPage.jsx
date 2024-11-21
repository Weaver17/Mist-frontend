import { useState, useContext, useEffect } from "react";

import FavoriteGameContext from "../../contexts/FavoriteGameContext";
import SavedGamesContext from "../../contexts/SavedGamesContext";

import GameCard from "../GameCard/GameCard";
import Preloader from "../Preloader/Preloader";

import * as gameApi from "../../utils/gameApi";
import { categories, platforms, sortOptionsArr } from "../../utils/constants";

const CategoriesPage = ({
  handleGameClick,
  games,
  handleFavoriteGame,
  handleSaveGame,
  setGames,
  isLoading,
  setIsLoading,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [visibleCount, setVisibleCount] = useState(9);

  const { favoritedGames } = useContext(FavoriteGameContext);
  const { savedGames } = useContext(SavedGamesContext);

  const onShowMoreClick = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const onCatChange = () => {
    setIsLoading(true);
    gameApi
      .getGamesByCategory(selectedCategory)
      .then((items) => {
        setGames(items);
        console.log(selectedCategory);
      })
      .catch(console.error)
      .finally(setIsLoading(false));
  };

  const handleCatChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    if (selectedCategory === "All") {
      gameApi
        .getGamesByRelevance()
        .then((items) => {
          setGames(items);
        })
        .catch(console.error)
        .finally(setIsLoading(false));
    } else
      gameApi
        .getGamesByCategory(selectedCategory)
        .then((items) => {
          setGames(items);
        })
        .catch(console.error)
        .finally(setIsLoading(false));
  }, [selectedCategory]);

  return (
    <div className="games">
      <div className="games__top-section">
        <div className="games__heading-border">
          <h2 className="games__heading">Categories</h2>
        </div>
        <div className="games__dropdowns-container">
          <label className="games__dropdowns-label">
            <p className="games__dropdowns-label-title">Category:</p>
            <div className="games-select-container">
              <select
                onChange={handleCatChange}
                className="games__select games__select_cat"
                name="category"
                id="category"
              >
                {categories.map((category, index) => (
                  <option
                    className="games__select-option"
                    key={index}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>
      </div>
      <ul className="games__list">
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
          className="games__show-more-btn"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default CategoriesPage;

import { useState, useEffect } from "react";

import GameCard from "../GameCard/GameCard";
import Preloader from "../Preloader/Preloader";

import * as gameApi from "../../utils/gameApi";
import { categories, platforms } from "../../utils/constants";

import "./GamesSection.css";
import ShowMoreBtn from "../Buttons/ShowMoreBtn/ShowMoreBtn";
import { useGames } from "../../contexts/GameContext";
import ToTopBtn from "../Buttons/ToTopBtn/ToTopBtn";

const GamesSection = ({
  handleGameClick,
  favoritedGames,
  setFavoritedGames,
  savedGames,
  setSavedGames,
  onToTopClick,
  scrollPosition,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");

  const {
    games,
    setGames,
    isLoading,
    setIsLoading,
    getPopularGames,
    visibleCount,
  } = useGames();

  // category change
  const handleCatChange = () => {
    setIsLoading(true);
    if (selectedCategory === "Card Games") {
      gameApi
        .getGamesByCategory("card")
        .then((items) => {
          setGames(items);
          console.log(selectedCategory);
        })
        .catch(console.error)
        .finally(setIsLoading(false));
    } else if (selectedCategory === "Battle Royale") {
      gameApi
        .getGamesByCategory("battle-royale")
        .then((items) => {
          setGames(items);
          console.log(selectedCategory);
        })
        .catch(console.error)
        .finally(setIsLoading(false));
    } else
      gameApi
        .getGamesByCategory(selectedCategory)
        .then((items) => {
          setGames(items);
          console.log(selectedCategory);
        })
        .catch(console.error)
        .finally(setIsLoading(false));
  };

  // platform change
  const handlePlatChange = () => {
    setIsLoading(true);

    gameApi
      .getGamesByPlatform(selectedPlatform.toLocaleLowerCase())
      .then((items) => {
        setGames(items);
      })
      .catch(console.error)
      .finally(setIsLoading(false));
  };

  const onCatChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const onPlatChange = (e) => {
    setSelectedPlatform(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    if (selectedCategory === "All") {
      getPopularGames();
    } else handleCatChange();

    if (selectedCategory === "All") {
      handlePlatChange();
    } else {
      handlePlatChange();
    }
  }, [selectedCategory, selectedPlatform, isLoading]);

  return (
    <div className="games">
      <div className="games__top-section">
        <div className="games__heading-border">
          <h2 className="games__heading">Games</h2>
        </div>
        <div className="games__dropdowns-container">
          <label className="games__dropdowns-label">
            <p className="games__dropdowns-label-title">Category:</p>
            <div className="games-select-container">
              <select
                onChange={onCatChange}
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

          <label className="games__dropdowns-label">
            <p className="games__dropdowns-label-title">Platform:</p>
            <div className="games-select-container">
              <select
                onChange={onPlatChange}
                className="games__select games__select_plat"
                name="platform"
                id="platform"
              >
                {platforms.map((platform, index) => (
                  <option
                    className="games__select-option"
                    key={index}
                    value={platform}
                  >
                    {platform}
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
        <ShowMoreBtn type="button" classModifier="games" />
      )}
      <ToTopBtn onToTopClick={onToTopClick} scrollPosition={scrollPosition} />
    </div>
  );
};

export default GamesSection;

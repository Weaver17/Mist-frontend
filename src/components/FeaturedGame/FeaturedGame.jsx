import { useState, useEffect, useContext } from "react";

import FavoriteGameContext from "../../contexts/FavoriteGameContext";
import SavedGamesContext from "../../contexts/SavedGamesContext";
import Preloader from "../Preloader/Preloader";
import { getGameById } from "../../utils/gameApi";

import saveGame from "../../assets/btns/save-btn2.png";
import gameSaved from "../../assets/icons/saved-icon-blue.png";
import favoriteBtn from "../../assets/btns/favorite-btn.png";
import favoriteBtnFilled from "../../assets/btns/favorite-btn-filled.png";

import "./FeaturedGame.css";

const FeaturedGame = ({ onGameClick, games, onFavoriteGame, onSaveGame }) => {
  const [featuredGame, setFeaturedGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { favoritedGames } = useContext(FavoriteGameContext);
  const { savedGames } = useContext(SavedGamesContext);

  const isSaved = savedGames.some((savGame) => savGame.id === featuredGame?.id);

  const isFavorited = favoritedGames.some(
    (favGame) => favGame.id === featuredGame?.id
  );

  const handleFavoriteGame = () => {
    onFavoriteGame(featuredGame);
  };

  const handleSaveGame = () => {
    onSaveGame(featuredGame);
  };

  const handleGameClick = () => {
    getGameById(featuredGame.id).then((item) => {
      onGameClick(item);
    });
  };

  useEffect(() => {
    const loadFeaturedGame = () => {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const randomIndex = Math.floor(Math.random() * games.length);

        const storedGame = localStorage.getItem(`gameOfTheDay-${today}`);
        if (storedGame) {
          selectedGame = JSON.parse(storedGame);
        }

        const selectedGame = games[randomIndex];
        localStorage.setItem(
          `featuredGame-${today}`,
          JSON.stringify(selectedGame)
        );

        setFeaturedGame(selectedGame);
      } catch {
        console.error;
      }
    };

    loadFeaturedGame();
  }, [games]);

  useEffect(() => {
    if (featuredGame) {
      setIsLoading(false);
    }
  }, [featuredGame]);

  useEffect(() => {
    if (featuredGame?.id) {
      getGameById(featuredGame.id)
        .then((item) => {
          setFeaturedGame(item);
        })
        .catch(console.error)
        .finally(setIsLoading(false));
    }
  }, [featuredGame?.id]);

  return (
    <div className="featured">
      <div className="featured__heading-border">
        <h2 className="featured__heading">Today's Featured Game:</h2>
      </div>{" "}
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="featured__card">
          <div className="featured__thumbnail-container">
            <img
              className="featured__thumbnail"
              src={featuredGame.thumbnail}
              alt="Game Cover"
              onClick={handleGameClick}
            />
            <div className="featured__save-bg">
              <img
                className="featured__save-btn"
                src={!isSaved ? saveGame : gameSaved}
                alt={!isSaved ? "Save Icon" : "Blue Checkmark"}
                onClick={handleSaveGame}
              />
            </div>
          </div>
          <div className="featured__info">
            <img
              className="featured__fav-btn"
              src={isFavorited ? favoriteBtnFilled : favoriteBtn}
              alt={isFavorited ? "Star" : "Blue Star"}
              onClick={handleFavoriteGame}
            />
            <p className="featured__category">{featuredGame.genre}</p>
            <h2 className="featured__title" onClick={handleGameClick}>
              {featuredGame.title}
            </h2>
            <p className="featured__description">{featuredGame.description}</p>
            <p className="featured__platform">{featuredGame.platform}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedGame;

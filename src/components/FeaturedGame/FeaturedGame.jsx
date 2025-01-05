import { useState, useEffect, useContext } from "react";

import FavoriteGameContext from "../../contexts/FavoriteGameContext";
import SavedGamesContext from "../../contexts/SavedGamesContext";
import Preloader from "../Preloader/Preloader";
import * as gameApi from "../../utils/gameApi";

import saveGame from "../../assets/btns/save-btn2.png";
import gameSaved from "../../assets/icons/saved-icon-blue.png";
import favoriteBtn from "../../assets/btns/favorite-btn.png";
import favoriteBtnFilled from "../../assets/btns/favorite-btn-filled.png";

import "./FeaturedGame.css";

const FeaturedGame = ({
  onGameClick,
  games,
  setGames,
  onFavoriteGame,
  onSaveGame,
}) => {
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
    gameApi.getGameById(featuredGame.id).then((item) => {
      onGameClick(item);
    });
  };

  const loadFeaturedGame = () => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      console.log(`Today's date: ${today}`);

      const storedGame = localStorage.getItem(`featuredGame-${today}`);
      console.log(`Stored game: ${storedGame}`);
      if (storedGame && storedGame !== "undefined") {
        const parsedGame = JSON.parse(storedGame);
        setFeaturedGame(parsedGame);
        console.log("Loaded game from localStorage:", parsedGame);
      } else {
        if (games && games.length > 0) {
          const randomIndex = Math.floor(Math.random() * games.length);
          const selectedGame = games[randomIndex];

          localStorage.setItem(
            `featuredGame-${today}`,
            JSON.stringify(selectedGame)
          );
          setFeaturedGame(selectedGame);
          console.log("New featured game selected:", selectedGame);
        } else {
          console.error("No games available to select as featured game.");
        }
      }
    } catch (error) {
      console.error("Error loading featured game:", error);
    } finally {
      setIsLoading(false);
    }
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

  useEffect(() => {
    loadFeaturedGame();
  }, [games]);

  useEffect(() => {
    if (featuredGame) {
      setIsLoading(false);
    }
  }, [featuredGame]);

  useEffect(() => {
    if (featuredGame?.id) {
      setIsLoading(true);
      gameApi
        .getGameById(featuredGame.id)
        .then((item) => {
          setFeaturedGame(item);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [featuredGame?.id]);

  return (
    <div className="featured">
      <div className="featured__heading-border">
        <h2 className="featured__heading">Today&apos;s Featured Game:</h2>
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
            {/* <div className="featured__save-bg">
              <img
                className="featured__save-btn"
                src={!isSaved ? saveGame : gameSaved}
                alt={!isSaved ? "Save Icon" : "Blue Checkmark"}
                onClick={handleSaveGame}
              />
            </div> */}
          </div>
          <div className="featured__info">
            {/* <img
              className="featured__fav-btn"
              src={isFavorited ? favoriteBtnFilled : favoriteBtn}
              alt={isFavorited ? "Star" : "Blue Star"}
              onClick={handleFavoriteGame}
            /> */}
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

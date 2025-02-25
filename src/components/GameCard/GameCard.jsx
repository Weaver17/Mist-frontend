import { useContext } from "react";
import { getGameById } from "../../utils/gameApi";
import faveBtn from "../../assets/btns/favorite-btn.png";
import faveBtnFilled from "../../assets/btns/favorite-btn-filled.png";
import saveBtn from "../../assets/btns/save-btn2.png";
import saved from "../../assets/btns/saved.png";

import "./GameCard.css";
import {
  addFavoriteGame,
  deleteFavoritedGame,
  getFavorite,
} from "../../utils/favorited";

import { addSavedGame, deleteSavedGame, getSavedGame } from "../../utils/saved";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useGames } from "../../contexts/GameContext";

const GameCard = ({
  onGameClick,
  game,
  favoritedGames,
  setFavoritedGames,
  savedGames,
  setSavedGames,
}) => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  const { handleRemoveFromFavorites, handleRemoveFromSavedGames } = useGames();

  const favoritedGameIds = new Set(
    favoritedGames?.map((favGame) => favGame.id)
  );

  const favoritedGameDbIds = new Set(
    favoritedGames?.map((favGame) => favGame._id)
  );

  const savedGameIds = new Set(savedGames?.map((savGame) => savGame.id));

  const savedGameDbIds = new Set(savedGames?.map((savGame) => savGame._id));

  const token = localStorage.getItem("JWT_TOKEN");

  const handleGameClick = () => {
    getGameById(game.id)
      .then((item) => {
        onGameClick(item);
      })
      .catch(console.error);
  };

  const handleFavoriteGame = () => {
    addFavoriteGame(game, token)
      .then((newFave) => {
        setFavoritedGames([...favoritedGames, newFave]);
      })
      .catch(console.error);
  };

  const handleRemoveFavorite = () => {
    getFavorite(game.id, token)
      .then((gameId) => {
        console.log(game.id, gameId.mongoId._id);
        handleRemoveFromFavorites(game.id, gameId.mongoId._id);
        deleteFavoritedGame(gameId.mongoId._id, token);
      })
      .catch(console.error);
  };

  const handleSaveGame = () => {
    addSavedGame(game, token)
      .then((newSave) => {
        setSavedGames([...savedGames, newSave]);
      })
      .catch(console.error);
  };

  const handleRemoveSaved = () => {
    getSavedGame(game.id, token)
      .then((gameId) => {
        return deleteSavedGame(gameId.mongoId._id, token);
      })
      .then((deletedGame) => {
        handleRemoveFromSavedGames(deletedGame.id, deletedGame._id);
      })
      .catch(console.error);
  };

  return (
    <li className="card">
      <div className="card__top-wrapper">
        <h3 className="card__title" onClick={handleGameClick}>
          {game.title}
        </h3>
        <button
          type="button"
          className="card__fave-btn"
          onClick={
            (isLoggedIn && favoritedGameIds.has(game.id)) ||
            favoritedGameDbIds.has(game._id)
              ? handleRemoveFavorite
              : handleFavoriteGame
          }
        >
          <img
            className="card__fave-star"
            src={
              (isLoggedIn && favoritedGameIds.has(game.id)) ||
              favoritedGameDbIds.has(game._id)
                ? faveBtnFilled
                : faveBtn
            }
            alt="star"
          />
        </button>
      </div>
      <div className="card__thumbnail-container">
        <button
          type="button"
          className="card__save-btn"
          onClick={
            (isLoggedIn && savedGameIds.has(game.id)) ||
            savedGameDbIds.has(game._id)
              ? handleRemoveSaved
              : handleSaveGame
          }
        >
          <img
            className="card__save-img"
            src={
              (isLoggedIn && savedGameIds.has(game.id)) ||
              savedGameDbIds.has(game._id)
                ? saved
                : saveBtn
            }
            alt={
              (isLoggedIn && savedGameIds.has(game.id)) ||
              savedGameDbIds.has(game._id)
                ? "Checkmark"
                : "Save icon"
            }
          />
        </button>
        <img
          className="card__thumbnail"
          src={game.thumbnail}
          alt={game.name}
          onClick={handleGameClick}
        />
      </div>
      <div className="card__info">
        <p className="card__description">{game.short_description}</p>
      </div>
      <p className="card__category">{game.genre}</p>
      <p className="card__platform">{game.platform}</p>
    </li>
  );
};

export default GameCard;

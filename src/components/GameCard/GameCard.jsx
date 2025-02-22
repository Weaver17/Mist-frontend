import { useState } from "react";
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

const GameCard = ({
  onGameClick,
  game,
  favoritedGames,
  setFavoritedGames,
  savedGames,
  setSavedGames,
}) => {
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
        return deleteFavoritedGame(gameId.mongoId._id, token);
      })
      .then((deletedGame) => {
        const newFaves = favoritedGames?.filter(
          (g) => g._id !== deletedGame._id
        );

        setFavoritedGames(newFaves);
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
        const newSaves = savedGames?.filter((g) => g._id !== deletedGame._id);

        setSavedGames(newSaves);
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
            favoritedGameIds.has(game.id) || favoritedGameDbIds.has(game._id)
              ? handleRemoveFavorite
              : handleFavoriteGame
          }
        >
          <img
            className="card__fave-star"
            src={
              favoritedGameIds.has(game.id) || favoritedGameDbIds.has(game._id)
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
            savedGameIds.has(game.id) || savedGameDbIds.has(game._id)
              ? handleRemoveSaved
              : handleSaveGame
          }
        >
          <img
            className="card__save-img"
            src={
              savedGameIds.has(game.id) || savedGameDbIds.has(game._id)
                ? saved
                : saveBtn
            }
            alt={
              savedGameIds.has(game.id) || savedGameDbIds.has(game._id)
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

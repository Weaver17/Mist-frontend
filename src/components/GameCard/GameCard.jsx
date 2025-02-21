import { getGameById } from "../../utils/gameApi";
import faveBtn from "../../assets/btns/favorite-btn.png";
import faveBtnFilled from "../../assets/btns/favorite-btn-filled.png";

import "./GameCard.css";
import {
  addFavoriteGame,
  deleteFavoritedGame,
  getFavorite,
} from "../../utils/favorited";
import { useEffect, useState } from "react";

const GameCard = ({ onGameClick, game, favoritedGames, setFavoritedGames }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const favoritedGameIds = new Set(
    favoritedGames?.map((favGame) => favGame.id)
  );

  const favoritedGameDbIds = new Set(
    favoritedGames?.map((favGame) => favGame._id)
  );

  const handleGameClick = () => {
    getGameById(game.id)
      .then((item) => {
        onGameClick(item);
      })
      .catch(console.error);
  };

  const handleFavoriteGame = () => {
    const token = localStorage.getItem("JWT_TOKEN");

    addFavoriteGame(game, token)
      .then((newFave) => {
        console.log(newFave);
        setIsFavorited(true);
        setFavoritedGames([...favoritedGames, newFave]);
      })
      .catch(console.error);
  };

  const handleRemoveFavorite = () => {
    const token = localStorage.getItem("JWT_TOKEN");

    getFavorite(game.id, token)
      .then((gameId) => {
        return deleteFavoritedGame(gameId.mongoId._id, token);
      })
      .then((deletedGame) => {
        setIsFavorited(false);
        const newFaves = favoritedGames?.filter(
          (g) => g._id !== deletedGame._id
        );

        setFavoritedGames(newFaves);
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

import { useState, useEffect } from "react";

import { getGameById } from "../../utils/gameApi";

import saveGame from "../../assets/btns/save-btn2.png";
import gameSaved from "../../assets/icons/saved-icon-blue.png";
import favoriteBtn from "../../assets/btns/favorite-btn.png";
import favoriteBtnFilled from "../../assets/btns/favorite-btn-filled.png";

import "./GameCard.css";

const GameCard = ({ onGameClick, game }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleIsSaved = () => {
    setIsSaved(!isSaved);
  };

  const toggleIsFavorited = () => {
    setIsFavorited(!isFavorited);
  };

  const handleGameClick = () => {
    getGameById(game.id).then((item) => {
      onGameClick(item);
    });
  };

  // useEffect(() => {
  //   // handleGameClick().then();
  //   // if (handleGameClick()) {
  //   //   getGameById(clickedGame.id).then((item) => {
  //   //     console.log(item.id);
  //   //   });
  //   // }
  // }, [handleGameClick, onGameTitleClick]);

  return (
    <li className="card">
      <div className="card__thumbnail-container">
        <img
          className="card__thumbnail"
          src={game.thumbnail}
          alt={game.name}
          onClick={handleGameClick}
        />
        <div className="card__save-bg">
          <img
            className="card__save-btn"
            src={isSaved ? saveGame : gameSaved}
            alt={isSaved ? "Save Icon" : "Blue Checkmark"}
            onClick={toggleIsSaved}
          />
        </div>
      </div>
      <div className="card__info">
        <img
          className="card__fav-btn"
          src={isFavorited ? favoriteBtnFilled : favoriteBtn}
          alt={isFavorited ? "Star" : "Blue Star"}
          onClick={toggleIsFavorited}
        />
        <p className="card__category">{game.genre}</p>
        <h3 className="card__title" onClick={handleGameClick}>
          {game.title}
        </h3>
        <p className="card__description">{game.short_description}</p>
      </div>
      <p className="card__platform">{game.platform}</p>
    </li>
  );
};

export default GameCard;

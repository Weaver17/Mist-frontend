import { useState } from "react";

import thumbnail from "../../assets/thumbnail-standin.png";
import saveGame from "../../assets/btns/save-btn2.png";
import gameSaved from "../../assets/icons/saved-icon-blue.png";
import favoriteBtn from "../../assets/btns/favorite-btn.png";
import favoriteBtnFilled from "../../assets/btns/favorite-btn-filled.png";

import "./GameCard.css";

const GameCard = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleIsSaved = () => {
    setIsSaved(!isSaved);
  };

  const toggleIsFavorited = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <>
      <li className="card">
        <div className="card__thumbnail-container">
          <img className="card__thumbnail" src={thumbnail} alt="" />
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
          <p className="card__category">Category</p>
          <h3 className="card__title">Game Title</h3>
          <p className="card__description">
            Short Description qweqwe qweqweqweqwe qweqwe q qweqweqweqw
          </p>
          <p className="card__platform">Platform</p>
        </div>
      </li>
      {/* // GAME CARD COPIES */}
      <li className="card">
        <div className="card__thumbnail-container">
          <img className="card__thumbnail" src={thumbnail} alt="" />
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
          <p className="card__category">Category</p>
          <h3 className="card__title">Game Title</h3>
          <p className="card__description">
            Short Description qweqwe qweqweqweqwe qweqwe q qweqweqweqw
          </p>
          <p className="card__platform">Platform</p>
        </div>
      </li>
      {/* // GAME CARD COPIES */}
      <li className="card">
        <div className="card__thumbnail-container">
          <img className="card__thumbnail" src={thumbnail} alt="" />
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
          <button
            className="card__fav-btn"
            type="button"
            onClick={toggleIsFavorited}
          >
            {!isFavorited ? (
              <img
                className="card__fav-btn-star"
                src={favoriteBtn}
                alt="Star"
              />
            ) : (
              <img
                className="card__fav-btn-star"
                src={favoriteBtnFilled}
                alt="Blue Star"
              />
            )}
          </button>
          <p className="card__category">Category</p>
          <h3 className="card__title">Game Title</h3>
          <p className="card__description">
            Short Description qweqwe qweqweqweqwe qweqwe q qweqweqweqw
          </p>
          <p className="card__platform">Platform</p>
        </div>
      </li>
      {/* // GAME CARD COPIES */}
      <li className="card">
        <div className="card__thumbnail-container">
          <img className="card__thumbnail" src={thumbnail} alt="" />
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
          <button
            className="card__fav-btn"
            type="button"
            onClick={toggleIsFavorited}
          >
            {!isFavorited ? (
              <img
                className="card__fav-btn-star"
                src={favoriteBtn}
                alt="Star"
              />
            ) : (
              <img
                className="card__fav-btn-star"
                src={favoriteBtnFilled}
                alt="Blue Star"
              />
            )}
          </button>
          <p className="card__category">Category</p>
          <h3 className="card__title">Game Title</h3>
          <p className="card__description">
            Short Description qweqwe qweqweqweqwe qweqwe q qweqweqweqw
          </p>
          <p className="card__platform">Platform</p>
        </div>
      </li>
    </>
  );
};

export default GameCard;

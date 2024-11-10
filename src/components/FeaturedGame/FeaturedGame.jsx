import { useState } from "react";

import thumbnail from "../../assets/thumbnail-standin.png";
import saveGame from "../../assets/btns/save-btn2.png";
import gameSaved from "../../assets/icons/saved-icon-blue.png";
import favoriteBtn from "../../assets/btns/favorite-btn.png";
import favoriteBtnFilled from "../../assets/btns/favorite-btn-filled.png";

import "./FeaturedGame.css";

const FeaturedGame = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleIsSaved = () => {
    setIsSaved(!isSaved);
  };

  const toggleIsFavorited = () => {
    setIsFavorited(!isFavorited);
  };
  return (
    <div className="featured">
      <h2 className="featured__heading">Today's Featured Game:</h2>
      <div className="featured__card">
        <div className="featured__thumbnail-container">
          <img
            className="featured__thumbnail"
            src={thumbnail}
            alt="Game Cover"
          />
          <div className="featured__save-bg">
            <img
              className="featured__save-btn"
              src={isSaved ? saveGame : gameSaved}
              alt={isSaved ? "Save Icon" : "Blue Checkmark"}
              onClick={toggleIsSaved}
            />
          </div>
        </div>
        <div className="featured__info">
          <img
            className="featured__fav-btn"
            src={isFavorited ? favoriteBtnFilled : favoriteBtn}
            alt={isFavorited ? "Star" : "Blue Star"}
            onClick={toggleIsFavorited}
          />
          <p className="featured__category">Category</p>
          <h2 className="featured__title">Game Title</h2>
          <p className="featured__description">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Eu quam natoque
            at neque tortor; risus habitasse integer. Cras neque augue elit eros
            aliquet enim etiam leo tortor. Interdum class vivamus erat luctus;
            sagittis auctor ut taciti? Tortor volutpat hendrerit lorem tellus
            facilisi tristique justo scelerisque gravida. Dictumst interdum
            dapibus; nunc montes nostra gravida.
            <br />
            <br />
            Lorem ipsum odor amet, consectetuer adipiscing elit. Eu quam natoque
            at neque tortor; risus habitasse integer. Cras neque augue elit eros
            aliquet enim etiam leo tortor. Interdum class vivamus erat luctus;
            sagittis auctor ut taciti? Tortor volutpat hendrerit lorem tellus
            facilisi tristique justo scelerisque gravida. Dictumst interdum
            dapibus; nunc montes nostra gravida.
          </p>
          <p className="featured__platform">Platform</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGame;

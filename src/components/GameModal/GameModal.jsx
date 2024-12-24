import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Modal from "../Modal/Modal";
import GameScreenshot from "../GameScreenshot/GameScreenshot";

import "./GameModal.css";

import saveGame from "../../assets/btns/save-btn2.png";
import gameSaved from "../../assets/icons/saved-icon-blue.png";
import favoriteBtn from "../../assets/btns/favorite-btn.png";
import favoriteBtnFilled from "../../assets/btns/favorite-btn-filled.png";

const GameModal = ({ isOpen, handleCloseClick, handleImageClick, game }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleIsSaved = () => {
    setIsSaved(!isSaved);
  };

  const toggleIsFavorited = () => {
    setIsFavorited(!isFavorited);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleCloseClick();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleCloseClick]);

  return (
    <Modal
      onClose={handleCloseClick}
      title="Game Title"
      name="game"
      isOpen={isOpen}
    >
      {!isOpen ? (
        <div className="game-modal__empty"></div>
      ) : (
        <div className="game-modal">
          {/* TITLE AND FAV BUTTON  */}
          <div className="game-modal__title-container">
            <img
              className="game-modal__fav-btn"
              src={isFavorited ? favoriteBtnFilled : favoriteBtn}
              alt={isFavorited ? "Star" : "Blue Star"}
              onClick={toggleIsFavorited}
            />
            <h3 className="game-modal__title">{game.title}</h3>
          </div>
          {/* COVER ART, DEV INFO AND DESCRIPTION  */}
          <div className="game-modal__info-container">
            {/* LEFT SIDE  */}
            <div className="game-modal__thumbnail-container">
              {/* LEFT SIDE TOP  */}
              <img
                className="game-modal__thumbnail"
                src={game.thumbnail}
                alt={game.title}
              />
              {/* LEFT SIDE BOTTOM  */}
              <div className="game-modal__download-container">
                <div className="game-modal__cat-plat-container">
                  <p className="game-modal__category">{game.genre}</p>

                  <p className="game-modal__platform">{game.platform}</p>
                </div>
                <p className="game-modal__status">{game.status}</p>
                <Link
                  className="game-modal__download-btn-link"
                  to={game.game_url}
                  target="_blank"
                >
                  <button className="game-modal__download-btn">Download</button>
                </Link>
              </div>
            </div>
            {/* RIGHT SIDE  */}
            <div className="game-modal__info-container-right">
              {/* RIGHT SIDE TOP SECTION  */}
              <div className="game-modal__info-container-right-top">
                {/* RIGHT SIDE TOP LEFT  */}
                <img
                  className="game-modal__save-btn"
                  src={isSaved ? saveGame : gameSaved}
                  alt={isSaved ? "Save Icon" : "Blue Checkmark"}
                  onClick={toggleIsSaved}
                />
                {/* RIGHT SIDE TOP RIGHT  */}
                <div className="game-modal__dev-info-container">
                  <div className="game-modal__dev-info-wrapper">
                    <p className="game-modal__dev-info-type">Publisher:</p>
                    <p className="game-modal__dev-info">{game.publisher}</p>
                  </div>
                  <div className="game-modal__dev-info-wrapper">
                    <p className="game-modal__dev-info-type">Developer:</p>
                    <p className="game-modal__dev-info">{game.developer}</p>
                  </div>
                  <div className="game-modal__dev-info-wrapper">
                    <p className="game-modal__dev-info-type">Release Date:</p>
                    <p className="game-modal__dev-info">{game.release_date}</p>
                  </div>
                </div>
              </div>
              {/* DESCRIPTION  */}
              <p className="game-modal__description">{game.description}</p>
            </div>
          </div>
          <div className="game-modal__bottom-container">
            <div className="game-modal__screenshot-container">
              <GameScreenshot onImageClick={handleImageClick} game={game} />
            </div>

            <div className="game-modal__specs-container">
              <h4 className="game-modal__specs-title">System Requirements:</h4>
              <p className="game-modal__specs-name">OS:</p>
              <p className="game-modal__specs-spec">
                {game.minimum_system_requirements.os}
              </p>
              <p className="game-modal__specs-name">Processor:</p>
              <p className="game-modal__specs-spec">
                {game.minimum_system_requirements.processor}
              </p>
              <p className="game-modal__specs-name">Memory:</p>
              <p className="game-modal__specs-spec">
                {game.minimum_system_requirements.memory}
              </p>
              <p className="game-modal__specs-name">Graphics:</p>
              <p className="game-modal__specs-spec">
                {game.minimum_system_requirements.graphics}
              </p>
              <p className="game-modal__specs-name">Storage:</p>
              <p className="game-modal__specs-spec">
                {game.minimum_system_requirements.storage}
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default GameModal;

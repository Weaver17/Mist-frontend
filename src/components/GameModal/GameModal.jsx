import { useState } from "react";

import Modal from "../Modal/Modal";

import "./GameModal.css";

import thumbnail from "../../assets/thumbnail-standin.png";
import saveGame from "../../assets/btns/save-btn2.png";
import gameSaved from "../../assets/icons/saved-icon-blue.png";
import favoriteBtn from "../../assets/btns/favorite-btn.png";
import favoriteBtnFilled from "../../assets/btns/favorite-btn-filled.png";

const GameModal = ({ isOpen, handleCloseClick, handleImageClick }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleIsSaved = () => {
    setIsSaved(!isSaved);
  };

  const toggleIsFavorited = () => {
    setIsFavorited(!isFavorited);
  };
  return (
    <Modal
      onClose={handleCloseClick}
      title="Game Title"
      name="game"
      isOpen={isOpen}
    >
      <div className="game-modal">
        {/* TITLE AND FAV BUTTON  */}
        <div className="game-modal__title-container">
          <img
            className="game-modal__fav-btn"
            src={isFavorited ? favoriteBtnFilled : favoriteBtn}
            alt={isFavorited ? "Star" : "Blue Star"}
            onClick={toggleIsFavorited}
          />
          <h3 className="game-modal__title">Game Title</h3>
        </div>
        {/* COVER ART, DEV INFO AND DESCRIPTION  */}
        <div className="game-modal__info-container">
          {/* LEFT SIDE  */}
          <div className="game-modal__thumbnail-container">
            {/* LEFT SIDE TOP  */}
            <img
              className="game-modal__thumbnail"
              src={thumbnail}
              alt=""
              onClick={handleImageClick}
            />
            {/* LEFT SIDE BOTTOM  */}
            <div className="game-modal__download-container">
              <div className="game-modal__cat-plat-container">
                <p className="game-modal__category">Category</p>

                <p className="game-modal__platform">Platform</p>
              </div>
              <button className="game-modal__download-btn">Download</button>
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
                  <p className="game-modal__dev-info">MIST Gaming</p>
                </div>
                <div className="game-modal__dev-info-wrapper">
                  <p className="game-modal__dev-info-type">Developer:</p>
                  <p className="game-modal__dev-info">MIST Gaming</p>
                </div>
                <div className="game-modal__dev-info-wrapper">
                  <p className="game-modal__dev-info-type">Release Date:</p>
                  <p className="game-modal__dev-info">11/11/11</p>
                </div>
              </div>
            </div>
            {/* DESCRIPTION  */}
            <p className="game-modal__description">
              Lorem ipsum odor amet, consectetuer adipiscing elit. Eu quam
              natoque at neque tortor; risus habitasse integer. Cras neque augue
              elit eros aliquet enim etiam leo tortor. Interdum class vivamus
              erat luctus; sagittis auctor ut taciti? Tortor volutpat hendrerit
              lorem tellus facilisi tristique justo scelerisque gravida.
              Dictumst interdum dapibus; nunc montes nostra gravida.
              <br />
              <br />
              Lorem ipsum odor amet, consectetuer adipiscing elit. Eu quam
              natoque at neque tortor; risus habitasse integer. Cras neque augue
              elit eros aliquet enim etiam leo tortor. Interdum class vivamus
              erat luctus; sagittis auctor ut taciti? Tortor volutpat hendrerit
              lorem tellus facilisi tristique justo scelerisque gravida.
              Dictumst interdum dapibus; nunc montes nostra gravida.
            </p>
          </div>
        </div>
        <div className="game-modal__bottom-container">
          <h4 className="game-modal__screenshot-title">Screenshots:</h4>

          <div className="game-modal__screenshot-container">
            <img
              className="game-modal__screenshot"
              src={thumbnail}
              alt=""
              onClick={handleImageClick}
            />
            <img
              className="game-modal__screenshot"
              src={thumbnail}
              alt=""
              onClick={handleImageClick}
            />
            <img
              className="game-modal__screenshot"
              src={thumbnail}
              alt=""
              onClick={handleImageClick}
            />
            <img
              className="game-modal__screenshot"
              src={thumbnail}
              alt=""
              onClick={handleImageClick}
            />
            <img
              className="game-modal__screenshot"
              src={thumbnail}
              alt=""
              onClick={handleImageClick}
            />
            <img
              className="game-modal__screenshot"
              src={thumbnail}
              alt=""
              onClick={handleImageClick}
            />
          </div>
          <div className="game-modal__specs-container">
            <h4 className="game-modal__specs-title">System Requirements:</h4>
            <p className="game-modal__specs-name">OS:</p>
            <p className="game-modal__specs-spec">
              64-bit Windows 7, Windows 8.1, Windows 10
            </p>
            <p className="game-modal__specs-name">Processor:</p>
            <p className="game-modal__specs-spec">Any dual core CPU</p>
            <p className="game-modal__specs-name">Memory:</p>
            <p className="game-modal__specs-spec">6 GB RAM</p>
            <p className="game-modal__specs-name">Graphics:</p>
            <p className="game-modal__specs-spec">NVIDIA GeForce GTX 560 1GB</p>
            <p className="game-modal__specs-name">Storage:</p>
            <p className="game-modal__specs-spec">15 GB available space</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GameModal;

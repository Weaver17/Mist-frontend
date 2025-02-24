import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../Modal/Modal";
import GameScreenshot from "../../GameScreenshot/GameScreenshot";
import faveBtn from "../../../assets/btns/favorite-btn.png";
import faveBtnFilled from "../../../assets/btns/favorite-btn-filled.png";
import saveBtn from "../../../assets/btns/save-btn2.png";
import saved from "../../../assets/btns/saved.png";

import "./GameModal.css";
import {
  addFavoriteGame,
  deleteFavoritedGame,
  getFavorite,
} from "../../../utils/favorited";
import {
  addSavedGame,
  deleteSavedGame,
  getSavedGame,
} from "../../../utils/saved";

const GameModal = ({
  isOpen,
  handleCloseClick,
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
            <h3 className="game-modal__title">{game.title}</h3>
            <div className="game-modal__btns">
              <button
                type="button"
                className="game-modal__save-btn"
                onClick={
                  savedGameIds.has(game.id) || savedGameDbIds.has(game._id)
                    ? handleRemoveSaved
                    : handleSaveGame
                }
              >
                <img
                  className="game-modal__save-img"
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
              <button
                type="button"
                className="game-modal__fave-btn"
                onClick={
                  favoritedGameIds.has(game.id) ||
                  favoritedGameDbIds.has(game._id)
                    ? handleRemoveFavorite
                    : handleFavoriteGame
                }
              >
                <img
                  className="game-modal__fave-star"
                  src={
                    favoritedGameIds.has(game.id) ||
                    favoritedGameDbIds.has(game._id)
                      ? faveBtnFilled
                      : faveBtn
                  }
                  alt="star"
                />
              </button>
            </div>
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
              <GameScreenshot game={game} />
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

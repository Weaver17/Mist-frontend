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

    const { handleRemoveFromFavorites, handleRemoveFromSavedGames } =
        useGames();

    const token = localStorage.getItem("JWT_TOKEN");

    const handleGameClick = () => {
        getGameById(game.id)
            .then((item) => {
                onGameClick(item);
                console.log(game);
            })
            .catch(console.error);
    };

    // Use .some for instant UI update
    const isFavorited = favoritedGames.some((fav) => fav.id === game.id);

    const handleFavoriteClick = () => {
        if (isFavorited) {
            setFavoritedGames((prev) =>
                prev.filter((fav) => fav.id !== game.id)
            );
            getFavorite(game.id, token)
                .then((gameId) => {
                    handleRemoveFromFavorites(game.id, gameId.mongoId._id);
                    return deleteFavoritedGame(gameId.mongoId._id, token);
                })
                .catch(console.error);
        } else {
            setFavoritedGames((prev) => [...prev, game]);
            addFavoriteGame(game, token).catch(console.error);
        }
    };

    // Use .some for instant UI update, matching favorited logic
    const isSaved = savedGames.some((sav) => sav.id === game.id);

    const handleSaveClick = () => {
        if (isSaved) {
            setSavedGames((prev) => prev.filter((sav) => sav.id !== game.id));
            getSavedGame(game.id, token)
                .then((gameId) => {
                    handleRemoveFromSavedGames(game.id, gameId.mongoId._id);
                    return deleteSavedGame(gameId.mongoId._id, token);
                })
                .catch(console.error);
        } else {
            setSavedGames((prev) => [...prev, game]);
            addSavedGame(game, token).catch(console.error);
        }
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
                    onClick={isLoggedIn ? handleFavoriteClick : undefined}
                >
                    <img
                        className="card__fave-star"
                        src={isFavorited ? faveBtnFilled : faveBtn}
                        alt="star"
                    />
                </button>
            </div>
            <div className="card__thumbnail-container">
                <button
                    type="button"
                    className="card__save-btn"
                    onClick={isLoggedIn ? handleSaveClick : undefined}
                >
                    <img
                        className="card__save-img"
                        src={isSaved ? saved : saveBtn}
                        alt={isSaved ? "Checkmark" : "Save icon"}
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

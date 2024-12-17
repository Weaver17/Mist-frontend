import { useState, useContext } from "react";

import FavoriteGameContext from "../../contexts/FavoriteGameContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedGamesContext from "../../contexts/SavedGamesContext";

import Sidebar from "../Sidebar/Sidebar";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import GameCard from "../GameCard/GameCard";

import EditModal from "../EditModal/EditModal";

import "./Profile.css";

const Profile = ({
  handleEditClick,
  isOpen,
  handleCloseClick,
  handleEditUsername,
  isLoading,
  handleGameClick,
  handleFavoriteGame,
  handleSaveGame,
  handleLogOut,
}) => {
  const [isFavoriteChecked, setIsFavoriteChecked] = useState(true);
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [visibleFavCount, setVisibleFavCount] = useState(4);
  const [visibleSavCount, setVisibleSavCount] = useState(4);

  const { favoritedGames } = useContext(FavoriteGameContext);
  const { currentUser } = useContext(CurrentUserContext);
  const { savedGames } = useContext(SavedGamesContext);

  const toggleFavoritesAndSaved = () => {
    setIsFavoriteChecked(!isFavoriteChecked);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpened(!isMobileMenuOpened);
  };

  const handleMobileEditClick = () => {
    handleEditClick();
    setMobileMenuOpened(!isMobileMenuOpened);
  };

  const onShowMoreFavClick = () => {
    setVisibleFavCount((prevCount) => prevCount + 2);
  };

  const onShowMoreSavClick = () => {
    setVisibleSavCount((prevCount) => prevCount + 2);
  };

  return (
    <div className="profile">
      {/* SIDEBAR  */}
      <section className="profile__sidebar">
        <Sidebar
          isOpen={isOpen}
          handleCloseClick={handleCloseClick}
          handleEditUsername={handleEditUsername}
          isLoading={isLoading}
          handleEditClick={handleEditClick}
          handleLogOut={handleLogOut}
        />
      </section>
      {/* GAMES  */}
      <section className="profile__games">
        <button
          className="profile__mobile-btn"
          type="button"
          onClick={toggleMobileMenu}
        >
          {currentUser?.username}
        </button>
        {/* TOGGLE SWITCH  */}
        <div className="profile__games-switch">
          <ToggleSwitch
            toggleFavoritesAndSaved={toggleFavoritesAndSaved}
            isFavoriteChecked={isFavoriteChecked}
          />
        </div>
        <div className="profile__games-list-container">
          {/* FAVE/SAVE LISTS  */}
          {isFavoriteChecked ? (
            <ul className="profile__games-list profile__games-list_favorites">
              {favoritedGames.slice(0, visibleFavCount).map((game) => {
                const isSaved = savedGames.some(
                  (savGame) => savGame.id === game.id
                );

                const isFavorited = favoritedGames.some(
                  (favGame) => favGame.id === game.id
                );
                return (
                  <GameCard
                    key={game.id}
                    game={game}
                    onFavoriteGame={handleFavoriteGame}
                    onSaveGame={handleSaveGame}
                    onGameClick={handleGameClick}
                    isFavorited={isFavorited}
                    isSaved={isSaved}
                  />
                );
              })}
              {!isLoading && visibleFavCount < favoritedGames.length && (
                <button
                  type="button"
                  onClick={onShowMoreFavClick}
                  className="profile__show-more-btn"
                >
                  Show More
                </button>
              )}
            </ul>
          ) : (
            <ul className="profile__games-list profile__games-list_saved">
              {savedGames.slice(0, visibleSavCount).map((game) => {
                const isSaved = savedGames.some(
                  (savGame) => savGame.id === game.id
                );

                const isFavorited = favoritedGames.some(
                  (favGame) => favGame.id === game.id
                );
                return (
                  <GameCard
                    key={game.id}
                    game={game}
                    onFavoriteGame={handleFavoriteGame}
                    onSaveGame={handleSaveGame}
                    onGameClick={handleGameClick}
                    isSaved={isSaved}
                    isFavorited={isFavorited}
                  />
                );
              })}
              {!isLoading && visibleSavCount < savedGames.length && (
                <button
                  type="button"
                  onClick={onShowMoreSavClick}
                  className="profile__show-more-btn"
                >
                  Show More
                </button>
              )}
            </ul>
          )}
        </div>

        {/* MOBILE MENU  */}
        {isMobileMenuOpened && (
          <div className="profile__mobile">
            <div className="profile__mobile-container">
              <button
                className="profile__mobile-close-btn"
                type="button"
                onClick={toggleMobileMenu}
              />
              <button
                type="button"
                className="sidebar__edit"
                onClick={handleMobileEditClick}
              >
                Change Username
              </button>

              <button
                type="button"
                className="sidebar__logout"
                onClick={handleLogOut}
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </section>
      <EditModal
        isOpen={isOpen}
        handleCloseClick={handleCloseClick}
        handleEditUsername={handleEditUsername}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Profile;

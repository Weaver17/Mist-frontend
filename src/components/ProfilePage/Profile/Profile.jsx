import { useState, useContext, useEffect } from "react";

import CurrentUserContext from "../../../contexts/CurrentUserContext";

import Sidebar from "../Sidebar/Sidebar";
import EditModal from "../../Modals/EditModal/EditModal";

import "./Profile.css";
import FavoritedGames from "../FavoritedGames/FavoritedGames";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import SavedGames from "../SavedGames/SavedGames";

const Profile = ({
  handleEditClick,
  isOpen,
  handleCloseClick,
  handleEditUsername,
  isLoading,
  setIsLoading,
  handleLogOut,
  handleGameClick,
  favoritedGames,
  setFavoritedGames,
  savedGames,
  setSavedGames,
  handleRemoveFromFavorites,
}) => {
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [showFavoritedOrSaved, setShowFavoritedOrSaved] =
    useState("favoritedGames");

  const { currentUser } = useContext(CurrentUserContext);

  const handleToggleSwitchChange = () => {
    showFavoritedOrSaved === "favoritedGames"
      ? setShowFavoritedOrSaved("savedGames")
      : setShowFavoritedOrSaved("favoritedGames");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpened(!isMobileMenuOpened);
  };

  const handleMobileEditClick = () => {
    handleEditClick();
    setMobileMenuOpened(!isMobileMenuOpened);
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
          favoritedGames={favoritedGames}
          savedGames={savedGames}
        />
      </section>
      <div className="profile__mobile-btn-container">
        <button
          className="profile__mobile-btn"
          type="button"
          onClick={toggleMobileMenu}
        >
          {currentUser?.username}{" "}
        </button>
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
      </div>
      <section className="profile__games">
        <ToggleSwitch
          handleToggleSwitchChange={handleToggleSwitchChange}
          showFavoritedOrSaved={showFavoritedOrSaved}
          setShowFavoritedOrSaved={setShowFavoritedOrSaved}
        />
        {showFavoritedOrSaved === "favoritedGames" ? (
          <FavoritedGames
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            handleGameClick={handleGameClick}
            favoritedGames={favoritedGames}
            setFavoritedGames={setFavoritedGames}
            savedGames={savedGames}
            setSavedGames={setSavedGames}
            handleRemoveFromFavorites={handleRemoveFromFavorites}
          />
        ) : (
          <SavedGames
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            handleGameClick={handleGameClick}
            favoritedGames={favoritedGames}
            setFavoritedGames={setFavoritedGames}
            savedGames={savedGames}
            setSavedGames={setSavedGames}
            handleRemoveFromFavorites={handleRemoveFromFavorites}
          />
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

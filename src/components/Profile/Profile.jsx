import { useState, useContext, useEffect } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import Sidebar from "../Sidebar/Sidebar";
import EditModal from "../EditModal/EditModal";

import "./Profile.css";
import FavoritedGames from "../FavoritedGames/FavoritedGames";

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
}) => {
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

  const { currentUser } = useContext(CurrentUserContext);

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
        />
      </section>

      <section className="profile__games">
        <FavoritedGames
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          handleGameClick={handleGameClick}
          favoritedGames={favoritedGames}
          setFavoritedGames={setFavoritedGames}
        />
        <button
          className="profile__mobile-btn"
          type="button"
          onClick={toggleMobileMenu}
        >
          {currentUser?.username}
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

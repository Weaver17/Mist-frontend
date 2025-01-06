import { useState, useContext, useEffect } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import Sidebar from "../Sidebar/Sidebar";
import EditModal from "../EditModal/EditModal";

import "./Profile.css";

const Profile = ({
  handleEditClick,
  isOpen,
  handleCloseClick,
  handleEditUsername,
  isLoading,
  handleLogOut,
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
        />
      </section>

      <section className="profile__games">
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

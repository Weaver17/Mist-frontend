import { useState } from "react";

import Sidebar from "../Sidebar/Sidebar";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import GameCard from "../GameCard/GameCard";

import "./Profile.css";

const Profile = () => {
  const [isFavoritesChecked, setIsFavoritesChecked] = useState(true);

  const toggleFavoritesAndSaved = () => {
    setIsFavoritesChecked(!isFavoritesChecked);
  };

  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpened(!isMobileMenuOpened);
  };
  return (
    <div className="profile">
      {/* SIDEBAR  */}
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      {/* GAMES  */}
      <section className="profile__games">
        <button
          className="profile__mobile-btn"
          type="button"
          onClick={toggleMobileMenu}
        ></button>
        {/* TOGGLE SWITCH  */}
        <div className="profile__games-switch">
          <ToggleSwitch
            toggleFavoritesAndSaved={toggleFavoritesAndSaved}
            isFavoritesChecked={isFavoritesChecked}
          />
        </div>
        <div className="profile__games-list-container">
          {/* FAVE/SAVE LISTS  */}
          {isFavoritesChecked ? (
            <ul className="profile__games-list profile__games-list_favorites">
              <GameCard />
              <GameCard />
            </ul>
          ) : (
            <ul className="profile__games-list profile__games-list_saved">
              <GameCard />
              <GameCard />
              <GameCard />
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
              <button type="button" className="sidebar__edit">
                Change Username
              </button>

              <button type="button" className="sidebar__logout">
                Log out
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;

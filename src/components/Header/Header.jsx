import { useState } from "react";
import { Link } from "react-router-dom";

import searchBtn from "../../assets/btns/search-btn.png";
import mobileMenuBtn from "../../assets/btns/mobile-menu-btn.png";
import mobileCloseBtnBlue from "../../assets/btns/close-btn-blue.png";
import "./Header.css";

const Header = () => {
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpened(!isMobileMenuOpened);
  };
  return (
    <div className="header">
      {/* LEFT/LOGO SECTION */}
      <div className="header__logo-container">
        <Link className="header__logo-link" to="/">
          <div className="header__logo">
            <div className="header__logo-bar-one"></div>
            <h1 className="header__logo-text">MIST</h1>
            <div className="header__logo-bar-two"></div>
          </div>
        </Link>
      </div>
      {/* SEARCH BAR */}
      <div className="header__search-bar">
        <button className="header__search-btn" type="submit">
          <img
            className="header__search-icon"
            src={searchBtn}
            alt="search icon"
          />
        </button>
        <input
          className="header__search-input"
          type="search"
          placeholder="Search"
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="header__right-container">
        {/* TABS */}
        <Link className="header__tab-link" to="/">
          <p className="header__tab header__tab_active">Home</p>
        </Link>
        <Link className="header__tab-link" to="/categories">
          <p className="header__tab">Categories</p>
        </Link>
        <Link className="header__tab-link" to="/games">
          <p className="header__tab">All Games</p>
        </Link>

        {/* PROFILE BUTTONS */}
        <button type="button" className="header__btn header__btn_login">
          Sign In
        </button>
        <button type="button" className="header__btn header__btn_register">
          Sign Up
        </button>
      </div>

      <div className="header__mobile-btn-container">
        {/* MOBILE REGISTER BTN */}

        <button className="header__mobile-register-btn" type="button">
          Sign Up
        </button>

        {/* MOBILE OPEN/CLOSE BTNS */}
        <button
          className="header__mobile-btn"
          type="button"
          onClick={toggleMobileMenu}
        >
          {!isMobileMenuOpened ? (
            <img
              className="header__mobile-btn"
              src={mobileMenuBtn}
              alt="Mobile Menu Button"
            />
          ) : (
            <img
              className="header__mobile-close-btn"
              src={mobileCloseBtnBlue}
              alt="Mobile Close Button"
            />
          )}
        </button>
      </div>
      {/* MOBILE MENU */}
      {isMobileMenuOpened && (
        <div className="header__mobile">
          <div className="header__mobile-container">
            <button className="header__mobile-login-btn" type="button">
              Sign in
            </button>

            {/* MOBILE TABS */}
            <Link className="header__mobile-tab-link" to="/">
              <p className="header__mobile-tab header__mobile-tab_active">
                Home
              </p>
            </Link>
            <Link className="header__mobile-tab-link" to="/categories">
              <p className="header__mobile-tab">Categories</p>
            </Link>
            <Link className="header__mobile-tab-link" to="/games">
              <p className="header__mobile-tab">All Games</p>
            </Link>

            {/* MOBILE SEARCH */}
            <div className="header__mobile-search-bar">
              <button className="header__mobile-search-btn" type="submit">
                <img
                  className="header__mobile-search-icon"
                  src={searchBtn}
                  alt="search icon"
                />
              </button>
              <input
                className="header__mobile-search-input"
                type="search"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

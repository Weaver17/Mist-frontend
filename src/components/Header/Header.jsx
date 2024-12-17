import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import mobileMenuBtn from "../../assets/btns/mobile-menu-btn.png";
import mobileCloseBtnBlue from "../../assets/btns/close-btn-blue.png";
import "./Header.css";

const Header = ({ handleSignUpClick, handleSignInClick, isLoggedIn }) => {
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

  const { currentUser } = useContext(CurrentUserContext);

  const toggleMobileMenu = () => {
    setMobileMenuOpened(!isMobileMenuOpened);
  };
  return (
    <header className="header">
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

      {/* RIGHT SECTION */}
      <nav className="header__right-container">
        {/* TABS */}
        <NavLink className="header__tab-link" to="/">
          <p className="header__tab ">Home</p>
        </NavLink>
        <NavLink className="header__tab-link" to="/search">
          <p className="header__tab">Search</p>
        </NavLink>
        <NavLink className="header__tab-link" to="/games">
          <p className="header__tab">All Games</p>
        </NavLink>

        {/* PROFILE BUTTONS */}
        {isLoggedIn ? (
          <div className="header__signed-container">
            <Link className="header__btn-link" to="/profile">
              <button className="header__btn header__btn_profile" type="button">
                {currentUser?.username}
              </button>
            </Link>
          </div>
        ) : (
          <div className="header__signed-container">
            <button
              type="button"
              className="header__btn header__btn_login"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
            <button
              type="button"
              className="header__btn header__btn_register"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>

      <div className="header__mobile-btn-container">
        {/* MOBILE REGISTER BTN */}
        {isLoggedIn ? (
          <div className="header__signed-container">
            <Link className="header__btn-link" to="/profile">
              <button className="header__mobile-profile-btn" type="button">
                {currentUser?.username}
              </button>
            </Link>
          </div>
        ) : (
          <div className="header__signed-container">
            <button
              className="header__mobile-register-btn"
              type="button"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
        )}

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
          <nav className="header__mobile-container">
            <div className="header__mobile-login-btn-container">
              {isLoggedIn ? (
                <div className="header__mobile-login-btn-hidden"></div>
              ) : (
                <button className="header__mobile-login-btn" type="button">
                  Sign in
                </button>
              )}
            </div>

            {/* MOBILE TABS */}
            <NavLink className="header__mobile-tab-link" to="/">
              <p className="header__mobile-tab">Home</p>
            </NavLink>
            <NavLink className="header__mobile-tab-link" to="/search">
              <p className="header__mobile-tab">Search</p>
            </NavLink>
            <NavLink className="header__mobile-tab-link" to="/games">
              <p className="header__mobile-tab">All Games</p>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

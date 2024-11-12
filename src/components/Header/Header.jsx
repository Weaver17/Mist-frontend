import { useState } from "react";
import { Link } from "react-router-dom";

import mobileMenuBtn from "../../assets/btns/mobile-menu-btn.png";
import mobileCloseBtnBlue from "../../assets/btns/close-btn-blue.png";
import "./Header.css";

const Header = ({ handleSignUpClick, handleSignInClick }) => {
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

      {/* RIGHT SECTION */}
      <div className="header__right-container">
        {/* TABS */}
        <Link className="header__tab-link" to="/">
          <p className="header__tab header__tab_active">Home</p>
        </Link>
        <Link className="header__tab-link" to="/search">
          <p className="header__tab">Search</p>
        </Link>
        <Link className="header__tab-link" to="/games">
          <p className="header__tab">All Games</p>
        </Link>

        {/* PROFILE BUTTONS */}
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
            <Link className="header__mobile-tab-link" to="/search">
              <p className="header__mobile-tab">Search</p>
            </Link>
            <Link className="header__mobile-tab-link" to="/games">
              <p className="header__mobile-tab">All Games</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

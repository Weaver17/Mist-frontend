import { Link, NavLink } from "react-router-dom";

import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links-container">
        <div className="footer__nav">
          <NavLink className="footer__nav-link" to="/games">
            <p className="footer__nav-link-text">Games</p>
          </NavLink>
          <NavLink className="footer__nav-link" to="/search">
            <p className="footer__nav-link-text">Search</p>
          </NavLink>
          <NavLink className="footer__nav-link" to="/about">
            <p className="footer__nav-link-text">About</p>
          </NavLink>
        </div>
        <div className="footer__social-icons">
          <Link
            className="footer__nav-link footer__nav-link_icon"
            to="https://facebook.com"
            target="_blank"
          >
            <FaFacebook className="footer__social-icon" />
          </Link>
          <Link
            className="footer__nav-link footer__nav-link_icon"
            to="https://instagram.com"
            target="_blank"
          >
            <FaInstagram className="footer__social-icon" />
          </Link>
          <Link
            className="footer__nav-link footer__nav-link_icon"
            to="https://x.com"
            target="_blank"
          >
            <FaXTwitter className="footer__social-icon" />
          </Link>
        </div>
      </div>
      <p className="footer__signature">
        Developed in 2024 by Andrew Weaver with the help of{" "}
        <Link
          className="footer__nav-link footer__nav-link_thin"
          to="https://tripleten.com"
          target="_blank"
        >
          TripleTen
        </Link>{" "}
        and
        <Link
          className="footer__nav-link footer__nav-link_thin"
          to="https://www.freetogame.com"
          target="_blank"
        >
          {" "}
          www.freetogame.com
        </Link>
      </p>
    </footer>
  );
};

export default Footer;

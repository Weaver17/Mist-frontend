import { Link } from "react-router-dom";

import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__links-container">
        <div className="footer__nav">
          <Link className="footer__nav-link" to="/games">
            <p className="footer__nav-link-text">Games</p>
          </Link>
          <Link className="footer__nav-link" to="/search">
            <p className="footer__nav-link-text">Search</p>
          </Link>
          <Link className="footer__nav-link" to="/about">
            <p className="footer__nav-link-text">About</p>
          </Link>
        </div>
        <div className="footer__social-icons">
          <FaFacebook className="footer__social-icon" />
          <FaInstagram className="footer__social-icon" />
          <FaXTwitter className="footer__social-icon" />
        </div>
      </div>
      <p className="footer__signature">
        Developed in 2024 by Andrew Weaver with the help of TripleTen and
        <Link
          className="footer__nav-link footer__nav-link_thin"
          to="https://www.freetogame.com"
        >
          {" "}
          www.freetogame.com
        </Link>
      </p>
    </div>
  );
};

export default Footer;

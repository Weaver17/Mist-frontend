import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__links-container">
        <div className="footer__nav">
          <p className="footer__nav-link">
            {/* <Link to="/">Home</Link> */}Games
          </p>
          <p className="footer__nav-link">
            {/* <Link to="/">Home</Link> */}Categories
          </p>
          <p className="footer__nav-link">
            {/* <Link to="/">Home</Link> */}About
          </p>
        </div>
        <div className="footer__social-icons">
          <FaFacebook className="footer__social-icon" />
          <FaInstagram className="footer__social-icon" />
          <FaXTwitter className="footer__social-icon" />
        </div>
      </div>
      <p className="footer__signature">
        Developed in 2024 by Andrew Weaver with the help of TripleTen and
        www.freetogame.com{" "}
      </p>
    </div>
  );
};

export default Footer;

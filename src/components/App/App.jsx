import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Preloader from "../Preloader/Preloader";

import "./App.css";

import Header from "../Header/Header";
import GameIconBanner from "../GameIconBanner/GameIconBanner";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import GamesSection from "../GamesSection/GamesSection";
import SearchPage from "../SearchPage/SearchPage";
import About from "../About/About";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import CompletedModal from "../CompletedModal/CompletedModal";
import GameModal from "../GameModal/GameModal";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState({});
  const [selectedImage, setSelectedImage] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleSignInClick = () => {
    setActiveModal("signin");
  };

  const handleRegistration = (values) => {
    // Sign up logic
    handleRegistrationClick();
  };

  const handleRegistrationClick = () => {
    setActiveModal("completed");
  };

  const handleLogin = (values) => {
    // Sign up logic
  };

  const handleGameTitleClick = (game) => {
    setActiveModal("game");
    setSelectedGame(game);
  };

  const handleImageClick = (image) => {
    setActiveModal("image");
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setActiveModal("game");
  };

  const handleEditClick = () => {
    setActiveModal("edit");
  };

  const handleEditUsername = (values) => {
    // set up logic
  };

  return (
    <div className="page">
      <div className="page__content">
        {/* <Preloader /> */}
        <Header
          isLoggedIn={isLoggedIn}
          handleSignUpClick={handleSignUpClick}
          handleSignInClick={handleSignInClick}
        />
        <GameIconBanner />

        <Routes>
          <Route
            path="/"
            element={<Main handleGameTitleClick={handleGameTitleClick} />}
          />
          <Route
            path="profile"
            element={
              <Profile
                handleEditClick={handleEditClick}
                isOpen={activeModal === "edit"}
                handleCloseClick={closeActiveModal}
                handleEditUsername={handleEditUsername}
                isLoading={isLoading}
              />
            }
          />
          <Route path="games" element={<GamesSection />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="about" element={<About />} />
        </Routes>
        <Footer />
      </div>

      <RegisterModal
        handleSignInClick={handleSignInClick}
        isOpen={activeModal === "register"}
        handleCloseClick={closeActiveModal}
        handleRegistrationClick={handleRegistrationClick}
        handleRegistration={handleRegistration}
      />
      <LoginModal
        handleSignUpClick={handleSignUpClick}
        isOpen={activeModal === "signin"}
        handleCloseClick={closeActiveModal}
        handleLogin={handleLogin}
      />

      <CompletedModal
        isOpen={activeModal === "completed"}
        handleSignInClick={handleSignInClick}
      />
      <GameModal
        handleImageClick={handleImageClick}
        handleCloseClick={closeActiveModal}
        isOpen={activeModal === "game"}
      />
      <ImageModal
        handleCloseClick={closeImageModal}
        isOpen={activeModal === "image"}
      />
    </div>
  );
}

export default App;

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
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import CompletedModal from "../CompletedModal/CompletedModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="page">
      <div className="page__content">
        {/* <Preloader /> */}
        <Header
          handleSignUpClick={handleSignUpClick}
          handleSignInClick={handleSignInClick}
        />
        <GameIconBanner />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="profile" element={<Profile />} />
          <Route path="games" element={<GamesSection />} />
          <Route path="search" element={<SearchPage />} />
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
      />

      <CompletedModal
        isOpen={activeModal === "completed"}
        handleSignInClick={handleSignInClick}
      />
    </div>
  );
}

export default App;

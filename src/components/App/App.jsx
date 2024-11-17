import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import {
  getGamesByReleaseDate,
  getAllGames,
  getGameById,
} from "../../utils/gameApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";

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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState({});
  // const [selectedImage, setSelectedImage] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [games, setGames] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    username: "",
    email: "",
  });

  const navigate = useNavigate();

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

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setActiveModal("game");
    console.log(game);
  };

  // const handleImageClick = (gameImg) => {
  //   setActiveModal("image");
  //   setSelectedImage(gameImg);
  // };

  // const closeImageModal = () => {
  //   setActiveModal("game");
  //   setSelectedGame(selectedGame);
  // };

  const handleEditClick = () => {
    setActiveModal("edit");
  };

  const handleEditUsername = (values) => {
    // set up logic
  };

  const getGameIds = () => {
    const gameId = games.map((game) => {
      return game.id;
    });
    return gameId;
  };

  useEffect(() => {
    getGamesByReleaseDate()
      .then((items) => {
        setIsLoading(true);
        setGames(items);
      })
      .catch(console.error)
      .finally(setIsLoading(false));
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, setIsLoggedIn }}
    >
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
              element={
                <Main
                  handleGameClick={handleGameClick}
                  games={games}
                  isLoading={isLoading}
                  selectedGame={selectedGame}
                />
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile
                    handleEditClick={handleEditClick}
                    isOpen={activeModal === "edit"}
                    handleCloseClick={closeActiveModal}
                    handleEditUsername={handleEditUsername}
                    isLoading={isLoading}
                    games={games}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="games" element={<GamesSection games={games} />} />
            <Route path="search" element={<SearchPage games={games} />} />
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
          handleCloseClick={closeActiveModal}
          isOpen={activeModal === "game"}
          game={selectedGame}
        />
        {/* <ImageModal
        game={selectedGame}
        handleCloseClick={closeImageModal}
        isOpen={activeModal === "image"}
      /> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

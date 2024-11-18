import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import {
  getGamesByReleaseDate,
  getAllGames,
  getGameById,
} from "../../utils/gameApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import FavoriteGameContext from "../../contexts/FavoriteGameContext";
import SavedGamesContext from "../../contexts/SavedGamesContext";
import * as auth from "../../utils/auth";

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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState({});
  // const [selectedImage, setSelectedImage] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [games, setGames] = useState([]);
  const [favoritedGames, setFavoritedGames] = useState([]);
  const [savedGames, setSavedGames] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
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

  const handleRegistration = (username, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return;
    }

    auth
      .register(username, email, password)
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
        console.log(username, email, password);
      });
    handleRegistrationClick();
  };

  const handleRegistrationClick = () => {
    setActiveModal("completed");
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem("JWT_TOKEN", data.token);
        setIsLoggedIn(true);
        setCurrentUser(data);
        console.log("Token received:", data.token);
        closeActiveModal();

        return auth.checkToken(data.token);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem("JWT_TOKEN");
    navigate("/");
    setIsLoggedIn(false);
  };

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setActiveModal("game");
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
    console.log(currentUser.username);
  };

  const handleEditUsername = (data) => {
    const token = localStorage.getItem("JWT_TOKEN");

    auth
      .editUsername(data)
      .then(() => {
        setCurrentUser(data);

        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleFavoriteGame = (game) => {
    const token = localStorage.getItem("JWT_TOKEN");

    const favorited = {
      favorited: favoritedGames.some((favGame) => favGame.id === game.id),
      owner: currentUser?._id,
    };

    if (!favorited.favorited) {
      setFavoritedGames((prev) => [...prev, game]);
    } else {
      setFavoritedGames((prev) =>
        prev.filter((favGame) => favGame.id !== game.id)
      );
    }
    game.isFavorited = !game.isFavorited;
  };

  const handleSaveGame = (game) => {
    const token = localStorage.getItem("JWT_TOKEN");

    const saved = {
      saved: savedGames.some((savGame) => savGame.id === game.id),
      owner: currentUser?._id,
    };

    if (!saved.saved) {
      setSavedGames((prev) => [...prev, game]);
    } else {
      setSavedGames((prev) => prev.filter((favGame) => favGame.id !== game.id));
    }
    game.isSaved = !game.isSaved;
  };

  useEffect(() => {
    getGamesByReleaseDate()
      .then((items) => {
        setGames(items);
      })
      .catch(console.error)
      .finally(setIsLoading(false));
  }, [getGamesByReleaseDate]);

  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");

    if (!token) {
      console.log("token not found, user is not logged in.");
      return;
    }

    auth
      .checkToken(token, currentUser?.user?.email, currentUser?.user?.password)
      .then((data) => {
        console.log(data);

        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, setIsLoggedIn }}
    >
      <FavoriteGameContext.Provider
        value={{ favoritedGames, setFavoritedGames }}
      >
        <SavedGamesContext.Provider value={{ savedGames, setSavedGames }}>
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
                      handleFavoriteGame={handleFavoriteGame}
                      handleGameClick={handleGameClick}
                      games={games}
                      isLoading={isLoading}
                      selectedGame={selectedGame}
                      handleSaveGame={handleSaveGame}
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
                        handleEditUsername={handleEditUsername}
                        handleLogOut={handleLogOut}
                        games={games}
                        handleCloseClick={closeActiveModal}
                        isLoading={isLoading}
                        handleGameClick={handleGameClick}
                        selectedGame={selectedGame}
                        handleFavoriteGame={handleFavoriteGame}
                        handleSaveGame={handleSaveGame}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="games"
                  element={
                    <GamesSection
                      games={games}
                      handleCloseClick={closeActiveModal}
                      isLoading={isLoading}
                      handleGameClick={handleGameClick}
                      selectedGame={selectedGame}
                      handleFavoriteGame={handleFavoriteGame}
                    />
                  }
                />
                <Route
                  path="search"
                  element={
                    <SearchPage
                      games={games}
                      handleCloseClick={closeActiveModal}
                      isLoading={isLoading}
                      handleGameClick={handleGameClick}
                      selectedGame={selectedGame}
                      handleFavoriteGame={handleFavoriteGame}
                    />
                  }
                />
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
        </SavedGamesContext.Provider>
      </FavoriteGameContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

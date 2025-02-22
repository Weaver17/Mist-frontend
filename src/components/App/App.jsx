import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import * as favedApi from "../../utils/favorited";
import * as savedApi from "../../utils/saved";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [games, setGames] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
  });
  const [favoritedGames, setFavoritedGames] = useState([]);
  const [savedGames, setSavedGames] = useState([]);

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
    setIsLoading(true);
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
    setIsLoading(true);

    if (!email || !password) {
      return;
    }

    auth
      .login(email, password)
      .then((data) => {
        setIsLoggedIn(true);
        console.log(data);

        localStorage.setItem("JWT_TOKEN", data.token);
        closeActiveModal();

        return auth.checkToken(data.token);
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
        }
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

  const handleEditClick = () => {
    setActiveModal("edit");
    console.log(currentUser);
  };

  const handleEditUsername = (data) => {
    const token = localStorage.getItem("JWT_TOKEN");
    console.log(data);

    auth
      .editProfile(data, token)
      .then(() => {
        setCurrentUser(data);

        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");

    if (!token) {
      return console.log("Token not found, user is not logged in.");
    }

    auth
      .checkToken(token)

      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  // Favorite Games
  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    setIsLoading(true);
    favedApi
      .getFavoritedGames(token)
      .then((games) => {
        console.log(games.favoritedGames.map((game) => game._id));
        setFavoritedGames(games.favoritedGames);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Saved Games
  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    setIsLoading(true);
    savedApi
      .getSavedGames(token)
      .then((games) => {
        console.log(games.savedGames.map((game) => game._id));
        setSavedGames(games.savedGames);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, setIsLoggedIn }}
    >
      <div className="page">
        <div className="page__content">
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
                  setGames={setGames}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  selectedGame={selectedGame}
                  favoritedGames={favoritedGames}
                  setFavoritedGames={setFavoritedGames}
                  savedGames={savedGames}
                  setSavedGames={setSavedGames}
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
                    favoritedGames={favoritedGames}
                    setFavoritedGames={setFavoritedGames}
                    savedGames={savedGames}
                    setSavedGames={setSavedGames}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="games"
              element={
                <GamesSection
                  setGames={setGames}
                  games={games}
                  handleCloseClick={closeActiveModal}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  handleGameClick={handleGameClick}
                  favoritedGames={favoritedGames}
                  setFavoritedGames={setFavoritedGames}
                  savedGames={savedGames}
                  setSavedGames={setSavedGames}
                />
              }
            />

            <Route
              path="search"
              element={
                <SearchPage
                  handleGameClick={handleGameClick}
                  games={games}
                  setGames={setGames}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  selectedGame={selectedGame}
                  favoritedGames={favoritedGames}
                  setFavoritedGames={setFavoritedGames}
                  savedGames={savedGames}
                  setSavedGames={setSavedGames}
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
          handleCloseClick={closeActiveModal}
        />
        <GameModal
          handleCloseClick={closeActiveModal}
          isOpen={activeModal === "game"}
          game={selectedGame}
          favoritedGames={favoritedGames}
          setFavoritedGames={setFavoritedGames}
          savedGames={savedGames}
          setSavedGames={setSavedGames}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

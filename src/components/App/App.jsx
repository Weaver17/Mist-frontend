import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

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
import { addFavoriteGame, removeFavoriteGame } from "../../utils/favorites";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState({});
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

  // ORIGINAL
  // const handleFavoriteGame = (game) => {
  //   const favorited = {
  //     favorited: favoritedGames.some((favGame) => favGame.id === game.id),
  //     owner: currentUser?._id,
  //   };

  //   if (!favorited.favorited) {
  //     setFavoritedGames((prev) => [...prev, game]);
  //   } else {
  //     setFavoritedGames((prev) =>
  //       prev.filter((favGame) => favGame.id !== game.id)
  //     );
  //   }
  //   game.isFavorited = !game.isFavorited;
  // };

  const updateFavorites = (updatedFavorites) => {
    setFavoritedGames(updatedFavorites);
  };

  // BUTCHERED
  const handleFavoriteGame = (game, user) => {
    const token = localStorage.getItem("JWT_TOKEN");

    user = currentUser;

    // Check if the game is already favorited
    const isFavorited = favoritedGames.some(
      (favGame) => favGame.id === game.id
    );

    console.log(favoritedGames);

    try {
      if (!isFavorited) {
        // Add to favorites via API
        addFavoriteGame(game, token, user).then(() => {
          // Add game to Context state
          updateFavorites([...favoritedGames, game]);
        });
      } else {
        // Remove from favorites via API
        removeFavoriteGame(game, { token, _id }).then(() => {
          // Remove game from Context state
          updateFavorites(
            favoritedGames.filter((favGame) => favGame.id !== game.id)
          );
        });
      }

      // Update the game's `isFavorited` status
      game.isFavorited = !isFavorited;
    } catch (error) {
      console.error("Error handling favorite game:", error.message);
      alert("An error occurred while updating favorites.");
    }
  };

  const handleSaveGame = (game) => {
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
    const token = localStorage.getItem("JWT_TOKEN");

    if (!token) {
      console.log("Token not found, user is not logged in.");
      return;
    }

    auth
      .checkToken(token)

      .then((user) => {
        console.log(user);
        console.log(token);

        setCurrentUser(user);
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
                      setGames={setGames}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
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
                      setGames={setGames}
                      games={games}
                      handleCloseClick={closeActiveModal}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      handleGameClick={handleGameClick}
                      handleFavoriteGame={handleFavoriteGame}
                      handleSaveGame={handleSaveGame}
                    />
                  }
                />

                <Route
                  path="search"
                  element={
                    <SearchPage
                      handleFavoriteGame={handleFavoriteGame}
                      handleGameClick={handleGameClick}
                      games={games}
                      setGames={setGames}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      selectedGame={selectedGame}
                      handleSaveGame={handleSaveGame}
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
          </div>
        </SavedGamesContext.Provider>
      </FavoriteGameContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

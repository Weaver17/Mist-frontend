import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { GameProvider } from "../../contexts/GameContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import * as favedApi from "../../utils/favorited";
import * as savedApi from "../../utils/saved";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../ProfilePage/Profile/Profile";
import GamesSection from "../GamesSection/GamesSection";
import SearchPage from "../SearchPage/SearchPage";
import About from "../About/About";
import Footer from "../Footer/Footer";
import RegisterModal from "../Modals/RegisterModal/RegisterModal";
import LoginModal from "../Modals/LoginModal/LoginModal";
import CompletedModal from "../Modals/CompletedModal/CompletedModal";
import GameModal from "../Modals/GameModal/GameModal";
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
    const [scrollPosition, setScrollPosition] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [shotToTop, setshowToTop] = useState("main__to-top-btn_hidden");
    const [showPassword, setShowPassword] = useState(false);

    const token = localStorage.getItem("JWT_TOKEN");

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

    const handleRegistration = (username, email, password) => {
        setIsLoading(true);

        auth.register(username, email, password)
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
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

        auth.login(email, password)
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
        console.log(data);

        auth.editProfile(data, token)
            .then(() => {
                setCurrentUser(data);

                closeActiveModal();
            })
            .catch(console.error);
    };

    const handleRemoveFromFavorites = (gameId, mongoId) => {
        setFavoritedGames((prevGames) =>
            prevGames.filter(
                (game) => game.id !== gameId && game._id !== mongoId
            )
        );
    };

    const handleToTopBtn = useCallback(() => {
        const position = window.scrollY;
        setScrollPosition(position);

        if (position > 100) {
            setshowToTop("main__to-top-btn");
        } else {
            setshowToTop("main__to-top-btn_hidden");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const refScrollUp = useRef();

    const onToTopClick = () => {
        refScrollUp.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleToTopBtn);

        if (!token) {
            return console.log("Token not found, user is not logged in.");
        }

        auth.checkToken(token)

            .then((user) => {
                setCurrentUser(user);
                setIsLoggedIn(true);
            })
            .catch(console.error);
    }, [handleToTopBtn, token]);

    // Favorited Games
    useEffect(() => {
        if (isLoggedIn) {
            setIsLoading(true);
            favedApi
                .getFavoritedGames(token)
                .then((games) => {
                    setFavoritedGames(games.favoritedGames);
                })
                .catch(console.error)
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [isLoggedIn, token]);

    // Saved Games
    useEffect(() => {
        if (isLoggedIn) {
            setIsLoading(true);
            savedApi
                .getSavedGames(token)
                .then((games) => {
                    setSavedGames(games.savedGames);
                })
                .catch(console.error)
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [isLoggedIn, token]);

    const currentUserContextValue = useMemo(
        () => ({ currentUser, isLoggedIn, setIsLoggedIn }),
        [currentUser, isLoggedIn, setIsLoggedIn]
    );

    return (
        <GameProvider>
            <CurrentUserContext.Provider value={currentUserContextValue}>
                <div className="page">
                    <div className="page__content" ref={refScrollUp}>
                        <Header
                            isLoggedIn={isLoggedIn}
                            handleSignUpClick={handleSignUpClick}
                            handleSignInClick={handleSignInClick}
                        />

                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Main
                                        handleGameClick={handleGameClick}
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                        selectedGame={selectedGame}
                                        favoritedGames={favoritedGames}
                                        setFavoritedGames={setFavoritedGames}
                                        savedGames={savedGames}
                                        setSavedGames={setSavedGames}
                                        handleRemoveFromFavorites={
                                            handleRemoveFromFavorites
                                        }
                                        onToTopClick={onToTopClick}
                                        scrollPosition={scrollPosition}
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
                                            handleEditUsername={
                                                handleEditUsername
                                            }
                                            handleLogOut={handleLogOut}
                                            games={games}
                                            handleCloseClick={closeActiveModal}
                                            isLoading={isLoading}
                                            handleGameClick={handleGameClick}
                                            favoritedGames={favoritedGames}
                                            setFavoritedGames={
                                                setFavoritedGames
                                            }
                                            savedGames={savedGames}
                                            setSavedGames={setSavedGames}
                                            handleRemoveFromFavorites={
                                                handleRemoveFromFavorites
                                            }
                                            onToTopClick={onToTopClick}
                                            scrollPosition={scrollPosition}
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
                                        handleRemoveFromFavorites={
                                            handleRemoveFromFavorites
                                        }
                                        onToTopClick={onToTopClick}
                                        scrollPosition={scrollPosition}
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
                                        handleRemoveFromFavorites={
                                            handleRemoveFromFavorites
                                        }
                                        onToTopClick={onToTopClick}
                                        scrollPosition={scrollPosition}
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
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                    />
                    <LoginModal
                        handleSignUpClick={handleSignUpClick}
                        isOpen={activeModal === "signin"}
                        handleCloseClick={closeActiveModal}
                        handleLogin={handleLogin}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
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
        </GameProvider>
    );
}

export default App;

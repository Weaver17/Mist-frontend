import { useState, useEffect } from "react";

import GameCard from "../GameCard/GameCard";
import Preloader from "../Preloader/Preloader";

import "./SearchPage.css";

import closeBtn from "../../assets/btns/close-btn.png";
import ShowMoreBtn from "../Buttons/ShowMoreBtn/ShowMoreBtn";
import { useGames } from "../../contexts/GameContext";
import ToTopBtn from "../Buttons/ToTopBtn/ToTopBtn";

const SearchPage = ({
    handleGameClick,
    favoritedGames,
    setFavoritedGames,
    savedGames,
    setSavedGames,
    onToTopClick,
    scrollPosition,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredGames, setFilteredGames] = useState([]);

    const { games, isLoading, getNewestGames, visibleCount } = useGames();

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        getNewestGames();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredGames(games);
        } else {
            const filtered = games.filter((game) =>
                game.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredGames(filtered);
        }
    }, [searchQuery, games]);

    return (
        <section className="search">
            <div className="search__heading-border">
                <h2 className="search__heading">Search</h2>
            </div>
            {/* SEARCH BAR */}
            <div className="search__bar">
                <input
                    className="search__input"
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                {searchQuery && (
                    <button
                        className="search__btn"
                        type="button"
                        onClick={() => setSearchQuery("")}
                    >
                        <img
                            className="search__icon"
                            src={closeBtn}
                            alt="Clear search"
                        />
                    </button>
                )}
            </div>
            {/* SEARCH RESULTS-- NEEDS LOGIC FOR 'NO GAMES FOUND' */}
            <h3 className="search__results-heading">Search Results:</h3>
            {(() => {
                if (isLoading) {
                    return (
                        <ul className="search__results">
                            <Preloader />
                        </ul>
                    );
                }
                let gamesToShow =
                    filteredGames.length > 0
                        ? filteredGames.slice(0, visibleCount)
                        : games.slice(0, visibleCount);
                return (
                    <ul className="search__results">
                        {gamesToShow.map((game) => (
                            <GameCard
                                key={game.id}
                                game={game}
                                onGameClick={handleGameClick}
                                favoritedGames={favoritedGames}
                                setFavoritedGames={setFavoritedGames}
                                savedGames={savedGames}
                                setSavedGames={setSavedGames}
                            />
                        ))}
                    </ul>
                );
            })()}
            {!isLoading && visibleCount < games.length && (
                <ShowMoreBtn type="button" classModifier="search" />
            )}
            <ToTopBtn
                onToTopClick={onToTopClick}
                scrollPosition={scrollPosition}
            />
        </section>
    );
};

export default SearchPage;

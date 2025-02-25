import { useState, useEffect } from "react";

import GameCard from "../GameCard/GameCard";
import Preloader from "../Preloader/Preloader";

import "./SearchPage.css";

import searchBtn from "../../assets/btns/search-btn.png";
import ShowMoreBtn from "../Buttons/ShowMoreBtn/ShowMoreBtn";
import { useGames } from "../../contexts/GameContext";

const SearchPage = ({
  handleGameClick,
  favoritedGames,
  setFavoritedGames,
  savedGames,
  setSavedGames,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);

  const { games, isLoading, getNewestGames, visibleCount } = useGames();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    getNewestGames();
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
        <button className="search__btn" type="submit">
          <img className="search__icon" src={searchBtn} alt="search icon" />
        </button>
        <input
          className="search__input"
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {/* SEARCH RESULTS-- NEEDS LOGIC FOR 'NO GAMES FOUND' */}
      <h3 className="search__results-heading">Search Results:</h3>
      <ul className="search__results">
        {isLoading ? (
          <Preloader />
        ) : filteredGames.length > 0 ? (
          filteredGames.slice(0, visibleCount).map((game) => {
            return (
              <GameCard
                key={game.id}
                game={game}
                onGameClick={handleGameClick}
                favoritedGames={favoritedGames}
                setFavoritedGames={setFavoritedGames}
                savedGames={savedGames}
                setSavedGames={setSavedGames}
              />
            );
          })
        ) : (
          games.slice(0, visibleCount).map((game) => {
            return (
              <GameCard
                key={game.id}
                game={game}
                onGameClick={handleGameClick}
                favoritedGames={favoritedGames}
                setFavoritedGames={setFavoritedGames}
                savedGames={savedGames}
                setSavedGames={setSavedGames}
              />
            );
          })
        )}
      </ul>
      {!isLoading && visibleCount < games.length && (
        <ShowMoreBtn type="button" classModifier="search" />
      )}
    </section>
  );
};

export default SearchPage;

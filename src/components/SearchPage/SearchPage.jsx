import { useState, useContext, useEffect } from "react";

// import FavoriteGameContext from "../../contexts/FavoriteGameContext";
// import SavedGamesContext from "../../contexts/SavedGamesContext";

import GameCard from "../GameCard/GameCard";
import Preloader from "../Preloader/Preloader";

import * as gameApi from "../../utils/gameApi";

import "./SearchPage.css";

import searchBtn from "../../assets/btns/search-btn.png";

const SearchPage = ({
  handleGameClick,
  games,
  setGames,
  isLoading,
  setIsLoading,
  handleFavoriteGame,
  handleSaveGame,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  // const { favoritedGames } = useContext(FavoriteGameContext);
  // const { savedGames } = useContext(SavedGamesContext);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const onShowMoreClick = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  useEffect(() => {
    gameApi
      .getGamesByReleaseDate()
      .then((items) => {
        setGames(items);
      })
      .catch(console.error)
      .finally(setIsLoading(false));
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
            const isFavorited = favoritedGames.some(
              (favGame) => favGame.id === game.id
            );
            const isSaved = savedGames.some(
              (savGame) => savGame.id === game.id
            );
            return (
              <GameCard
                key={game.id}
                game={game}
                onGameClick={handleGameClick}
                onFavoriteGame={handleFavoriteGame}
                onSaveGame={handleSaveGame}
                isFavorited={isFavorited}
                isSaved={isSaved}
              />
            );
          })
        ) : (
          games.slice(0, visibleCount).map((game) => {
            const isFavorited = favoritedGames.some(
              (favGame) => favGame.id === game.id
            );
            const isSaved = savedGames.some(
              (savGame) => savGame.id === game.id
            );
            return (
              <GameCard
                key={game.id}
                game={game}
                onGameClick={handleGameClick}
                onFavoriteGame={handleFavoriteGame}
                onSaveGame={handleSaveGame}
                isFavorited={isFavorited}
                isSaved={isSaved}
              />
            );
          })
        )}
      </ul>
      {!isLoading && visibleCount < games.length && (
        <button
          type="button"
          onClick={onShowMoreClick}
          className="main__show-more-btn"
        >
          Show More
        </button>
      )}
    </section>
  );
};

export default SearchPage;

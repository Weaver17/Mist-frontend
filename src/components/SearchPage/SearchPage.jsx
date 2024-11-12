import "./SearchPage.css";

import searchBtn from "../../assets/btns/search-btn.png";
import GameCard from "../GameCard/GameCard";

const SearchPage = () => {
  return (
    <div className="search">
      <div className="search__heading-border">
        <h2 className="search__heading">Search</h2>
      </div>
      {/* SEARCH BAR */}
      <div className="search__bar">
        <button className="search__btn" type="submit">
          <img className="search__icon" src={searchBtn} alt="search icon" />
        </button>
        <input className="search__input" type="search" placeholder="Search" />
      </div>
      {/* SEARCH RESULTS-- NEEDS LOGIC FOR 'NO GAMES FOUND' */}
      <h3 className="search__results-heading">Search Results:</h3>
      <ul className="search__results">
        <GameCard />
        <GameCard />
      </ul>
    </div>
  );
};

export default SearchPage;

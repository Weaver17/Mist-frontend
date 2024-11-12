import { useState } from "react";

import GameCard from "../GameCard/GameCard";
import dropdownImgBlue from "../../assets/icons/dropdown-icon-blue.png";

import "./GamesSection.css";

const categories = [
  "All",
  "Shooter",
  "MMORPG",
  "MOBA",
  "Strategy",
  "MMO",
  "Racing",
  "Sports",
];

const sortOptionsArr = ["Alphabetical", "Favorites", "Release Date"];

const platforms = ["All", "Windows(PC)", "Browser"];

const GamesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOptions, setSortOptions] = useState("Alphabetical");
  const [selectedPlatform, setSelectedPlatform] = useState("All");

  return (
    <div className="games">
      <div className="games__top-section">
        <div className="games__heading-border">
          <h2 className="games__heading">Games</h2>
        </div>
        <div className="games__dropdowns-container">
          <label className="games__dropdowns-label">
            <p className="games__dropdowns-label-title">Category:</p>
            <div className="games-select-container">
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="games__select games__select_cat"
                name="category"
                id="category"
              >
                {categories.map((category, index) => (
                  <option
                    className="games__select-option"
                    key={index}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label className="games__dropdowns-label">
            <p className="games__dropdowns-label-title">Sort By:</p>
            <div className="games-select-container">
              <select
                onChange={(e) => setSortOptions(e.target.value)}
                className="games__select games__select_sort"
                name="sort"
                id="sort"
              >
                {sortOptionsArr.map((option, index) => (
                  <option
                    className="games__select-option"
                    key={index}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label className="games__dropdowns-label">
            <p className="games__dropdowns-label-title">Platform:</p>
            <div className="games-select-container">
              <select
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="games__select games__select_plat"
                name="platform"
                id="platform"
              >
                {platforms.map((platform, index) => (
                  <option
                    className="games__select-option"
                    key={index}
                    value={platform}
                  >
                    {platform}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>
      </div>
      <ul className="games__list">
        <GameCard />
      </ul>
    </div>
  );
};

export default GamesSection;

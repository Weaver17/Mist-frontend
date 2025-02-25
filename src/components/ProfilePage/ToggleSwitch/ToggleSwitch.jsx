import { useState, useContext, useEffect } from "react";

import "./ToggleSwitch.css";

const ToggleSwitch = ({
  handleToggleSwitchChange,
  showFavoritedOrSaved,
  setShowFavoritedOrSaved,
}) => {
  const [isChecked, setIsChecked] = useState(
    showFavoritedOrSaved === "favoritedGames"
  );
  useEffect(() => {
    setIsChecked(showFavoritedOrSaved === "favoritedGames");
  }, [showFavoritedOrSaved]);

  return (
    <div className="toggle-switch">
      <label htmlFor="temp-switch-checkbox" className="toggle-switch__label">
        <input
          className="toggle-switch_checkbox"
          type="checkbox"
          id="temp-switch-checkbox"
          name="temp-switch-checkbox"
          value={showFavoritedOrSaved}
          onChange={handleToggleSwitchChange}
          checked={isChecked}
        />
        <span
          className={
            showFavoritedOrSaved === "favoritedGames"
              ? "toggle-switch__slider toggle-switch__slider_F"
              : "toggle-switch__slider toggle-switch__slider_C"
          }
        ></span>
        <p
          className={`toggle-switch__temp_F ${
            showFavoritedOrSaved === "favoritedGames" &&
            "toggle-switch__temp_active"
          }`}
        >
          Faved
        </p>
        <p
          className={`toggle-switch__temp_C ${
            showFavoritedOrSaved === "savedGames" &&
            "toggle-switch__temp_active"
          }`}
        >
          Saved
        </p>
      </label>
    </div>
  );
};

export default ToggleSwitch;

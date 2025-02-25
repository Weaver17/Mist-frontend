import React from "react";

import "./ShowMoreBtn.css";
import { useGames } from "../../../contexts/GameContext";

const ShowMoreBtn = ({ type, classModifier }) => {
  const { onShowMoreClick } = useGames();
  return (
    <button
      type={type}
      onClick={onShowMoreClick}
      className={`show-more-btn show-more-btn_${classModifier}`}
    >
      Show More
    </button>
  );
};

export default ShowMoreBtn;

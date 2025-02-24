import React from "react";

import "./ShowMoreBtn.css";

const ShowMoreBtn = ({ type, onClick, classModifier }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`show-more-btn show-more-btn_${classModifier}`}
    >
      Show More
    </button>
  );
};

export default ShowMoreBtn;

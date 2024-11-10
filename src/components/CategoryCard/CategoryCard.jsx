import "./CategoryCard.css";

import thumbnail from "../../assets/thumbnail-standin.png";

const CategoryCard = () => {
  return (
    <li className="category-card">
      <img className="category-card__img" src={thumbnail} alt="Game Cover" />
      <h3 className="category-card__title">Category</h3>
    </li>
  );
};

export default CategoryCard;

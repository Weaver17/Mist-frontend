import CategoryCard from "../CategoryCard/CategoryCard";

import "./Categories.css";

const Categories = () => {
  return (
    <div className="categories">
      <h2 className="categories__header">Categories</h2>
      <ul className="categories__list">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </ul>
    </div>
  );
};

export default Categories;

import { getGameById } from "../../utils/gameApi";

import "./GameCard.css";

const GameCard = ({ onGameClick, game }) => {
  const handleGameClick = () => {
    getGameById(game.id).then((item) => {
      onGameClick(item);
    });
  };

  return (
    <li className="card">
      <h3 className="card__title" onClick={handleGameClick}>
        {game.title}
      </h3>
      <div className="card__thumbnail-container">
        <img
          className="card__thumbnail"
          src={game.thumbnail}
          alt={game.name}
          onClick={handleGameClick}
        />
      </div>
      <div className="card__info">
        <p className="card__description">{game.short_description}</p>
      </div>
      <p className="card__category">{game.genre}</p>
      <p className="card__platform">{game.platform}</p>
    </li>
  );
};

export default GameCard;

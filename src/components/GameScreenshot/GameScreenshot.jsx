import "./GameScreenshot.css";

const GameScreenshot = ({ game }) => {
  return (
    <div className="game-screenshot">
      <h4 className="game-screenshot__title">Screenshots:</h4>
      <ul className="game-screenshot__list">
        {game.screenshots.map((screenshot) => {
          console.log(screenshot.id, screenshot.image);
          return (
            <li key={screenshot.id} className="game-screenshot__item">
              <img
                className="game-screenshot__img"
                src={screenshot.image}
                alt={`${game.title} screenshot `}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GameScreenshot;

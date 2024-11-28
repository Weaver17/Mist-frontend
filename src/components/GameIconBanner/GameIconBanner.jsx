import "./GameIconBanner.css";

import aIcon from "../../assets/game-icons/a.png";
import bIcon from "../../assets/game-icons/b.png";
import controller from "../../assets/game-icons/controller.png";
import dpad from "../../assets/game-icons/dpad.png";
import mouse from "../../assets/game-icons/mouse.png";
import pman from "../../assets/game-icons/pman.png";
import spaceship from "../../assets/game-icons/spaceship.png";
import xIcon from "../../assets/game-icons/x.png";
import yIcon from "../../assets/game-icons/y.png";

const GameIconBanner = () => {
  return (
    <div className="icons">
      <img
        className="icons__game-icon icons__game-icon_button"
        src={bIcon}
        alt="B Button"
      />
      <img
        className="icons__game-icon icons__game-icon_button"
        src={aIcon}
        alt="A button"
      />
      <img
        className="icons__game-icon icons__game-icon_pman"
        src={pman}
        alt="Pacman"
      />
      <img
        className="icons__game-icon icons__game-icon_controller"
        src={controller}
        alt="Controller"
      />
      <img
        className="icons__game-icon icons__game-icon_spaceship"
        src={spaceship}
        alt="Spaceship"
      />
      <img
        className="icons__game-icon icons__game-icon_dpad"
        src={dpad}
        alt="D-pad"
      />
      <img
        className="icons__game-icon icons__game-icon_mouse"
        src={mouse}
        alt="Mouse"
      />
      <img
        className="icons__game-icon icons__game-icon_button"
        src={xIcon}
        alt="X Button"
      />
      <img
        className="icons__game-icon icons__game-icon_button"
        src={yIcon}
        alt="Y Button"
      />
    </div>
  );
};

export default GameIconBanner;

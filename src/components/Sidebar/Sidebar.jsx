import { useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import EditModal from "../EditModal/EditModal";

import "./Sidebar.css";

const Sidebar = ({
  handleEditClick,
  isOpen,
  handleCloseClick,
  handleEditUsername,
  isLoading,
  handleLogOut,
  favoritedGames,
  savedGames,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section className="sidebar">
      <div className="sidebar__username-container">
        <h3 className="sidebar__username">{currentUser?.username}</h3>
      </div>
      <div className="sidebar__fave-games">
        <h4 className="sidebar__fave-title">Favorited</h4>
        <p className="sidebar__faves">{favoritedGames.length}</p>
      </div>
      <div className="sidebar__save-games">
        <h4 className="sidebar__save-title">Saved</h4>
        <p className="sidebar__saves">{savedGames.length}</p>
      </div>
      <button type="button" className="sidebar__edit" onClick={handleEditClick}>
        Change Username
      </button>

      <button type="button" className="sidebar__logout" onClick={handleLogOut}>
        Log out
      </button>
      <EditModal
        isOpen={isOpen}
        handleCloseClick={handleCloseClick}
        handleEditUsername={handleEditUsername}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Sidebar;

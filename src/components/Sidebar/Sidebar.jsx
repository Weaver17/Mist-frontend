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
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section className="sidebar">
      <div className="sidebar__username-container">
        <h3 className="sidebar__username">{currentUser?.user?.username}</h3>
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

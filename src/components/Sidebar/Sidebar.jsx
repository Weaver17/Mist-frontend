import EditModal from "../EditModal/EditModal";

import "./Sidebar.css";

const Sidebar = ({
  handleEditClick,
  isOpen,
  handleCloseClick,
  handleEditUsername,
  isLoading,
}) => {
  return (
    <section className="sidebar">
      <div className="sidebar__username-container">
        <h3 className="sidebar__username">Username</h3>
      </div>
      <button type="button" className="sidebar__edit" onClick={handleEditClick}>
        Change Username
      </button>

      <button type="button" className="sidebar__logout">
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

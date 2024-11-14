import "./Sidebar.css";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <div className="sidebar__username-container">
        <h3 className="sidebar__username">Username</h3>
      </div>
      <button type="button" className="sidebar__edit">
        Change Username
      </button>

      <button type="button" className="sidebar__logout">
        Log out
      </button>
    </section>
  );
};

export default Sidebar;

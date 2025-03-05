import "./ToTopBtn.css";

const ToTopBtn = ({ onToTopClick, scrollPosition }) => {
  return (
    <button
      onClick={onToTopClick}
      type="button"
      className={`${scrollPosition < 100 ? "to-top_hidden" : "to-top"}`}
    >
      To Top
    </button>
  );
};

export default ToTopBtn;

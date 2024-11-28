import "./Form.css";

function Form({ name, onSubmit, buttonText, children }) {
  return (
    <form className="form" name={name} onSubmit={onSubmit}>
      {children}
      <button
        className={`form__submit-btn form__submit-btn_type_${name}`}
        type="submit"
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;

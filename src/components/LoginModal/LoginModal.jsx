import { useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({
  isOpen,
  handleCloseClick,
  handleSignUpClick,
  isLoading,
  handleLogin,
}) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign In"
      name="signin"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      buttonText={isLoading ? "..." : "Sign In"}
      onSubmit={handleSubmit}
    >
      <div className="modal__input-container">
        <label className="modal__label">
          <input
            type="email"
            name="email"
            className="modal__input"
            placeholder="Email"
            value={values.email || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label className="modal__label">
          <input
            type="password"
            name="password"
            className="modal__input"
            placeholder="Password"
            value={values.password || ""}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      {isLoading ? (
        <div className="form__loading-hidden"></div>
      ) : (
        <div className="form__loading-visible">
          <p className="form__or">or</p>
          <button
            type="button"
            className="form__submit-btn form__submit-btn_type_go_to_register"
            onClick={handleSignUpClick}
          >
            Sign Up
          </button>
        </div>
      )}
    </ModalWithForm>
  );
};

export default LoginModal;

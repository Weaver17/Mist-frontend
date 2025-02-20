import { useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({
  isOpen,
  handleCloseClick,
  handleRegistrationClick,
  isLoading,
  handleSignInClick,
  handleRegistration,
}) => {
  const { values, handleChange, setValues } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values);
    handleRegistrationClick();
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ username: "", email: "", password: "", confirmPassword: "" });
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      buttonText={isLoading ? "Signing Up..." : "Sign Up"}
      onSubmit={handleSubmit}
      onClose={handleCloseClick}
    >
      <div className="modal__input-container">
        <label className="modal__label">
          <input
            type="text"
            name="username"
            className="modal__input modal__input_disabled"
            placeholder="Username"
            value={values.username || ""}
            onChange={handleChange}
            required
          />
        </label>
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
            className="form__submit-btn form__submit-btn_type_go_to_signin"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        </div>
      )}
    </ModalWithForm>
  );
};

export default RegisterModal;

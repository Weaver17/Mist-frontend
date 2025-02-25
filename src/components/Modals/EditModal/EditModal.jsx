import { useEffect, useContext } from "react";

import CurrentUserContext from "../../../contexts/CurrentUserContext";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../../hooks/useForm";

const EditModal = ({
  handleCloseClick,
  isOpen,
  handleEditUsername,
  isLoading,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    username: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditUsername(values);
  };

  useEffect(() => {
    if (isOpen) {
      setValues({
        username: currentUser?.username,
      });
    }
  }, [isOpen]);
  return (
    <div>
      <ModalWithForm
        handleCloseClick={handleCloseClick}
        title="Edit Username"
        name="edit"
        isOpen={isOpen}
        buttonText={isLoading ? "Saving..." : "Save"}
        onSubmit={handleSubmit}
      >
        <div className="modal__input-container">
          <label className="modal__label">
            <input
              type="text"
              name="username"
              className="modal__input"
              value={values?.username || ""}
              onChange={handleChange}
              required
            />
          </label>
        </div>
      </ModalWithForm>
    </div>
  );
};

export default EditModal;

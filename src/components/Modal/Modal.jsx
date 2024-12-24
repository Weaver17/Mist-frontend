import { useEffect } from "react";

import "./Modal.css";
import "../ModalWithForm/ModalWithForm.css";

function Modal({ name, onClose, children, isOpen }) {
  // useEffect(() => {
  //   const handleEscape = (e) => {
  //     if (e.key === "Escape") {
  //       onClose();
  //     }
  //   };

  //   document.addEventListener("keydown", handleEscape);
  //   return () => document.removeEventListener("keydown", handleEscape);
  // }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOverlay}
    >
      <div className={`modal__content modal__content_type_${name}`}>
        {children}
        <button
          className={`modal__close-btn modal__close-btn_type_${name}`}
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default Modal;

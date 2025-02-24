import "./CompletedModal.css";
import Modal from "../Modal/Modal";

const CompletedModal = ({
  isOpen,
  handleCloseClick,
  handleSignInClick,
  isLoading,
}) => {
  return (
    <Modal
      name="completed"
      isOpen={isOpen}
      buttonText={isLoading ? "...to Sign In" : "Sign In"}
      onClose={handleCloseClick}
    >
      <div className="modal__complete-container">
        <h3 className="modal__complete-signup">
          Registration successfully completed!
        </h3>
        <button
          className="modal__complete-go-to-signin"
          type="button"
          onClick={handleSignInClick}
        >
          Sign In
        </button>
      </div>
    </Modal>
  );
};

export default CompletedModal;

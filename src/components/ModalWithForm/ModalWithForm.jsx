import "./ModalWithForm.css";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";

function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  handleCloseClick,
  isOpen,
  onSubmit,
}) {
  return (
    <Modal name={name} handleCloseClick={handleCloseClick} isOpen={isOpen}>
      <h3 className={`modal__title modal__title_type_${name}`}>{title}</h3>
      <Form name={name} onSubmit={onSubmit} buttonText={buttonText}>
        {children}
      </Form>
    </Modal>
  );
}

export default ModalWithForm;

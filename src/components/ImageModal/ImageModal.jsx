import "./ImageModal.css";

import Modal from "../Modal/Modal";

const ImageModal = ({ isOpen, handleCloseClick, game, image }) => {
  return (
    <Modal name="image" isOpen={isOpen} onClose={handleCloseClick}>
      <img className="image-modal__image" src={image.thumbnail} alt="" />
    </Modal>
  );
};

export default ImageModal;

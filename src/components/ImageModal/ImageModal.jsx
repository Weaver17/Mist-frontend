import "./ImageModal.css";

import Modal from "../Modal/Modal";

import thumbnail from "../../assets/thumbnail-standin.png";

const ImageModal = ({ isOpen, handleCloseClick }) => {
  return (
    <Modal name="image" isOpen={isOpen} onClose={handleCloseClick}>
      <img className="image-modal__image" src={thumbnail} alt="" />
    </Modal>
  );
};

export default ImageModal;

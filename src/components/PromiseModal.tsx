import NiceModal, { useModal } from "@ebay/nice-modal-react";
import Modal from "../components/Modal";
import type { ModalProps } from "../components/Modal";

const PromiseModal = NiceModal.create((options: ModalProps) => {
  const model = useModal();

  const { onClose, onConfirm, ...otherOptions } = options;
  function handleClose() {
    model.remove();
    if (onClose) {
      onClose();
    }
  }

  function handleConfirm() {
    model.remove();
    if (onConfirm) {
      onConfirm();
    }
  }

  return <Modal show={model.visible} onClose={handleClose} onConfirm={handleConfirm} {...otherOptions}></Modal>;
});

export default PromiseModal
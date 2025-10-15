import React from "react";
import { motion, AnimatePresence } from "motion/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

export interface ModalProps {
  children: React.ReactNode;
  show?: boolean;
  title?: string;
  showCancelBtn?: boolean;
  cancelBtnText?: string;
  confirmBtnText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  onClose,
  onConfirm,
  show,
  showCancelBtn = true,
  cancelBtnText = "取消",
  confirmBtnText = "确定",
}) => {
  const mask = (
    <motion.div
      className='absolute top-0 left-0 size-full bg-[rgba(0,0,0,0.7)]'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    ></motion.div>
  );
  return (
    <AnimatePresence>
      {show && (
        <div className='fixed top-0 left-0 size-full'>
          {mask}
          <motion.div
            className='absolute bg-white w-80 rounded-xl text-[34px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden'
            initial={{ opacity: 0, scale: 1.2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
          >
            <div className='py-[64px] px-[30px]'>
              <div className='text-center text-[36px] font-bold'>{title}</div>
              <div className='mt-[40px] text-center text-[#666666FF]'>{children}</div>
            </div>
            <div className='h-[112px] flex items-stretch divide-x-1 divide-[#0000001A] border-t-[#0000001A] border-t-1'>
              {showCancelBtn && (
                <button className='grow w-1/2 active:bg-gray-200' onClick={onClose}>
                  {cancelBtnText}
                </button>
              )}
              <button className='grow w-1/2 active:bg-gray-200' onClick={onConfirm}>
                {confirmBtnText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const CommonModal = NiceModal.create((options: ModalProps) => {
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

NiceModal.register("alert", CommonModal, { showCancelBtn: false });
NiceModal.register("confirm", CommonModal);

export default Modal;

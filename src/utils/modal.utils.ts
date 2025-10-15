import NiceModal from "@ebay/nice-modal-react";
import PromiseModal from "../components/PromiseModal";
import type { ModalProps } from "../components/Modal";

NiceModal.register("alert", PromiseModal, { showCancelBtn: false });
NiceModal.register("confirm", PromiseModal);

export const showAlert = (options: ModalProps) => NiceModal.show<unknown, ModalProps>("alert", options);
export const showConfirm = (options: ModalProps) => NiceModal.show<unknown, ModalProps>("confirm", options);
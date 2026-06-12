import React from "react";
import Modal from "./Modal";

interface ConfirmModalProps {
  show: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({
  show,
  title = "Confirm Delete",
  message,
  onClose,
  onConfirm,
}: ConfirmModalProps) => (
  <Modal
    show={show}
    title={title}
    onClose={onClose}
    size="sm"
    footer={
      <>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          <i className="fas fa-trash me-1"></i> Delete
        </button>
      </>
    }
  >
    <div className="text-center py-2">
      <i className="fas fa-exclamation-triangle text-warning fs-1 mb-3 d-block"></i>
      <p className="mb-0">{message}</p>
    </div>
  </Modal>
);

export default ConfirmModal;

import React, { useEffect } from "react";

interface ModalProps {
  show: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  confirmClass?: string;
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal = ({
  show,
  title,
  onClose,
  onConfirm,
  confirmText = "Save",
  confirmClass = "btn-primary",
  size = "md",
  children,
  footer,
}: ModalProps) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (show) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [show, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  const sizeClass = { sm: "modal-sm", md: "", lg: "modal-lg", xl: "modal-xl" }[
    size
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1050 }}
        onClick={onClose}
      />
      {/* Dialog */}
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        style={{ zIndex: 1055 }}
        role="dialog"
      >
        <div
          className={`modal-dialog ${sizeClass} modal-dialog-centered modal-dialog-scrollable`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              {footer ?? (
                <>
                  <button className="btn btn-secondary" onClick={onClose}>
                    Cancel
                  </button>
                  {onConfirm && (
                    <button
                      className={`btn ${confirmClass}`}
                      onClick={onConfirm}
                    >
                      {confirmText}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

// components/admin/Modal/User/UpdateUserModal.tsx
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import type { UserResponse } from "../../../../services/UserService";

interface UpdateUserModalProps {
  show: boolean;
  user: UserResponse | null;
  onHide: () => void;
  onSave: (userData: Partial<UserRequest>) => void;
}

interface UserRequest {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  password?: string; 
  status: string;
}

const UpdateUserModal = ({ show, user, onHide, onSave }: UpdateUserModalProps) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        status: user.status || "active",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    
    if (id === "email") setErrors((prev) => ({ ...prev, email: "" }));
    if (id === "phone") setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{10,11}$/.test(phone);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { email: "", phone: "" };

    if (!validateEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      hasError = true;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10-11 số";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  const handleClose = () => {
    setErrors({ email: "", phone: "" });
    onHide();
  };

  if (!user) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header className="bg-light p-3" closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="fullName" className="form-label">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">
                Phone <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                className="form-select"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="col-md-12">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea
                id="address"
                className="form-control"
                rows={2}
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-12">
              <label htmlFor="password" className="form-label">Password (Leave blank to keep current)</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter new password"
                onChange={handleInputChange}
              />
              <small className="text-muted">Only enter if you want to change password</small>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button type="button" className="btn btn-light" onClick={handleClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Update User
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UpdateUserModal;
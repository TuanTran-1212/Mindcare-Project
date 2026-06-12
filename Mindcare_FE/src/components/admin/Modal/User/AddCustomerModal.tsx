// components/admin/Modal/User/AddUserModal.tsx
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

interface AddUserModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (userData: UserFormData) => void;
}

interface UserFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  status: string;
}

const AddUserModal = ({ show, onHide, onSave }: AddUserModalProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "", 
    password: "",
    status: "active",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    
    // Clear error khi nhập
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
    const newErrors = { email: "", phone: "", password: "" };

    if (!validateEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      hasError = true;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10-11 số";
      hasError = true;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      status: "active",
    });
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      status: "active",
    });
    setErrors({ email: "", phone: "", password: "" });
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header className="bg-light p-3" closeButton>
        <Modal.Title>Add New User</Modal.Title>
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
                placeholder="Enter full name"
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
                placeholder="Enter email"
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
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="password" className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                id="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="col-md-12">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea
                id="address"
                className="form-control"
                rows={2}
                placeholder="Enter address"
                value={formData.address}
                onChange={handleInputChange}
              />
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
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button type="button" className="btn btn-light" onClick={handleClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Add User
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddUserModal;
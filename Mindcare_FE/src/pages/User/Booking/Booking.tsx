import React, { useState } from "react";
import { useFormValidation } from "../../../utilis/useFormValidation";

import { useParams } from "react-router-dom";
import { teamMembers } from "../../../data/TeamMember";

const BookingSection: React.FC = () => {
  //-----------------------------------
  //xử lý nếu có id coach

  const { id } = useParams<{ id: string }>();
  // Find the coach whose id matches the URL param
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const coach = teamMembers.find((member) => member.id === Number(id));

  // ── STATE DỮ LIỆU FORM ──────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  const { errors, isSubmitting, submitForm } = useFormValidation();

  // ── XỬ LÝ THAY ĐỔI INPUT ───────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ── XỬ LÝ SUBMIT ────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Map dữ liệu từ state local sang cấu hình FormData của hook
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const success = await submitForm(
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        message: formData.message,
        // 'service' không có trong rules của hook nên sẽ được gửi kèm API nếu có apiUrl
      },
      {
        successMessage: "Đăng ký thành công! Chúng tôi sẽ sớm liên hệ với bạn.",
        mockDelay: 2000,
      },
      () => {
        // Reset form sau khi thành công
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          message: "",
        });
      },
    );
  };

  return (
    <section className="booking-section">
      <div className="container">
        <div className="booking-form">
          <h2>Booking Register</h2>
          <form onSubmit={handleSubmit}>
            {/* Họ và Tên */}
            <div className="form-group">
              <label htmlFor="name">Full Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            {/* Số Điện Thoại */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "input-error" : ""}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            {/* Dịch Vụ */}
            <div className="form-group">
              <label htmlFor="service">Request Services</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">Select Service</option>
                <option value="coaching">Personal Coaching</option>
                <option value="consultation">Health Consultation</option>
                <option value="workshop">Group Workshop</option>
                <option value="online">Online Coaching</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Ngày Ưa Chuộng */}
            <div className="form-group">
              <label htmlFor="date">Preferred Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? "input-error" : ""}
              />
              {errors.date && (
                <span className="error-message">{errors.date}</span>
              )}
            </div>

            {/* Lời Nhắn */}
            <div className="form-group">
              <label htmlFor="message">Note</label>
              <textarea
                id="message"
                name="message"
                placeholder="Please tell us more about your needs..."
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "input-error" : ""}
              ></textarea>
              {errors.message && (
                <span className="error-message">{errors.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin me-2"></i> Sending...
                </>
              ) : (
                "Submit Registration"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;

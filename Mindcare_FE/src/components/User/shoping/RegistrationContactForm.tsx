
import { useState } from "react";
import { useFormValidation } from "../../../utilis/useFormValidation";

const RegistrationContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { errors, isSubmitting, submitForm } = useFormValidation();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    await submitForm(
      { name, phone, email }, // chỉ truyền field form có (address, paymentMethod → không truyền)
      { successMessage: "Registration successfull! We will contact you soon." },
      () => {
        setName("");
        setPhone("");
        setEmail("");
      }, // onSuccess: reset form
    );
  };

  return (
    <>
      <>
        {/* Lead Generation Form */}
        <section className="contact-form-section">
          <div className="container">
            <div className="form-container">
              <h2 className="form-title">
                Register for consultation with the MINDCARE team.
              </h2>
              <p className="form-subtitle">
                Get in touch with us today for advice!
              </p>
              <form className="consultation-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(nameField) => setName(nameField.target.value)}
                  />

                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Số điện thoại *"
                    required
                    value={phone}
                    onChange={(phoneField) => setPhone(phoneField.target.value)}
                  />
                  
                  {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(emailField) => setEmail(emailField.target.value)}
                  />
                  
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Sending...": "Submit"}
                  
                </button>
              </form>
            </div>
          </div>
        </section>
      </>
    </>
  );
};
export default RegistrationContactForm;

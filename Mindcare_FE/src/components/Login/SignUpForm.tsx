import "../../assets/css/login.css"
interface Props {
  toggleToSignIn: () => void;
}

export default function SignUpForm({ toggleToSignIn }: Props) {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    alert("Sign Up feature will be implemented with backend later.");
  };

  return (
    <form onSubmit={handleSubmit} className="sign-up-form" autoComplete="off">
      <div className="logo">
        <img src="./assets/img/logo1.png" alt="Logo" />
      </div>

      <div className="heading">
        <h2>Get Started</h2>
        <h6>Already have an account?</h6>
        <a href="#" className="toggle" onClick={toggleToSignIn}>Sign in</a>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
          <input type="text" className="input-field" required />
          <label>Name</label>
        </div>

        <div className="input-wrap">
          <input type="email" className="input-field" required />
          <label>Email</label>
        </div>

        <div className="input-wrap">
          <input type="password" className="input-field" required />
          <label>Password</label>
        </div>

        <input type="submit" value="Sign Up" className="sign-btn" />

        <p className="text">
          By signing up, I agree to the <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>
        </p>
      </div>
    </form>
  );
}
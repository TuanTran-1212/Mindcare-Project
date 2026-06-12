import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../data/UserData";
import "../../assets/css/login.css";

interface Props {
  toggleToSignUp: () => void;
}


export default function SignInForm({ toggleToSignUp }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = validateLogin(email, password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sign-in-form" autoComplete="off">
      <div className="logo">
        <a href="/"><img src="./assets/img/logo1.png" alt="Logo" /></a>
      </div>

      <div className="heading">
        <h2>Welcome Back</h2>
        <h6>Not registered yet?</h6>
        <a href="#" className="toggle" onClick={toggleToSignUp}>Sign up</a>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
          <input type="email" className="input-field" required value={email} onChange={e => setEmail(e.target.value)} />
          <label>Email</label>
        </div>

        <div className="input-wrap">
          <input type="password" className="input-field" required value={password} onChange={e => setPassword(e.target.value)} />
          <label>Password</label>
        </div>

        <input type="submit" value="Sign In" className="sign-btn" />
        {error && <p className="error">{error}</p>}

        <p className="text">
          Forgotten your password? <a href="/forgot-password">Get Your Password</a>
        </p>
      </div>
    </form>
  );
}
// src/pages/Login.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Login/Carousel";

import { images } from "../../assets/images";
// new
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";
import type { AuthResponse, RegisterRequest } from "../../services/AuthService";
import { useAuth } from "./UseAuth";

const LOGIN_SLIDES = [
  "Create your own courses",
  "Customize as you like",
  "Invite students to your class",
];

const LOGIN_IMAGES = [images.login.l1, images.login.l2, images.login.l3];

/**
 * Login - handles Sign In / Sign Up toggle.
 * On successful sign-in, saves user id to localStorage and navigates to /profile.
 */
const Login = () => {
  //new
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterRequest>({
    defaultValues: { username: "", email: "", password: "" },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedFields = watch(); // { username, email, password }

  // Floating-label active state helpers
  const isActive = (fieldValue: string | undefined) => {
    return fieldValue && fieldValue.length > 0;
  };

  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async (data: RegisterRequest) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("profileCompleted");
      const res = await api.post<AuthResponse>("/auth/register", data);
      const responseData = res.data;
      console.log(data);
      await login(responseData); // ← lưu token + user info
      toast.success("Đăng ký thành công!");
      console.log("Before navigate"); // thêm log
      navigate("/profile");
      console.log("After navigate");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg = err.response?.data?.message || "Đăng ký thất bại";
      toast.error(msg);
    }
  };

  //

  // Sign-in form state
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInError, setSignInError] = useState("");

  // Sign-up form state
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  // Floating-label active state helpers
  // const isActive = (value: string) => value.length > 0;

  const toggleMode = () => {
    setIsSignUpMode((prev) => !prev);
    setSignInError("");
    setSignUpError("");
  };

  const handleSignIn = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setSignInError("");

    // Validate cơ bản
    if (!signInUsername.trim()) {
      setSignInError("Please enter your email or username.");
      return;
    }
    if (!signInPassword.trim()) {
      setSignInError("Please enter your password.");
      return;
    }

    try {
      // Giả sử backend dùng email (nếu dùng username thì sửa key)
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("profileCompleted");
      const payload = {
        emailOrUserName: signInUsername,
        password: signInPassword,
      };
      const response = await api.post<AuthResponse>("/auth/login", payload);
      const loginData = response.data; // { token, role, profileCompleted }

      // Lưu vào localStorage
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("role", loginData.role);
      localStorage.setItem(
        "profileCompleted",
        String(loginData.profileCompleted),
      );

      // Cập nhật context (nếu login function trong context nhận LoginResponse)
      await login(loginData);

      toast.success("Đăng nhập thành công!");
      // Điều hướng dựa trên profileCompleted
      if (!loginData.profileCompleted) {
        navigate("/profile");
      } else {
        // Điều hướng theo role
        switch (loginData.role) {
          case "admin":
            navigate("/dashboard");
            break;
          default:
            navigate("/home");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg = err.response?.data?.message || "Sai email hoặc mật khẩu";
      setSignInError(msg);
      toast.error(msg);
    }
  };

  return (
    <section id="main" className={isSignUpMode ? "sign-up-mode" : ""}>
      <div className="box">
        <div className="inner-box">
          {/* ── Forms ── */}
          <div className="forms-wrap">
            {/* Sign-In Form */}
            <form
              autoComplete="off"
              className="sign-in-form"
              onSubmit={handleSignIn}
            >
              <div className="logo logo-login">
                <Link to="/">
                  <img src={images.logo.lo1} alt="Logo" />
                </Link>
              </div>

              <div className="heading">
                <h2>Welcome Back</h2>
                <h6>Not registered yet? </h6>
                <button type="button" className="toggle" onClick={toggleMode}>
                  Sign in
                </button>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    className={`input-field${isActive(signInUsername) ? " active" : ""}`}
                    autoComplete="off"
                    required
                    value={signInUsername}
                    onChange={(e) => setSignInUsername(e.target.value)}
                  />
                  <label className="contact-f">Username</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    className={`input-field${isActive(signInPassword) ? " active" : ""}`}
                    autoComplete="off"
                    required
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                  />
                  <label className="contact-f">Password</label>
                </div>

                {signInError && (
                  <p
                    style={{
                      color: "#e74c3c",
                      fontSize: "0.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {signInError}
                  </p>
                )}

                <input type="submit" value="Sign In" className="sign-btn" />

                <p className="text">
                  Forgotten your password?{" "}
                  <Link to="/forgotPassword">Get Your Password</Link>
                </p>
              </div>
            </form>

            {/* Sign-Up Form */}
            <form
              autoComplete="off"
              className="sign-up-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="logo logo-login">
                <img src={images.logo.lo1} alt="Logo" />
              </div>

              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account? </h6>
                <button type="button" className="toggle" onClick={toggleMode}>
                  Sign in
                </button>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    minLength={4}
                    className={`input-field${isActive(watchedFields.username) ? " active" : ""}`}
                    autoComplete="off"
                    {...register("username", {
                      required: "Username required",
                      minLength: { value: 4, message: "Minimum 4 chars" },
                      pattern: /^[a-zA-Z0-9_]+$/,
                    })}
                  />
                  <label className="contact-f">Name</label>

                  {errors.username && (
                    <span className="error">{errors.username.message}</span>
                  )}
                </div>

                <div className="input-wrap">
                  <input
                    type="email"
                    className={`input-field${isActive(watchedFields.email) ? " active" : ""}`}
                    autoComplete="off"
                    {...register("email", {
                      required: "Email required",
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  <label className="contact-f">Email</label>

                  {errors.email && (
                    <span className="error">{errors.email.message}</span>
                  )}
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    minLength={4}
                    className={`input-field${isActive(watchedFields.password) ? " active" : ""}`}
                    autoComplete="off"
                    {...register("password", {
                      required: "Password required",
                      minLength: 4,
                    })}
                  />
                  <label className="contact-f">Password</label>

                  {errors.password && (
                    <span className="error">{errors.password.message}</span>
                  )}
                </div>

                {signUpError && (
                  <p
                    style={{
                      color: "#e74c3c",
                      fontSize: "0.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {signUpError}
                  </p>
                )}

                <input type="submit" value="Sign Up" className="sign-btn" />

                <p className="text">
                  By signing up, I agree to the{" "}
                  <Link to="#">Terms of Services</Link> and{" "}
                  <Link to="#">Privacy Policy</Link>
                </p>
              </div>
            </form>
          </div>

          {/* ── Carousel ── */}
          <Carousel slides={LOGIN_SLIDES} images={LOGIN_IMAGES} />
        </div>
      </div>
    </section>
  );
};

export default Login;

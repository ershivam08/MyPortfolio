import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../utils/api";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear general error
    if (error) setError("");
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await API.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      // Store token
      localStorage.setItem("token", res.data.token);

      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("userEmail", formData.email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("userEmail");
      }

      // Store user info if available
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      setSuccess("Login successful! Redirecting...");

      // Redirect after success
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Invalid email or password. Please try again.";

      setError(errorMessage);

      // Auto-clear error after 5 seconds
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials for testing
  const useDemoCredentials = () => {
    setFormData({
      email: "admin@example.com",
      password: "admin123",
    });
    setSuccess("Demo credentials loaded. You can now click Login.");
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    alert("Password reset feature coming soon! Please contact administrator.");
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      {/* Background Pattern */}
      <div className="login-background">
        <div className="pattern-circle pattern-1"></div>
        <div className="pattern-circle pattern-2"></div>
        <div className="pattern-circle pattern-3"></div>
      </div>

      {/* Login Container */}
      <div className="login-container">
        {/* Left Panel - Illustration */}
        <div className="login-left">
          <div className="illustration-container">
            <div className="illustration">
              <div className="illustration-icon">🔐</div>
              <div className="illustration-circle circle-1"></div>
              <div className="illustration-circle circle-2"></div>
              <div className="illustration-circle circle-3"></div>
            </div>
          </div>

          <div className="left-content">
            <h2 className="welcome-title">Welcome Back!</h2>
            <p className="welcome-subtitle">
              Access your admin dashboard to manage portfolio content, view
              analytics, and update site information.
            </p>

            <div className="features-list">
              <div className="feature">
                <span className="feature-icon">📊</span>
                <span>Analytics Dashboard</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📝</span>
                <span>Content Management</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔧</span>
                <span>Site Configuration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="login-right">
          <div className="form-wrapper">
            {/* Logo */}
            <div className="login-header">
              <div className="logo">
                <span className="logo-icon">🔒</span>
                <h1>Admin Portal</h1>
              </div>
              <p className="header-subtitle">
                Secure access to your portfolio dashboard
              </p>
            </div>

            {/* Messages */}
            {error && (
              <div className="alert error-alert">
                <span className="alert-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="alert success-alert">
                <span className="alert-icon">✅</span>
                <span>{success}</span>
              </div>
            )}

            {/* Login Form */}
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <span className="label-icon">📧</span> Email Address
                </label>
                <div className="input-container">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="admin@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.email ? "error" : ""}`}
                    disabled={loading}
                  />
                  <div className="input-icon">📧</div>
                </div>
                {formErrors.email && (
                  <span className="field-error">{formErrors.email}</span>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <span className="label-icon">🔑</span> Password
                </label>
                <div className="input-container">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-input ${
                      formErrors.password ? "error" : ""
                    }`}
                    disabled={loading}
                  />
                  <div className="input-icon">🔑</div>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    tabIndex="-1"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {formErrors.password && (
                  <span className="field-error">{formErrors.password}</span>
                )}
              </div>

              {/* Options Row */}
              <div className="form-options">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-label">Remember me</span>
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={handleForgotPassword}
                  disabled={loading}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Demo Login Button */}
              <button
                type="button"
                className="demo-button"
                onClick={useDemoCredentials}
                disabled={loading}
              >
                <span>👨‍💻</span> Use Demo Credentials
              </button>

              {/* Divider */}
              <div className="divider">
                <span className="divider-text">or</span>
              </div>

              {/* Additional Info */}
              <div className="additional-info">
                <p className="info-text">
                  <span>ℹ️</span> This is a secure admin portal. Unauthorized
                  access is prohibited.
                </p>
              </div>
            </form>

            {/* Footer Links */}
            <div className="login-footer">
              <Link to="/" className="footer-link">
                ← Back to Home
              </Link>
              <span className="footer-separator">•</span>
              <button
                type="button"
                className="footer-link"
                onClick={() => alert("Contact: admin@portfolio.com")}
              >
                Need Help?
              </button>
            </div>

            {/* Security Notice */}
            <div className="security-notice">
              <span className="security-icon">🛡️</span>
              <p>
                Your credentials are encrypted and secure. Always log out on
                shared devices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="bottom-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Login;

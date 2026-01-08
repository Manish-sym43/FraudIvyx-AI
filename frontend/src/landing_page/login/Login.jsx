import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔐 Fake user data (abhi backend nahi hai)
    const userData = {
      name: email.split("@")[0], // email se naam bana rahe
      email: email,
    };

    login(userData);           // ✅ DATA PASS KIYA
    navigate("/dashboard");
  };

  return (
    <section className="login-section d-flex align-items-center justify-content-center">
      <div className="login-box text-light p-4">

        <h3 className="text-center fw-bold">Welcome Back</h3>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control dark-input mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control dark-input mb-3"
            placeholder="Password"
            required
          />

          <button className="btn btn-info w-100">Sign In</button>
        </form>
      </div>
    </section>
  );
}

export default Login;

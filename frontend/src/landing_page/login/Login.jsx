import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section d-flex align-items-center justify-content-center">
      <div className="login-box text-light p-4">

        {/*Correct heading */}
        <h3 className="text-center fw-bold">Login to your account</h3>

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-danger text-center mb-2">{error}</p>
          )}

          {/*Correct button label */}
          <button className="btn btn-info w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/*Signup link only as secondary option */}
        <p className="text-center mt-3 text-secondary">
          Don’t have an account?{" "}
          <Link to="/get_started" className="text-info">
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;

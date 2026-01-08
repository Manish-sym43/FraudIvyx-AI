import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
    };

    login(userData);          // ✅ REAL DATA
    navigate("/dashboard");
  };

  return (
    <section className="signup-section d-flex align-items-center justify-content-center">
      <div className="signup-box text-light p-4">

        <h3 className="text-center fw-bold">Create Account</h3>

        <form onSubmit={handleSignup}>
          <input
            className="form-control dark-input mb-3"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <button className="btn btn-info w-100">Create Account</button>
        </form>
      </div>
    </section>
  );
}

export default Signup;

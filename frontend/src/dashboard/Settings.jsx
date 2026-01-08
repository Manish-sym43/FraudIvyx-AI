import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Settings() {
  const { changePassword } = useAuth();

  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (newPass.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPass !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const result = changePassword(current, newPass);

    if (!result.success) {
      setError(result.message);
    } else {
      setMsg(result.message);
      setCurrent("");
      setNewPass("");
      setConfirm("");
    }
  };

  return (
    <div className="container text-light py-5">
      <h3 className="fw-bold mb-4">Settings</h3>

      {/* ===== Security ===== */}
      <div className="signup-box p-4 mb-4">
        <h5 className="fw-semibold mb-3">Change Password</h5>

        {error && <p className="text-danger">{error}</p>}
        {msg && <p className="text-success">{msg}</p>}

        <form onSubmit={handleChangePassword}>
          <div className="mb-3">
            <label>Current Password</label>
            <input
              type="password"
              className="form-control dark-input"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>New Password</label>
            <input
              type="password"
              className="form-control dark-input"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Confirm New Password</label>
            <input
              type="password"
              className="form-control dark-input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-info">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;

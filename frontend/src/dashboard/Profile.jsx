import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Load current user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();

    updateProfile({
      ...user,
      name,
      email,
    });

    alert("Profile updated successfully ✅");
  };

  return (
    <div className="container text-light py-5">
      <h3 className="fw-bold mb-4">My Profile</h3>

      <div className="signup-box p-4">
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              className="form-control dark-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control dark-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-info">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;

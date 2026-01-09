import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `nav-link px-3 py-2 rounded ${isActive ? "active-link" : "text-secondary"}`;

  return (
    <div className="sidebar text-light p-3">
      {/* USER INFO */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="avatar-circle">{user?.name?.charAt(0)}</div>
        <div>
          <div className="fw-semibold">{user?.name}</div>
          <small className="text-secondary">{user?.email}</small>
        </div>
      </div>

      {/*NAV LINKS*/}
      <NavLink to="/report" className={linkClass}>
        Report Scam
      </NavLink>
      <NavLink to="/admin" className={linkClass}>
        Admin
      </NavLink>

      <ul className="nav flex-column gap-2">
        <li>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/scan" className={linkClass}>
            Scan
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" className={linkClass}>
            History
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={linkClass}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={linkClass}>
            Settings
          </NavLink>
        </li>
      </ul>

      {/*LOGOUT*/}
      <button
        onClick={handleLogout}
        className="btn btn-outline-danger mt-4 w-100"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;

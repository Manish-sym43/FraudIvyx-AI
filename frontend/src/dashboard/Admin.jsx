import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    //Frontend role protection
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
      return;
    }

    const fetchAdminScans = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://fraudivyx-backend.onrender.com/api/admin/scans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setScans(res.data);
      } catch (err) {
        if (err.response?.status === 403) {
          setError("Access denied. Admins only.");
        } else if (err.response?.status === 401) {
          logout();
          navigate("/login");
        } else {
          setError("Failed to load admin analytics");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdminScans();
  }, [user, navigate, logout]);

  /*ANALYTICS*/
  const total = scans.length;
  const highRisk = scans.filter(s =>
    s.level.includes("High")
  ).length;

  const typeCount = scans.reduce((acc, cur) => {
    acc[cur.type] = (acc[cur.type] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="container text-light py-5">
        <p className="text-secondary">Loading admin analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-light py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container text-light py-5">
      <h3 className="fw-bold mb-4">Admin Analytics</h3>

      <div className="row g-4">
        {/* Total Scans */}
        <div className="col-md-4">
          <div className="feature-card p-4">
            <h6>Total Scans</h6>
            <h2>{total}</h2>
          </div>
        </div>

        {/* High Risk */}
        <div className="col-md-4">
          <div className="feature-card p-4">
            <h6>High Risk Scans</h6>
            <h2 className="text-danger">{highRisk}</h2>
          </div>
        </div>

        {/* Scan Types */}
        <div className="col-md-4">
          <div className="feature-card p-4">
            <h6>Scan Types</h6>
            {Object.keys(typeCount).length === 0 ? (
              <p className="text-secondary">No data</p>
            ) : (
              Object.keys(typeCount).map(type => (
                <p key={type}>
                  {type}: {typeCount[type]}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

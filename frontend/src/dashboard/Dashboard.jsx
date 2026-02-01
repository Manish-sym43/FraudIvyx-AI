import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

function Dashboard() {
  const { user } = useAuth();

  /* ⭐ NEW: loading state */
  const [loading, setLoading] = useState(true);

  /* ⭐ NEW: smooth delay */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // 1.2 sec splash

    return () => clearTimeout(timer);
  }, []);

  /* ⭐ NEW: Loading Screen UI */
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0d1117",
          color: "white",
          flexDirection: "column",
        }}
      >
        <div className="spinner-border text-info mb-3" />
        <h5>Preparing your dashboard...</h5>
      </div>
    );
  }

  //Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="container text-light py-5">
      <h2 className="fw-bold">
        {getGreeting()}, {user?.name || user?.email || "User"} 👋
      </h2>

      <p className="text-secondary">
        Analyze suspicious content and stay protected.
      </p>

      <div className="row mt-4 g-4">
        <div className="col-md-4">
          <div className="feature-card p-4">
            <h5>Email Scan</h5>
            <p className="text-secondary">Check phishing emails</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="feature-card p-4">
            <h5>URL Scan</h5>
            <p className="text-secondary">Detect malicious links</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="feature-card p-4">
            <h5>Phone Check</h5>
            <p className="text-secondary">Identify scam numbers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

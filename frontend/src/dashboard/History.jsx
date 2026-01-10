import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://fraudivyx-backend.onrender.com/api/scan/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHistory(res.data);
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container text-light py-5">
      <h3 className="fw-bold mb-4">Scan History</h3>

      {loading ? (
        <p className="text-secondary">Loading scan history...</p>
      ) : history.length === 0 ? (
        <div className="alert alert-secondary">
          No scans yet. Try scanning something suspicious.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Risk</th>
                <th style={{ width: "200px" }}>Confidence</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => {
                const color =
                  item.level.includes("High")
                    ? "danger"
                    : item.level.includes("Medium")
                    ? "warning"
                    : "success";

                return (
                  <tr key={item._id}>
                    <td>{item.type}</td>

                    {/* Risk Badge */}
                    <td>
                      <span className={`badge bg-${color}`}>
                        {item.level}
                      </span>
                    </td>

                    {/* Confidence Meter */}
                    <td>
                      <div className="progress" style={{ height: "6px" }}>
                        <div
                          className={`progress-bar bg-${color}`}
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                      <small className="text-secondary">
                        {item.confidence}%
                      </small>
                    </td>

                    {/* Time */}
                    <td>
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default History;

import { useScan } from "../context/ScanContext";

function AdminDashboard () {
  const { history } = useScan();

  const total = history.length;
  const highRisk = history.filter(h => h.level === "High Risk").length;

  const typeCount = history.reduce((acc, cur) => {
    acc[cur.type] = (acc[cur.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="container text-light py-5">
      <h3 className="fw-bold mb-4">Admin Analytics</h3>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="feature-card p-4">
            <h6>Total Scans</h6>
            <h2>{total}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="feature-card p-4">
            <h6>High Risk Scans</h6>
            <h2 className="text-danger">{highRisk}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="feature-card p-4">
            <h6>Scan Types</h6>
            {Object.keys(typeCount).map(type => (
              <p key={type}>{type}: {typeCount[type]}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

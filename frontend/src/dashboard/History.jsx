import { useScan } from "../context/ScanContext";

function History() {
  const { history } = useScan();

  return (
    <div className="container text-light py-5">
      <h3 className="fw-bold mb-4">Scan History</h3>

      {history.length === 0 ? (
        <p className="text-secondary">No scans yet.</p>
      ) : (
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Type</th>
              <th>Risk</th>
              <th>Confidence</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.type}</td>
                <td className={`text-${item.color}`}>
                  {item.level}
                </td>
                <td>{item.confidence}%</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;

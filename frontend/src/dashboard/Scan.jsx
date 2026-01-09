import { useState } from "react";
import jsPDF from "jspdf";

function Scan() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScan = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ input }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server error. Please login again.");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Scan failed");

      setResult({
        input,
        type: data.type,
        level: data.level,
        confidence: data.confidence,
        color: data.color,
        message: data.message,
        reasons: data.reasons || [],
        time: new Date().toLocaleString(),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ===== PDF EXPORT ===== */
  const downloadPDF = () => {
    if (!result) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Scam Detection Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Type: ${result.type}`, 20, 40);
    doc.text(`Risk Level: ${result.level}`, 20, 50);
    doc.text(`Confidence: ${result.confidence}%`, 20, 60);
    doc.text(`Time: ${result.time}`, 20, 70);

    doc.text("Reasons:", 20, 90);
    result.reasons.forEach((r, i) => {
      doc.text(`- ${r}`, 20, 100 + i * 10);
    });

    doc.save("scam-report.pdf");
  };

  return (
    <div className="container text-light py-5">
      <h3 className="fw-bold">Scam Scanner</h3>
      <p className="text-secondary mb-4">
        Paste email, URL, message, or phone number
      </p>

      <textarea
        rows="5"
        className="form-control dark-input"
        placeholder="Paste suspicious content..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {error && <p className="text-danger mt-2">{error}</p>}

      <button
        className="btn btn-info mt-3"
        onClick={handleScan}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="mt-4 p-4 rounded bg-dark border">
          {/* Risk Badge */}
          <span
            className={`badge bg-${result.color} mb-2`}
            style={{ fontSize: "14px" }}
          >
            {result.level}
          </span>

          <p className="mt-2">
            <strong>Type:</strong> {result.type}
          </p>

          {/* Confidence Meter */}
          <p className="mb-1">
            <strong>Confidence:</strong> {result.confidence}%
          </p>
          <div className="progress mb-3" style={{ height: "8px" }}>
            <div
              className={`progress-bar bg-${result.color}`}
              style={{ width: `${result.confidence}%` }}
            />
          </div>

          <p>{result.message}</p>

          {/* Explainable AI */}
          {result.reasons.length > 0 && (
            <>
              <h6 className="mt-3 fw-bold">Why flagged?</h6>
              <ul className="text-secondary">
                {result.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </>
          )}

          <button
            className="btn btn-outline-info mt-3"
            onClick={downloadPDF}
          >
            Download Report (PDF)
          </button>
        </div>
      )}
    </div>
  );
}

export default Scan;

import { useState } from "react";
import { useScan } from "../context/ScanContext";
import jsPDF from "jspdf";

function Scan() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addScan } = useScan();

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

      // ❌ Backend HTML ya kuch aur bhej raha hai
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Server error: JSON response expected (check backend / auth)"
        );
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Scan failed");
      }

      const scanResult = {
        id: Date.now(),
        input,
        type: data.type,
        level: data.level,
        confidence: data.confidence,
        color: data.color,
        message: data.message,
        time: new Date().toLocaleString(),
      };

      setResult(scanResult);
      addScan(scanResult);
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

    doc.text("Scanned Content:", 20, 90);
    doc.text(result.input.substring(0, 300), 20, 100);

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
        <div className={`alert alert-${result.color} mt-4`}>
          <h5 className="fw-bold">{result.level}</h5>
          <p>
            Type: <strong>{result.type}</strong>
          </p>
          <p>
            Confidence: <strong>{result.confidence}%</strong>
          </p>
          <p className="mb-0">{result.message}</p>

          <button
            className="btn btn-outline-light mt-3"
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

import { useState } from "react";
import { useScan } from "../context/ScanContext";
import jsPDF from "jspdf";

function detectType(input) {
  if (/https?:\/\//i.test(input)) return "URL";
  if (/^\+?\d{10,}$/i.test(input)) return "Phone";
  if (/@/.test(input)) return "Email";
  return "Text / Message";
}

function Scan() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addScan } = useScan();

  const handleScan = () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const confidence = Math.floor(Math.random() * 40) + 60;
      const type = detectType(input);

      let level, color, message;

      if (confidence > 85) {
        level = "High Risk";
        color = "danger";
        message = "Very likely a scam.";
      } else if (confidence > 70) {
        level = "Medium Risk";
        color = "warning";
        message = "Suspicious content detected.";
      } else {
        level = "Low Risk";
        color = "success";
        message = "No strong scam indicators.";
      }

      const scanResult = {
        id: Date.now(),
        input,
        type,
        level,
        confidence,
        color,
        time: new Date().toLocaleString(),
      };

      setResult(scanResult);
      addScan(scanResult);
      setLoading(false);
    }, 1500);
  };

  // ✅ PDF FUNCTION INSIDE COMPONENT
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
          <p>Type: <strong>{result.type}</strong></p>
          <p>Confidence: <strong>{result.confidence}%</strong></p>
          <p className="mb-0">{result.message}</p>

          {/* ✅ PDF BUTTON INSIDE JSX */}
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

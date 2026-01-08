import { useState } from "react";

function Report() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container text-light py-5">
      <h3 className="fw-bold mb-3">Report Scam</h3>
      <p className="text-secondary">
        Report scam to cyber crime authorities
      </p>

      {submitted ? (
        <div className="alert alert-success">
          Scam reported successfully 🚓
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control dark-input mb-3"
            rows="4"
            placeholder="Describe the scam..."
            required
          />

          <select className="form-control dark-input mb-3">
            <option>Cyber Crime Cell</option>
            <option>Police Department</option>
            <option>Bank Fraud Department</option>
          </select>

          <button className="btn btn-danger">
            Report Scam
          </button>
        </form>
      )}
    </div>
  );
}

export default Report;

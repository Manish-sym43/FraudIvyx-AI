function Dashboard() {
  return (
    <div className="container text-light py-5">
      <h2 className="fw-bold">Welcome, User 👋</h2>
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

function Features() {
  return (
    <section className="section-dark text-light text-center py-6 ">
      <div className="container">
        <h2 className="fw-bold mb-5">Comprehensive Scam Detection</h2>

        <div className="row g-4">
          {[
            ["📧", "Email Analysis", "Detect phishing and malicious emails"],
            ["🔗", "URL Scanner", "Verify links before clicking"],
            ["📞", "Phone Check", "Identify scam numbers & robocalls"],
            ["💬", "SMS & Messages", "Analyze texts & social messages"],
          ].map((item, i) => (
            <div className="col-md-3" key={i}>
              <div className="card feature-card p-4 h-100">
                <div className="fs-1">{item[0]}</div>
                <h5 className="mt-3">{item[1]}</h5>
                <p className="text-secondary">{item[2]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;

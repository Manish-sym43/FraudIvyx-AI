function HowItWorks() {
  return (
    <section className="section-dark text-light text-center">
      <div className="container">
        <h2 className="fw-bold mb-5">How It Works</h2>

        <div className="row">
          {[
            ["1", "Paste Content", "Enter email, URL, phone or message"],
            ["2", "AI Analysis", "AI scans for scam indicators"],
            ["3", "Get Results", "Instant risk & safety advice"],
          ].map((step, i) => (
            <div className="col-md-4" key={i}>
              <div className="step-circle mb-3">{step[0]}</div>
              <h5>{step[1]}</h5>
              <p className="text-secondary">{step[2]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

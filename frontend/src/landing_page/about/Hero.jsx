function Hero() {
  return (
    <section className="about-section text-light mt-5 py-4">
      <div className="container">
        {/*Header*/}
        <div className="text-center mb-5">
          <div className="about-icon mb-2">🛡️</div>
          <h2 className="fw-bold">
            About <span className="text-info">FraudIvyx</span>{" "}
            <span className="text-purple">AI</span>
          </h2>
          <p className="text-secondary">
            Your intelligent guardian against online scams, phishing, and fraud
            attempts.
          </p>
        </div>

        {/*Our Mission*/}
        <div className="about-card p-5 mb-5">
          <h4 className="fw-bold mb-3">Our Mission</h4>
          <p className="text-secondary">
            In an era where cyber threats are evolving rapidly, FraudIvyx AI
            provides real-time protection using advanced AI technology. Our
            mission is to empower individuals and businesses to identify and
            avoid scams before they cause harm.
          </p>
          <p className="text-secondary">
            We believe everyone deserves to navigate the digital world safely
            and confidently. That’s why we’ve built an accessible, intelligent
            platform that analyzes suspicious content in seconds.
          </p>
        </div>

        {/*Why Choose*/}
        <h3 className="text-center fw-bold mb-4">Why Choose FraudIvyx AI?</h3>

        <div className="row mb-5">
          {[
            [
              "🧠",
              "AI-Powered Detection",
              "Advanced ML algorithms detect patterns humans miss.",
            ],
            [
              "⚡",
              "Real-Time Analysis",
              "Get instant results in under 2 seconds.",
            ],
            ["🔒", "Privacy First", "Your data is encrypted and never shared."],
            [
              "🎯",
              "Comprehensive Coverage",
              "Analyze emails, URLs, SMS, phone numbers & more.",
            ],
            [
              "👁️",
              "99% Accuracy",
              "Hybrid AI system ensures exceptional accuracy.",
            ],
            [
              "🔁",
              "Always Updated",
              "AI continuously learns from new scam tactics.",
            ],
          ].map((item, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="about-feature p-4 h-100">
                <div className="fs-2 mb-2 text-info">{item[0]}</div>
                <h5>{item[1]}</h5>
                <p className="text-secondary">{item[2]}</p>
              </div>
            </div>
          ))}
        </div>

        {/*How It Works*/}
        <div className="about-card p-5">
          <h4 className="fw-bold mb-4">How It Works</h4>

          <div className="mb-3">
            <strong>1. Content Analysis</strong>
            <p className="text-secondary">
              Our AI examines content for suspicious keywords, patterns, and
              known scam indicators.
            </p>
          </div>

          <div className="mb-3">
            <strong>2. Pattern Recognition</strong>
            <p className="text-secondary">
              Advanced algorithms detect phishing tactics like urgency language
              and fake rewards.
            </p>
          </div>

          <div className="mb-3">
            <strong>3. Risk Assessment</strong>
            <p className="text-secondary">
              Each input receives a risk score (Low, Medium, High) with clear
              explanations.
            </p>
          </div>

          <div>
            <strong>4. Actionable Recommendations</strong>
            <p className="text-secondary">
              You get clear, practical advice on how to proceed safely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

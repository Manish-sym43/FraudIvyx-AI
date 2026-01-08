import { Link } from "react-router-dom";

function Main() {
  return (
    <section className="hero-section text-center text-light d-flex align-items-center mb-5 py-5">
      <div className="container">
        <h1 className="fw-bold display-4">
          Detect Scams <br />
          <span className="text-info">Before They Strike</span>
        </h1>

        <p className="text-secondary mt-3">
          AI-powered protection against phishing, fraud, and scam attempts.
          Analyze emails, URLs, messages, and phone numbers in real-time.
        </p>

        <div className="mt-4">
          {/* 👇 Signup redirect */}
          <Link to="/get_started">
            <button className="btn btn-info px-4 py-2 me-3 fw-semibold">
              Get Started Free
            </button>
          </Link>

          <button className="btn btn-outline-light px-4 py-2">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Main;


import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="cta-section text-center text-light mb-5 py-5">
      <div className="container">
        <div className="cta-icon mb-3">👁️</div>

        <h2 className="fw-bold display-6">Stay Protected Today</h2>

        <p className="text-secondary mt-2">
          Join thousands protecting themselves from online scams
        </p>

        {/* 👇 Signup Redirect */}
        <Link to="/get_started">
          <button className="btn btn-info px-5 py-2 mt-4 fw-semibold">
            Start Free Protection
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Footer;


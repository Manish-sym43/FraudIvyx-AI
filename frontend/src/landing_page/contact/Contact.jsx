function Contact() {
  return (
    <section className="contact-section text-light mt-5 py-5">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-5">
          <div className="contact-icon mb-2">🛡️</div>
          <h2 className="fw-bold">
            Get In <span className="text-info">Touch</span>
          </h2>
          <p className="text-secondary">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        {/* Top Cards */}
        <div className="row mb-5">
          <div className="col-md-6 mb-4">
            <div className="contact-card p-4 h-100">
              <div className="fs-2 text-info mb-2">📧</div>
              <h5>Email Us</h5>
              <p className="text-secondary">For support and inquiries</p>
              <p className="text-info">fraudivyxai@gmail.com</p>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="contact-card p-4 h-100">
              <div className="fs-2 text-purple mb-2">💬</div>
              <h5>Feedback</h5>
              <p className="text-secondary">Help us improve fraudivyx</p>
              <p className="text-info">fraudivyxai@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="contact-form-box p-5">
          <h4 className="fw-bold mb-4">Send Us a Message</h4>

          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control dark-input"
                placeholder="Your name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control dark-input"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Message</label>
              <textarea
                className="form-control dark-input"
                rows="5"
                placeholder="Tell us what's on your mind..."
              ></textarea>
            </div>

            <button className="btn btn-info w-100 fw-semibold">
              ✈️ Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;

import "./Footer.css";

const TESTIMONIALS = [
  {
    quote: "Reduced image storage costs by 63% in three months — with zero engineering effort on our side.",
    author: "VP Infrastructure",
    company: "Series C Fintech",
  },
  {
    quote: "The retention policy engine alone saved us two compliance audits and $400K in potential fines.",
    author: "Head of Legal Ops",
    company: "Global Logistics Co.",
  },
];

const TRUST_LOGOS = ["AWS", "OpenAI", "SOC 2", "GDPR", "HIPAA", "ISO 27001"];

export default function Footer() {
  return (
    <footer className="footer-root">
      {/* ── TESTIMONIALS ──────────────────────── */}
      <section className="footer-testimonials" aria-labelledby="testimonials-heading">
        <div className="section-container">
          <p className="section-eyebrow" id="testimonials-heading">
            Customer Stories
          </p>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.author} className="testimonial-card card">
                <p className="testimonial-quote">"{t.quote}"</p>
                <footer className="testimonial-meta">
                  <span className="testimonial-author">{t.author}</span>
                  <span className="testimonial-company">{t.company}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST LOGOS ───────────────────────── */}
      <section className="footer-trust" aria-label="Trust and compliance logos">
        <div className="section-container">
          <p className="trust-label">Trusted & Compliant With</p>
          <div className="trust-logos" role="list">
            {TRUST_LOGOS.map((logo) => (
              <div key={logo} className="trust-pill" role="listitem">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND FOOTER ──────────────────────── */}
      <div className="footer-brand-bar">
        <div className="section-container footer-brand-inner">
          <div className="footer-brand-left">
            <span className="footer-logo">PurgeAI</span>
            <span className="footer-tagline">
              Autonomous Visual Data Governance
            </span>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#" className="footer-nav-link">Privacy Policy</a>
            <a href="#" className="footer-nav-link">Terms of Service</a>
            <a href="mailto:sales@purgeai.io" className="footer-nav-link">
              Contact Sales
            </a>
          </nav>

          <div className="footer-industries">
            <span className="footer-industries-label">Built for</span>
            <span>Fintech · Logistics · Cybersecurity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

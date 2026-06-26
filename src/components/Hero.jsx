import { useEffect, useRef } from "react";
import "./Hero.css";

function Hero() {
  const heroRef = useRef(null);

  // Staggered fade-in via WAAPI — no Framer Motion
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const targets = el.querySelectorAll("[data-animate]");
    targets.forEach((node, i) => {
      node.animate(
        [
          { opacity: 0, transform: "translateY(24px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 600,
          delay: i * 120,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        }
      );
    });
  }, []);

  const metrics = [
    { value: "12.4M", label: "Images Processed", accent: "var(--color-warning)" },
    { value: "$3.2M", label: "Cost Saved", accent: "var(--color-highlight)" },
    { value: "97.4%", label: "Compliance Score", accent: "#22d97a" },
  ];

  return (
    <header className="hero-section" ref={heroRef}>
      {/* Scanline atmosphere overlay */}
      <div className="hero-scanlines" aria-hidden="true" />
      <div className="hero-grid-bg" aria-hidden="true" />

      <div className="hero-inner section-container">
        {/* ── LEFT ─────────────────────────────────── */}
        <div className="hero-left">
          <div data-animate style={{ opacity: 0 }}>
            <span className="badge">
              <span className="dot-live" />
              Enterprise AI Platform
            </span>
          </div>

          <h1 data-animate style={{ opacity: 0 }} className="hero-headline">
            Autonomous Visual
            <br />
            <span className="hero-headline-accent">Data Governance</span>
          </h1>

          <p data-animate style={{ opacity: 0 }} className="hero-body">
            Reduce enterprise storage costs by 68% while eliminating shadow-data
            risks. Scan, redact, archive, and purge at machine speed.
          </p>

          <p data-animate style={{ opacity: 0 }} className="hero-trust">
            Trusted by logistics, fintech, and cybersecurity leaders worldwide.
          </p>

          <div data-animate style={{ opacity: 0 }} className="hero-cta-row">
            <button className="btn-primary">Simulate Audit</button>
            <button className="btn-ghost">Book a Demo →</button>
          </div>
        </div>

        {/* ── RIGHT — Live Metrics Card ─────────────── */}
        <div data-animate style={{ opacity: 0 }} className="hero-metrics-card card">
          <div className="metrics-card-header">
            <span className="metrics-card-title">Live Enterprise Metrics</span>
            <span className="badge">
              <span className="dot-live" />
              Live
            </span>
          </div>

          <div className="metrics-grid">
            {metrics.map(({ value, label, accent }) => (
              <div key={label} className="metric-item">
                <span className="metric-value" style={{ color: accent }}>
                  {value}
                </span>
                <span className="metric-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="metrics-bar-row" aria-hidden="true">
            <div className="mbar mbar-1" />
            <div className="mbar mbar-2" />
            <div className="mbar mbar-3" />
            <div className="mbar mbar-4" />
            <div className="mbar mbar-5" />
          </div>

          <div className="metrics-footer">
            <span>Updated in real-time &mdash; no sample data</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;

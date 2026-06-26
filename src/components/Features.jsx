import { useState, useEffect, useRef, useCallback } from "react";
import "./Features.css";

const FEATURES = [
  {
    id: "scan",
    icon: "⬡",
    eyebrow: "Ingestion",
    title: "AI-Powered Scan",
    body:
      "Ingest millions of visual assets across S3, GCS, NAS, and on-prem endpoints. Our multi-modal OCR engine extracts text, PII, and metadata in a single pass — no pre-processing required.",
    stat: "12.4M",
    statLabel: "assets/day",
    accent: "var(--color-warning)",
  },
  {
    id: "redact",
    icon: "◈",
    eyebrow: "Privacy",
    title: "Intelligent Redaction",
    body:
      "Automatically detect and redact PII — emails, card numbers, national IDs — directly on the image canvas. Zero false positives thanks to contextual NLP co-processing.",
    stat: "99.6%",
    statLabel: "precision",
    accent: "var(--color-highlight)",
  },
  {
    id: "policy",
    icon: "◻",
    eyebrow: "Governance",
    title: "Policy Automation",
    body:
      "Define retention rules once. PurgeAI enforces them perpetually — archiving, deleting, or flagging based on asset type, age, sensitivity score, and custom tags.",
    stat: "0-day",
    statLabel: "violation window",
    accent: "#22d97a",
  },
  {
    id: "audit",
    icon: "◇",
    eyebrow: "Compliance",
    title: "Audit Trail & Reports",
    body:
      "Every scan, redaction, and purge is logged immutably. Export SOC 2, GDPR, HIPAA-ready evidence packages in one click — no manual assembly.",
    stat: "ISO 27001",
    statLabel: "certified",
    accent: "#7dd3fc",
  },
];

export default function Features() {
  const [activeId, setActiveId] = useState(FEATURES[0].id);
  // Track whether we're in mobile accordion mode
  const [isMobile, setIsMobile] = useState(false);
  const mq = useRef(null);

  // Sync mobile state — activeId is preserved across resize
  useEffect(() => {
    mq.current = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.current.matches);
    mq.current.addEventListener("change", handler);
    return () => mq.current.removeEventListener("change", handler);
  }, []);

  const toggle = useCallback(
    (id) => setActiveId((prev) => (isMobile && prev === id ? null : id)),
    [isMobile]
  );

  return (
    <section className="features-section" aria-labelledby="features-heading">
      <div className="section-container">
        <div className="features-header">
          <p className="section-eyebrow">Platform Capabilities</p>
          <h2 className="section-title" id="features-heading">
            Everything your data governance team needs
          </h2>
          <p className="section-subtitle">
            From raw ingestion to compliance reporting — PurgeAI handles the
            full visual data lifecycle so your team never has to touch a
            spreadsheet again.
          </p>
        </div>

        {isMobile ? (
          /* ── MOBILE ACCORDION ─────────────────────── */
          <div className="features-accordion" role="list">
            {FEATURES.map((f) => {
              const isOpen = activeId === f.id;
              return (
                <div
                  key={f.id}
                  className={`acc-item card ${isOpen ? "acc-open" : ""}`}
                  role="listitem"
                >
                  <button
                    className="acc-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`acc-body-${f.id}`}
                    onClick={() => toggle(f.id)}
                  >
                    <span className="acc-icon" style={{ color: f.accent }}>
                      {f.icon}
                    </span>
                    <span className="acc-label">{f.title}</span>
                    <span
                      className="acc-chevron"
                      aria-hidden="true"
                      style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                    >
                      ▾
                    </span>
                  </button>

                  <div
                    id={`acc-body-${f.id}`}
                    className="acc-body"
                    hidden={!isOpen}
                  >
                    <p className="acc-eyebrow" style={{ color: f.accent }}>
                      {f.eyebrow}
                    </p>
                    <p className="acc-text">{f.body}</p>
                    <div className="acc-stat">
                      <span
                        className="acc-stat-value"
                        style={{ color: f.accent }}
                      >
                        {f.stat}
                      </span>
                      <span className="acc-stat-label">{f.statLabel}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── DESKTOP BENTO GRID ───────────────────── */
          <div className="bento-grid">
            {FEATURES.map((f) => {
              const isActive = activeId === f.id;
              return (
                <button
                  key={f.id}
                  className={`bento-card card ${isActive ? "bento-active" : ""}`}
                  onClick={() => setActiveId(f.id)}
                  aria-pressed={isActive}
                >
                  <div className="bento-top">
                    <span
                      className="bento-icon"
                      style={{ color: f.accent }}
                      aria-hidden="true"
                    >
                      {f.icon}
                    </span>
                    <span className="bento-eyebrow" style={{ color: f.accent }}>
                      {f.eyebrow}
                    </span>
                  </div>

                  <h3 className="bento-title">{f.title}</h3>

                  <p
                    className={`bento-body ${isActive ? "bento-body-visible" : ""}`}
                  >
                    {f.body}
                  </p>

                  <div className="bento-bottom">
                    <span
                      className="bento-stat-value"
                      style={{ color: f.accent }}
                    >
                      {f.stat}
                    </span>
                    <span className="bento-stat-label">{f.statLabel}</span>
                  </div>

                  {isActive && (
                    <div
                      className="bento-glow"
                      style={{ background: f.accent }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

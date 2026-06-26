import { useState } from "react";
import "./PipelineSimulator.css";

export default function PipelineSimulator() {
  const [running, setRunning] = useState(false);

  return (
    <section className="pipeline-section" aria-labelledby="pipeline-heading">
      <div className="section-container">
        <div className="pipeline-header">
          <p className="section-eyebrow">Live Simulation</p>
          <h2 className="section-title" id="pipeline-heading">
            Autonomous Data Audit Engine
          </h2>
          <p className="section-subtitle">
            Watch PurgeAI scan, classify, and route your enterprise assets in
            real time. Click the button to trigger a simulated audit run.
          </p>
        </div>

        {/* Pipeline stage container */}
        <div
          className={`pipeline-board ${running ? "running" : ""}`}
          role="img"
          aria-label="Pipeline simulation diagram"
        >
          {/* Stage 1 — Raw input */}
          <div className="pipeline-stage">
            <span className="stage-label">INPUT</span>
            <div className="stage chaos">
              <div className="data-card">
                <span className="data-icon">🖼</span>
                Screenshot_2026.png
              </div>
              <div className="data-card">
                <span className="data-icon">📎</span>
                Slack_Export.jpg
              </div>
              <div className="data-card">
                <span className="data-icon">📄</span>
                Invoice_221.pdf
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="pipeline-arrow" aria-hidden="true">
            <div className="arrow-line" />
            <span className="arrow-head">▶</span>
          </div>

          {/* Stage 2 — AI Scanner */}
          <div className="pipeline-stage">
            <span className="stage-label">SCAN</span>
            <div className="scanner">
              <div className="scanner-corner tl" />
              <div className="scanner-corner tr" />
              <div className="scanner-corner bl" />
              <div className="scanner-corner br" />
              <p className="scanner-title">AI Scanner</p>
              <div className="laser" aria-hidden="true" />
            </div>
          </div>

          {/* Arrow */}
          <div className="pipeline-arrow" aria-hidden="true">
            <div className="arrow-line" />
            <span className="arrow-head">▶</span>
          </div>

          {/* Stage 3 — Redaction */}
          <div className="pipeline-stage">
            <span className="stage-label">REDACT</span>
            <div className="redacted">
              <div className="redact-bar" />
              <div className="redact-bar" />
              <div className="redact-bar" />
            </div>
          </div>

          {/* Arrow */}
          <div className="pipeline-arrow" aria-hidden="true">
            <div className="arrow-line" />
            <span className="arrow-head">▶</span>
          </div>

          {/* Stage 4 — Routing buckets */}
          <div className="pipeline-stage">
            <span className="stage-label">ROUTE</span>
            <div className="buckets">
              <div className="bucket archive">
                <span>▣</span> ARCHIVE
              </div>
              <div className="bucket delete">
                <span>✕</span> DELETE
              </div>
              <div className="bucket retain">
                <span>◈</span> RETAIN
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pipeline-cta-row">
          <button
            className="audit-btn btn-primary"
            onClick={() => {
              setRunning(false);
              setTimeout(() => setRunning(true), 100);
            }}
          >
            ▷ Simulate Audit
          </button>
        </div>

        {/* Results */}
        {running && (
          <div className="metric-grid" role="status" aria-live="polite">
            <div className="metric-card">
              <span className="metric-value" style={{ color: "var(--color-warning)" }}>347</span>
              <span className="metric-label">Sensitive Items</span>
            </div>
            <div className="metric-card">
              <span className="metric-value" style={{ color: "var(--color-highlight)" }}>18 GB</span>
              <span className="metric-label">Storage Recovered</span>
            </div>
            <div className="metric-card">
              <span className="metric-value" style={{ color: "#22d97a" }}>14</span>
              <span className="metric-label">Compliance Risks</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

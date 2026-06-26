import { useState, useMemo } from "react";
import "./WasteCalculator.css";

function WasteCalculator() {
  const [employees, setEmployees] = useState(5000);
  const [screenshotsPerDay, setScreenshotsPerDay] = useState(12);

  // Preserve original logic exactly
  const storageTB = useMemo(
    () => (employees * screenshotsPerDay * 0.8 * 365) / 1000,
    [employees, screenshotsPerDay]
  );

  const savings = useMemo(() => storageTB * 8500, [storageTB]);

  const savingsFormatted = useMemo(() => {
    if (savings >= 1_000_000) return `$${(savings / 1_000_000).toFixed(1)}M`;
    if (savings >= 1_000) return `$${(savings / 1_000).toFixed(0)}K`;
    return `$${Math.round(savings)}`;
  }, [savings]);

  const storageFormatted = `${storageTB.toFixed(1)} TB`;

  return (
    <section className="calc-section" aria-labelledby="calc-heading">
      <div className="section-container">
        <div className="calc-header">
          <p className="section-eyebrow">ROI Calculator</p>
          <h2 className="section-title" id="calc-heading">
            Data Waste Calculator
          </h2>
          <p className="section-subtitle">
            Estimate how much your organisation is spending on redundant visual
            data — and how much PurgeAI can reclaim.
          </p>
        </div>

        <div className="calc-body card">
          {/* Sliders */}
          <div className="calc-controls">
            <div className="slider-group">
              <div className="slider-label-row">
                <label
                  htmlFor="emp-slider"
                  className="slider-label"
                >
                  Employees
                </label>
                <span className="slider-value">
                  {employees.toLocaleString()}
                </span>
              </div>
              <input
                id="emp-slider"
                type="range"
                min="100"
                max="50000"
                step="100"
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="calc-slider"
                aria-valuemin={100}
                aria-valuemax={50000}
                aria-valuenow={employees}
                aria-label="Number of employees"
              />
              <div className="slider-range-labels">
                <span>100</span>
                <span>50,000</span>
              </div>
            </div>

            <div className="slider-group">
              <div className="slider-label-row">
                <label
                  htmlFor="assets-slider"
                  className="slider-label"
                >
                  Visual assets / employee / day
                </label>
                <span className="slider-value">{screenshotsPerDay}</span>
              </div>
              <input
                id="assets-slider"
                type="range"
                min="1"
                max="50"
                value={screenshotsPerDay}
                onChange={(e) =>
                  setScreenshotsPerDay(Number(e.target.value))
                }
                className="calc-slider"
                aria-valuemin={1}
                aria-valuemax={50}
                aria-valuenow={screenshotsPerDay}
                aria-label="Visual assets per employee per day"
              />
              <div className="slider-range-labels">
                <span>1</span>
                <span>50</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="calc-results" aria-live="polite">
            <div className="result-card">
              <span className="result-value" style={{ color: "var(--color-warning)" }}>
                {storageFormatted}
              </span>
              <span className="result-label">Storage waste / year</span>
            </div>

            <div className="result-divider" aria-hidden="true" />

            <div className="result-card result-card-highlight">
              <span className="result-value" style={{ color: "#22d97a" }}>
                {savingsFormatted}
              </span>
              <span className="result-label">Potential annual savings</span>
              <span className="result-note">
                at $8,500 / TB industry average
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WasteCalculator;

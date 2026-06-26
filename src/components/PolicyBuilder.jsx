import { useState } from "react";
import "./PolicyBuilder.css";

const defaultItems = [
  { label: "Delivery photos", enabled: true },
  { label: "QR codes", enabled: true },
  { label: "Chat screenshots", enabled: true },
  { label: "Financial documents", enabled: true },
];

const options = ["48 hours", "7 days", "30 days", "90 days"];

const ACTION_META = {
  DELETE:  { color: "#f87171", icon: "✕" },
  REDACT:  { color: "var(--color-warning)", icon: "◈" },
  ARCHIVE: { color: "#7dd3fc", icon: "▣" },
};

export default function RetentionPolicyBuilder() {
  const [items, setItems] = useState(defaultItems);
  const [retention, setRetention] = useState("7 days");

  const toggleItem = (index) => {
    const copy = [...items];
    copy[index] = { ...copy[index], enabled: !copy[index].enabled };
    setItems(copy);
  };

  const getAction = (item) => {
    if (!item.enabled) return null;
    if (item.label === "Delivery photos") return "DELETE";
    if (item.label === "Chat screenshots") return "REDACT";
    if (item.label === "Financial documents") return "ARCHIVE";
    if (item.label === "QR codes") return "DELETE";
    return "DELETE";
  };

  const enabledItems = items.filter((i) => i.enabled);

  return (
    <section className="policy-section" aria-labelledby="policy-heading">
      <div className="section-container">
        <div className="policy-header">
          <p className="section-eyebrow">Policy Engine</p>
          <h2 className="section-title" id="policy-heading">
            Retention Policy Builder
          </h2>
          <p className="section-subtitle">
            Configure asset-level retention rules. PurgeAI enforces them
            automatically — no recurring manual review required.
          </p>
        </div>

        <div className="policy-grid">
          {/* ── LEFT — Configure ─────────────────── */}
          <div className="policy-configure card">
            <h3 className="policy-card-title">Configure Policy</h3>

            <fieldset className="policy-fieldset">
              <legend className="policy-legend">Asset types to include</legend>
              {items.map((item, i) => {
                const action = getAction(item);
                const meta = action ? ACTION_META[action] : null;
                return (
                  <label key={item.label} className="policy-row">
                    <span className="policy-checkbox-wrap">
                      <input
                        type="checkbox"
                        checked={item.enabled}
                        onChange={() => toggleItem(i)}
                        className="policy-checkbox"
                        aria-label={item.label}
                      />
                      <span
                        className={`policy-checkmark ${item.enabled ? "checked" : ""}`}
                        aria-hidden="true"
                      >
                        {item.enabled && "✓"}
                      </span>
                    </span>
                    <span className="policy-row-label">{item.label}</span>
                    {meta && (
                      <span
                        className="policy-action-tag"
                        style={{ color: meta.color, borderColor: `${meta.color}40` }}
                      >
                        {meta.icon} {action}
                      </span>
                    )}
                  </label>
                );
              })}
            </fieldset>

            <div className="policy-retention-row">
              <label htmlFor="retention-select" className="policy-legend">
                Purge after
              </label>
              <select
                id="retention-select"
                value={retention}
                onChange={(e) => setRetention(e.target.value)}
                className="policy-select"
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ── RIGHT — Summary ──────────────────── */}
          <div className="policy-summary card">
            <h3 className="policy-card-title">Policy Summary</h3>

            {enabledItems.length === 0 ? (
              <p className="policy-empty">
                Enable at least one asset type to generate a policy.
              </p>
            ) : (
              <div className="policy-rules">
                {enabledItems.map((item) => {
                  const action = getAction(item);
                  const meta = action ? ACTION_META[action] : null;
                  return (
                    <div key={item.label} className="policy-rule-row">
                      <span className="policy-rule-asset">{item.label}</span>
                      <div className="policy-rule-right">
                        {meta && (
                          <span
                            className="policy-action-tag"
                            style={{ color: meta.color, borderColor: `${meta.color}40` }}
                          >
                            {meta.icon} {action}
                          </span>
                        )}
                        <span className="policy-rule-after">
                          after {retention}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {enabledItems.length > 0 && (
              <div className="policy-apply-row">
                <button className="btn-primary policy-apply-btn">
                  Apply Policy
                </button>
                <p className="policy-apply-note">
                  Applies to all new assets from today
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

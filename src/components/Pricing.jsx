import { useState, useMemo, useCallback, memo } from "react";
import "./Pricing.css";

/* ============================================================
   PRICING DATA — single source of truth
   All prices are in USD base. Conversion is dynamic.
   ============================================================ */
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For small teams getting started",
    baseUSD: 149,
    highlight: false,
    features: [
      "Up to 500K assets/month",
      "OCR + PII redaction",
      "3 retention policies",
      "Email support",
      "GDPR-ready audit logs",
    ],
    cta: "Start free trial",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For scaling data-heavy operations",
    baseUSD: 499,
    highlight: true,
    badge: "Most Popular",
    features: [
      "Up to 5M assets/month",
      "Everything in Starter",
      "Unlimited policies",
      "Slack + webhook alerts",
      "SOC 2 evidence export",
      "Priority support (4h SLA)",
    ],
    cta: "Start free trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For regulated industries at scale",
    baseUSD: 1499,
    highlight: false,
    features: [
      "Unlimited assets",
      "Everything in Growth",
      "On-prem deployment option",
      "HIPAA + ISO 27001 reports",
      "Dedicated success manager",
      "Custom SLA + contracts",
    ],
    cta: "Contact sales",
  },
];

/* FX rates — updated periodically, easily swappable */
const FX = { USD: 1, INR: 83.5, EUR: 0.92 };

const CURRENCY_SYMBOLS = { USD: "$", INR: "₹", EUR: "€" };

const YEARLY_DISCOUNT = 0.20; // 20%

/* ── Price calculation — pure, memoizable ── */
function calcPrice(baseUSD, currency, isYearly) {
  const monthly = baseUSD * FX[currency];
  const effective = isYearly ? monthly * (1 - YEARLY_DISCOUNT) : monthly;
  return {
    display: effective,
    monthly,
    annual: effective * 12,
  };
}

function formatPrice(amount, currency) {
  const sym = CURRENCY_SYMBOLS[currency];
  if (currency === "INR" && amount >= 1000) {
    return `${sym}${(amount / 1000).toFixed(1)}k`;
  }
  if (amount >= 1000) {
    return `${sym}${(amount / 1000).toFixed(1)}k`;
  }
  return `${sym}${Math.round(amount)}`;
}

/* ── Individual plan card — memo'd to prevent re-render on sibling changes ── */
const PlanCard = memo(function PlanCard({ plan, currency, isYearly }) {
  const price = useMemo(
    () => calcPrice(plan.baseUSD, currency, isYearly),
    [plan.baseUSD, currency, isYearly]
  );

  return (
    <div
      className={`pricing-card card ${plan.highlight ? "pricing-highlighted" : ""}`}
      aria-label={`${plan.name} plan`}
    >
      {plan.badge && (
        <div className="pricing-badge badge">{plan.badge}</div>
      )}

      <div className="pricing-plan-header">
        <h3 className="pricing-plan-name">{plan.name}</h3>
        <p className="pricing-plan-tagline">{plan.tagline}</p>
      </div>

      {/* Price — only this node updates on currency/billing change */}
      <div className="pricing-price-block" aria-live="polite">
        <span className="pricing-amount">
          {formatPrice(price.display, currency)}
        </span>
        <div className="pricing-period-stack">
          <span className="pricing-per">/mo</span>
          {isYearly && (
            <span className="pricing-annual-note">
              {formatPrice(price.annual, currency)}/yr
            </span>
          )}
        </div>
      </div>

      {isYearly && (
        <div className="pricing-savings">
          Save {formatPrice(price.monthly * 12 * YEARLY_DISCOUNT, currency)}/yr
        </div>
      )}

      <div className="divider pricing-divider" />

      <ul className="pricing-features" aria-label="Included features">
        {plan.features.map((feat) => (
          <li key={feat} className="pricing-feature-item">
            <span className="pricing-check" aria-hidden="true">✓</span>
            {feat}
          </li>
        ))}
      </ul>

      <button
        className={`pricing-cta ${plan.highlight ? "btn-primary" : "btn-ghost"}`}
      >
        {plan.cta}
      </button>
    </div>
  );
});

/* ── Main Pricing section ── */
export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [currency, setCurrency] = useState("USD");

  const handleBillingToggle = useCallback(() => setIsYearly((v) => !v), []);
  const handleCurrencyChange = useCallback((c) => setCurrency(c), []);

  return (
    <section className="pricing-section" aria-labelledby="pricing-heading">
      <div className="section-container">
        <div className="pricing-header">
          <p className="section-eyebrow">Pricing</p>
          <h2 className="section-title" id="pricing-heading">
            Transparent pricing, no surprises
          </h2>
          <p className="section-subtitle">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>

        {/* Controls */}
        <div className="pricing-controls" role="group" aria-label="Pricing controls">
          {/* Billing toggle */}
          <div className="billing-toggle" role="group" aria-label="Billing cycle">
            <button
              className={`toggle-option ${!isYearly ? "toggle-active" : ""}`}
              onClick={() => setIsYearly(false)}
              aria-pressed={!isYearly}
            >
              Monthly
            </button>

            {/* Accessible toggle switch */}
            <button
              role="switch"
              aria-checked={isYearly}
              className="toggle-switch"
              onClick={handleBillingToggle}
              aria-label="Switch to yearly billing"
            >
              <span className={`toggle-thumb ${isYearly ? "toggle-thumb-on" : ""}`} />
            </button>

            <button
              className={`toggle-option ${isYearly ? "toggle-active" : ""}`}
              onClick={() => setIsYearly(true)}
              aria-pressed={isYearly}
            >
              Yearly
              <span className="toggle-discount">–20%</span>
            </button>
          </div>

          {/* Currency switcher */}
          <div className="currency-switcher" role="group" aria-label="Currency">
            {Object.keys(FX).map((c) => (
              <button
                key={c}
                className={`currency-btn ${currency === c ? "currency-active" : ""}`}
                onClick={() => handleCurrencyChange(c)}
                aria-pressed={currency === c}
              >
                {CURRENCY_SYMBOLS[c]} {c}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="pricing-grid">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              currency={currency}
              isYearly={isYearly}
            />
          ))}
        </div>

        <p className="pricing-footnote">
          All prices exclude applicable taxes. Enterprise plans can be
          customised for volume commitments.{" "}
          <a href="mailto:sales@purgeai.io" className="pricing-link">
            Contact sales →
          </a>
        </p>
      </div>
    </section>
  );
}

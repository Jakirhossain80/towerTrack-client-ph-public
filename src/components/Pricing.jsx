// src/components/Pricing.jsx
import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiCheck,
  FiX,
  FiZap,
  FiShield,
  FiCreditCard,
  FiUsers,
  FiStar,
} from "react-icons/fi";


const defaultPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "For small buildings getting started with digital ops.",
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      { label: "Public Apartments Listing", included: true },
      { label: "Resident Announcements (view)", included: true },
      { label: "Maintenance Requests (submit)", included: true },
      { label: "Stripe Payments", included: false },
      { label: "Role-Based Dashboard", included: false },
      { label: "Coupons & Discounts", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Everything residents and managers need day to day.",
    priceMonthly: 19,
    // priceYearly omitted → will auto-calc (2 months free)
    features: [
      { label: "All Starter features", included: true },
      { label: "Stripe Rent Payments + Receipts", included: true },
      { label: "Role-Based Dashboards", included: true },
      { label: "Agreements Management", included: true },
      { label: "Coupons & Discounts", included: true },
      { label: "Notices & Role Reversion", included: true },
    ],
    badge: "Most Popular",
    highlighted: true,
  },
  {
    id: "scale",
    name: "Scale",
    description: "Advanced controls and insights for larger communities.",
    priceMonthly: 49,
    features: [
      { label: "All Growth features", included: true },
      { label: "Advanced Reports & Insights", included: true },
      { label: "Priority Support", included: true },
      { label: "Custom Domains & SSO", included: true },
      { label: "Audit Logs", included: true },
      { label: "API Access", included: true },
    ],
    badge: "For Admins",
  },
];

const Pricing = ({
  plans = defaultPlans,
  title = "Pricing",
  subtitle = "Simple, transparent plans that scale with your residential community.",
  currency = "USD",
  onSelect,
  className = "",
}) => {
  const [billing, setBilling] = useState("monthly"); // 'monthly' | 'yearly'

  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 24, easing: "ease-out" });
  }, []);

  const computedPlans = useMemo(() => {
    // If yearly price is missing, compute 2 months free (10 paid months)
    return plans.map((p) => {
      const yearly =
        typeof p.priceYearly === "number"
          ? p.priceYearly
          : Math.round((p.priceMonthly * 10 + Number.EPSILON) * 100) / 100;
      return { ...p, priceYearly: yearly };
    });
  }, [plans]);

  const handleSelect = (id) => {
    onSelect?.(id, billing);
  };

  return (
    <section
      className={`w-full bg-gray-50 dark:bg-gray-900 transition-all duration-500 ${className}`}
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-[1980px] mx-auto px-6 py-10">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-10 md:mb-12" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 text-emerald-500 font-inter text-sm sm:text-base">
            <FiCreditCard className="text-lg" />
            Flexible Plans
          </span>
          <h2
            id="pricing-heading"
            className="mt-2 text-2xl sm:text-3xl md:text-4xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500"
          >
            {title} <span className="text-lime-600">for TowerTrack</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
            {subtitle}
          </p>
        </header>

        {/* Billing Toggle */}
        <div
          className="flex items-center justify-center gap-3 sm:gap-4"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          <span className="font-inter text-sm sm:text-base text-gray-700 dark:text-gray-300">
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={billing === "yearly"}
            onClick={() => setBilling((b) => (b === "monthly" ? "yearly" : "monthly"))}
            className="relative inline-flex h-7 w-14 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
            title="Toggle billing cycle"
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white dark:bg-gray-800 shadow transition-all duration-500 ${
                billing === "yearly" ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
          <span className="font-inter text-sm sm:text-base text-gray-700 dark:text-gray-300">
            Yearly
            <span className="ml-2 inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
              <FiZap /> 2 months free
            </span>
          </span>
        </div>

        {/* Cards Grid */}
        <div
          className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {computedPlans.map((plan, idx) => (
            <PriceCard
              key={plan.id ?? idx}
              plan={plan}
              billing={billing}
              currency={currency}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Footnote */}
        <p
          className="mt-8 sm:mt-10 text-center text-xs sm:text-sm font-inter text-gray-600 dark:text-gray-400 transition-all duration-500"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          Need a custom plan or enterprise features (SSO, SLA, dedicated support)?{" "}
          <a
            href="/contact"
            className="text-emerald-600 hover:text-emerald-500 underline transition-all duration-500"
          >
            Contact us
          </a>
          .
        </p>
      </div>
    </section>
  );
};

/* ---------- Subcomponents ---------- */

const PriceCard = ({ plan, billing, currency, onSelect }) => {
  const isYearly = billing === "yearly";
  const price = plan.priceMonthly === 0
    ? 0
    : isYearly
    ? plan.priceYearly
    : plan.priceMonthly;

  const priceSuffix = plan.priceMonthly === 0 ? "" : isYearly ? "/yr" : "/mo";

  return (
    <article
      className={`relative h-full rounded-2xl border bg-white dark:bg-gray-800 transition-all duration-500 hover:shadow-lg ${
        plan.highlighted
          ? "border-lime-500/70 dark:border-lime-500/70"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-4 inline-flex items-center gap-1 rounded-full bg-emerald-500 text-white px-3 py-1 text-xs font-inter shadow transition-all duration-500">
          <FiStar className="text-sm" />
          {plan.badge}
        </div>
      )}

      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-gray-200 dark:border-gray-700 transition-all duration-500">
        <h3 className="text-lg sm:text-xl font-poppins font-semibold text-gray-800 dark:text-gray-200 transition-all duration-500">
          {plan.name}
        </h3>
        <p className="mt-1 text-sm sm:text-base font-inter text-gray-600 dark:text-gray-300 transition-all duration-500">
          {plan.description}
        </p>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-3xl sm:text-4xl font-poppins font-semibold text-gray-800 dark:text-gray-100 transition-all duration-500">
            {plan.priceMonthly === 0 ? "Free" : formatCurrency(price, currency)}
          </span>
          {plan.priceMonthly !== 0 && (
            <span className="text-gray-600 dark:text-gray-400 font-inter transition-all duration-500">
              {priceSuffix}
            </span>
          )}
        </div>

        {plan.priceMonthly !== 0 && billing === "yearly" && (
          <p className="mt-1 text-xs font-inter text-emerald-600 dark:text-emerald-400">
            Billed annually — save 16%
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="p-5 sm:p-6 space-y-3">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className={`mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs ${
                f.included
                  ? "bg-lime-50 dark:bg-gray-700 text-lime-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-400"
              }`}
            >
              {f.included ? <FiCheck /> : <FiX />}
            </span>
            <span
              className={`font-inter text-sm sm:text-base transition-all duration-500 ${
                f.included
                  ? "text-gray-700 dark:text-gray-300"
                  : "text-gray-400 dark:text-gray-500 line-through"
              }`}
            >
              {f.label}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="px-5 sm:px-6 pb-6">
        <button
          type="button"
          onClick={() => onSelect?.(plan.id, billing)}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-inter font-medium text-white transition-all duration-500 ${
            plan.highlighted
              ? "bg-emerald-500 hover:bg-emerald-600"
              : "bg-lime-600 hover:bg-lime-500"
          }`}
          aria-label={`Choose ${plan.name} plan (${billing})`}
        >
          <FiUsers />
          Choose {plan.name}
        </button>
        {/* Subtle accent */}
        <div className="mt-4 h-1 w-16 rounded bg-emerald-400/50 hover:bg-emerald-500 transition-all duration-500 mx-auto" />
      </div>
    </article>
  );
};

function formatCurrency(value, currency = "USD") {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
}

export default Pricing;

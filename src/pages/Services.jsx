// src/pages/Services.jsx
import React from "react";
import "./Services.css";

const SERVICES = [
  {
    title: "IT Consulting",
    desc:
      "Data center design & deployment, IT infrastructure architecture, rollout, and lifecycle management.",
    bullets: ["DC design & migration", "Network & security architecture", "Infrastructure rollout"],
    img: "/consulting.png",
    alt: "IT consulting and datacenter illustration",
  },
  {
    title: "Software Development",
    desc:
      "ERP and business application development tailored to your workflows with clean, scalable code.",
    bullets: ["ERP modules", "Business process automation", "APIs & integrations"],
    img: "/swdev.png", // ensure this file exists exactly with this name/case
    alt: "Software development and ERP illustration",
  },
  {
    title: "Mobile App Development",
    desc:
      "Android & iOS applications with robust backends, analytics, and CI/CD for rapid iteration.",
    bullets: ["Native & Cross-platform", "Secure auth & payments", "Offline-first UX"],
    img: "/mobileapp.png",
    alt: "Mobile app development illustration",
  },
  {
    title: "Custom Web Development & UI/UX & Branding",
    desc:
      "High-performance sites and web apps with premium UI/UX, brand systems, and SEO-first builds.",
    bullets: ["Design systems", "Headless CMS", "Accessibility & SEO"],
    img: "/webdev.png",
    alt: "Custom web development and branding illustration",
  },
  {
    title: "Cloud & DevOps",
    desc:
      "Design, deploy, and automate on Azure, AWS, Google Cloud, and OCI using IaC and modern DevOps.",
    bullets: ["Terraform/CloudFormation", "Kubernetes/Docker CI/CD", "Observability & cost control"],
    img: "/cloud.png", // <- removed trailing space
    alt: "Cloud and DevOps services illustration",
  },
  {
    title: "KPO/BPO Operations",
    desc:
      "End-to-end operations to grow and support your business: lead generation, research, surveys, and call centers.",
    bullets: ["Sales leads", "Market research & surveys", "Support call centre"],
    img: "/bpo.png",
    alt: "BPO/KPO operations illustration",
  },
  {
    title: "Legal & Financial Arbitrations",
    desc:
      "Neutral, structured resolution and advisory on commercial disputes and financial matters.",
    bullets: ["Arbitration support", "Documentation & filings", "Settlement facilitation"],
    img: "/Legal.png",
    alt: "Legal and financial arbitration illustration",
  },
  {
    title: "Commercial Taxation",
    desc:
      "GST company registration and compliant return filing with up-to-date statutory guidance.",
    bullets: ["GST registration", "GST return filing", "Advisory & audits"],
    img: "/comtax.png",
    alt: "Commercial taxation illustration",
  },
  {
    title: "Personal Taxation",
    desc:
      "Income tax planning and filing for individuals, professionals, and founders.",
    bullets: ["ITR preparation & filing", "Deductions & exemptions", "Year-round support"],
    img: "/pertax.png",
    alt: "Personal taxation illustration",
  },
];

const PROCESS = [
  { step: "01", title: "Discovery", text: "Clarify goals, constraints, and KPIs." },
  { step: "02", title: "Design", text: "Wireframes → prototypes → validated UI/flows." },
  { step: "03", title: "Build", text: "Agile sprints with CI/CD and code reviews." },
  { step: "04", title: "Launch", text: "Harden, monitor, and ship with confidence." },
  { step: "05", title: "Scale", text: "Measure, optimize, and iterate for growth." },
];

export default function Services() {
  return (
    <main className="svc">
      {/* Hero */}
      <section className="svc-hero">
        <div className="svc-container">
          <span className="svc-badge">Our Services</span>
          <h1 className="svc-title">Build fast. Ship beautifully. Scale confidently.</h1>
          <p className="svc-subtitle">
            From consulting and engineering to cloud, operations, and taxation—one partner for strategy,
            delivery, and long-term support.
          </p>
          <div className="svc-cta">
            <a className="btn btn--primary" href="/contact">Start a project</a>
            <a className="btn btn--ghost" href="/portfolio">See our work</a>
          </div>
        </div>
        <div className="svc-hero-glow" aria-hidden="true" />
      </section>

      {/* Stats */}
      <section className="svc-stats">
        <div className="svc-container svc-stats-grid">
          <Stat kpi="50+" label="Projects delivered" />
          <Stat kpi="98%" label="On-time delivery" />
          <Stat kpi="5★" label="Client satisfaction" />
          <Stat kpi="24/7" label="Support SLAs" />
        </div>
      </section>

      {/* Services grid */}
      <section className="svc-section">
        <div className="svc-container">
          <header className="svc-head">
            <h2>What we do</h2>
            <p>Plug us into your roadmap or launch a turnkey build—end-to-end execution with clear ownership.</p>
          </header>

          <div className="svc-grid">
            {SERVICES.map((s) => (
              <article key={s.title} className="svc-card">
                <div className="svc-card-media">
                  <img src={s.img} alt={s.alt} loading="lazy" />
                </div>
                <div className="svc-card-body">
                  <h3>{s.title}</h3>
                  <p className="svc-card-desc">{s.desc}</p>
                  <ul className="svc-card-list">
                    {s.bullets.map((b) => (
                      <li key={b}>
                        <CheckIcon />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="svc-section svc-process">
        <div className="svc-container">
          <header className="svc-head">
            <h2>Our process</h2>
            <p>Transparent steps. Predictable outcomes.</p>
          </header>

          <ol className="svc-process-rail">
            {PROCESS.map((p) => (
              <li key={p.step} className="svc-process-step">
                <div className="svc-step-badge">{p.step}</div>
                <div className="svc-step-meta">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Feature strip */}
      <section className="svc-section svc-features">
        <div className="svc-container svc-features-grid">
          <Feature title="Performance by default" text="Core Web Vitals, code-splitting, caching, and image optimization." />
          <Feature title="Security first" text="OWASP, secret management, least-privilege IAM, and audits." />
          <Feature title="Maintainable code" text="Types, linting, tests, docs, and scalable patterns." />
          <Feature title="Cloud economics" text="Right-sized infra, autoscaling, and cost monitoring." />
        </div>
      </section>

      {/* CTA */}
      <section className="svc-cta-wrap">
        <div className="svc-container svc-cta-card">
          <div>
            <h2 className="svc-cta-title">Have a project in mind?</h2>
            <p className="svc-cta-sub">Let’s turn your idea into a product your customers will love.</p>
          </div>
          <a className="btn btn--primary" href="/contact" aria-label="Contact us">Contact us</a>
        </div>
      </section>
    </main>
  );
}

function Stat({ kpi, label }) {
  return (
    <div className="svc-stat">
      <div className="svc-kpi">{kpi}</div>
      <div className="svc-kpi-label">{label}</div>
    </div>
  );
}

function Feature({ title, text }) {
  return (
    <article className="svc-feature">
      <ShieldIcon />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

/* Icons */
function CheckIcon() {
  return (
    <svg className="i i-check" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M9.55 17.6 4.9 13l1.4-1.4 3.25 3.2 7.25-7.35L18.2 9z" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg className="i i-shield" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path fill="currentColor" d="M12 2 4 6v6c0 5 3.4 9.7 8 10 4.6-.3 8-5 8-10V6l-8-4z" />
    </svg>
  );
}

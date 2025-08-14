// src/pages/About-us.jsx
import React from "react";
import "./About-us.css";

/**
 * Paste your real image URLs from https://www.augutsya.com/about-us/
 * Tip: right-click image → "Copy image address" and replace the placeholders below.
 */
const IMG = {
  hero:
    "https://your-live-image-url/hero.jpg", // TODO: replace with actual hero banner URL
  about1:
    "https://your-live-image-url/about-1.jpg", // TODO
  about2:
    "https://your-live-image-url/about-2.jpg", // TODO
  values:
    "https://your-live-image-url/values.jpg", // TODO
  office:
    "https://your-live-image-url/office.jpg", // TODO
  cta:
    "https://your-live-image-url/cta.jpg", // TODO (subtle background for CTA)
  // Logos (optional)
  logo1:
    "https://your-live-image-url/logo1.png", // TODO
  logo2:
    "https://your-live-image-url/logo2.png", // TODO
  logo3:
    "https://your-live-image-url/logo3.png", // TODO
};

export default function AboutUs() {
  return (
    <main className="about">
      {/* HERO */}
      <section className="about-hero" aria-label="About us hero">
        <div
          className="about-hero__media"
          role="img"
          aria-label="Team working in a modern office"
          style={{ backgroundImage: `url(${IMG.hero})` }}
        />
        <div className="about-hero__content container">
          <p className="about-kicker">Who We Are</p>
          <h1 className="about-title">
            Building useful tech that feels effortless
          </h1>
          <p className="about-sub">
            We’re a product-first team focused on clarity, speed, and reliability—so
            your users can do more with less effort.
          </p>
        </div>
      </section>

      {/* INTRO / STORY */}
      <section className="section container grid-2" aria-label="Our story">
        <div className="card">
          <h2 className="h2">Our Story</h2>
          <p>
            Augutsya is a technocommercial consulting partner helping businesses
            adopt modern technology with measurable outcomes. From strategy and
            architecture to delivery and support, we align engineering with
            business goals.
          </p>
          <p>
            Our approach blends domain expertise with pragmatic execution.
            We keep solutions simple, resilient, and cost-effective.
          </p>
          <ul className="bullets">
            <li>Outcome-driven delivery</li>
            <li>Transparent communication</li>
            <li>Security & cost discipline by default</li>
          </ul>
        </div>
        <div className="card media">
          <img src={IMG.about1} alt="Team collaboration" loading="lazy" />
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section container grid-2" aria-label="What we do">
        <div className="card media">
          <img src={IMG.about2} alt="Delivering solutions" loading="lazy" />
        </div>
        <div className="card">
          <h2 className="h2">What We Do</h2>
          <p>
            We design and deliver solutions across cloud, apps, data, and
            automation. Whether it’s greenfield build or modernization, we
            emphasize clean architectures and maintainable codebases.
          </p>
          <div className="pill-grid">
            <span className="pill">Cloud & DevOps</span>
            <span className="pill">Web & App Development</span>
            <span className="pill">Data & Analytics</span>
            <span className="pill">Cybersecurity</span>
            <span className="pill">Advisory & PMO</span>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section values" aria-label="Our values">
        <div className="container">
          <h2 className="h2 center">Our Values</h2>
          <p className="center muted">
            Principles that guide every engagement.
          </p>

          <div className="values-grid">
            <article className="vcard">
              <h3>Clarity</h3>
              <p>
                We keep plans explicit, estimates realistic, and trade-offs
                documented.
              </p>
            </article>
            <article className="vcard">
              <h3>Speed</h3>
              <p>
                Ship iteratively, learn fast, and prioritize what truly moves
                the needle.
              </p>
            </article>
            <article className="vcard">
              <h3>Reliability</h3>
              <p>
                From uptime to support SLAs, we build trust through consistency.
              </p>
            </article>
            <article className="vcard">
              <h3>Craft</h3>
              <p>
                Strong engineering habits: reviews, automation, and observability.
              </p>
            </article>
          </div>

          <div className="values-media" aria-hidden="true">
            <img src={IMG.values} alt="" loading="lazy" />
          </div>
        </div>
      </section>

      {/* LOGOS (optional) */}
      <section className="section container logos" aria-label="Our ecosystem">
        <img src={IMG.logo1} alt="Partner logo 1" loading="lazy" />
        <img src={IMG.logo2} alt="Partner logo 2" loading="lazy" />
        <img src={IMG.logo3} alt="Partner logo 3" loading="lazy" />
      </section>

      {/* OFFICE / TEAM */}
      <section className="section container grid-2" aria-label="Our team & office">
        <div className="card">
          <h2 className="h2">People First</h2>
          <p>
            We hire curious, kind problem-solvers and give them room to do their
            best work. Clients feel the difference in every interaction.
          </p>
          <ul className="bullets">
            <li>Small, senior, full-stack teams</li>
            <li>Security & compliance awareness</li>
            <li>Runbooks, SLIs/SLOs, continuous improvement</li>
          </ul>
        </div>
        <div className="card media">
          <img src={IMG.office} alt="Office culture" loading="lazy" />
        </div>
      </section>

      {/* CTA */}
      <section
        className="cta"
        aria-label="Get in touch"
        style={{ backgroundImage: `url(${IMG.cta})` }}
      >
        <div className="cta__overlay" />
        <div className="container cta__content">
          <h2 className="h2">Let’s build something useful</h2>
          <p>
            Have a project in mind? We can help shape, de-risk, and deliver it.
          </p>
          <a className="btn" href="/contact-us" aria-label="Go to Contact Us">
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}

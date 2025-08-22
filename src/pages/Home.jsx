import React, { useState, useRef, useEffect } from "react";
import Container from "../components/Container";
import { services } from "../data/services";
import "./Home.css";

/* ---------------- DATA ---------------- */
const HERO_SLIDES = [
  {
    title: "Accounting",
    bullets: ["Accurate records", "Tax compliance", "Financial insights"],
  },
  {
    title: "App Development",
    bullets: ["iOS & Android", "Custom solutions", "Scalable apps"],
  },
  {
    title: "Cloud Services",
    bullets: ["AWS & Azure", "Migration", "Cost optimization"],
  },
  {
    title: "Portfolio",
    bullets: ["Investment insights", "Portfolio tracking", "Risk analysis"],
  },
  {
    title: "Professional Services",
    bullets: ["Consulting", "Strategy", "Execution"],
  },
  {
    title: "Project Management",
    bullets: ["Agile", "Scrum", "Delivery excellence"],
  },
  {
    title: "Web Based Solutions",
    bullets: ["Web apps", "E-commerce", "Custom platforms"],
  },
  {
    title: "Team",
    bullets: ["Collaboration", "Expertise", "Innovation"],
  },
];

export default function Home() {
  return (
    <main className="home">
      <Hero />
      <Container>
        <ServicesCarousel />
      </Container>
    </main>
  );
}

/* ---------------- HERO: video left, text right ---------------- */
function Hero() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const next = () => setIndex((i) => (i + 1) % HERO_SLIDES.length);
  const prev = () =>
    setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, []);
  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 6000);
  }, [index]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
  }, [muted]);

  const slide = HERO_SLIDES[index];

  return (
    <section className="hero" aria-label="Hero">
      <div className="hero__bgDecor" aria-hidden />
      <div className="hero__content container">
        {/* Left: Video (maintains aspect) */}
        <div className="hero__media">
          <div className="hero__mediaInner">
            <video
              ref={videoRef}
              className="hero__video"
              src={`${process.env.PUBLIC_URL}/rocket.mp4`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster=""
            />
            <div className="hero__mediaOverlay" aria-hidden />
            <div className="hero__mediaHUD">
              <button
                className="hudBtn"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                title={playing ? "Pause" : "Play"}
              >
                {playing ? "❚❚" : "►"}
              </button>
              <button
                className="hudBtn"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute" : "Mute"}
                title={muted ? "Unmute" : "Mute"}
              >
                {muted ? "🔇" : "🔊"}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Text */}
        <div className="hero__right">
          <p className="hero__eyebrow">We build, ship, and scale</p>
          <h1 className="hero__title">{slide.title}</h1>

          <ul className="hero__bullets">
            {slide.bullets.map((b) => (
              <li key={b}>
                <span className="dot" />
                {b}
              </li>
            ))}
          </ul>

          <div className="hero__action">
            <a className="btnn" href="/contact">
              Get Consultation
            </a>
            <a className="btnn" href="/about">
              Learn more
            </a>
          </div>

          <div className="hero__dots" aria-label="Hero slide navigation">
            <button
              className="circleBtn"
              onClick={prev}
              aria-label="Previous slide"
              title="Previous"
            >
              ‹
            </button>
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={`dotbtn ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
            <button
              className="circleBtn"
              onClick={next}
              aria-label="Next slide"
              title="Next"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES (unchanged, text-only) ---------------- */
function ServicesCarousel() {
  const trackRef = useRef(null);

  const scrollByCards = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".serviceCard");
    const delta = card ? card.clientWidth + 16 : 320; // width + gap
    el.scrollBy({ left: dir * delta * 2, behavior: "smooth" });
  };

  return (
    <section className="section">
      <div className="section__head">
        <h2 className="section__title">Our services</h2>
        <div className="rowActions">
          <button
            className="navBtn"
            onClick={() => scrollByCards(-1)}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            className="navBtn"
            onClick={() => scrollByCards(1)}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>

      <div className="carousel" role="region" aria-label="Services">
        <div className="carousel__track" ref={trackRef}>
          {services.map((s) => (
            <article key={s.title} className="serviceCard">
              <div className="serviceCard__chip" aria-hidden>
                {s.title.slice(0, 1)}
              </div>
              <h3 className="serviceCard__title">{s.title}</h3>
              <p className="serviceCard__desc">{s.desc}</p>
              <a href="/contact" className="serviceCard__cta">
                Talk to expert →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useState, useRef, useEffect } from "react";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import { services } from "../data/services";
import { products } from "../data/products";
import "./Home.css"; // ← add this
import Services from "./Services";  


// List of slides (you can add titles & bullets per image)
const HERO_SLIDES = [
  {
    title: "Accounting",
    
    bullets: ["Accurate records", "Tax compliance", "Financial insights"],
    img: `${process.env.PUBLIC_URL}/accounting.png`,
   
  },
  
  {
    title: "App Development",
    bullets: ["iOS & Android", "Custom solutions", "Scalable apps"],
    img: `${process.env.PUBLIC_URL}/appdevelopment.png`,
  },
  {
    title: "Cloud Services",
    bullets: ["AWS & Azure", "Migration", "Cost optimization"],
    img: `${process.env.PUBLIC_URL}/cloudservices.png`,
  },
  {
    title: "Portfolio",
    bullets: ["Investment insights", "Portfolio tracking", "Risk analysis"],
    img: `${process.env.PUBLIC_URL}/piportfolio.png`,
  },
  {
    title: "Professional Services",
    bullets: ["Consulting", "Strategy", "Execution"],
    img: `${process.env.PUBLIC_URL}/profservices.png`,
  },
  {
    title: "Project Management",
    bullets: ["Agile", "Scrum", "Delivery excellence"],
    img: `${process.env.PUBLIC_URL}/projectmgmt.png`,
  },
  {
    title: "Web Based Solutions",
    bullets: ["Web apps", "E-commerce", "Custom platforms"],
    img: `${process.env.PUBLIC_URL}/Webbasedsolutions.png`,
  },
  {
    title: "Team",
    bullets: ["Collaboration", "Expertise", "Innovation"],
    img: `${process.env.PUBLIC_URL}/team.png`,
    
  },
];

export default function Home() {
  return (
    <main className="home">
      
      <HeroSlider />
      <Container>
        <ServicesCarousel />
        
      </Container>
    </main>
  );
}

/* --------------------------- HERO SLIDER --------------------------- */

  function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

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

  const slide = HERO_SLIDES[index];

  return (
    <section className="hero">
      
      <div className="hero__content container">
        <div className="hero__left">
          {/* <div className="badge">AUGUTSYA</div> */}
          <h1 className="hero__title">{slide.title}</h1>

          <ul className="hero__bullets">
            {slide.bullets.map((b) => (
              <li key={b}>
                <span className="dot" />
                {b}
              </li>
            ))}
          </ul>

          <div className="hero__actions">
            <a className="btn btn--primary" href="/contact">
              Get Consultation
            </a>
            <a className="btn btn--primary" href="/about">
              Learn more
            </a>
          </div>

          <div className="hero__dots" aria-label="Hero slide navigation">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={`dotbtn ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="hero__right">
          <div className="hero__imageWrap">
            <img
              src={slide.img}
              alt={slide.title}
              className="hero__image"
              draggable="false"
            />
          </div>

          <div className="hero__nav">
            <button className="circleBtn" onClick={prev} aria-label="Previous">
              ‹
            </button>
            <button className="circleBtn" onClick={next} aria-label="Next">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- SERVICES CAROUSEL ------------------------ */

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
          <button className="navBtn" onClick={() => scrollByCards(-1)} aria-label="Scroll left">‹</button>
          <button className="navBtn" onClick={() => scrollByCards(1)} aria-label="Scroll right">›</button>
        </div>
      </div>

      <div className="carousel" role="region" aria-label="Services">
        <div className="carousel__track" ref={trackRef}>
          {services.map((s) => (
            <article key={s.title} className="serviceCard">
              <div className="serviceCard__icon" aria-hidden>
                {/* optional: put an <img /> or icon font here */}
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

/* ------------------------- FEATURED PRODUCTS ------------------------ */



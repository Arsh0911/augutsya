import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={`https://www.augutsya.com/wp-content/uploads/2023/03/piportfolio.png`} className="d-block w-100 hero-slide-img" alt="Accounting" />
        </div>
        <div className="carousel-item">
          <img src={`https://www.augutsya.com/wp-content/uploads/2023/03/piportfolio.png`} className="d-block w-100 hero-slide-img" alt="App Development" />
        </div>
        <div className="carousel-item">
          <img src={`${process.env.PUBLIC_URL}/cloudservices.png`} className="d-block w-100 hero-slide-img" alt="Cloud Services" />
        </div>
        <div className="carousel-item">
          <img src={`${process.env.PUBLIC_URL}/piportfolio.png`} className="d-block w-100 hero-slide-img" alt="PI Portfolio" />
        </div>
        <div className="carousel-item">
          <img src={`${process.env.PUBLIC_URL}/profservices.png`} className="d-block w-100 hero-slide-img" alt="Professional Services" />
        </div>
        <div className="carousel-item">
          <img src={`${process.env.PUBLIC_URL}/projectmgmt.png`} className="d-block w-100 hero-slide-img" alt="Project Management" />
        </div>
        <div className="carousel-item">
          <img src={`${process.env.PUBLIC_URL}/team.png`} className="d-block w-100 hero-slide-img" alt="Team" />
        </div>
        <div className="carousel-item">
          <img src={`https://www.augutsya.com/wp-content/uploads/2023/03/piportfolio.png`} className="d-block w-100 hero-slide-img" alt="Web Based Solutions" />
        </div>
      </div>

      {/* Carousel controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

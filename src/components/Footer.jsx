import Container from "./Container";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ft" aria-label="Site footer">
      {/* Decorative background */}
      <div className="ft__bg" aria-hidden="true" />

      <Container>
        <div className="ft__top">
          {/* Brand / About */}
          <div className="ftBrand">
            <a className="ftBrand__line" href="/" aria-label="Augutsya home">
              <img
                className="ftBrand__logo"
                src="/atpwhite.png"
                alt="Augutsya"
                width="160"
                height="48"
                loading="lazy"
              />
            </a>

            <p className="ftBrand__tag">
              Your search for techno-commercial consultant ends here
            </p>

            <ul className="ftContact" aria-label="Company contact details">
              <li className="ftContact__row">
                <span className="ico ico--pin" aria-hidden="true" />
                <a
                  href="https://maps.google.com/?q=The+Grand+Ultima,+Sector+1,+Greater+Noida+West,+Uttar+Pradesh,+201306"
                  target="_blank"
                  rel="noreferrer"
                  className="ftLink"
                >
                  The Grand Ultima, Sector 1, Greater Noida West,
                  Uttar&nbsp;Pradesh, 201306
                </a>
              </li>
              <li className="ftContact__row">
                <span className="ico ico--phone" aria-hidden="true" />
                <span className="ftPhones">
                  <a className="ftLink" href="tel:+919811475754">
                    +91&nbsp;98114&nbsp;75754
                  </a>
                  <span className="ftSep" aria-hidden="true">·</span>
                  <a className="ftLink" href="tel:+919811469694">
                    +91&nbsp;98114&nbsp;69694
                  </a>
                </span>
              </li>
              <li className="ftContact__row">
                <span className="ico ico--mail" aria-hidden="true" />
                <a className="ftLink" href="mailto:contact-us@augutsya.com">
                  contact-us@augutsya.com
                </a>
              </li>
            </ul>
          </div>

          {/* Links column 1 */}
          <nav className="ftLinks" aria-label="Footer links">
            <h4 className="ftLinks__title">Our Links</h4>
            <ul className="ftLinks__list">
              <li>
                <a href="/" className="ftLinks__item">
                  <span className="chev" aria-hidden="true">›</span> HOME
                </a>
              </li>
              <li>
                <a href="/utilities/" className="ftLinks__item">
                  <span className="chev" aria-hidden="true">›</span> Utilities
                </a>
              </li>
              <li>
                <a href="/privacy-policy/" className="ftLinks__item">
                  <span className="chev" aria-hidden="true">›</span> Privacy Policy
                </a>
              </li>
            </ul>
          </nav>

          {/* Links column 2 */}
          <nav className="ftLinks ftLinks--right" aria-label="Footer links secondary">
            <h4 className="sr-only">More</h4>
            <ul className="ftLinks__list">
              <li>
                <a href="/services/" className="ftLinks__item">
                  <span className="chev" aria-hidden="true">›</span> Services
                </a>
              </li>
              <li>
                <a href="/contact-us/" className="ftLinks__item">
                  <span className="chev" aria-hidden="true">›</span> Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </Container>

      <div className="ft__divider" role="presentation" />

      {/* Bottom bar */}
      <div className="ft__bottom">
        <Container>
          <div className="ftBottom__wrap">
            <p className="ftCopy">
              © {year}{" "}
              <a
                href="https://www.augutsya.com/"
                target="_blank"
                rel="noreferrer"
                className="ftLink"
              >
                Augutsya.com
              </a>
              . All rights reserved.
            </p>

            <button
              className="toTop"
              aria-label="Back to top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 5l7 7-1.4 1.4L13 8.8V20h-2V8.8L6.4 13.4 5 12z" />
              </svg>
            </button>
          </div>
        </Container>
      </div>
    </footer>
  );
}

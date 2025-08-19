import Container from "./Container";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="corp-footer" aria-label="Site footer">
        <Container>
          <div className="footer-top">
            {/* Brand / About */}
            <div className="brand">
              <a className="brand-line" href="/" aria-label="Augutsya home">
                <img
                  className="brand-logo"
                  src="https://www.augutsya.com/wp-content/uploads/2020/08/atplogo_new-copy.png"
                  alt="Augutsya logo"
                  width="120"
                  height="36"
                  loading="lazy"
                />
                {/* <span className="brand-name">AUGUTSYA</span> */}
              </a>

              <p className="tagline">
                Your search for techno-commercial consultant ends here
              </p>

              <ul className="contact">
                <li>
                  <i className="i i-pin" aria-hidden="true" />
                  <a
                    href="https://maps.google.com/?q=The+Grand+Ultima,+Sector+1,+Greater+Noida+West,+Uttar+Pradesh,+201306"
                    target="_blank"
                    rel="noreferrer"
                  >
                    The Grand Ultima, Sector 1, Greater Noida West,
                    Uttar&nbsp;Pradesh, 201306
                  </a>
                </li>
                <li>
                  <i className="i i-phone" aria-hidden="true" />
                  <a href="tel:+919811475754">+91&nbsp;98114&nbsp;75754</a>
                  <span className="sep">,</span>
                  <a href="tel:+919811469694">+91&nbsp;98114&nbsp;69694</a>
                </li>
                <li>
                  <i className="i i-mail" aria-hidden="true" />
                  <a href="mailto:contact-us@augutsya.com">contact-us@augutsya.com</a>
                </li>
              </ul>
            </div>

            {/* Links column 1 */}
            <nav className="links" aria-label="Footer links">
              <h4>Our Links</h4>
              <ul>
                <li>
                  <a href="/"><span className="chev">›</span> HOME</a>
                </li>
                <li>
                  <a href="/utilities/"><span className="chev">›</span> Utilities</a>
                </li>
                <li>
                  <a href="/privacy-policy/"><span className="chev">›</span> Privacy Policy</a>
                </li>
              </ul>
            </nav>

            {/* Links column 2 */}
            <nav className="links links-right" aria-label="Footer links secondary">
              <ul>
                <li>
                  <a href="/services/"><span className="chev">›</span> Services</a>
                </li>
                <li>
                  <a href="/contact-us/"><span className="chev">›</span> Contact Us</a>
                </li>
              </ul>
            </nav>
          </div>
        </Container>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <Container>
            <div className="bottom-wrap">
              <p>
                Copyright {year}-{" "}
                <a href="https://www.augutsya.com/" target="_blank" rel="noreferrer">
                  Augutsya.com
                </a>. All rights reserved.
              </p>

              <button
                className="to-top"
                aria-label="Back to top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M12 5l7 7-1.4 1.4L13 8.8V20h-2V8.8L6.4 13.4 5 12z" />
                </svg>
              </button>
            </div>
          </Container>
        </div>
      </footer>

      {/* Component-scoped CSS */}
      <style>{`
        :root{
          --footer-bg: linear-gradient(180deg, #0c1b2b 0%, #0e2033 100%);
          --footer-bg-bottom: linear-gradient(180deg, rgba(7,15,25,.6), rgba(7,15,25,.85));
          --text: #e6edf5;
          --muted: #9fb1c7;
          --accent: #3b82f6;
          --border: rgba(148,163,184,.2);
        }

        .corp-footer{
          color: var(--text);
          background: var(--footer-bg);
          padding-top: 28px;
          border-top: 1px solid var(--border);
        }

        .footer-top{
          display: grid;
          grid-template-columns: 1.4fr .8fr .8fr;
          gap: clamp(18px, 3vw, 32px);
          align-items: start;
          padding: 12px 0 22px;
        }

        /* Brand */
        .brand-line{
          display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none; color: inherit;
          margin-bottom: 8px;
        }
        .brand-logo{ height: 40px; width: auto; object-fit: contain; }
        .brand-name{
          font-weight: 800; letter-spacing: .04em;
          font-size: clamp(18px, 2.4vw, 22px);
        }
        .tagline{ color: var(--muted); margin: 8px 0 14px; line-height: 1.5; }

        .contact{
          list-style: none; padding: 0; margin: 0; display: grid; gap: 8px;
        }
        .contact li{
          display: flex; gap: 10px; align-items: flex-start;
          color: var(--muted);
        }
        .contact a{ color: inherit; text-decoration: none; }
        .contact a:hover{ color: var(--text); }
        .sep{ margin: 0 6px; opacity: .6; }

        /* Icons */
        .i{
          display: inline-block; width: 18px; height: 18px;
          color: var(--accent); flex: 0 0 18px; margin-top: 2px;
          background: currentColor; mask-size: 18px 18px; -webkit-mask-size: 18px 18px;
          mask-repeat: no-repeat; -webkit-mask-repeat: no-repeat;
        }
        .i-pin{ mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="black" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>'); }
        .i-phone{ mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="black" d="M6.6 10.8c1.6 3.1 4.1 5.6 7.2 7.2l2.4-2.4c.3-.3.7-.4 1.1-.3 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.6 22 2 13.4 2 3c0-.6.4-1 1-1h3.1c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .8-.3 1.1L6.6 10.8z"/></svg>'); }
        .i-mail{ mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="black" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/></svg>'); }

        /* Links */
        .links h4{
          margin: 4px 0 10px; font-size: 16px; letter-spacing: .02em;
        }
        .links ul{ list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
        .links a{
          color: var(--text); text-decoration: none;
          display: inline-flex; gap: 8px; align-items: center;
          opacity: .9; transition: opacity .2s ease, transform .2s ease;
        }
        .links a:hover{ opacity: 1; transform: translateX(2px); }
        .chev{ color: var(--muted); font-weight: 700; }

        /* Right column aligns with heading-less column visually */
        .links-right ul{ margin-top: 30px; }

        /* Bottom bar */
        .footer-bottom{
          margin-top: 10px;
          background: var(--footer-bg-bottom);
          border-top: 1px solid var(--border);
        }
        .bottom-wrap{
          display: grid; grid-template-columns: 1fr auto;
          gap: 12px; align-items: center; padding: 10px 0;
          color: var(--muted);
        }
        .bottom-wrap a{ color: var(--text); text-decoration: none; }
        .bottom-wrap a:hover{ text-decoration: underline; }

        /* Back-to-top button */
        .to-top{
          display: inline-grid; place-items: center;
          width: 34px; height: 34px; border-radius: 10px;
          color: #0b1220; background: #e5eefc; border: none; cursor: pointer;
          transition: transform .15s ease, filter .15s ease;
        }
        .to-top:hover{ transform: translateY(-2px); filter: brightness(1.05); }

        /* Responsive */
        @media (max-width: 980px){
          .footer-top{ grid-template-columns: 1fr 1fr; }
          .links-right ul{ margin-top: 0; }
        }
        @media (max-width: 640px){
          .footer-top{ grid-template-columns: 1fr; }
          .bottom-wrap{ grid-template-columns: 1fr; }
          .to-top{ justify-self: start; }
        }
      `}</style>
    </>
  );
}

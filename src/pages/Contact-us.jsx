import { useState } from "react";
import Container from "../components/Container";
import "./Contact-us.css";

export default function ContactUs() {
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus({ state: "loading", msg: "Sending your message…" });

    try {
      const payload = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        website: form.website.value.trim(),
        message: form.message.value.trim(),
      };

      // Replace with your real endpoint:
      // const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      // const data = await r.json();
      // if (!data.ok) throw new Error();

      await new Promise((r) => setTimeout(r, 800)); // demo only
      form.reset();
      setStatus({
        state: "success",
        msg: "Thanks! We’ve received your message and will get back soon.",
      });
    } catch {
      setStatus({
        state: "info",
        msg: "Couldn’t send right now — please try again or email arsh@augutsya.com.",
      });
    }
  }

  return (
    <main className="cu">
      <div className="cu-accent" aria-hidden="true" />
      <section className="cu-wrap">
        <Container>
          <div className="cu-head">
            <p className="cu-eyebrow">We build, ship, and scale</p>
            <h1 className="cu-title">How can we help you?</h1>
            <p className="cu-sub">
              Tell us a bit about your project. We typically reply within 1–2 business days.
            </p>
          </div>

          <div className="cu-grid">
            {/* Left column: company & profile */}
            <div className="cu-left">
              <article className="cu-card">
                <h3 className="cu-card-title">Contact Us Today!</h3>
                <address className="cu-address">
                  <div>The Grand Ultima-2, Sector 1, Greater Noida West, UP, 201306</div>
                  <a href="tel:+919811469694" className="cu-link">
                    +91&nbsp;9811469694
                  </a>
                  <a href="mailto:contact-us@augutsya.com" className="cu-link">
                    contact-us@augutsya.com
                  </a>
                </address>
              </article>

              <article className="cu-card">
                <div className="cu-profile">
                  <img
                    src="/arsh.png"        /* public/arsh.png */
                    alt="Arsh Augutsya"
                    className="cu-profile-img"
                  />
                  <div className="cu-profile-meta">
                    <h3 className="cu-card-title">Arsh Augutsya</h3>
                    <p className="cu-muted">CEO</p>
                    <div className="cu-address">
                      <a href="tel:+919811469694" className="cu-link">
                        +91&nbsp;9811469694
                      </a>
                      <a href="mailto:arsh@augutsya.com" className="cu-link">
                        arsh@augutsya.com
                      </a>
                    </div>
                  </div>
                </div>
              </article>

              <article className="cu-card cu-card--tone">
                <h3 className="cu-card-title">Prefer email?</h3>
                <p className="cu-muted">
                  Send details to <a className="cu-link" href="mailto:contact-us@augutsya.com">contact-us@augutsya.com</a> — we’ll route it to the right expert.
                </p>
              </article>
            </div>

            {/* Right column: form */}
            <form className="cu-form" onSubmit={handleSubmit} noValidate>
              <div className="cu-field">
                <label htmlFor="name">Name*</label>
                <input id="name" name="name" type="text" required placeholder="Your name" />
              </div>

              <div className="cu-field">
                <label htmlFor="email">Email*</label>
                <input id="email" name="email" type="email" required placeholder="you@company.com" />
              </div>

              <div className="cu-field">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="url" placeholder="https://example.com" />
              </div>

              <div className="cu-field">
                <label htmlFor="message">Message*</label>
                <textarea id="message" name="message" rows={8} required placeholder="How can we help?" />
              </div>

              {status.state !== "idle" && (
                <div
                  className={`cu-alert ${
                    status.state === "success" ? "cu-alert--success" : "cu-alert--info"
                  }`}
                  role="status"
                >
                  {status.msg}
                </div>
              )}

              <button className="cu-btn" type="submit" disabled={status.state === "loading"}>
                {status.state === "loading" ? "Sending…" : "Send Message"}
              </button>
              <p className="cu-privacy">
                By submitting, you agree to our processing of your information for the purpose of contacting you.
              </p>
            </form>
          </div>
        </Container>
      </section>
      <div className="cu-footerbar" aria-hidden="true" />
    </main>
  );
}

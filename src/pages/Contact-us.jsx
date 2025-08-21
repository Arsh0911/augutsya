import { useState } from "react";
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

      // Replace with your real endpoint if needed:
      // const r = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });
      // const data = await r.json();
      // if (!data.ok) throw new Error();

      await new Promise((r) => setTimeout(r, 800)); // demo
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
      {/* top accent to match the style */}
      <div className="cu-accent" aria-hidden="true" />

      <section className="cu-wrap">
        <div className="cu-grid">
          {/* Left: information blocks */}
          <div className="cu-left">
            <h1 className="cu-title">How can we help you?</h1>

            <article className="cu-block">
              <h3 className="cu-block-title">Contact Us Today!</h3>
              <address className="cu-address">
                <div>The Grand Ultima, Sector 1, Greater Noida West, UP, 201306</div>
                <a href="tel:+919811469694" className="cu-link">
                  +91&nbsp;9811469694
                </a>
                <a href="mailto:contact-us@augutsya.com" className="cu-link">
                  contact-us@augutsya.com
                </a>
              </address>
            </article>

            <article className="cu-block">
              <h3 className="cu-block-title">Arsh Augutsya</h3>
              <p className="cu-muted">CEO</p>
              <div className="cu-address">
                <a href="tel:+919811469694" className="cu-link">
                  +91&nbsp;9811469694
                </a>
                <a href="mailto:arsh@augutsya.com" className="cu-link">
                  arsh@augutsya.com
                </a>
              </div>
            </article>
          </div>

          {/* Right: form (this was missing) */}
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
              <label htmlFor="message">Messages*</label>
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
              {status.state === "loading" ? "Sending…" : "SEND MESSAGES"}
            </button>
          </form>
        </div>
      </section>

      {/* Bottom strip to mirror site footer */}
      <div className="cu-footerbar" aria-hidden="true" />
    </main>
  );
}

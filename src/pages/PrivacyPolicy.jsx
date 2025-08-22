import Container from "../components/Container";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <main className="pp">
      <div className="pp-accent" aria-hidden="true" />

      <section className="pp-wrap">
        <Container>
          {/* Page Head */}
          <header className="pp-head">
            {/* <p className="pp-eyebrow">Legal</p> */}
            <h1 className="pp-title">Privacy Policy</h1>
            <p className="pp-meta">
              <strong>Augutsya Techno Projects</strong> &middot;{" "}
              <a href="https://www.augutsya.com" className="pp-link">
                www.augutsya.com
              </a>
              <br />
              <span>Effective Date: <em>11-Sep-2018</em></span> 
              {/* &nbsp;|&nbsp;  */}
              {/* <span>Last Updated: <em>[Insert Date]</em></span> */}
            </p>
          </header>

          {/* TOC */}
          <nav className="pp-toc" aria-label="Table of contents">
            <span className="pp-toc__label">On this page</span>
            <ol>
              <li><a href="#scope">Scope</a></li>
              <li><a href="#data-we-collect">Information We Collect</a></li>
              <li><a href="#lawful-basis">Lawful Basis (GDPR)</a></li>
              <li><a href="#use">How We Use Information</a></li>
              <li><a href="#cookies">Cookies &amp; Tracking</a></li>
              <li><a href="#sharing">Sharing &amp; Disclosure</a></li>
              <li><a href="#retention">Data Retention</a></li>
              <li><a href="#security">Data Security</a></li>
              <li><a href="#rights">Your Rights (DPDP/GDPR/CCPA)</a></li>
              <li><a href="#children">Children’s Privacy</a></li>
              <li><a href="#transfers">International Transfers</a></li>
              <li><a href="#grievance">Grievance Redressal (DPDP)</a></li>
              <li><a href="#changes">Changes to this Policy</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ol>
          </nav>

          {/* Policy Body */}
          <article className="pp-body">
            <section id="scope">
              <h2>1. Scope</h2>
              <p>
                This Privacy Policy explains how <strong>Augutsya Techno Projects</strong> 
                (“Company”, “we”, “our”, “us”) collects, processes, stores, and protects personal 
                information when you use <strong>www.augutsya.com</strong> (the “Website”). We are 
                committed to complying with the <strong>Digital Personal Data Protection Act, 2023 (India)</strong>, 
                the <strong>General Data Protection Regulation (GDPR – EU/EEA/UK)</strong>, and the 
                <strong> California Consumer Privacy Act (CCPA – California, USA)</strong>.
              </p>
              <p>
                By using our Website, you consent to this Policy. If you disagree, please discontinue use.
              </p>
            </section>

            <section id="data-we-collect">
              <h2>2. Information We Collect</h2>
              <h3>2.1 Personal Data</h3>
              <ul>
                <li>Name, email address, phone number</li>
                <li>Company/organization details</li>
                <li>Postal address or location (if provided)</li>
                <li>Content of messages submitted via forms or email</li>
              </ul>
              <h3>2.2 Technical / Usage Data</h3>
              <ul>
                <li>IP address, device identifiers, browser and OS details</li>
                <li>Pages viewed, time on page, referring URLs</li>
                <li>Cookies and similar technologies</li>
              </ul>
              <h3>2.3 Sensitive Personal Data</h3>
              <p>
                We do not intentionally collect sensitive personal data (e.g., financial, health, biometrics). 
                If ever required, we will obtain <strong>explicit consent</strong> and apply enhanced safeguards.
              </p>
            </section>

            <section id="lawful-basis">
              <h2>3. Lawful Basis for Processing (GDPR)</h2>
              <ul>
                <li><strong>Consent</strong> – when you submit forms or opt in to marketing.</li>
                <li><strong>Contract</strong> – to provide products/services you request.</li>
                <li><strong>Legal Obligation</strong> – to comply with applicable laws.</li>
                <li><strong>Legitimate Interests</strong> – to secure and improve our Website, prevent fraud, and run analytics (balanced against your rights).</li>
              </ul>
            </section>

            <section id="use">
              <h2>4. How We Use Information</h2>
              <ul>
                <li>Operate, maintain, and improve the Website and our services</li>
                <li>Respond to inquiries and provide customer support</li>
                <li>Send administrative messages, security alerts, and policy updates</li>
                <li>Conduct analytics and measure performance</li>
                <li>Send marketing communications (with consent where required)</li>
                <li>Comply with legal/regulatory requirements</li>
              </ul>
            </section>

            <section id="cookies">
              <h2>5. Cookies &amp; Tracking Technologies</h2>
              <p>
                We use cookies and similar technologies to enhance functionality and analyze traffic. 
                You may disable non-essential cookies via your browser settings. 
                Under GDPR/CCPA, you may opt out of non-essential cookies and targeted advertising. 
                See our separate <a className="pp-link" href="/cookie-policy">Cookie Policy</a> for details.
              </p>
            </section>

            <section id="sharing">
              <h2>6. Sharing &amp; Disclosure</h2>
              <ul>
                <li><strong>Service Providers:</strong> hosting, analytics, IT, or marketing vendors under confidentiality and data processing agreements.</li>
                <li><strong>Legal Compliance:</strong> when required by law, regulation, or legal process.</li>
                <li><strong>Business Transfers:</strong> in the event of a merger, acquisition, or restructuring.</li>
                <li><strong>With Consent:</strong> for purposes you explicitly authorize.</li>
              </ul>
              <p><strong>We do not sell personal data.</strong> Under the CCPA, certain analytics/advertising sharing may be considered a “sale” or “sharing”; you can opt out via the site’s “Do Not Sell or Share My Personal Information” link (where applicable).</p>
            </section>

            <section id="retention">
              <h2>7. Data Retention</h2>
              <p>
                We retain personal data only as long as necessary for the purposes stated in this Policy 
                or as required by law and legitimate business needs, after which it is securely deleted or anonymized.
              </p>
            </section>

            <section id="security">
              <h2>8. Data Security</h2>
              <p>
                We use reasonable administrative, technical, and physical safeguards to protect your information. 
                However, no method of transmission or storage is completely secure.
              </p>
            </section>

            <section id="rights">
              <h2>9. Your Rights</h2>
              <h3>9.1 Under India’s DPDP Act (2023)</h3>
              <ul>
                <li>Right to access and obtain a summary of personal data</li>
                <li>Right to correction, completion, and deletion</li>
                <li>Right to grievance redressal</li>
                <li>Right to nominate another person to exercise your rights in case of incapacity</li>
              </ul>

              <h3>9.2 Under GDPR (EU/EEA/UK)</h3>
              <ul>
                <li>Access, Rectification, and Erasure (“Right to be Forgotten”)</li>
                <li>Restriction of Processing and Objection (including marketing)</li>
                <li>Data Portability</li>
                <li>Right to Withdraw Consent at any time</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
              </ul>

              <h3>9.3 Under CCPA (California)</h3>
              <ul>
                <li>Right to Know what personal data is collected, used, disclosed, or shared</li>
                <li>Right to Delete personal data (subject to exceptions)</li>
                <li>Right to Opt-Out of sale/sharing of personal data</li>
                <li>Right to Non-Discrimination for exercising privacy rights</li>
              </ul>

              <p>
                To exercise these rights, contact us at{" "}
                <a className="pp-link" href="mailto:contact-us@augutsya.com">contact-us@augutsya.com</a>. 
                We may need to verify your identity before fulfilling requests.
              </p>
            </section>

            <section id="children">
              <h2>10. Children’s Privacy</h2>
              <p>
                Our Website is not directed to individuals under 18. We do not knowingly collect personal data from children. 
                If we learn that such data has been collected, we will delete it promptly.
              </p>
            </section>

            <section id="transfers">
              <h2>11. International Transfers</h2>
              <p>
                If you access the Website from outside India, your information may be transferred to and processed in other countries. 
                For GDPR-covered transfers, we rely on appropriate safeguards such as Standard Contractual Clauses (SCCs) or equivalent mechanisms.
              </p>
            </section>

            <section id="grievance">
              <h2>12. Grievance Redressal (DPDP)</h2>
              <p>
                If you have concerns or complaints about our data practices, please contact our Grievance Officer:
              </p>
              <address className="pp-card">
                <strong>Grievance Officer – Augutsya Techno Projects</strong><br />
                <a className="pp-link" href="mailto:contact-us@augutsya.com">contact-us@augutsya.com</a> &nbsp;|&nbsp; +91 9811469694<br />
                The Grand Ultima-2, Sector 1, Greater Noida West, Uttar Pradesh, 201306, India
              </address>
            </section>

            <section id="changes">
              <h2>13. Changes to this Policy</h2>
              <p>
                We may update this Policy from time to time. The updated version will be posted on this page with a revised “Last Updated” date.
              </p>
            </section>

            <section id="contact">
              <h2>14. Contact Us</h2>
              <address className="pp-card">
                <strong>Augutsya Techno Projects</strong><br />
                The Grand Ultima-2, Sector 1, Greater Noida West, Uttar Pradesh, 201306, India<br />
                <a className="pp-link" href="mailto:contact-us@augutsya.com">contact-us@augutsya.com</a> &nbsp;|&nbsp; +91 9811469694
              </address>
            
            </section>
          </article>
        </Container>
      </section>
    </main>
  );
}

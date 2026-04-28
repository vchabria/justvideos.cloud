import CinematicLayout from "@/components/cinematic/CinematicLayout";
import ContactForm from "@/components/cinematic/ContactForm";
import FaqAccordion from "@/components/cinematic/FAQ";
import { FAQ } from "@/data/content";

export default function ContactPage() {
  return (
    <CinematicLayout>
      {/* Hero */}
      <section className="section" style={{ paddingTop: "clamp(140px, 18vh, 220px)" }}>
        <div className="shell">
          <div className="contact">
            <div>
              <div className="eyebrow" style={{ marginBottom: 24 }}>
                {"\u2726"} Start a project
              </div>
              <h1 className="contact-cta serif">
                Brief on Monday.
                <br />
                <em>Cuts on Friday.</em>
              </h1>
              <div
                style={{
                  marginTop: 48,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  fontSize: 14,
                  color: "var(--fg-dim)",
                }}
              >
                <a href="mailto:hemant@chabria.com" style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--accent)" }}>{"\u2709"}</span> hemant@chabria.com
                </a>
                <a href="https://wa.me/919830022890" style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--accent)" }}>{"\u2726"}</span> +91 98300 22890 {"\u00b7"} WhatsApp
                </a>
                <span style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--accent)" }}>{"\u25c9"}</span> Kolkata, India {"\u00b7"} Working globally
                </span>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="shell faq-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              {"\u2726"} FAQ
            </div>
            <h2 className="h2 serif">
              Common{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>questions.</em>
            </h2>
          </div>
          <FaqAccordion items={FAQ} />
        </div>
      </section>
    </CinematicLayout>
  );
}

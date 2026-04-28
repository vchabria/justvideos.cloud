import { Link } from "wouter";
import CinematicLayout from "@/components/cinematic/CinematicLayout";
import { CLIENTS, ABOUT_EXTENDED } from "@/data/content";

export default function AboutPage() {
  return (
    <CinematicLayout>
      {/* Hero */}
      <section className="section" style={{ paddingTop: "clamp(140px, 18vh, 220px)" }}>
        <div className="shell">
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            {"\u2726"} About the studio
          </div>
          <h1 className="h1 serif" style={{ maxWidth: 900, marginBottom: 32 }}>
            The clients are different. The pipeline is the{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>same DNA.</em>
          </h1>
        </div>
      </section>

      {/* Founder bio */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="about">
            <div className="about-portrait" />
            <div className="about-text">
              <div className="eyebrow">{"\u2726"} Founder</div>
              <p className="quote" style={{ marginTop: 24 }}>
                "We compress the calendar by an order of magnitude — and name every tool in the pipeline."
              </p>
              <p className="bio">{ABOUT_EXTENDED.bio}</p>
              <div className="sig">
                <div>
                  <div className="name serif">Hemant Chabria</div>
                  Founder & Director
                </div>
                <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
                <span>Kolkata {"\u00b7"} India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="shell">
          <div className="eyebrow" style={{ marginBottom: 32 }}>
            {"\u2726"} Studio philosophy
          </div>
          <p
            className="serif"
            style={{
              fontSize: "clamp(24px, 3vw, 40px)",
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
              maxWidth: 800,
              marginBottom: 48,
            }}
          >
            {ABOUT_EXTENDED.philosophy}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
              maxWidth: 800,
            }}
          >
            {ABOUT_EXTENDED.studioValues.map((v, i) => (
              <div
                key={v}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  fontSize: 15,
                  lineHeight: 1.5,
                }}
              >
                <span className="mono" style={{ color: "var(--accent)", fontSize: 12, marginTop: 3 }}>
                  0{i + 1}
                </span>
                {v}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client wall */}
      <section className="section" style={{ padding: "80px 0" }}>
        <div className="shell">
          <div className="eyebrow" style={{ marginBottom: 32 }}>
            {"\u2726"} Trusted by
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
              borderTop: "1px solid var(--line)",
              borderLeft: "1px solid var(--line)",
            }}
          >
            {CLIENTS.map((c) => (
              <div
                key={c}
                style={{
                  padding: "36px 20px",
                  borderRight: "1px solid var(--line)",
                  borderBottom: "1px solid var(--line)",
                  fontFamily: "var(--serif)",
                  fontSize: 18,
                  letterSpacing: "-0.01em",
                  color: "var(--fg-dim)",
                  transition: "color 0.3s, background 0.3s",
                  textAlign: "center",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--fg)";
                  e.currentTarget.style.background = "var(--bg-2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--fg-dim)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: "center" }}>
        <div className="shell">
          <h2 className="h2 serif" style={{ marginBottom: 32 }}>
            Have a project in mind?{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Let's talk.</em>
          </h2>
          <Link href="/contact" className="btn">
            Start a brief <span className="arrow">{"\u2197"}</span>
          </Link>
        </div>
      </section>
    </CinematicLayout>
  );
}

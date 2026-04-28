import { useState } from "react";
import { Link } from "wouter";
import CinematicLayout from "@/components/cinematic/CinematicLayout";
import { SERVICES, TOOLS, PROCESS, SERVICES_PAGE } from "@/data/content";

export default function ServicesPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <CinematicLayout>
      {/* Hero */}
      <section className="section" style={{ paddingTop: "clamp(140px, 18vh, 220px)" }}>
        <div className="shell">
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            {"\u2726"} Services
          </div>
          <h1 className="h1 serif" style={{ maxWidth: 900, marginBottom: 24 }}>
            {SERVICES_PAGE.heading}{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>{SERVICES_PAGE.headingEm}</em>
          </h1>
          <p style={{ color: "var(--fg-dim)", maxWidth: 640, lineHeight: 1.6 }}>
            {SERVICES_PAGE.intro}
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="services">
            {SERVICES.map((s, i) => (
              <div
                key={s.num}
                className="service"
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{ cursor: "pointer" }}
              >
                <div className="num">{s.num} / 06</div>
                <div className="title">{s.title}</div>
                <div className="desc">{s.desc}</div>
                <div className="icon">
                  <span
                    style={{
                      transition: "transform 0.4s cubic-bezier(.2,.7,.2,1)",
                      transform: expanded === i ? "rotate(45deg)" : "rotate(0)",
                      display: "inline-block",
                    }}
                  >
                    {s.icon}
                  </span>
                </div>
                {expanded === i && s.detail && (
                  <div
                    style={{
                      marginTop: 20,
                      paddingTop: 20,
                      borderTop: "1px solid var(--line)",
                      color: "var(--fg-dim)",
                      fontSize: 14,
                      lineHeight: 1.7,
                      maxWidth: 400,
                    }}
                  >
                    {s.detail}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="shell">
          <div className="eyebrow" style={{ marginBottom: 32 }}>
            {"\u2726"} How we work
          </div>
          <h2 className="h2 serif" style={{ maxWidth: 880, marginBottom: 64 }}>
            The calendar collapses when the pipeline does.{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              Brief on Monday, broadcast by Friday.
            </em>
          </h2>
          <div className="process">
            {PROCESS.map((s) => (
              <div key={s.title} className="step">
                <h3 className="h-step">{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="shell">
          <div className="toolkit">
            <div className="lead">
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                {"\u2726"} The Toolkit
              </div>
              <h2 className="h2 serif">
                Tools we name,{" "}
                <em style={{ color: "var(--accent)", fontStyle: "italic" }}>not hide.</em>
              </h2>
              <p>
                Pipelines as a feature, not a leak. We pick per-project, not per-vendor — and most
                films hand off between three or four of these before the master.
              </p>
            </div>
            <div className="tool-grid">
              {TOOLS.map((t) => (
                <div key={t.name} className="tool">
                  <span className="pulse" />
                  <div className="badge serif">{t.glyph}</div>
                  <div>
                    <div className="name">{t.name}</div>
                    <div className="role">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: "center" }}>
        <div className="shell">
          <h2 className="h2 serif" style={{ marginBottom: 32 }}>
            Ready to build your pipeline?{" "}
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

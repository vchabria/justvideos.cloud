import { useState } from "react";
import { Link } from "wouter";
import CinematicLayout from "@/components/cinematic/CinematicLayout";
import { CASES, WORK_PAGE } from "@/data/content";

export default function WorkPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "AI Virtual Set", "Pure Gen", "Live + AI", "Brand Motion", "Voice Agents + Workflows"];
  const filtered = filter === "All" ? CASES : CASES.filter((c) => c.capability === filter);

  return (
    <CinematicLayout>
      {/* Hero */}
      <section className="section" style={{ paddingTop: "clamp(140px, 18vh, 220px)" }}>
        <div className="shell">
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            {"\u2726"} {WORK_PAGE.heading} {"\u00b7"} {WORK_PAGE.subheading}
          </div>
          <h1 className="h1 serif" style={{ maxWidth: 900, marginBottom: 24 }}>
            Seven hero cases. One pipeline DNA.{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Pipelines you can name.</em>
          </h1>
          <p style={{ color: "var(--fg-dim)", maxWidth: 640, lineHeight: 1.6, marginBottom: 48 }}>
            {WORK_PAGE.intro}
          </p>

          {/* Filter chips */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 56 }}>
            {filters.map((f) => (
              <button
                key={f}
                className={`chip ${filter === f ? "on" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Work grid */}
          <div className="work-grid bento">
            {filtered.map((c) => (
              <Link key={c.id} href={`/work/${c.slug}`}>
                <article className="case">
                  <div className="frame">
                    {c.poster ? (
                      <img src={c.poster} alt={c.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div className="ph" data-label={c.label} />
                    )}
                    <div className="play-overlay" />
                    <div className="tags">
                      <span>{c.capability}</span>
                    </div>
                  </div>
                  <div className="meta">
                    <span className="title">{c.title}</span>
                    <span className="client">{c.client}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: "center" }}>
        <div className="shell">
          <h2 className="h2 serif" style={{ marginBottom: 32 }}>
            Have a project?{" "}
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

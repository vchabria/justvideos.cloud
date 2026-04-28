import { Fragment, useState, useRef, useCallback } from "react";
import { Link, useParams, useLocation } from "wouter";
import CinematicLayout from "@/components/cinematic/CinematicLayout";
import { CASES, TOOLS } from "@/data/content";

// ─── Tool alias normalization ────────────────────────────────────────────────

const TOOL_ALIASES: Record<string, string> = {
  "DaVinci Resolve": "Resolve",
  "davinci resolve": "Resolve",
  AE: "After Effects",
  ae: "After Effects",
  "Field capture": "Field capture",
};

function lookupTool(name: string) {
  const normalized = TOOL_ALIASES[name] ?? name;
  const found = TOOLS.find(
    (t) => t.name.toLowerCase() === normalized.toLowerCase(),
  );
  return {
    name: normalized,
    role: found?.role ?? "Pipeline",
    glyph: found?.glyph ?? normalized.charAt(0).toUpperCase(),
  };
}

// ─── Deliverable card ────────────────────────────────────────────────────────

function DeliverableCard({
  label,
  video,
  poster,
}: {
  label: string;
  video: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      ref.current.play();
      setPlaying(true);
    }
  }, [playing]);

  return (
    <div
      className={`deliverable${playing ? " playing" : ""}`}
      onClick={toggle}
    >
      <video
        ref={ref}
        playsInline
        loop
        poster={poster}
        preload="metadata"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="del-play">
        <span>{"\u25B6"}</span>
      </div>
      <div className="del-label">{label}</div>
    </div>
  );
}

// ─── Mute toggle button ─────────────────────────────────────────────────────

function MuteToggle({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement | null> }) {
  const [muted, setMuted] = useState(true);

  const toggle = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  }, [videoRef]);

  return (
    <button
      onClick={toggle}
      className="mute-toggle"
      aria-label={muted ? "Unmute" : "Mute"}
    >
      {muted ? "\uD83D\uDD07" : "\uD83D\uDD0A"}
    </button>
  );
}

// ─── Main page ──────────────────────────────────────────────────────────────

export default function CaseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const caseData = CASES.find((c) => c.slug === slug);

  if (!caseData) {
    navigate("/work");
    return null;
  }

  const currentIdx = CASES.findIndex((c) => c.slug === slug);
  const nextCase = CASES[(currentIdx + 1) % CASES.length];

  return (
    <CinematicLayout>
      {/* Back link */}
      <div
        className="shell"
        style={{ paddingTop: "clamp(100px, 14vh, 160px)", marginBottom: 24 }}
      >
        <Link
          href="/work"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              color: "var(--fg-dim)",
            }}
          >
            {"\u2190"} All Work
          </span>
        </Link>
      </div>

      {/* Hero */}
      <div className="case-hero">
        {caseData.video ? (
          <>
            <video
              ref={heroVideoRef}
              autoPlay
              muted
              loop
              playsInline
              poster={caseData.poster}
            >
              <source src={caseData.video} type="video/mp4" />
            </video>
            <MuteToggle videoRef={heroVideoRef} />
          </>
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "var(--fg-faint)",
              textTransform: "uppercase",
            }}
          >
            {caseData.label}
          </div>
        )}
        <div className="case-hero-content">
          <span className="cap-badge">{caseData.capability}</span>
          <h1>{caseData.title}</h1>
          <span className="client-label">{caseData.client}</span>
        </div>
      </div>

      {/* Overview */}
      <section className="section">
        <div className="shell">
          <p
            className="serif"
            style={{
              fontSize: "clamp(24px, 3.2vw, 40px)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              maxWidth: 880,
              marginBottom: 32,
              fontStyle: "italic",
              color: "var(--fg)",
            }}
          >
            {caseData.hook}
          </p>
          <p
            style={{
              color: "var(--fg-dim)",
              fontSize: 18,
              lineHeight: 1.65,
              maxWidth: 720,
              marginBottom: 48,
            }}
          >
            {caseData.detail}
          </p>

          {/* Metadata grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
              paddingTop: 32,
              borderTop: "1px solid var(--line)",
            }}
          >
            <div>
              <div
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  color: "var(--fg-faint)",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Client
              </div>
              <div>{caseData.client}</div>
            </div>
            <div>
              <div
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  color: "var(--fg-faint)",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Capability
              </div>
              <div>{caseData.capability}</div>
            </div>
            <div>
              <div
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  color: "var(--fg-faint)",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Sector
              </div>
              <div>{caseData.sector}</div>
            </div>
            <div>
              <div
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  color: "var(--fg-faint)",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Result
              </div>
              <div>{caseData.result}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="shell">
          <div className="eyebrow" style={{ marginBottom: 32 }}>
            <span style={{ color: "var(--accent)" }}>{"\u2726"}</span> Pipeline
          </div>
          <div className="pipeline">
            {caseData.pipeline.map((toolName, i) => {
              const tool = lookupTool(toolName);
              return (
                <Fragment key={i}>
                  {i > 0 && <div className="pipeline-connector" />}
                  <div className="pipeline-step">
                    <div className="dot" />
                    <div>
                      <div className="tool-name">{tool.name}</div>
                      <div className="tool-role">{tool.role}</div>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      {caseData.deliverables && caseData.deliverables.length > 0 && (
        <section className="section">
          <div className="shell">
            <div className="eyebrow" style={{ marginBottom: 32 }}>
              <span style={{ color: "var(--accent)" }}>{"\u2726"}</span>{" "}
              Deliverables
            </div>
            <div
              className={`deliverables-grid${caseData.deliverables.length === 1 ? " single" : ""}`}
            >
              {caseData.deliverables.map((d) => (
                <DeliverableCard
                  key={d.video}
                  label={d.label}
                  video={d.video}
                  poster={d.poster}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      {caseData.useCases && caseData.useCases.length > 0 && (
        <section
          className="section"
          style={{
            background: caseData.deliverables?.length
              ? "var(--bg-2)"
              : undefined,
          }}
        >
          <div className="shell">
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              <span style={{ color: "var(--accent)" }}>{"\u2726"}</span> What
              this capability unlocks
            </div>
            <ul className="use-cases">
              {caseData.useCases.map((uc) => (
                <li key={uc}>{uc}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="case-cta">
        <div className="shell">
          <p className="serif">
            Have a similar project? <em>Let's talk.</em>
          </p>
          <Link href="/contact" className="btn">
            Start a brief <span className="arrow">{"\u2197"}</span>
          </Link>
        </div>
      </section>

      {/* Next project */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className="shell" style={{ textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            {"\u2726"} Next project
          </div>
          <Link href={`/work/${nextCase.slug}`}>
            <h2 className="h2 serif" style={{ marginBottom: 8 }}>
              {nextCase.title}
            </h2>
            <span
              className="mono"
              style={{ fontSize: 12, color: "var(--fg-dim)" }}
            >
              {nextCase.client} {"\u2197"}
            </span>
          </Link>
        </div>
      </section>
    </CinematicLayout>
  );
}

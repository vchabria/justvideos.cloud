import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { SITE, SERVICES, CASES, TOOLS, PROCESS, CLIENTS, FAQ } from "@/data/content";
import type { CaseStudy } from "@/data/content";
import FaqAccordion from "@/components/cinematic/FAQ";
import ContactForm from "@/components/cinematic/ContactForm";
import Footer from "@/components/cinematic/Footer";
import "../cinematic.css";

// ─── Custom cursor ──────────────────────────────────────────────────────────

function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let x = -100,
      y = -100,
      tx = -100,
      ty = -100;
    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      if (ref.current)
        ref.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor" />;
}

// ─── Home Nav (hash-scroll) ─────────────────────────────────────────────────

function HomeNav({ onNav, theme, toggleTheme }: { onNav: (id: string) => void; theme: string; toggleTheme: () => void }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setTime(d.toLocaleTimeString("en-IN", opts) + " IST");
    };
    tick();
    const i = setInterval(tick, 30000);
    return () => clearInterval(i);
  }, []);

  return (
    <nav className="nav">
      <a
        href="#top"
        className="logo"
        onClick={(e) => {
          e.preventDefault();
          onNav("top");
        }}
        style={{ display: "flex", alignItems: "center", gap: 10 }}
      >
        <img
          src={theme === "dark" ? "/logo-white.png" : "/logo.png"}
          alt="JustVideos"
          style={theme === "dark"
            ? { height: 52, width: "auto" }
            : { height: 52, width: "auto", mixBlendMode: "multiply" as const }}
        />
      </a>
      <div className="nav-links">
        <a href="#work" onClick={(e) => { e.preventDefault(); onNav("work"); }}>Work</a>
        <a href="#services" onClick={(e) => { e.preventDefault(); onNav("services"); }}>Services</a>
        <a href="#toolkit" onClick={(e) => { e.preventDefault(); onNav("toolkit"); }}>Toolkit</a>
        <a href="#about" onClick={(e) => { e.preventDefault(); onNav("about"); }}>About</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); onNav("contact"); }}>Contact</a>
        <button onClick={toggleTheme} style={{ fontSize: 16, padding: "4px 8px" }}>
          {theme === "dark" ? "\u2600" : "\u25cf"}
        </button>
      </div>
      <div className="clock">
        <span style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: "50%" }} />
        KOLKATA {"\u00b7"} {time}
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

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

function Hero() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/showreel-poster.jpg"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/videos/showreel.mp4" type="video/mp4" />
        </video>
        <MuteToggle videoRef={heroVideoRef} />
      </div>

      <div className="hero-content">
        <div className="reveal in" style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
          {SITE.chips.map((c, i) => (
            <span
              key={c}
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "6px 12px",
                border: "1px solid var(--line)",
                borderRadius: 999,
                color: "var(--fg-dim)",
              }}
            >
              <span style={{ color: "var(--accent)", marginRight: 6 }}>0{i + 1}</span>
              {c}
            </span>
          ))}
        </div>

        <h1 className="display reveal in">
          <span style={{ color: "var(--accent)" }}>Cinematic</span> AI as a
          <br />
          <em>{SITE.taglineEm}</em>
        </h1>

        <div className="hero-meta reveal in delay-1">
          <div className="hero-meta-block">
            <p>{SITE.subhead}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <a href="#work" className="btn">
                View the Work <span className="arrow">{"\u2197"}</span>
              </a>
              <a href="#contact" className="btn ghost">
                Book a Call <span className="arrow">{"\u2197"}</span>
              </a>
            </div>
          </div>
          <div className="hero-stats">
            {SITE.metrics.map((m) => (
              <div key={m.lbl}>
                <span className="num serif">{m.num}</span>
                <span className="lbl">{m.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}

// ─── Marquee ─────────────────────────────────────────────────────────────────

function Marquee() {
  const text = SITE.marquee;
  return (
    <div className="marquee">
      <div className="marquee-track">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
      <div className="marquee-track" aria-hidden="true">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

// ─── Logo Wall ───────────────────────────────────────────────────────────────

function LogoWall() {
  return (
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
              key={c.name}
              style={{
                padding: "28px 20px",
                borderRight: "1px solid var(--line)",
                borderBottom: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--fg-dim)",
                transition: "color 0.3s, background 0.3s",
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
              <img
                src={c.logo}
                alt={c.name}
                style={{
                  height: 40,
                  width: "auto",
                  maxWidth: "80%",
                  objectFit: "contain",
                  filter: "grayscale(100%)",
                  opacity: 0.7,
                  transition: "opacity 0.3s, filter 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.filter = "grayscale(0%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                  e.currentTarget.style.filter = "grayscale(100%)";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Work Grid ───────────────────────────────────────────────────────────────

function WorkGrid({ filter, setFilter }: { filter: string; setFilter: (f: string) => void }) {
  const [, navigate] = useLocation();
  const filters = ["All", "AI Virtual Set", "Pure Gen", "Live + AI", "Brand Motion", "Voice Agents + Workflows"];
  const filtered = filter === "All" ? CASES : CASES.filter((c) => c.capability === filter);

  return (
    <section className="section" id="work">
      <div className="shell">
        <div className="work-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              {"\u2726"} Selected Work {"\u00b7"} 2024{"\u2013"}26
            </div>
            <h2 className="h2 serif">
              Seven hero cases. One pipeline DNA.{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Pipelines you can name.</em>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
        </div>

        <div className="work-grid bento">
          {filtered.map((c) => (
            <article key={c.id} className="case" onClick={() => navigate(`/work/${c.slug}`)}>
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
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section className="section" id="services">
      <div className="shell">
        <div className="work-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              {"\u2726"} Services
            </div>
            <h2 className="h2 serif" style={{ maxWidth: 720 }}>
              Six capabilities.{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>One pipeline DNA.</em>
            </h2>
          </div>
          <p style={{ color: "var(--fg-dim)", maxWidth: 320, fontSize: 14 }}>
            Live capture, generative finish, agentic orchestration. We pick the mix per project — the
            seam is invisible by design.
          </p>
        </div>

        <div className="services">
          {SERVICES.map((s) => (
            <div key={s.num} className="service">
              <div className="num">{s.num} / 06</div>
              <div className="title">{s.title}</div>
              <div className="desc">{s.desc}</div>
              <div className="icon">{s.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Toolkit ─────────────────────────────────────────────────────────────────

function Toolkit() {
  return (
    <section className="section" id="toolkit" style={{ background: "var(--bg-2)" }}>
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
              Pipelines as a feature, not a leak. We pick per-project, not per-vendor — and most films
              hand off between three or four of these before the master.
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
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────

function ProcessSection() {
  return (
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
  );
}

// ─── Compare ─────────────────────────────────────────────────────────────────

function Compare() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef(false);

  const onMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!drag.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left;
      setPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
    },
    [],
  );

  useEffect(() => {
    const up = () => {
      drag.current = false;
    };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    window.addEventListener("mousemove", onMove as EventListener);
    window.addEventListener("touchmove", onMove as EventListener);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
      window.removeEventListener("mousemove", onMove as EventListener);
      window.removeEventListener("touchmove", onMove as EventListener);
    };
  }, [onMove]);

  return (
    <section className="section">
      <div className="shell">
        <div className="eyebrow" style={{ marginBottom: 16 }}>
          {"\u2726"} Shot Breakdown
        </div>
        <h2 className="h2 serif" style={{ maxWidth: 880, marginBottom: 40 }}>
          Black limbo capture{" "}
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>{"\u2192"} AI virtual set.</em>
        </h2>
        <div
          className="compare"
          ref={ref}
          onMouseDown={(e) => {
            drag.current = true;
            onMove(e.nativeEvent);
          }}
          onTouchStart={(e) => {
            drag.current = true;
            onMove(e.nativeEvent);
          }}
        >
          <div className="layer before">CAPTURE {"\u00b7"} BLACK LIMBO</div>
          <div className="layer after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            FINISH {"\u00b7"} L&T VIRTUAL SET
          </div>
          <div className="handle" style={{ left: `${pos}%` }} />
          <span className="tag l">Plate</span>
          <span className="tag r">Final</span>
        </div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section className="section" id="about" style={{ background: "var(--bg-2)" }}>
      <div className="shell">
        <div className="about">
          <div className="about-portrait" />
          <div className="about-text">
            <div className="eyebrow">{"\u2726"} About the studio</div>
            <p className="quote">
              "The clients are different. The pipeline is the <em>same DNA.</em>"
            </p>
            <p className="bio">
              Hemant Chabria runs JustVideos as a working studio in Kolkata — production crew when the
              brief calls for one, ComfyUI / CTE / Veo / Runway when it doesn't. Across 1,200+
              delivered AVs, the work has spanned enterprise leadership comms, brand cinematics for
              fashion and beauty, documentary and CSR fieldwork, cultural and tourism campaigns, and
              explainer / social content.
            </p>
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
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section className="section" id="contact">
      <div className="shell">
        <div className="contact">
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              {"\u2726"} Start a project
            </div>
            <h2 className="contact-cta serif">
              Brief on Monday.
              <br />
              <em>Cuts on Friday.</em>
            </h2>
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
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function HomeFaqSection() {
  return (
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
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const [filter, setFilter] = useState("All");

  // Reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filter]);

  const onNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="cinematic-page" data-theme={theme}>
      <Cursor />
      <HomeNav onNav={onNav} theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Marquee />
      <WorkGrid filter={filter} setFilter={setFilter} />
      <ServicesSection />
      <Toolkit />
      <Compare />
      <ProcessSection />
      <LogoWall />
      <About />
      <HomeFaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

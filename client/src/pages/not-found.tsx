import { Link } from "wouter";
import CinematicLayout from "@/components/cinematic/CinematicLayout";

export default function NotFound() {
  return (
    <CinematicLayout>
      <section
        className="section"
        style={{
          paddingTop: "clamp(140px, 18vh, 220px)",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="shell" style={{ textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            {"\u2726"} 404
          </div>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(48px, 8vw, 128px)",
              letterSpacing: "-0.025em",
              lineHeight: 0.95,
              marginBottom: 24,
            }}
          >
            Page not <em style={{ color: "var(--accent)", fontStyle: "italic" }}>found.</em>
          </h1>
          <p style={{ color: "var(--fg-dim)", marginBottom: 32 }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/" className="btn">
            Back to home <span className="arrow">{"\u2197"}</span>
          </Link>
        </div>
      </section>
    </CinematicLayout>
  );
}

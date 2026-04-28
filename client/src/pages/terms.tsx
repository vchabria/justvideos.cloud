import CinematicLayout from "@/components/cinematic/CinematicLayout";

export default function TermsPage() {
  return (
    <CinematicLayout>
      <section className="section" style={{ paddingTop: "clamp(140px, 18vh, 220px)" }}>
        <div className="shell" style={{ maxWidth: 800 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            {"\u2726"} Legal
          </div>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginBottom: 32,
            }}
          >
            Terms of Service
          </h1>
          <div style={{ color: "var(--fg-dim)", lineHeight: 1.7, fontSize: 15 }}>
            <p style={{ marginBottom: 24 }}>
              This is a placeholder terms of service for JustVideos.cloud. The full terms will be
              published here before launch.
            </p>
            <p>
              For questions, contact{" "}
              <a href="mailto:hemant@chabria.com" style={{ color: "var(--accent)" }}>
                hemant@chabria.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </CinematicLayout>
  );
}

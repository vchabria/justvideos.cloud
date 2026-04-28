import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="big">
        Just<em>Videos</em>.cloud
      </div>
      <div className="footer-grid">
        <div>
          <h4
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--fg-faint)",
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            The Studio
          </h4>
          <p
            style={{
              color: "var(--fg-dim)",
              fontSize: 14,
              lineHeight: 1.6,
              maxWidth: 320,
              marginTop: 4,
            }}
          >
            Cinematic AI as a Service. Production crew when the brief calls for one, generative
            pipeline when it doesn't.
          </p>
        </div>
        <div className="footer-col">
          <h4>Sitemap</h4>
          <ul>
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="https://linkedin.com/in/chabria/">LinkedIn</a></li>
            <li><a href="https://instagram.com/hemantchabria/">Instagram</a></li>
            <li><a href="https://x.com/hemantchabria">X / Twitter</a></li>
            <li><a href="https://youtube.com/c/HemantChabria">YouTube</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Direct</h4>
          <ul>
            <li><a href="mailto:hemant@chabria.com">hemant@chabria.com</a></li>
            <li><a href="https://wa.me/919830022890">+91 98300 22890</a></li>
            <li>Kolkata {"\u00b7"} India</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{"\u00a9"} JustVideos.cloud {"\u00b7"} 2026</span>
        <span>Built with cinema and code</span>
        <span>v 2.6</span>
      </div>
    </footer>
  );
}

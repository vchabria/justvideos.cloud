import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

interface NavProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Nav({ theme, toggleTheme }: NavProps) {
  const [time, setTime] = useState("");
  const [location] = useLocation();

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

  const links = [
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="nav">
      <Link
        href="/"
        className="logo"
        style={{ display: "flex", alignItems: "center", gap: 10 }}
      >
        <img
          src={theme === "dark" ? "/logo-white.png" : "/logo.png"}
          alt="JustVideos"
          style={theme === "dark"
            ? { height: 52, width: "auto" }
            : { height: 52, width: "auto", mixBlendMode: "multiply" as const }}
        />
      </Link>
      <div className="nav-links">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={location === l.href ? { color: "var(--accent)" } : undefined}
          >
            {l.label}
          </Link>
        ))}
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

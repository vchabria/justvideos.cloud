import { useState } from "react";
import type { FaqItem } from "@/data/content";

interface FaqProps {
  items: FaqItem[];
}

export default function FaqSection({ items }: FaqProps) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map((f, i) => (
        <div
          key={f.q}
          style={{
            borderTop: "1px solid var(--line)",
            padding: "24px 0",
            cursor: "pointer",
          }}
          onClick={() => setOpen(open === i ? -1 : i)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
            }}
          >
            <h3
              className="serif"
              style={{ fontSize: 24, letterSpacing: "-0.015em", lineHeight: 1.2 }}
            >
              {f.q}
            </h3>
            <span
              className="mono"
              style={{
                fontSize: 18,
                color: "var(--accent)",
                transition: "transform 0.4s cubic-bezier(.2,.7,.2,1)",
                transform: open === i ? "rotate(45deg)" : "rotate(0)",
                flexShrink: 0,
              }}
            >
              +
            </span>
          </div>
          <div
            style={{
              maxHeight: open === i ? 200 : 0,
              opacity: open === i ? 1 : 0,
              overflow: "hidden",
              transition:
                "max-height 0.5s cubic-bezier(.2,.7,.2,1), opacity 0.4s, margin 0.4s",
              marginTop: open === i ? 16 : 0,
              color: "var(--fg-dim)",
              lineHeight: 1.6,
              maxWidth: 640,
            }}
          >
            {f.a}
          </div>
        </div>
      ))}
      <div style={{ height: 1, background: "var(--line)" }} />
    </div>
  );
}

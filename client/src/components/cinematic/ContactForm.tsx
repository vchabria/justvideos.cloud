import { useState } from "react";

export default function ContactForm() {
  const [budget, setBudget] = useState("\u20b95\u201315L");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          service: data.get("project"),
          message: data.get("brief"),
          budget,
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Name</label>
        <input name="name" required placeholder="Your name" disabled={submitted} />
      </div>
      <div className="field">
        <label>Email</label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          disabled={submitted}
        />
      </div>
      <div className="field">
        <label>Project type</label>
        <select name="project" disabled={submitted}>
          <option>AI Virtual Set</option>
          <option>Pure Generative Spot</option>
          <option>Live + AI Documentary</option>
          <option>Brand Motion / Reel</option>
          <option>Voice Agent / Workflow</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <div className="field" style={{ borderBottom: "none", paddingBottom: 0 }}>
        <label>Budget</label>
        <div className="budget-row" style={{ marginTop: 8 }}>
          {["< \u20b95L", "\u20b95\u201315L", "\u20b915\u201350L", "\u20b950L+"].map((b) => (
            <span
              key={b}
              className={`chip ${budget === b ? "on" : ""}`}
              onClick={() => !submitted && setBudget(b)}
            >
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className="field">
        <label>Brief</label>
        <textarea
          name="brief"
          rows={3}
          placeholder="Two lines about what you need."
          disabled={submitted}
        />
      </div>
      <button type="submit" className="btn" disabled={submitted}>
        {submitted ? "Brief received \u2713" : "Send brief"}{" "}
        <span className="arrow">{"\u2197"}</span>
      </button>
    </form>
  );
}

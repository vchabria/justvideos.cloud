import { useEffect, useRef, useState } from "react";
import { Send, X, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type QAItem = {
  question: string;
  answer: string;
  keywords: string[];
};

const QA_DATABASE: QAItem[] = [
  {
    question: "What services do you offer?",
    answer: "We offer five core services:\n\n1. **Video Production** — Brand films, corporate videos, product demos, safety/training, explainers, and event coverage.\n2. **Generative AI Video** — AI-powered storyboards, animatics, dubbing, and localization.\n3. **Voice Agents** — AI-powered lead qualification, FAQ bots, scheduling, and call routing.\n4. **Agentic Workflows** — End-to-end automation from brief intake to publishing.\n5. **AI Websites & Apps** — Fast-launch websites and custom enterprise tools.\n\nWant to know more about any of these? Or submit a brief in the contact form!",
    keywords: ["service", "offer", "do you do", "what do you", "help with"],
  },
  {
    question: "How much does a video cost?",
    answer: "Pricing depends on scope, but here's a rough guide:\n\n- **Starter** — 1 core video + 2 cutdowns + basic brand alignment\n- **Scale** — 2–6 videos/month + cutdown factory + approval workflow\n- **Enterprise** — Custom SLA + governance + localization + dedicated producer\n\nFor a precise quote, submit a brief in the contact form with your timeline, deliverables, and language needs. We'll reply within 15 minutes!",
    keywords: ["price", "cost", "how much", "budget", "rate", "charge", "package", "pricing"],
  },
  {
    question: "How long does a video take?",
    answer: "Typical turnaround is **3–10 business days** depending on complexity. A simple explainer or cutdown can be faster; a full brand film with approvals takes the longer end. We'll confirm exact timelines when you submit your brief.",
    keywords: ["how long", "turnaround", "timeline", "deadline", "delivery", "when", "days", "time"],
  },
  {
    question: "Which brands have you worked with?",
    answer: "We've worked with major enterprises including **L&T, Tata Steel, Emami, GRSE, Haldia Petrochemicals, ITC, Aditya Birla Group, Reliance, IndianOil, GAIL, JSW, Hindalco, Marico, Britannia, and Nestl\u00e9**. Full client list available on request — scroll down to the brands section to see more!",
    keywords: ["brand", "client", "who", "worked with", "portfolio", "companies", "customers"],
  },
  {
    question: "Do you do multilingual videos?",
    answer: "Yes! We handle **multilingual delivery** including subtitles, dubbing/voice-over, and consistent terminology across languages — all with the same approval standards. We support Hindi, Bengali, Tamil, Telugu, and more.",
    keywords: ["language", "multilingual", "localization", "dubbing", "subtitle", "hindi", "bengali", "translate"],
  },
  {
    question: "How do I book a call?",
    answer: "The fastest way is **WhatsApp**! Message Hemant directly at +91 98300 22890 — just click the green WhatsApp button at the bottom-right of the page. You can also submit a brief in the contact form and we'll reach out within 15 minutes.",
    keywords: ["book", "call", "schedule", "meet", "talk", "discuss", "appointment"],
  },
  {
    question: "What industries do you serve?",
    answer: "We serve a wide range: **Manufacturing, Infrastructure, FMCG, Government/PSU, Retail, and Education**. Our sweet spot is enterprise and industrial clients who need governed video production with approval workflows.",
    keywords: ["industry", "industries", "sector", "manufacturing", "fmcg", "government", "retail", "education"],
  },
  {
    question: "What are agentic workflows?",
    answer: "Think of agentic workflows as **smart automations + AI** that move work forward: capturing briefs, generating drafts, collecting approvals, creating versions, and publishing — while keeping governance and human review in place. We map your process and automate the handoffs.",
    keywords: ["agentic", "workflow", "automation", "automate", "pipeline", "process"],
  },
  {
    question: "Where are you based?",
    answer: "We're based in **Kolkata, India**, but work with clients across India and internationally. All coordination happens via WhatsApp, email, and video calls — so location is never a barrier.",
    keywords: ["where", "based", "location", "kolkata", "india", "city", "office"],
  },
  {
    question: "How do I submit a brief?",
    answer: "Scroll down to the **Contact** section and fill out the brief form — select your service type, add your details, and tell us what you need. We'll reply within 15 minutes with next steps and a scope outline. Or just WhatsApp us directly!",
    keywords: ["brief", "submit", "form", "contact", "start", "begin", "get started"],
  },
];

const QUICK_CHIPS = [
  "What services do you offer?",
  "How much does a video cost?",
  "How long does a video take?",
  "Which brands have you worked with?",
  "How do I book a call?",
  "Do you do multilingual videos?",
];

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! I'm here to help you learn about JustVideos. Pick a question below or type your own!",
};

function findAnswer(input: string): string {
  const lower = input.toLowerCase();

  // Exact match on question
  const exactMatch = QA_DATABASE.find(
    (qa) => qa.question.toLowerCase() === lower
  );
  if (exactMatch) return exactMatch.answer;

  // Keyword matching - score each QA item
  let bestMatch: QAItem | null = null;
  let bestScore = 0;

  for (const qa of QA_DATABASE) {
    let score = 0;
    for (const keyword of qa.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.length; // longer keyword matches score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = qa;
    }
  }

  if (bestMatch && bestScore >= 3) {
    return bestMatch.answer;
  }

  return "I don't have a specific answer for that, but I'd love to help! You can:\n\n- **Submit a brief** in the contact form below\n- **WhatsApp Hemant** directly at +91 98300 22890\n- Try asking about our services, pricing, timeline, or industries we serve";
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const answer = findAnswer(trimmed);
    const assistantMsg: Message = { role: "assistant", content: answer };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-[92px] right-5 z-50 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-3 text-sm font-semibold shadow-lg transition hover:translate-y-[-1px] hover:shadow-xl"
        data-testid="button-chat-open"
        aria-label="Open chat"
      >
        <div className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground">
          <MessageCircle className="size-4" aria-hidden="true" />
        </div>
        Chat with us
      </button>

      {open && (
        <div
          className="fixed bottom-[148px] right-5 z-50 w-[min(420px,calc(100vw-40px))]"
          data-testid="panel-chat"
          role="dialog"
          aria-label="Chat"
        >
          <Card className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-xl" style={{ height: "480px" }}>
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b p-4">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-xl border bg-background">
                  <MessageCircle className="size-4 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm font-semibold">JustVideos</div>
                  <div className="text-xs text-muted-foreground">Quick answers about our services</div>
                </div>
              </div>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-xl"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <X className="size-4" aria-hidden="true" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="grid gap-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "border bg-background text-foreground"
                      }`}
                    >
                      {msg.content.split(/(\*\*.*?\*\*)/).map((part, j) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={j}>{part.slice(2, -2)}</strong>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Quick chips */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 border-t px-4 py-3">
                {QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground transition hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                    onClick={() => handleSend(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about services, pricing, timeline..."
                  className="flex-1 rounded-xl border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-xl"
                  disabled={!input.trim()}
                >
                  <Send className="size-4" aria-hidden="true" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

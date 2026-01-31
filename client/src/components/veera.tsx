import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Mic, MicOff, Phone, Sparkles, Volume2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type VeeraIntent = "video" | "workflows" | "agents" | "book" | "brief";

const VEERA_PROFILE = {
  name: "Veera",
  title: "Studio guide",
  bio: "Warm, crisp, and professional—guides you to the right package and next step.",
  accent: "Indian English",
};

const QUICK_ACTIONS: Array<{ label: string; intent: VeeraIntent; utterance: string }> = [
  {
    label: "I need a video",
    intent: "video",
    utterance: "I need a video. What package should I choose and what do you need from me?",
  },
  {
    label: "I need a workflow",
    intent: "workflows",
    utterance: "I need an AI workflow for lead capture, approvals, and publishing. How does this work?",
  },
  {
    label: "Voice agent",
    intent: "agents",
    utterance: "I want a voice agent for my business. What can it do and what are the steps to deploy it?",
  },
  {
    label: "Book a call",
    intent: "book",
    utterance: "I want to book a call. What is the next step?",
  },
  {
    label: "Submit a brief",
    intent: "brief",
    utterance: "I want to submit a brief. What details should I include?",
  },
];

function pickIndianVoice(voices: SpeechSynthesisVoice[]) {
  const prefer = voices
    .filter((v) => (v.lang || "").toLowerCase().includes("en"))
    .sort((a, b) => {
      const aScore =
        (/(india|en-in)/i.test(a.lang) ? 5 : 0) +
        (/(female|woman|zira|susan|neural)/i.test(a.name) ? 2 : 0) +
        (/google/i.test(a.name) ? 1 : 0);
      const bScore =
        (/(india|en-in)/i.test(b.lang) ? 5 : 0) +
        (/(female|woman|zira|susan|neural)/i.test(b.name) ? 2 : 0) +
        (/google/i.test(b.name) ? 1 : 0);
      return bScore - aScore;
    });
  return prefer[0] || voices[0] || null;
}

function veeraReply(userText: string): { title: string; reply: string; cta?: { label: string; href: string } } {
  const t = userText.toLowerCase();

  if (t.includes("book") || t.includes("call") || t.includes("schedule")) {
    return {
      title: "Booking",
      reply:
        "To book a call, please complete the payment first. After payment, you can continue to the booking page to pick a time.",
      cta: { label: "Go to payment", href: "/payment" },
    };
  }

  if (t.includes("workflow") || t.includes("automation") || t.includes("approval") || t.includes("crm")) {
    return {
      title: "Agentic workflows",
      reply:
        "We map your current process (lead capture → follow-up → approvals → versions → publishing), then we automate the handoffs and add governance (review cycles, sign-offs, audit-friendly trail). Share your tools (WhatsApp/email/CRM/CMS) and we’ll propose a rollout plan.",
      cta: { label: "Submit a brief", href: "#contact" },
    };
  }

  if (t.includes("voice") || t.includes("agent") || t.includes("calls") || t.includes("ivr")) {
    return {
      title: "Voice agents",
      reply:
        "A voice agent can qualify leads, answer FAQs, route to the right team, and follow up—while keeping strict guardrails. For a production-ready voice agent, we’ll need an upgrade so your API keys stay secure and conversations can be logged safely.",
      cta: { label: "Request setup", href: "#contact" },
    };
  }

  if (t.includes("price") || t.includes("cost") || t.includes("package")) {
    return {
      title: "Pricing",
      reply:
        "Pick a tier based on volume and governance: Starter for one-offs, Scale for recurring monthly output, Enterprise for SLA + approvals + localization. If you tell me your industry and timeline, I’ll recommend the best fit.",
      cta: { label: "See packages", href: "#packages" },
    };
  }

  return {
    title: "Quick help",
    reply:
      "Tell me what you’re trying to achieve (video, AI video, workflow automation, or a voice agent) and your timeline. I’ll guide you to the best next step.",
  };
}

export function VeeraAgent() {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const [lastHeard, setLastHeard] = useState<string>("");
  const [lastReply, setLastReply] = useState<ReturnType<typeof veeraReply> | null>(null);

  const recognitionRef = useRef<any>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const hasSpeech = typeof window !== "undefined" && "speechSynthesis" in window;
    const hasRec =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    setSupported(Boolean(hasSpeech || hasRec));

    const pick = () => {
      if (!hasSpeech) return;
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length) {
        voiceRef.current = pickIndianVoice(voices);
      }
    };

    pick();
    if (hasSpeech) {
      window.speechSynthesis.onvoiceschanged = () => pick();
    }

    if (hasRec) {
      const R = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new R();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-IN";

      rec.onresult = (e: any) => {
        const transcript = e?.results?.[0]?.[0]?.transcript || "";
        setListening(false);
        if (transcript) {
          setText(transcript);
          handleAsk(transcript);
        }
      };

      rec.onerror = () => {
        setListening(false);
      };

      rec.onend = () => {
        setListening(false);
      };

      recognitionRef.current = rec;
    }

    return () => {
      if (hasSpeech) window.speechSynthesis.onvoiceschanged = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const speak = useMemo(() => {
    return (value: string) => {
      if (muted) return;
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(value);
      u.rate = 1.0;
      u.pitch = 1.08;
      u.volume = 1.0;
      u.lang = "en-IN";
      if (voiceRef.current) u.voice = voiceRef.current;
      window.speechSynthesis.speak(u);
    };
  }, [muted]);

  function handleAsk(value?: string) {
    const q = (value ?? text).trim();
    if (!q) return;

    setLastHeard(q);
    const r = veeraReply(q);
    setLastReply(r);
    speak(r.reply);
  }

  function toggleListening() {
    const rec = recognitionRef.current;
    if (!rec) {
      setListening(false);
      return;
    }
    if (listening) {
      try {
        rec.stop();
      } catch {
        // ignore
      }
      setListening(false);
      return;
    }
    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }

  if (!supported) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-3 text-sm font-semibold shadow-lg transition hover:translate-y-[-1px] hover:shadow-xl"
        data-testid="button-veera-open"
        aria-label="Open Veera"
      >
        <div className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground">
          <Bot className="size-4" aria-hidden="true" />
        </div>
        Veera
        <Badge variant="secondary" className="ml-1 rounded-full" data-testid="badge-veera-live">
          Voice\n        </Badge>
      </button>

      {open ? (
        <div
          className="fixed bottom-5 left-5 z-50 w-[min(420px,calc(100vw-40px))]"
          data-testid="panel-veera"
          role="dialog"
          aria-label="Veera voice agent"
        >
          <Card className="grain overflow-hidden rounded-2xl border bg-card shadow-xl">
            <div className="flex items-start justify-between gap-3 p-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-2xl border bg-background">
                  <Sparkles className="size-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold" data-testid="text-veera-name">
                      {VEERA_PROFILE.name}
                    </div>
                    <Badge variant="secondary" className="rounded-full" data-testid="badge-veera-role">
                      {VEERA_PROFILE.title}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground" data-testid="text-veera-bio">
                    {VEERA_PROFILE.bio}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-xl"
                  onClick={() => setMuted((m) => !m)}
                  data-testid="button-veera-mute"
                  aria-label="Mute"
                >
                  {muted ? <Volume2 className="size-4" aria-hidden="true" /> : <Volume2 className="size-4" aria-hidden="true" />}
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-xl"
                  onClick={() => {
                    if (typeof window !== "undefined" && "speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                    }
                    setOpen(false);
                    setListening(false);
                  }}
                  data-testid="button-veera-close"
                  aria-label="Close"
                >
                  <X className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <Separator />

            <div className="p-4">
              <div className="grid gap-3">
                <div className="rounded-2xl border bg-background/60 p-3" data-testid="card-veera-status">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-muted-foreground" data-testid="label-veera-status">
                        Status
                      </div>
                      <div className="text-sm font-medium" data-testid="text-veera-status">
                        {listening ? "Listening…" : "Ready"}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        className="rounded-xl"
                        onClick={toggleListening}
                        data-testid="button-veera-mic"
                      >
                        {listening ? (
                          <>
                            <MicOff className="size-4" aria-hidden="true" />
                            Stop
                          </>
                        ) : (
                          <>
                            <Mic className="size-4" aria-hidden="true" />
                            Talk
                          </>
                        )}
                      </Button>
                      <Button
                        className="rounded-xl"
                        onClick={() => handleAsk()}
                        data-testid="button-veera-ask"
                      >
                        Ask
                        <Phone className="ml-1 size-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground" data-testid="text-veera-note">
                    Prototype voice mode uses your browser’s built-in speech features.
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="text-xs font-medium text-muted-foreground" data-testid="label-veera-quick">
                    Quick prompts
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_ACTIONS.map((q) => (
                      <button
                        key={q.intent}
                        className="rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground shadow-sm transition hover:bg-muted"
                        onClick={() => {
                          setText(q.utterance);
                          handleAsk(q.utterance);
                        }}
                        data-testid={`button-veera-quick-${q.intent}`}
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="text-xs font-medium text-muted-foreground" data-testid="label-veera-input">
                    Type your question
                  </div>
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Ask about videos, packages, workflows…"
                    className="rounded-xl"
                    data-testid="input-veera"
                  />
                </div>

                {lastHeard ? (
                  <div className="rounded-2xl border bg-card p-3" data-testid="card-veera-transcript">
                    <div className="text-xs text-muted-foreground" data-testid="label-veera-heard">
                      You said
                    </div>
                    <div className="mt-1 text-sm" data-testid="text-veera-heard">
                      {lastHeard}
                    </div>
                  </div>
                ) : null}

                {lastReply ? (
                  <div className="rounded-2xl border bg-card p-3" data-testid="card-veera-reply">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs text-muted-foreground" data-testid="label-veera-reply">
                          Veera
                        </div>
                        <div className="mt-1 text-sm leading-relaxed" data-testid="text-veera-reply">
                          {lastReply.reply}
                        </div>
                      </div>
                      <Badge className="rounded-full" data-testid="badge-veera-topic">
                        {lastReply.title}
                      </Badge>
                    </div>

                    {lastReply.cta ? (
                      <div className="mt-3">
                        <a
                          href={lastReply.cta.href}
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                          data-testid="link-veera-cta"
                        >
                          {lastReply.cta.label}
                        </a>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
}

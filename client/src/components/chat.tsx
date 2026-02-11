import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, X, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const QUICK_PROMPTS = [
  "I need a video",
  "Tell me about pricing",
  "Book a call",
  "How do workflows work?",
  "What industries do you serve?",
];

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! I'm the JustVideos assistant. I can help you learn about our video production services, AI workflows, pricing, and more. What would you like to know?",
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              data.reply ||
              "Sorry, I couldn't process that right now. Please try the contact form or WhatsApp us directly.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Network error. Please try again or reach us on WhatsApp.",
        },
      ]);
    } finally {
      setLoading(false);
    }
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
          <Sparkles className="size-4" aria-hidden="true" />
        </div>
        Chat
        <Badge variant="secondary" className="ml-1 rounded-full">
          AI
        </Badge>
      </button>

      {open && (
        <div
          className="fixed bottom-[148px] right-5 z-50 w-[min(420px,calc(100vw-40px))]"
          data-testid="panel-chat"
          role="dialog"
          aria-label="AI Chat"
        >
          <Card className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-xl" style={{ height: "480px" }}>
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b p-4">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-xl border bg-background">
                  <Sparkles className="size-4 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm font-semibold">JustVideos Assistant</div>
                  <div className="text-xs text-muted-foreground">Ask about services, pricing, workflows</div>
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
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "border bg-background text-foreground"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1.5 rounded-2xl border bg-background px-4 py-3">
                      <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                      <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                      <span className="size-2 animate-bounce rounded-full bg-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick prompts */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 border-t px-4 py-3">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    onClick={() => sendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-xl"
                  disabled={!input.trim() || loading}
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

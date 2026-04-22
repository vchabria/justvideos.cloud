import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Pause, Maximize, ChevronRight, Mail, CheckCircle } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

import logoFull from "@/assets/images/justvideos-logo.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const WHATSAPP_URL = "https://wa.me/919830022890?text=Hi%20Hemant%2C%20I%E2%80%99d%20like%20to%20discuss%20a%20video%20project.";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-4 md:px-6">{children}</div>;
}

export default function DemoPage() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode =
    theme === "dark" ||
    (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || emailStatus === "loading") return;
    setEmailStatus("loading");
    try {
      await fetch(
        "https://api.nodex.bubblelab.ai/webhook/user_36lWT7tSw4MOQm0gENBx8TR0Im3/buVhEAbLeu3U",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source: "jvs_demo_page" }),
        }
      );
      setEmailStatus("success");
      setEmail("");
    } catch {
      setEmailStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-demo">
      {/* Nav */}
      <div className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55">
        <Container>
          <div className="flex h-16 items-center justify-between gap-3">
            <a href="/" className="group inline-flex items-center gap-2" aria-label="Back to home">
              <div className="relative grid h-9 w-[148px] place-items-center overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary/25 via-accent/20 to-transparent blur" />
                <img src={logoFull} alt="JustVideos" className="relative h-7 w-auto object-contain" />
              </div>
            </a>

            <div className="flex items-center gap-2">
              <a
                href="/"
                className="hidden items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground md:inline-flex"
              >
                <ArrowLeft className="size-4" />
                Home
              </a>
              <button
                onClick={toggleTheme}
                className="grid size-9 place-items-center rounded-xl border bg-card text-muted-foreground transition hover:text-foreground"
                aria-label={isDarkMode ? "Light mode" : "Dark mode"}
              >
                {isDarkMode ? <Moon className="size-4" /> : <Sun className="size-4" />}
              </button>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <Button size="sm" className="rounded-xl">
                  Book a call
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Hero */}
      <section className="border-b">
        <Container>
          <div className="py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Badge variant="secondary" className="mb-4">
                Product Demo
              </Badge>
              <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
                Cinematic Thinking Engine
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
                See how CTE turns scripts into storyboards, storyboards into frames, and frames into
                finished video — all from one AI-powered canvas.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Video Player */}
      <section>
        <Container>
          <div className="py-8 md:py-12">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="overflow-hidden rounded-2xl border bg-card shadow-lg">
                <video
                  controls
                  autoPlay
                  playsInline
                  className="w-full"
                  poster=""
                  data-testid="video-demo"
                >
                  <source src="https://vbptwhcxtdsxpojjuaqm.supabase.co/storage/v1/object/public/videos/demo/cte-demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Key Highlights */}
      <section className="border-t">
        <Container>
          <div className="py-10 md:py-14">
            <h2 className="text-center font-serif text-2xl font-semibold tracking-tight md:text-3xl">
              What you just saw
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
              CTE handles the full pre-production and production pipeline in one workspace.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Script to Canvas",
                  desc: "Paste a screenplay and CTE parses it into characters, locations, and scenes on an infinite visual canvas.",
                },
                {
                  title: "AI Frame Generation",
                  desc: "Generate cinematic stills from scene descriptions using Flux. Multiple styles: realistic, cinematic, anime, stylized.",
                },
                {
                  title: "Video & Audio",
                  desc: "Animate frames with 5 video models, add voiceover with OpenAI TTS, score with Suno music, and stitch into a reel.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-card p-5 shadow-sm"
                >
                  <div className="text-base font-semibold">{item.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA + Newsletter */}
      <section className="border-t bg-muted/30">
        <Container>
          <div className="py-12 md:py-16">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                Ready to try it?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                CTE is in early access. Get in touch or sign up for updates.
              </p>

              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a href="https://cte.justvideosstudios.com" target="_blank" rel="noreferrer">
                  <Button className="rounded-xl">
                    Try CTE
                    <ChevronRight className="ml-1 size-4" />
                  </Button>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  <Button variant="secondary" className="rounded-xl">
                    Book a call
                  </Button>
                </a>
              </div>

              <Separator className="my-8" />

              <p className="mb-3 text-sm text-muted-foreground">
                Sign up for our newsletter on all things AI films
              </p>

              {emailStatus === "success" ? (
                <div className="inline-flex items-center gap-2 rounded-xl border bg-card px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400">
                  <CheckCircle className="size-4" />
                  You're on the list!
                </div>
              ) : (
                <form
                  onSubmit={handleEmailSubmit}
                  className="mx-auto flex max-w-sm gap-2"
                >
                  <div className="relative flex-1">
                    <Mail
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailStatus === "error") setEmailStatus("idle");
                      }}
                      placeholder="your@email.com"
                      required
                      className="w-full rounded-xl border bg-card py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={emailStatus === "loading"}
                    className="rounded-xl"
                  >
                    {emailStatus === "loading" ? "Sending..." : "Subscribe"}
                  </Button>
                </form>
              )}

              {emailStatus === "error" && (
                <p className="mt-2 text-xs text-red-500">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <Container>
          <div className="flex items-center justify-between py-6 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} JustVideos.cloud</span>
            <div className="flex gap-4">
              <a href="/privacy" className="underline-offset-4 hover:underline">Privacy</a>
              <a href="/terms" className="underline-offset-4 hover:underline">Terms</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

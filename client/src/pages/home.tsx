import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  Clapperboard,
  ExternalLink,
  Film,
  Globe2,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  MessageSquare,
  Moon,
  Phone,
  Play,
  Sparkles,
  Sun,
  Workflow,
  Youtube,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

import logoFull from "@assets/justvideos_logo-_1769848465350.png";
import heroMesh from "@/assets/images/hero-mesh.png";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ChatBot } from "@/components/chat";

const WHATSAPP_URL = "https://wa.me/919830022890?text=Hi%20Hemant%2C%20I%E2%80%99d%20like%20to%20discuss%20a%20video%20project.";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 md:px-6">{children}</div>;
}

function TopNav() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <a href="/" className="group inline-flex items-center gap-2" data-testid="link-home" aria-label="JustVideos.cloud">
            <div className="relative grid h-9 w-[148px] place-items-center overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary/25 via-accent/20 to-transparent blur" />
              <img
                src={logoFull}
                alt="JustVideos"
                className="relative h-7 w-auto object-contain"
                data-testid="img-logo-full"
              />
            </div>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            <a
              href="#services"
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              data-testid="link-nav-services"
            >
              Services
            </a>
            <a
              href="#workflows"
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              data-testid="link-nav-workflows"
            >
              Workflows Studio
            </a>
            <a
              href="#case-studies"
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              data-testid="link-nav-case-studies"
            >
              Case studies
            </a>
            <a
              href="#contact"
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              data-testid="link-nav-contact"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden text-sm text-muted-foreground underline-offset-4 hover:underline md:inline"
              data-testid="link-nav-submit-brief"
            >
              Submit brief
            </a>
            <button
              onClick={toggleTheme}
              className="grid size-9 place-items-center rounded-xl border bg-card text-muted-foreground transition hover:text-foreground"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="size-4" aria-hidden="true" />
              ) : (
                <Sun className="size-4" aria-hidden="true" />
              )}
            </button>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" data-testid="button-book-call" aria-label="Book a call">
              <Button size="sm" className="rounded-xl w-full">
                Book a call
                <ChevronRight className="ml-1 size-4" aria-hidden="true" />
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm shadow-sm"
      data-testid={`pill-${label.toLowerCase().replaceAll(" ", "-")}`}
    >
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-foreground/90">{label}</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="gradient-hero">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] overflow-hidden" aria-hidden="true">
        <img
          src={heroMesh}
          alt=""
          className="h-full w-full object-cover opacity-40"
          data-testid="img-hero-mesh"
        />
      </div>
      <Container>
        <div className="relative grid gap-10 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
              <span className="inline-flex items-center gap-1" data-testid="badge-cred">
                <Sparkles className="size-4 text-primary" aria-hidden="true" />
                Production + AI engineering + automation
              </span>
            </div>

            <h1
              className="mt-5 font-serif text-4xl font-semibold tracking-tight md:text-5xl"
              data-testid="text-hero-title"
            >
              Cinematic videos. Intelligent workflows. Delivered fast.
            </h1>
            <p
              className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
              data-testid="text-hero-subtitle"
            >
              From scripts and shoots to localization, approvals, and publishing—Hemant Chabria's studio blends creative production with agentic workflows for enterprise-ready delivery.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                className="h-11 rounded-xl"
                data-testid="button-hero-submit-brief"
                asChild
              >
                <a href="#contact">
                  Submit your brief
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                variant="secondary"
                className="h-11 rounded-xl"
                data-testid="button-hero-view-workflows"
                asChild
              >
                <a href="#workflows">View workflows</a>
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              <Pill icon={<Film className="size-4" aria-hidden="true" />} label="Brand & corporate" />
              <Pill icon={<Globe2 className="size-4" aria-hidden="true" />} label="Localization" />
              <Pill icon={<Workflow className="size-4" aria-hidden="true" />} label="Agentic automation" />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-xl border bg-card p-3 shadow-sm glow-blue">
                <div className="text-xs text-muted-foreground" data-testid="label-metric-1">
                  Turnaround
                </div>
                <div className="mt-1 text-lg font-semibold" data-testid="text-metric-1">
                  3–10 days
                </div>
              </div>
              <div className="rounded-xl border bg-card p-3 shadow-sm glow-blue">
                <div className="text-xs text-muted-foreground" data-testid="label-metric-2">
                  Languages
                </div>
                <div className="mt-1 text-lg font-semibold" data-testid="text-metric-2">
                  Multi
                </div>
              </div>
              <div className="rounded-xl border bg-card p-3 shadow-sm glow-blue">
                <div className="text-xs text-muted-foreground" data-testid="label-metric-3">
                  Governance
                </div>
                <div className="mt-1 text-lg font-semibold" data-testid="text-metric-3">
                  Built-in
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          >
            <div className="grain relative overflow-hidden rounded-2xl border bg-card p-4 shadow-md">
              <div className="absolute -left-10 -top-10 size-56 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-12 -right-16 size-64 rounded-full bg-accent/18 blur-3xl" />

              <div className="relative rounded-xl border bg-background/50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium" data-testid="text-mini-title">
                      Workflow preview
                    </div>
                    <div className="text-xs text-muted-foreground" data-testid="text-mini-subtitle">
                      Lead → brief → approvals → versions → publish
                    </div>
                  </div>
                  <Badge variant="secondary" data-testid="badge-enterprise">
                    Enterprise-ready
                  </Badge>
                </div>

                <div className="mt-4 grid gap-3">
                  <WorkflowStep
                    title="Capture"
                    desc="WhatsApp / form / email"
                    icon={<MessageSquare className="size-4" aria-hidden="true" />}
                  />
                  <WorkflowStep
                    title="Generate"
                    desc="scripts, storyboards, variants"
                    icon={<Sparkles className="size-4" aria-hidden="true" />}
                  />
                  <WorkflowStep
                    title="Review"
                    desc="controlled approvals + feedback"
                    icon={<Layers className="size-4" aria-hidden="true" />}
                  />
                  <WorkflowStep
                    title="Deliver"
                    desc="formats, cutdowns, localization"
                    icon={<Clapperboard className="size-4" aria-hidden="true" />}
                  />
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border bg-card p-3">
                    <div className="text-xs text-muted-foreground" data-testid="label-proof-1">
                      Brands served
                    </div>
                    <div className="mt-1 text-sm font-medium" data-testid="text-proof-1">
                      L&T • Tata Steel • Emami • GRSE • Haldia Petrochemicals • ITC
                    </div>
                  </div>
                  <div className="rounded-xl border bg-card p-3">
                    <div className="text-xs text-muted-foreground" data-testid="label-proof-2">
                      Use cases
                    </div>
                    <div className="mt-1 text-sm font-medium" data-testid="text-proof-2">
                      Safety • Training • Product • Brand • Corporate • Explainers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function WorkflowStep({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border bg-card p-3 shadow-sm"
      data-testid={`card-workflow-step-${title.toLowerCase()}`}
    >
      <div className="grid size-9 place-items-center rounded-xl border bg-background">
        <span className="text-primary">{icon}</span>
      </div>
      <div>
        <div className="text-sm font-medium" data-testid={`text-workflow-title-${title.toLowerCase()}`}>
          {title}
        </div>
        <div
          className="text-xs text-muted-foreground"
          data-testid={`text-workflow-desc-${title.toLowerCase()}`}
        >
          {desc}
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  {
    key: "video",
    title: "Video production",
    icon: <Clapperboard className="size-4" aria-hidden="true" />,
    popular: true,
    description:
      "Brand, corporate, product, safety, training, explainers, event videos—end-to-end with consistent quality.",
    bullets: ["Script → shoot/AI → edit", "Multiple versions & cutdowns", "Brand-safe review cycles"],
  },
  {
    key: "ai-video",
    title: "Generative AI video",
    icon: <Sparkles className="size-4" aria-hidden="true" />,
    popular: true,
    description:
      "Speed up storyboards, variations, b-roll, and localization using controlled AI pipelines.",
    bullets: ["Storyboards & animatics", "Voice + dubbing + localization", "Templates for repeatability"],
  },
  {
    key: "agents",
    title: "Voice agents",
    icon: <Phone className="size-4" aria-hidden="true" />,
    popular: false,
    description:
      "Front-office automation for lead qualification, FAQs, follow-ups, scheduling, and routing.",
    bullets: ["Lead triage & qualification", "Escalation rules & handoff", "Audit logs + governance"],
  },
  {
    key: "workflows",
    title: "Agentic workflows",
    icon: <Workflow className="size-4" aria-hidden="true" />,
    popular: false,
    description:
      "Automations that connect capture → approvals → publishing across your existing tools.",
    bullets: ["Brief intake → auto follow-up", "Approvals, comments, versioning", "Publishing + reporting"],
  },
  {
    key: "apps",
    title: "AI websites + apps",
    icon: <Building2 className="size-4" aria-hidden="true" />,
    popular: false,
    description:
      "Websites and internal tools that ship fast—integrated with your workflow and content engine.",
    bullets: ["Fast launch for SMEs", "Custom enterprise tools", "Measured conversion + UX"],
  },
] as const;

function ServicesSection() {
  return (
    <section id="services" className="border-t bg-background">
      <Container>
        <div className="py-14 md:py-18">
          <div className="grid gap-3 md:grid-cols-[1fr_0.9fr] md:items-end">
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight" data-testid="text-services-title">
                Services that ship outcomes
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground" data-testid="text-services-subtitle">
                Choose a productized package or go custom. We optimize for speed, brand safety, and measurable impact.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <Badge variant="secondary" data-testid="badge-focus-1">
                Enterprise governance
              </Badge>
              <Badge variant="secondary" data-testid="badge-focus-2">
                Multilingual delivery
              </Badge>
              <Badge variant="secondary" data-testid="badge-focus-3">
                Approvals built-in
              </Badge>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {SERVICES.map((s) => (
              <Card
                key={s.key}
                className="grain glow-blue rounded-2xl border bg-card p-5 shadow-sm transition"
                data-testid={`card-service-${s.key}`}
              >
                <div className="flex items-start gap-3">
                  <div className="grid size-10 place-items-center rounded-xl border bg-background text-primary">
                    {s.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div
                        className="truncate text-base font-semibold"
                        data-testid={`text-service-title-${s.key}`}
                      >
                        {s.title}
                      </div>
                      {s.popular && (
                        <Badge className="rounded-full" data-testid={`badge-service-${s.key}`}>
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div
                      className="mt-1 text-sm leading-relaxed text-muted-foreground"
                      data-testid={`text-service-desc-${s.key}`}
                    >
                      {s.description}
                    </div>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <BadgeCheck className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                      <span data-testid={`text-service-bullet-${s.key}-${b.toLowerCase().replaceAll(" ", "-")}`}>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between gap-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    data-testid={`link-service-cta-${s.key}`}
                  >
                    Get pricing
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#workflows"
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    data-testid={`link-service-more-${s.key}`}
                  >
                    See how it works
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

const WORKFLOWS = [
  {
    title: "Lead capture → auto follow-up",
    desc: "Forms/WhatsApp to structured intake, instant follow-up, and routing based on service type.",
    tags: ["WhatsApp", "Email", "CRM"],
  },
  {
    title: "Script + storyboard generation",
    desc: "On-brand scripts, storyboards, and variants—reviewed with controlled approvals.",
    tags: ["AI", "Templates", "Brand"],
  },
  {
    title: "Approvals + versioning",
    desc: "Stakeholder feedback loops with audit trails, cutdowns, and clear sign-offs.",
    tags: ["Governance", "Reviews", "SLA"],
  },
  {
    title: "Localization + dubbing",
    desc: "Multi-language delivery with voice, subtitles, and consistent terminology.",
    tags: ["Multi-lang", "Voice", "Subtitles"],
  },
  {
    title: "Publishing + reporting",
    desc: "Push approved assets to channels with tracking and performance reporting.",
    tags: ["Social", "CMS", "Analytics"],
  },
];

function WorkflowsSection() {
  return (
    <section id="workflows" className="border-t bg-background">
      <Container>
        <div className="py-14 md:py-18">
          <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight" data-testid="text-workflows-title">
                Workflows Studio
              </h2>
              <p className="mt-2 text-muted-foreground" data-testid="text-workflows-subtitle">
                We design agentic pipelines that keep quality high while moving fast—so your team spends less time coordinating and more time shipping.
              </p>
              <div className="mt-6 rounded-2xl border bg-card p-5 shadow-sm">
                <div className="text-sm font-medium" data-testid="text-workflows-cta-title">
                  Want a workflow map?
                </div>
                <p className="mt-1 text-sm text-muted-foreground" data-testid="text-workflows-cta-desc">
                  Share your current process and tools—we'll sketch a high-level automation plan.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    className="rounded-xl"
                    data-testid="button-workflows-submit"
                    asChild
                  >
                    <a href="#contact">Submit brief</a>
                  </Button>
                  <Button
                    variant="secondary"
                    className="rounded-xl"
                    data-testid="button-workflows-book"
                    asChild
                  >
                    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Book a call</a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {WORKFLOWS.map((w, idx) => (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: idx * 0.03, ease: "easeOut" }}
                  className="grain rounded-2xl border bg-card p-5 shadow-sm"
                  data-testid={`card-workflow-${idx}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-base font-semibold" data-testid={`text-workflow-card-title-${idx}`}>
                        {w.title}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground" data-testid={`text-workflow-card-desc-${idx}`}>
                        {w.desc}
                      </div>
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary"
                      data-testid={`link-workflow-card-cta-${idx}`}
                    >
                      Build this
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </a>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="rounded-full"
                        data-testid={`badge-workflow-tag-${idx}-${t.toLowerCase().replaceAll(" ", "-")}`}
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

const LOGOS: { name: string; logo: string }[] = [
  { name: "L&T", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Larsen-%26-Toubro-Logo.svg" },
  { name: "Tata Steel", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Tata_Steel_Logo.svg" },
  { name: "Emami", logo: "https://upload.wikimedia.org/wikipedia/en/c/c2/Emami_logo.svg" },
  { name: "Haldia Petrochemicals", logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/Haldia_Petrochemicals_Logo.svg" },
  { name: "GRSE", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/GRSE_Logo.png" },
  { name: "Tata", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg" },
  { name: "Aditya Birla Group", logo: "https://upload.wikimedia.org/wikipedia/en/7/75/Aditya_Birla_Group_Logo.svg" },
  { name: "Reliance", logo: "https://upload.wikimedia.org/wikipedia/en/0/0e/Reliance_Industries.svg" },
  { name: "IndianOil", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Indian_Oil_Logo.svg" },
  { name: "GAIL", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/GAIL.svg" },
  { name: "JSW", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/JSW_Group_logo.svg" },
  { name: "Hindalco", logo: "https://upload.wikimedia.org/wikipedia/en/2/22/Hindalco_Logo.svg" },
  { name: "Marico", logo: "https://upload.wikimedia.org/wikipedia/en/9/90/Marico_Logo.svg" },
  { name: "Britannia", logo: "https://upload.wikimedia.org/wikipedia/en/5/50/Britannia_Industries_logo_with_motto.svg" },
  { name: "Nestlé", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Nestl%C3%A9_textlogo.svg" },
  { name: "ITC", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/ITC_Limited_Logo.svg" },
];

function ProofSection() {
  return (
    <section id="case-studies" className="border-t bg-background">
      <Container>
        <div className="py-14 md:py-18">
          <div className="grid gap-6 md:grid-cols-[1fr_0.9fr] md:items-end">
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight" data-testid="text-proof-title">
                Proof, not promises
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground" data-testid="text-proof-subtitle">
                A few representative engagements across industrial, brand, and enterprise workflows.
              </p>
            </div>
            <div className="flex justify-start md:justify-end">
              <a
                href="https://www.youtube.com/c/HemantChabria"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                data-testid="link-proof-request-showreel"
              >
                Watch showreel on YouTube
                <Play className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <CaseCard
              title="Industrial safety training"
              industry="Manufacturing"
              outcome="Fast multilingual SOP videos with controlled approvals."
              id="safety"
            />
            <CaseCard
              title="Corporate brand film"
              industry="Infrastructure"
              outcome="Premium story + multiple cutdowns for campaigns."
              id="brand"
            />
            <CaseCard
              title="Lead-to-content automation"
              industry="SME"
              outcome="Brief intake to publishing pipeline with reporting."
              id="workflow"
            />
          </div>

          <div className="mt-8 rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium" data-testid="text-logo-strip-title">
                  Brands & teams we've supported
                </div>
                <div className="text-sm text-muted-foreground" data-testid="text-logo-strip-subtitle">
                  Representative list. Full client list available on request.
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" data-testid="badge-proof-sla">
                  SLA-ready
                </Badge>
                <Badge variant="secondary" data-testid="badge-proof-compliance">
                  Review cycles
                </Badge>
              </div>
            </div>
            <div className="mask-fade-x mt-4 overflow-hidden">
              <div className="flex w-max gap-4 animate-scroll-left">
                {[...LOGOS, ...LOGOS].map((l, idx) => (
                  <div
                    key={`${l.name}-${idx}`}
                    className="flex h-14 w-28 shrink-0 items-center justify-center rounded-xl border bg-background/60 px-3"
                    data-testid={`logo-${idx}`}
                    title={l.name}
                  >
                    <img
                      src={l.logo}
                      alt={l.name}
                      className="h-8 max-w-full object-contain dark:brightness-0 dark:invert dark:opacity-70"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CaseCard({
  title,
  industry,
  outcome,
  id,
}: {
  title: string;
  industry: string;
  outcome: string;
  id: string;
}) {
  return (
    <Card
      className="grain glow-blue rounded-2xl border bg-card p-5 shadow-sm transition"
      data-testid={`card-case-${id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-muted-foreground" data-testid={`text-case-industry-${id}`}>
            {industry}
          </div>
          <div className="mt-1 text-lg font-semibold" data-testid={`text-case-title-${id}`}>
            {title}
          </div>
        </div>
        <Badge variant="secondary" className="rounded-full" data-testid={`badge-case-${id}`}>
          Case
        </Badge>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground" data-testid={`text-case-outcome-${id}`}>
        {outcome}
      </p>
      <div className="mt-5 flex items-center justify-between">
        <a
          href="https://www.youtube.com/c/HemantChabria"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          data-testid={`link-case-cta-${id}`}
        >
          Watch on YouTube
          <Play className="size-4" aria-hidden="true" />
        </a>
        <span className="text-xs text-muted-foreground" data-testid={`text-case-note-${id}`}>
          NDA-friendly
        </span>
      </div>
    </Card>
  );
}

function PackagesSection() {
  const packages = useMemo(
    () => [
      {
        title: "Video — Starter",
        price: "From ₹",
        points: ["1 core video", "2 cutdowns", "Basic brand alignment"],
      },
      {
        title: "Video — Scale",
        price: "From ₹₹",
        points: ["2–6 videos/month", "Cutdown factory", "Approval workflow"],
      },
      {
        title: "Video — Enterprise",
        price: "Custom",
        points: ["SLA + governance", "Localization", "Dedicated producer"],
      },
      {
        title: "Workflows — Starter",
        price: "From ₹",
        points: ["Lead capture + routing", "Email/WhatsApp follow-up", "Basic reporting"],
      },
      {
        title: "Workflows — Scale",
        price: "From ₹₹",
        points: ["Approvals + versioning", "Templates + automation", "Team dashboards"],
      },
      {
        title: "Workflows — Enterprise",
        price: "Custom",
        points: ["Security + audit", "Integrations", "Change control"],
      },
    ],
    [],
  );

  return (
    <section className="border-t bg-background">
      <Container>
        <div className="py-14 md:py-18">
          <div className="grid gap-3 md:grid-cols-[1fr_0.9fr] md:items-end">
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight" data-testid="text-packages-title">
                Clear packages. Custom when needed.
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground" data-testid="text-packages-subtitle">
                Start with a tier, then evolve into a repeatable pipeline.
              </p>
            </div>
            <div className="md:text-right">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                data-testid="link-packages-cta"
              >
                Request a quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {packages.map((p) => (
              <Card
                key={p.title}
                className="grain glow-blue rounded-2xl border bg-card p-5 shadow-sm"
                data-testid={`card-package-${p.title.toLowerCase().replaceAll(" ", "-").replaceAll("—", "-")}`}
              >
                <div className="text-sm text-muted-foreground" data-testid={`text-package-price-${p.title.toLowerCase().replaceAll(" ", "-")}`}>
                  {p.price}
                </div>
                <div className="mt-1 text-lg font-semibold" data-testid={`text-package-title-${p.title.toLowerCase().replaceAll(" ", "-")}`}>
                  {p.title}
                </div>
                <Separator className="my-4" />
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <BadgeCheck className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                      <span data-testid={`text-package-point-${p.title.toLowerCase().replaceAll(" ", "-")}-${pt.toLowerCase().replaceAll(" ", "-")}`}>
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <Button
                    className="w-full rounded-xl"
                    data-testid={`button-package-choose-${p.title.toLowerCase().replaceAll(" ", "-")}`}
                    asChild
                  >
                    <a href="#contact">Choose this</a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="border-t bg-background">
      <Container>
        <div className="py-14 md:py-18">
          <div className="grid gap-3 md:grid-cols-[1fr_0.9fr] md:items-end">
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight" data-testid="text-faq-title">
                FAQs
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground" data-testid="text-faq-subtitle">
                Clear answers to the questions buyers ask most.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border bg-card p-2 shadow-sm">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger data-testid="accordion-trigger-1">
                  What do you mean by "agentic workflows"?
                </AccordionTrigger>
                <AccordionContent data-testid="accordion-content-1">
                  Think of it as a system of automations + AI that moves work forward: capturing briefs, generating drafts, collecting approvals, creating versions, and publishing—while keeping governance and human review in place.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger data-testid="accordion-trigger-2">
                  Can you work with enterprise approvals and brand governance?
                </AccordionTrigger>
                <AccordionContent data-testid="accordion-content-2">
                  Yes. We design review cycles with clear sign-offs, controlled versions, and audit-friendly feedback loops. You keep visibility and control while we keep the pipeline moving.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger data-testid="accordion-trigger-3">
                  Do you do multilingual videos and localization?
                </AccordionTrigger>
                <AccordionContent data-testid="accordion-content-3">
                  Yes—subtitles, dubbing/voice, and terminology consistency across languages, with the same approval standards.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactSection() {
  const { toast } = useToast();
  const [serviceType, setServiceType] = useState<string>("video");
  const [otherService, setOtherService] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const canSubmit = name.trim().length > 1 && email.includes("@");

  return (
    <section id="contact" className="border-t bg-background">
      <Container>
        <div className="py-14 md:py-18">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-start">
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-tight" data-testid="text-contact-title">
                Submit your brief
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground" data-testid="text-contact-subtitle">
                Tell us what you're building. We'll reply within 15 minutes with next steps and a scope outline.
              </p>

              <div className="mt-6 rounded-2xl border bg-card p-5 shadow-sm">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="service" data-testid="label-service">
                      I'm interested in
                    </Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger id="service" className="rounded-xl" data-testid="select-service">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video" data-testid="select-item-video">
                          Video production
                        </SelectItem>
                        <SelectItem value="ai-video" data-testid="select-item-ai-video">
                          Generative AI video
                        </SelectItem>
                        <SelectItem value="agents" data-testid="select-item-agents">
                          Voice agents
                        </SelectItem>
                        <SelectItem value="workflows" data-testid="select-item-workflows">
                          Agentic workflows
                        </SelectItem>
                        <SelectItem value="apps" data-testid="select-item-apps">
                          Website / app
                        </SelectItem>
                        <SelectItem value="other" data-testid="select-item-other">
                          Other (tell us)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name" data-testid="label-name">
                        Your name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-xl"
                        placeholder="Name"
                        data-testid="input-name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email" data-testid="label-email">
                        Work email
                      </Label>
                      <Input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-xl"
                        placeholder="name@company.com"
                        type="email"
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  {serviceType === "other" ? (
                    <div className="grid gap-2">
                      <Label htmlFor="otherService" data-testid="label-other-service">
                        What are you looking for?
                      </Label>
                      <Input
                        id="otherService"
                        value={otherService}
                        onChange={(e) => setOtherService(e.target.value)}
                        className="rounded-xl"
                        placeholder="Tell us what you need"
                        data-testid="input-other-service"
                      />
                    </div>
                  ) : null}

                  <div className="grid gap-2">
                    <Label htmlFor="company" data-testid="label-company">
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="rounded-xl"
                      placeholder="Company"
                      data-testid="input-company"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="message" data-testid="label-message">
                      What do you need?
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[120px] rounded-xl"
                      placeholder="Timeline, deliverables, languages, approvals, references…"
                      data-testid="textarea-message"
                    />
                  </div>

                  <Button
                    className="h-11 rounded-xl"
                    disabled={!canSubmit || (serviceType === "other" && otherService.trim().length < 2)}
                    onClick={async () => {
                      try {
                        const res = await fetch("/api/contact", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            name,
                            email,
                            service: serviceType === "other" ? otherService || "Other" : serviceType,
                            company: company || undefined,
                            message: message || undefined,
                          }),
                        });
                        const data = await res.json();
                        if (res.ok) {
                          toast({ title: "Brief sent!", description: data.message || "We'll get back to you shortly." });
                          setName(""); setEmail(""); setCompany(""); setMessage(""); setServiceType("");
                        } else {
                          toast({ title: "Error", description: data.message || "Something went wrong.", variant: "destructive" });
                        }
                      } catch {
                        toast({ title: "Network error", description: "Please try again or use WhatsApp.", variant: "destructive" });
                      }
                    }}
                    data-testid="button-submit-brief"
                  >
                    Submit brief
                    <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                  </Button>

                  <div className="text-xs text-muted-foreground" data-testid="text-contact-note">
                    Prefer WhatsApp? Use the sticky button on the bottom-right.
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-2xl border bg-card p-5 shadow-sm">
                <div className="text-sm font-medium" data-testid="text-contact-fast">
                  How we work
                </div>
                <div className="mt-1 text-sm text-muted-foreground" data-testid="text-contact-fast-desc">
                  A clear, governed process from brief to publish.
                </div>
                <Separator className="my-4" />
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <Badge variant="secondary" className="rounded-full" data-testid="badge-step-1">
                      1
                    </Badge>
                    Scope + timeline + approvals map
                  </li>
                  <li className="flex gap-2">
                    <Badge variant="secondary" className="rounded-full" data-testid="badge-step-2">
                      2
                    </Badge>
                    Drafts (AI + human) → review loops
                  </li>
                  <li className="flex gap-2">
                    <Badge variant="secondary" className="rounded-full" data-testid="badge-step-3">
                      3
                    </Badge>
                    Delivery + cutdowns + localization
                  </li>
                </ol>

                <Separator className="my-4" />

                <div className="grid gap-3 sm:grid-cols-2">
                  <Card className="rounded-xl border bg-background/60 p-4" data-testid="card-contact-card-1">
                    <div className="text-xs text-muted-foreground" data-testid="label-contact-card-1">
                      Typical outputs
                    </div>
                    <div className="mt-1 text-sm font-medium" data-testid="text-contact-card-1">
                      Videos, cutdowns, SOPs
                    </div>
                  </Card>
                  <Card className="rounded-xl border bg-background/60 p-4" data-testid="card-contact-card-2">
                    <div className="text-xs text-muted-foreground" data-testid="label-contact-card-2">
                      Team
                    </div>
                    <div className="mt-1 text-sm font-medium" data-testid="text-contact-card-2">
                      Producer + editor + AI eng
                    </div>
                  </Card>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium" data-testid="text-whatsapp-title">
                      WhatsApp
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid="text-whatsapp-subtitle">
                      Quick questions & follow-ups
                    </div>
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted"
                    data-testid="link-whatsapp"
                  >
                    Message us
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border bg-card p-5 shadow-sm">
                <div className="text-sm font-medium" data-testid="text-industries-title">
                  Industries
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[
                    "Manufacturing",
                    "Infrastructure",
                    "FMCG",
                    "Government/PSU",
                    "Retail",
                    "Education",
                  ].map((x) => (
                    <div
                      key={x}
                      className="rounded-xl border bg-background/60 px-3 py-2 text-sm text-muted-foreground"
                      data-testid={`text-industry-${x.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-")}`}
                    >
                      {x}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="flex flex-col gap-4 py-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-sm font-medium" data-testid="text-footer-name">
              Hemant Chabria | JustVideos.cloud
            </div>
            <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
              <a
                href="mailto:hemant@chabria.com"
                className="inline-flex items-center gap-1 hover:text-foreground"
                data-testid="link-footer-email"
              >
                <Mail className="size-3.5" aria-hidden="true" />
                hemant@chabria.com
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground"
                data-testid="link-footer-whatsapp"
              >
                <MessageSquare className="size-3.5" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/chabria/"
                target="_blank"
                rel="noreferrer"
                className="grid size-8 place-items-center rounded-lg border bg-card text-muted-foreground transition hover:text-primary hover:border-primary/30"
                aria-label="LinkedIn"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="size-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/hemantchabria/"
                target="_blank"
                rel="noreferrer"
                className="grid size-8 place-items-center rounded-lg border bg-card text-muted-foreground transition hover:text-primary hover:border-primary/30"
                aria-label="Instagram"
                data-testid="link-footer-instagram"
              >
                <Instagram className="size-4" aria-hidden="true" />
              </a>
              <a
                href="https://x.com/hemantchabria"
                target="_blank"
                rel="noreferrer"
                className="grid size-8 place-items-center rounded-lg border bg-card text-muted-foreground transition hover:text-primary hover:border-primary/30"
                aria-label="X (Twitter)"
                data-testid="link-footer-twitter"
              >
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.youtube.com/c/HemantChabria"
                target="_blank"
                rel="noreferrer"
                className="grid size-8 place-items-center rounded-lg border bg-card text-muted-foreground transition hover:text-primary hover:border-primary/30"
                aria-label="YouTube"
                data-testid="link-footer-youtube"
              >
                <Youtube className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground" data-testid="text-footer-copy">
              © {new Date().getFullYear()} JustVideos.cloud
            </span>
            <a
              href="/privacy"
              className="text-muted-foreground underline-offset-4 hover:underline"
              data-testid="link-privacy"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-muted-foreground underline-offset-4 hover:underline"
              data-testid="link-terms"
            >
              Terms
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function WhatsAppSticky() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:translate-y-[-1px] hover:shadow-xl"
      data-testid="button-whatsapp-sticky"
      aria-label="WhatsApp"
    >
      <MessageSquare className="size-4" aria-hidden="true" />
      WhatsApp
    </a>
  );
}

export default function HomePage() {
  return (
    <div data-testid="page-home">
      <TopNav />
      <Hero />
      <ServicesSection />
      <WorkflowsSection />
      <ProofSection />
      <PackagesSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <ChatBot />
      <WhatsAppSticky />
    </div>
  );
}

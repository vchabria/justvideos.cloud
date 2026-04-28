// ─── Data & Types ────────────────────────────────────────────────────────────

export const SITE = {
  name: "JustVideos",
  tagline: "Cinematic AI as a",
  taglineEm: "Service.",
  subhead:
    "We build custom AI + VFX pipelines in video, animation, generative cinematics and live-capture finish — for enterprises, brands and creators alike.",
  chips: ["Production", "AI Engineering", "VFX"],
  metrics: [
    { num: "1,200+", lbl: "Pro AVs delivered" },
    { num: "3–10", lbl: "Day turnarounds" },
    { num: "12+", lbl: "Languages broadcast-finished" },
  ],
  marquee:
    "Cinematic AI as a Service · Production · AI Engineering · VFX · Kolkata → Worldwide · Est. when you need it · ",
};

export interface Service {
  num: string;
  title: string;
  desc: string;
  icon: string;
  detail?: string;
}

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "AI Virtual Set + Talent Comp",
    desc: "Shoot once on black limbo. Generate the studio, the graphics, the language variants. Used for L&T leadership tribute films and our presenter series at scale.",
    icon: "\u2197",
    detail:
      "We place a talent in any environment without building a set. ComfyUI-driven pipelines generate branded studios, motion graphics, and multi-language variants from a single black-limbo shoot. The result is indistinguishable from a physical set — but ships in days, not weeks.",
  },
  {
    num: "02",
    title: "Pure Generative Cinematics",
    desc: "Brand, fashion, beauty, product. End-to-end generation — brief to delivery in days. Lehengas, jewelry, packaging, manicures — frame-perfect, license-clean.",
    icon: "\u2197",
    detail:
      "No camera, no model, no studio. We generate editorial-quality brand films from a text brief. Fashion, beauty, product macro, lifestyle — the pipeline handles Flux for stills, Kling/Luma for motion, and our CTE for consistency. Every frame is license-clean and brand-locked.",
  },
  {
    num: "03",
    title: "Live + AI Post",
    desc: "Hybrid pipeline for documentary, event and industrial work. Live capture meets generative finish. CSR fieldwork, coastal docs, press coverage.",
    icon: "\u2197",
    detail:
      "Real cameras, real locations — finished with generative inserts, AI-driven color, and stylisation that makes a one-person crew look like a full unit. Ideal for documentary, CSR fieldwork, event coverage, and industrial documentation.",
  },
  {
    num: "04",
    title: "Brand Motion + Showreels",
    desc: "The 90-second sizzle that does the work of a thirty-page deck. Codified studio range, kinetic typography, the works.",
    icon: "\u2197",
    detail:
      "Kinetic typography, frame-rate cuts, codified brand motion. We compress your entire range into a 60–90 second piece that closes deals before the second meeting. Used as hero loops, pitch openers, and social headers.",
  },
  {
    num: "05",
    title: "Voice Agents + Workflows",
    desc: "Agentic pipelines, voice-cloned hosts, multi-language dubbing finished in-engine. ElevenLabs, OpenAI TTS, custom orchestration.",
    icon: "\u2197",
    detail:
      "Voice-cloned presenters, multi-language dubbing, agentic orchestration. We build pipelines that generate new episodes without reshoots — script in, finished video out. ElevenLabs, OpenAI TTS, and custom orchestration layers.",
  },
  {
    num: "06",
    title: "AI Websites + Apps",
    desc: "Build the site, ship the app, integrate the model. Full-stack delivery for clients who want one team to own the surface and the substrate.",
    icon: "\u2197",
    detail:
      "Full-stack delivery for clients who want one team to own the surface and the substrate. We build marketing sites, product apps, and internal tools — often integrating the same AI models we use in film production.",
  },
];

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  title: string;
  capability: string;
  sector: string;
  hook: string;
  label: string;
  detail: string;
  pipeline: string[];
  result: string;
  video?: string;
  poster?: string;
  deliverables?: { label: string; video: string; poster?: string }[];
  useCases?: string[];
}

export const CASES: CaseStudy[] = [
  {
    id: "lt",
    slug: "lt-leadership",
    client: "L&T Construction",
    title: "Leadership & Induction Films",
    capability: "AI Virtual Set",
    sector: "Enterprise",
    hook: "20\u201330 presenters shot on black limbo. AI generated the L&T-branded studio \u2014 hexagonal graphics, blue corporate backdrop \u2014 for every single one.",
    label: "L&T \u00b7 INDUCTION",
    detail:
      "Male and female presenters filmed once against a plain backdrop. ComfyUI composites each into a branded L&T Construction studio with hexagonal motion graphics, corporate blue tones, and the L&T logo locked top-right. Induction roadmaps, motivation films, leadership tributes \u2014 20\u201330 videos delivered in English and Hindi from a compressed shoot calendar.",
    pipeline: ["ComfyUI", "CTE", "Veo", "Runway", "After Effects"],
    result: "20\u201330 induction films, two languages, compressed shoot calendar.",
    video: "/videos/lt-leadership.mp4",
    poster: "/videos/lt-leadership-poster.jpg",
    deliverables: [
      { label: "Hindi Cut", video: "/videos/lt-hindi.mp4", poster: "/videos/lt-hindi-poster.jpg" },
      { label: "Social Cut — Reel 1", video: "/videos/lt-social-1.mp4", poster: "/videos/lt-social-1-poster.jpg" },
      { label: "Social Cut — Reel 2", video: "/videos/lt-social-2.mp4", poster: "/videos/lt-social-2-poster.jpg" },
    ],
    useCases: [
      "Enterprise induction and onboarding video at scale",
      "Multilingual corporate comms from a single shoot",
      "AI-generated branded studio environments per presenter",
      "Leadership motivation and roadmap films",
    ],
  },
  {
    id: "fashion",
    slug: "fashion-generative",
    client: "Fashion \u00b7 Beauty \u00b7 Jewelry",
    title: "AI Fashion & Beauty Spots",
    capability: "Pure Gen",
    sector: "Brand",
    hook: "Bridal jewelry in a heritage showroom, gold necklace editorial, beauty macro down to the manicure \u2014 generated end-to-end, no model booked.",
    label: "GENERATIVE FASHION",
    detail:
      "Jewelry ads with full bridal looks \u2014 red lehenga, kundan sets, heritage showroom lighting. Gold necklace close-ups with editorial-grade skin texture. Beauty macro down to individual nail finishes. Every frame license-clean, delivered in days, not weeks.",
    pipeline: ["Flux", "Kling", "Luma", "CTE", "DaVinci Resolve"],
    result: "5 hero films, 22 stills, 3-day turnaround on the second cut.",
    video: "/videos/fashion-generative.mp4",
    poster: "/videos/fashion-generative-poster.jpg",
    deliverables: [
      { label: "Beauty Editorial", video: "/videos/fashion-beauty.mp4", poster: "/videos/fashion-beauty-poster.jpg" },
      { label: "Jewelry Ad Spot", video: "/videos/fashion-jewelry.mp4", poster: "/videos/fashion-jewelry-poster.jpg" },
      { label: "Fashion Spot \u2014 Cut 1", video: "/videos/fashion-spot-1.mp4", poster: "/videos/fashion-spot-1-poster.jpg" },
      { label: "Fashion Spot \u2014 Cut 2", video: "/videos/fashion-spot-2.mp4", poster: "/videos/fashion-spot-2-poster.jpg" },
    ],
    useCases: [
      "Jewelry and bridal campaign films without a physical shoot",
      "Beauty macro \u2014 skincare, manicure, product close-ups",
      "Editorial-grade AI portraiture for lookbooks and ads",
      "Rapid seasonal content refresh for e-commerce",
    ],
  },
  {
    id: "doc",
    slug: "coastal-documentary",
    client: "Business in Motion",
    title: "Documentary & Field Coverage",
    capability: "Live + AI",
    sector: "Documentary",
    hook: "Coastal boats, blackbuck conservation, event press \u2014 real cameras finished with AI-generated inserts and style transfer.",
    label: "DOCUMENTARY",
    detail:
      "Coastal field footage and wildlife conservation films \u2014 including an AI-animated blackbuck documentary. Event press coverage with on-the-ground interviews. \"Marketing Pyramid\" whiteboard explainer. AI timelapse sequences of Indian landscapes. All finished with generative inserts, style transfer, and consistent grading from a one-person crew.",
    pipeline: ["Field capture", "Runway", "Veo", "CTE", "Resolve"],
    result: "Single-week turn from raw cards to broadcast master.",
    video: "/videos/coastal-documentary.mp4",
    poster: "/videos/coastal-documentary-poster.jpg",
    deliverables: [
      { label: "Behind the Scenes", video: "/videos/documentary-bts.mp4", poster: "/videos/documentary-bts-poster.jpg" },
    ],
    useCases: [
      "Wildlife and conservation documentary with AI animation",
      "CSR field documentation with cinematic finish",
      "Event press coverage and on-ground interviews",
      "AI timelapse and style transfer for live footage",
    ],
  },
  {
    id: "show",
    slug: "campaign-hosts",
    client: "The Greatest Show On Earth",
    title: "Personalised Event Invites & Campaign Hosts",
    capability: "AI Virtual Set",
    sector: "Tourism / Culture",
    hook: "One presenter filmed once on dark backdrop. AI generates personalised invitations for every guest, every region \u2014 60+ versions from a single shoot.",
    label: "EVENT INVITES",
    detail:
      "Presenter in saffron kurta shot once on a dark studio backdrop. Each video is personalised per guest or region \u2014 name, location, language variant \u2014 using voice cloning and dynamic lower-thirds. The same pipeline powers the sari-clad welcome host for tourism campaigns. 60+ deliverables from one shoot day.",
    pipeline: ["ComfyUI", "CTE", "ElevenLabs", "After Effects"],
    result: "1 shoot day \u2192 60+ personalised event invites.",
    video: "/videos/campaign-hosts.mp4",
    poster: "/videos/campaign-hosts-poster.jpg",
    deliverables: [
      { label: "Invite Variant 1", video: "/videos/campaign-invite-v1.mp4", poster: "/videos/campaign-invite-v1-poster.jpg" },
      { label: "Invite Variant 2", video: "/videos/campaign-invite-v2.mp4", poster: "/videos/campaign-invite-v2-poster.jpg" },
      { label: "Invite Variant 3", video: "/videos/campaign-invite-v3.mp4", poster: "/videos/campaign-invite-v3-poster.jpg" },
    ],
    useCases: [
      "Personalised video invitations at scale",
      "Multi-region tourism and cultural campaigns",
      "Voice-cloned presenters for language variants",
      "Scalable social Reels from a single shoot day",
    ],
  },
  {
    id: "reel",
    slug: "showreel",
    client: "JustVideos",
    title: "Showreel & Style Transfer",
    capability: "Brand Motion",
    sector: "Studio",
    hook: "90-second sizzle reel plus style transfer \u2014 live boardroom footage reimagined as anime cityscape cinematics.",
    label: "SHOWREEL \u00b7 90s",
    detail:
      "The homepage hero loop \u2014 kinetic typography, frame-rate cuts, end-card spanning all service buckets. Plus a style transfer showcase: live-action boardroom footage transformed into futuristic anime cityscapes with glass towers and volumetric light, demonstrating the AI post pipeline.",
    pipeline: ["CTE", "After Effects", "Resolve"],
    result: "Used as homepage hero loop. Closes deals before the second meeting.",
    video: "/videos/showreel-full.mp4",
    poster: "/videos/showreel-full-poster.jpg",
    deliverables: [
      { label: "Brand Motion Highlight", video: "/videos/brand-motion.mp4", poster: "/videos/brand-motion-poster.jpg" },
    ],
    useCases: [
      "Pitch-opening sizzle reels for sales teams",
      "Style transfer \u2014 live footage to anime, illustration, or painterly",
      "Social headers and hero loops for brand sites",
      "Kinetic typography brand identity films",
    ],
  },
  {
    id: "presenter",
    slug: "presenter-series",
    client: "Business in Motion",
    title: "Explainer & Whiteboard Series",
    capability: "AI Virtual Set",
    sector: "Brand",
    hook: "Marketing Pyramid whiteboard breakdowns, presenter Reels, AI timelapse inserts \u2014 three episodes a week, zero reshoots.",
    label: "EXPLAINER REELS",
    detail:
      "Whiteboard explainer series (\"Marketing Pyramid\" \u2014 Seeding, Conversion, Awareness, Viral Effect) paired with presenter-to-camera Reels. Voice-cloned for new scripts, backdrops and b-roll generated per episode. AI timelapse landscape inserts round out the visual library. Three episodes per week without scheduling friction.",
    pipeline: ["CTE", "ElevenLabs", "Runway", "AE"],
    result: "3 episodes / week, zero reshoots.",
    video: "/videos/presenter-series.mp4",
    poster: "/videos/presenter-series-poster.jpg",
    useCases: [
      "Recurring whiteboard and explainer series without reshoots",
      "Voice-cloned episodic content at scale",
      "AI-generated backdrops, b-roll, and timelapse inserts",
      "Marketing and educational content engines",
    ],
  },
  {
    id: "voice",
    slug: "voice-agent",
    client: "JustVideos",
    title: "Voice Agent Pipeline",
    capability: "Voice Agents + Workflows",
    sector: "AI / Automation",
    hook: "Script in, finished video out. Voice-cloned hosts, agentic orchestration, zero reshoots.",
    label: "VOICE AGENT",
    detail:
      "End-to-end agentic pipeline: a script triggers voice synthesis, visual generation, motion compositing, and broadcast finish — all orchestrated without human intervention. New episodes ship without scheduling a single shoot day.",
    pipeline: ["CTE", "ElevenLabs", "Runway", "After Effects"],
    result: "Fully automated episode pipeline. Script to broadcast in hours.",
    video: "/videos/voice-agent.mp4",
    poster: "/videos/voice-agent-poster.jpg",
    useCases: [
      "Automated video episode pipelines from script input",
      "Multi-language dubbing with voice-cloned hosts",
      "Agentic orchestration for recurring content engines",
      "Zero-reshoot production for explainer and training content",
    ],
  },
  {
    id: "ailab",
    slug: "ai-generation-lab",
    client: "JustVideos",
    title: "AI Generation Lab",
    capability: "Pure Gen",
    sector: "R&D",
    hook: "Portraits, animals, environments, style transfer \u2014 pure generative output with no camera, no model, no set. The proving ground for every pipeline we ship.",
    label: "AI LAB",
    detail:
      "Our internal R&D surface. Every new model, every pipeline upgrade gets stress-tested here before it reaches a client brief. Photorealistic portraits, AI-animated wildlife, architectural interiors, style transfer experiments \u2014 all generated end-to-end. The lab feeds directly into production: techniques proven here ship in client work within days.",
    pipeline: ["Flux", "Kling", "Luma", "CTE", "Runway", "Veo"],
    result: "Internal R&D pipeline powering every client engagement.",
    video: "/videos/ai-lab-hero.mp4",
    poster: "/videos/ai-lab-hero-poster.jpg",
    deliverables: [
      { label: "Montage Reel", video: "/videos/ai-lab-montage.mp4", poster: "/videos/ai-lab-montage-poster.jpg" },
      { label: "AI Wildlife", video: "/videos/ai-lab-dog.mp4", poster: "/videos/ai-lab-dog-poster.jpg" },
      { label: "AI Portrait", video: "/videos/ai-lab-cat.mp4", poster: "/videos/ai-lab-cat-poster.jpg" },
    ],
    useCases: [
      "Model benchmarking and pipeline R&D",
      "Photorealistic AI portraiture and character generation",
      "AI-animated wildlife and nature sequences",
      "Style transfer and visual effects prototyping",
    ],
  },
];

export interface Tool {
  name: string;
  role: string;
  glyph: string;
}

export const TOOLS: Tool[] = [
  { name: "ComfyUI", role: "Node graphs", glyph: "C" },
  { name: "CTE", role: "In-house engine", glyph: "\u2b2c" },
  { name: "Flux", role: "Generation", glyph: "F" },
  { name: "Runway", role: "Video", glyph: "R" },
  { name: "Veo", role: "Video", glyph: "V" },
  { name: "Kling", role: "Motion", glyph: "K" },
  { name: "Luma", role: "Camera", glyph: "L" },
  { name: "ElevenLabs", role: "Voice", glyph: "11" },
  { name: "Resolve", role: "Finish", glyph: "\u25d0" },
];

export interface ProcessStep {
  title: string;
  desc: string;
}

export const PROCESS: ProcessStep[] = [
  {
    title: "Brief",
    desc: "A 30-minute call. We listen for the films you actually need, not the deck you walked in with.",
  },
  {
    title: "Pipeline",
    desc: "We design the pipeline first \u2014 live, hybrid, or pure-gen \u2014 then a budget shows up that matches.",
  },
  {
    title: "Capture",
    desc: "Shoot day, model run, or both. We compress the production calendar by an order of magnitude.",
  },
  {
    title: "Finish",
    desc: "Multi-language, broadcast-grade, frame-locked. Approvals in days, not weeks.",
  },
];

export interface Client {
  name: string;
  logo: string;
}

export const CLIENTS: Client[] = [
  { name: "L&T Construction", logo: "/logos/lt.svg" },
  { name: "Pluo Tree", logo: "/logos/pluo-tree.svg" },
  { name: "CSR Foundation", logo: "/logos/csr-foundation.svg" },
  { name: "Greatest Show On Earth", logo: "/logos/greatest-show.svg" },
  { name: "Aakriti Jewels", logo: "/logos/aakriti-jewels.svg" },
  { name: "Saffron Beauty", logo: "/logos/saffron-beauty.svg" },
  { name: "Coastal Industries", logo: "/logos/coastal.svg" },
  { name: "Kumaresan Inc.", logo: "/logos/kumaresan.svg" },
  { name: "Marketing Pyramid", logo: "/logos/marketing-pyramid.svg" },
  { name: "Heritage Films", logo: "/logos/heritage.svg" },
  { name: "Tourism Bengal", logo: "/logos/tourism-bengal.svg" },
  { name: "Eastern Group", logo: "/logos/eastern.svg" },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ: FaqItem[] = [
  {
    q: "Is this all AI, or do you actually shoot?",
    a: "Both. Production crew when the brief calls for one. Pure generative when it doesn't. Most projects are a hybrid pipeline \u2014 the seam is invisible by design.",
  },
  {
    q: "How fast is fast?",
    a: "Pure-gen brand spots: 3\u20135 days. Hybrid leadership films: 6\u201310 days approval-locked. Documentary cuts: under two weeks from cards to master.",
  },
  {
    q: "Whose tools do you use?",
    a: "ComfyUI, our in-house Cinematic Thinking Engine (CTE), Flux, Runway, Veo, Kling, Luma, ElevenLabs, OpenAI TTS, DaVinci Resolve, After Effects. We pick per-project, not per-vendor.",
  },
  {
    q: "Where are you based?",
    a: "Kolkata, India. Working with brands across India and globally. Most engagements are remote-first; we travel for capture days when the film calls for it.",
  },
  {
    q: "Smallest engagement you take?",
    a: "A single 60-second cinematic. Largest is a year-long content engine that delivers 3\u20135 films a week.",
  },
];

// ─── Extended copy for inner pages ──────────────────────────────────────────

export const ABOUT_EXTENDED = {
  bio: `Hemant Chabria runs JustVideos as a working studio in Kolkata — production crew when the brief calls for one, ComfyUI / CTE / Veo / Runway when it doesn't. Across 1,200+ delivered AVs, the work has spanned enterprise leadership comms, brand cinematics for fashion and beauty, documentary and CSR fieldwork, cultural and tourism campaigns, and explainer / social content.`,
  philosophy: `We believe the best video work happens when the pipeline is transparent — not hidden behind vendor-speak or mystery tools. Every project gets a named pipeline, a clear turnaround, and a single point of accountability. The tools change per project. The DNA doesn't.`,
  studioValues: [
    "Pipeline transparency over vendor mystique",
    "Calendar compression through AI-native workflows",
    "One team, one point of accountability",
    "Broadcast-grade finish, every frame",
  ],
};

export const WORK_PAGE = {
  heading: "Selected Work",
  subheading: "2024\u201326",
  intro:
    "Eight projects across AI virtual sets, pure generative cinematics, hybrid documentary, brand motion, voice agents, and our internal AI generation lab. Each project names the pipeline.",
};

export const SERVICES_PAGE = {
  heading: "Six capabilities.",
  headingEm: "One pipeline DNA.",
  intro:
    "Live capture, generative finish, agentic orchestration. We pick the mix per project — the seam is invisible by design.",
};

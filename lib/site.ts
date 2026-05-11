/**
 * Site-wide structured configuration.
 *
 * Single source of truth for: branding, navigation labels, hero CTAs,
 * partner/steward institutions, research outputs, demo videos and
 * supplementary links, contact email, and the team roster.
 *
 * Anything that ops may need to swap out at launch (real video URLs,
 * the PoC repo URL, official partner logos, monitored email, headshots,
 * LinkedIn URLs, the Concordia toggle) lives here. Code references these
 * fields only — do not hard-code copy in components when a config slot
 * exists below.
 *
 * Override with `NEXT_PUBLIC_*` env vars on Vercel/Pages where indicated.
 */

export type PartnerLogo = {
  name: string;
  shortName: string;
  image: string;
  /** Omit until the partner URL is confirmed. */
  href?: string;
};

export type Steward = {
  name: string;
  shortName: string;
  href: string;
};

export type HeroCta = {
  id: string;
  label: string;
  href: string;
};

export type DemoVideo = {
  id: string;
  title: string;
  /**
   * The 11-character YouTube video id (e.g. "dQw4w9WgXcQ"). Empty string
   * means "not yet recorded": the UI renders a graceful placeholder card
   * in that slot rather than an empty iframe.
   */
  youtubeId: string;
};

export type DemoConfig = {
  /** Public repo holding the proof-of-concept code. Empty until ready. */
  pocRepoUrl: string;
  /** Public design doc / requirements writeup for the demo. Empty until ready. */
  designDocUrl: string;
  /** Three walkthrough videos by the technical lead. */
  videos: readonly DemoVideo[];
};

export type ResearchOutput = {
  /** Stable id used as anchor on /research and as a React key. */
  id: string;
  /** Human-friendly date string ("Mar 2026" or "Coming soon"). */
  date: string;
  /** Short kind label rendered as an eyebrow in research cards. */
  kind: string;
  title: string;
  summary: string;
  /** Where the card links to. Use "#" for items that aren't yet readable. */
  href: string;
  status: "published" | "coming-soon";
};

export type TeamMember = {
  id: string;
  name: string;
  /** Role / affiliation line, e.g. "Technical Lead". */
  title: string;
  /**
   * One-paragraph biography. Empty string when the bio hasn't been
   * provided yet — components render a quiet skeleton block in that
   * case so the grid layout stays consistent.
   */
  bio: string;
  /**
   * Public path to a square headshot under `/public/images/team/...`.
   * When omitted the card falls back to an initials avatar.
   */
  photo?: string;
  /** LinkedIn profile URL. Card name links to this when present. */
  linkedinUrl?: string;
  /**
   * `pending: true` renders the card with a "Pending confirmation" pill,
   * a subtler border, and no LinkedIn link — used for contractors whose
   * involvement isn't yet finalized.
   */
  pending?: boolean;
};

/* ────────────────────────────────────────────────────────────────────── */
/*  Configuration                                                          */
/* ────────────────────────────────────────────────────────────────────── */

export const siteConfig = {
  name: "Agent IDs",
  title: "Agent IDs",

  /**
   * Mission statement. Reused across hero, footer, About intro, and
   * metadata descriptions so the site speaks with one voice.
   */
  mission:
    "An open research community building the trust layer for AI agents.",

  /**
   * Slightly longer description used in metadata + the /about page.
   * Mirrors the mission line to satisfy the spec note "make sure to
   * update mission statement throughout, incl. imprint".
   */
  description:
    "An open research community building the trust layer for AI agents.",

  /**
   * The institution(s) behind the initiative. Rendered in the
   * `StewardsRow` strip above the footer. As more institutions co-host,
   * add them here.
   *
   * NOTE on Concordia: see `featureFlags.includeConcordia` below. Until
   * that flag flips to true, Concordia is intentionally absent from
   * this list, the partner strip, the memo masthead, and the About
   * intro byline.
   */
  stewards: [
    {
      name: "Singapore AI Safety Hub (SASH)",
      shortName: "SASH",
      href: "https://www.aisafety.sg",
    },
  ] satisfies readonly Steward[],

  /**
   * Partner logos in the bottom strip. Replace placeholder assets in
   * `public/images/partners/` when official artwork is available.
   *
   * Ordering reflects the spec: Singapore AISI first, Korea AISI second.
   */
  partnerLogos: [
    {
      name: "Singapore AI Safety Institute",
      shortName: "Singapore AISI",
      // TODO: swap for the official Singapore AISI logo when supplied.
      // The current asset filename is preserved for backwards compatibility
      // with the existing public/images/partners/ folder.
      image: "/images/partners/singapore-ac.svg",
      // `href` left undefined until the official partner URL is shared.
      href: undefined,
    },
    {
      name: "Korea AI Safety Institute",
      shortName: "Korea AISI",
      // TODO: swap for the official Korea AISI logo when supplied.
      image: "/images/partners/korea-ac.svg",
      href: undefined,
    },
  ] satisfies readonly PartnerLogo[],

  /**
   * The three call-to-action buttons in the homepage hero. Order matters:
   * primary, secondary, tertiary, left to right.
   */
  hero: {
    ctas: [
      { id: "research", label: "Read our research", href: "/research" },
      { id: "demo", label: "Explore the technical demo", href: "/demo" },
      { id: "join", label: "Join the community", href: "/join" },
    ] satisfies readonly HeroCta[],
  },

  /**
   * Email used for the "Drop us a line" CTA on /join and any other
   * contact surfaces. TODO: confirm this address is actually monitored
   * before the public launch (spec note: "We need to link an email that
   * is actually monitored.").
   */
  contactEmail: "agent-ids@aisafety.sg",

  /**
   * GitHub URL kept for backwards compatibility (referenced by older
   * components and link metadata). The hero no longer surfaces a "View
   * on GitHub" link per the spec.
   */
  githubUrl:
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    "https://github.com/ady-bhai/agent-ID-poc-SG",

  /**
   * Technical demo configuration. Empty `youtubeId` strings render
   * placeholder cards; empty repo / design-doc URLs render disabled
   * "TBA" badges. Filling these in is the launch checklist.
   */
  demo: {
    // TODO: add link to new repo with PoC.
    pocRepoUrl: "",
    // TODO: add link after checking with Sam.
    designDocUrl: "",
    videos: [
      {
        id: "v1",
        title: "Navigating the agentID memo",
        youtubeId: "",
      },
      {
        id: "v2",
        title:
          "Creating and using the agent ID in an exchange between an internet service and an AI agent",
        youtubeId: "",
      },
      {
        id: "v3",
        title: "Using the agent ID for incident response",
        youtubeId: "",
      },
    ],
  } satisfies DemoConfig,

  /**
   * Research outputs surfaced on the homepage and the new /research
   * index. Add entries here as new memos / papers ship.
   */
  research: {
    outputs: [
      {
        id: "designing-agent-ids",
        date: "Mar 2026",
        kind: "Policy memo",
        title: "Designing Agent IDs",
        summary:
          "A policy memo mapping the design space for agent ID systems: functions, existing protocols, private incentives, and ten central design questions",
        href: "/memo",
        status: "published",
      },
      {
        id: "emergency-shutdowns",
        date: "Coming soon",
        kind: "Policy memo",
        title: "Emergency Shutdown Mechanisms for AI Agents",
        summary:
          "A policy memo mapping threat models, technical requirements, and governance mechanisms for emergency shutdown of AI agents, with a focus on agent-level interventions triggered by third-party services.",
        href: "#",
        status: "coming-soon",
      },
    ] satisfies readonly ResearchOutput[],
  },

  /**
   * The /about team grid roster. Order = render order. Keep `pending`
   * roles at the end so the grid reads top-down by seniority of
   * confirmation, not just alphabetically.
   *
   * Photo & LinkedIn fields are intentionally optional: the card
   * gracefully falls back to an initials avatar and omits the link.
   */
  team: [
    {
      id: "sam",
      name: "Sam Boger",
      title: "Technical Lead",
      bio: "Sam previously worked as a Senior Software Engineer at Google, as a legislative staffer in the US Senate, and as a Research Fellow at The Future Society, focused on US AI Governance. He holds an undergraduate and master's degree in computer science from Brown University.",
    },
    {
      id: "amin",
      name: "Amin Oueslati",
      title: "Governance Lead",
      bio: "Amin is an affiliate at the University of Oxford and a Senior Associate at The Future Society, focused on European AI governance. Previously, he was a technical project lead at McKinsey. He advises governments and technology leaders on navigating frontier AI risk.",
    },
    {
      id: "miro",
      name: "Miro Pluckebaum",
      title: "Strategy Lead",
      bio: "Miro has a decade of experience across Europe and Asia as a product, governance and research management lead with SAP, ByteDance, University of Oxford and GovAI. He is the founder of the Singapore AI Safety Hub and a graduate of Schwarzman College at Tsinghua University.",
    },
    {
      id: "aditya",
      name: "Aditya Mehta",
      title: "Contributor",
      bio: "Aditya is an AI Reporter at TechCrunch, supported by the Tarbell Center for AI Journalism. He contributed to Agent IDs as an ERA Technical Governance Fellow. He's a board member at the Berkeley AI Safety Initiative and has conducted research at Center for AI Safety.",
    },
    {
      id: "zac",
      name: "Zac",
      title: "Fellow",
      bio: "Zac joined SASH as a Winter Fellow at Centre for the Governance of AI, where he worked on projects related to AI risk management and verification. Previously he worked in program management and headhunting for 80,000 Hours. He holds a master's degree in social psychology from LSE.",
    },
    {
      id: "lance",
      name: "Lance",
      title: "Contributor",
      bio: "",
      pending: true,
    },
  ] satisfies readonly TeamMember[],

  /**
   * Feature flags for content decisions that are still in flight.
   *
   * `includeConcordia`:
   *   - Default `false` per current ops decision.
   *   - When flipped to `true`, four call sites should react:
   *       1. `StewardsRow` / `app/page.tsx` hero — add Concordia to
   *          the "An initiative by" list.
   *       2. `PartnerLogosStrip` — surface a Concordia entry.
   *       3. `app/memo/page.tsx` masthead — eyebrow becomes
   *          "SASH & Concordia · Policy memo".
   *       4. `components/about/ProjectIntro.tsx` byline — mention
   *          Concordia alongside SASH.
   *   - Search the codebase for `includeConcordia` to find every
   *     site of effect.
   */
  featureFlags: {
    includeConcordia: false,
  },

  /**
   * Eyebrow above the homepage title. The spec asked for the "Research
   * community" line to be removed, so this is intentionally absent
   * (the hero no longer renders an eyebrow). Kept as a hook for future
   * reintroduction without restructuring the hero JSX.
   */
  eyebrow: "",

  /**
   * Tagline rendered under the hero title. Kept for backwards
   * compatibility with components that still reference it; sourced
   * directly from `mission` so the two stay in lockstep.
   */
  tagline:
    "An open research community building the trust layer for AI agents.",
} as const;

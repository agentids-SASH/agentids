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
  videoId: string; // Added videoId field for direct YouTube embedding
};

export type DemoConfig = {
  /** URL for the full technical demo. */
  fullTechnicalDemo: string;
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
  /**
   * Optional partner / stewardship line rendered under the title
   * (e.g. "Singapore AI Safety Hub (SASH) & Concordia").
   */
  credit?: string;
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
  name: "AgentID",
  title: "AgentID",

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
   * Partner logos in the bottom strip (`public/images/partners/`).
   *
   * Ordering reflects the spec: Singapore AISI first, Korea AISI second.
   */
  partnerLogos: [
    {
      name: "Singapore AI Safety Institute",
      shortName: "Singapore AISI",
      image: "/images/partners/singapore-aisi.png",
      href: undefined,
    },
    {
      name: "Korea AI Safety Institute",
      shortName: "Korea AISI",
      image: "/images/partners/korea-aisi.jpg",
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
  contactEmail: "agentids@aisafety.sg",

  /**
   * Destination URL for the newsletter registration flow or landing page.
   * TODO: verify the external form handler or list subscription automation 
   * is active before launch (spec note: "Ensure the audience submission pipeline 
   * handles intake cleanly.").
   */
  newsletterUrl: "https://airtable.com/appJdkIXtMOmW1J5D/pagb9n463ioyPSUxI/form",

  /**
   * Permanent invitation link for the community Slack workspace. 
   * TODO: replace with the final static invite link once workspace access 
   * policies are finalized (spec note: "Keep unclickable or bounded by a 'Soon' 
   * state until public rollout.").
   */
  slackUrl: "",

  /**
   * Technical demo configuration. Empty `youtubeId` strings render
   * placeholder cards; empty repo / design-doc URLs render disabled
   * "TBA" badges. Filling these in is the launch checklist.
   */
  demo: {
    // Placeholder for full technical demo URL.
    fullTechnicalDemo: "https://agentids-sash.github.io/agentids-technical-demo/",

    // TODO: add link to new repo with PoC.
    pocRepoUrl: "https://github.com/agentids-SASH/agentids-technical-demo",

    // TODO: add link after checking with Sam.
    designDocUrl: "",

    videos: [
      {
        id: "v1",
        title: "Navigating the AgentID Technical Demo",
        youtubeId: "https://youtu.be/PS2of3azpHo",
        videoId: "PS2of3azpHo"
      },
      {
        id: "v2",
        title:
          "Creating and using the agent ID in an exchange between an internet service and an AI agent",
        youtubeId: "https://youtu.be/x4NPXtweFTU",
        videoId: "x4NPXtweFTU"
      },
      {
        id: "v3",
        title: "Using the agent ID for incident response",
        youtubeId: "",
        videoId: ""
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
          "A policy memo mapping the design space for agent IDs: functions, existing protocols, private incentives, and ten central design questions",
        href: "/memo",
        status: "published",
      },
      {
        id: "key-ingredients-of-agent-ids",
        date: "Sep 2026",
        kind: "Policy memo",
        title: "Key Ingredients of Robust AI Agent IDs",
        summary:
          "A memo laying out the goals of agent IDs and the functions necessary to fulfill them, as well as examples of existing components, protocols, and implementations",
        href: "/key-ingredients",
        status: "published",
      },
      {
        id: "emergency-shutdowns",
        date: "Coming soon",
        kind: "Policy memo",
        title: "Emergency Shutdown Mechanisms for AI Agents",
        // credit: "Singapore AI Safety Hub (SASH) & Concordia",
        summary:
          "A policy memo mapping threat models, technical requirements, and governance mechanisms for emergency shutdown of AI agents.",
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
      photo: "/images/team/Sam-Boger.jpg",
      linkedinUrl: "https://www.linkedin.com/in/sam-boger/",
    },
    {
      id: "amin",
      name: "Amin Oueslati",
      title: "Governance Lead",
      bio: "Amin is an affiliate at the University of Oxford and a Senior Associate at The Future Society, focused on European AI governance. Previously, he was a technical project lead at McKinsey. He advises governments and technology leaders on navigating frontier AI risk.",
      photo: "/images/team/Amin-Oueslati.jpg",
      linkedinUrl: "https://www.linkedin.com/in/aminoueslati/",
    },
    {
      id: "miro",
      name: "Miro Pluckebaum",
      title: "Strategy Lead",
      bio: "Miro has a decade of experience across Europe and Asia as a product, governance and research management lead with SAP, ByteDance, University of Oxford and GovAI. He is the founder of the Singapore AI Safety Hub and a graduate of Schwarzman College at Tsinghua University.",
      photo: "/images/team/Miro-Pluckebaum.jpg",
      linkedinUrl: "https://www.linkedin.com/in/miro-pluckebaum/", 
    },
    {
      id: "zac",
      name: "Zac Richardson",
      title: "Fellow",
      bio: "Zac joined SASH as a Winter Fellow at Centre for the Governance of AI, where he worked on projects related to AI risk management and verification. Previously he worked in program management and headhunting for 80,000 Hours. He holds a master's degree in social psychology from LSE.",
      photo: "/images/team/Zac-Richardson.jpg",
      linkedinUrl: "https://www.linkedin.com/in/zachary-richardson-7536751b8/",
    },
    {
      id: "aditya",
      name: "Aditya Mehta",
      title: "Contributor",
      bio: "Aditya designed Agent ID proof of concepts as an ERA Technical Governance Fellow. Previously, he conducted research on AI Automation & Wellbeing at the Center for AI Safety. He's an incoming AI Reporter at TechCrunch, supported by the Tarbell Center for AI Journalism.",
      photo: "/images/team/Aditya-Mehta.jpg",
      linkedinUrl: "https://www.linkedin.com/in/aditya-mehta-7892311a2/",
    },
    {
      id: "lance",
      name: "Lance Jabr",
      title: "Contributor",
      bio: "Lance is a software engineer and IT leader in the San Francisco Bay Area, working at the intersection of technology and the arts. He holds a master's of music from NYU and a bachelor's in computer science from Brown University.",
      photo: "/images/team/Lance-Jabr.jpg",
      linkedinUrl: "https://www.linkedin.com/in/lancejabr/",
    },
    {
      id: "zeshen",
      name: "Ze Shen Chin",
      title: "Researcher",
      bio: "Ze Shen works on AI agent infrastructure at SASH and co-leads AI Standards Lab, while serving as a Research Affiliate with the Oxford Martin AI Governance Initiative. He has three years of experience in AI governance, specializing in EU AI policy and frontier AI risk management. He previously spent over a decade as a reservoir engineer in the oil and gas industry.",
      photo: "/images/team/Ze-Shen-Chin.jpg",
      linkedinUrl: "https://www.linkedin.com/in/chinzeshen/",
    },
    {
      id: "manav",
      name: "Manav Chouhan",
      title: "Research Engineer",
      bio: "Manav is working on research and implementation of AI Agent infrastructure at SASH. He brings over 5 years of experience as an AI and Software Engineer, having previously worked at AI Singapore and PTC Software, with experience spanning LLM infrastructure, multi-agent systems, and security protocols. He holds a Master of Computing in AI from the National University of Singapore.",
      photo: "/images/team/Manav-Chouhan.jpg",
      linkedinUrl: "https://www.linkedin.com/in/manavchouhan115/",
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

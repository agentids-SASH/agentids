/**
 * Long-form prose blocks reused across pages.
 *
 * Centralised here so copy edits don't require hunting through JSX.
 * Each export is plain data — no React imports — so it can be consumed
 * by both server and client components.
 *
 * If a string spans multiple paragraphs in the rendered UI, it is
 * exported as an array; components map over it and wrap each entry in
 * a `<p>`. This keeps wrapping decisions in one place.
 */

/* ── Landing: "Why agent IDs?" carousel left column ─────────────────── */

export const carouselProblemParagraph =
  "Agent IDs identify an agent and its user, carry information about " +
  "their permissions and enable effective incident response. Services " +
  "on the internet can require such IDs to assure the trustworthiness, " +
  "security and accountability of AI agents. No ID, no access.";

/* ── Landing: bank-API questions overlaid on slides 1 + 2 ───────────── */

export const bankQuestions = [
  "Who is this agent and who controls it?",
  "Does the agent have all necessary authorization?",
  "If something goes wrong, can I request that the agent be shut down?",
] as const;

/* ── Landing: Workstreams paragraph (replaces former 3-card grid) ───── */

export const workstreamsLede =
  "We want to advance secure and robust agent IDs globally. We define technical protocols, build proof of concepts, and conduct policy research. Our edge? We are:";

export const workstreamsEdges = [
  "Neutral coalition builders, engaging industry, governments, and researchers between East and West.",
  "Architects of solutions that confront hard questions about accountability and trust across the AI agent supply chain.",
  "Pragmatic advisors that configure solutions to different technical and policy contexts.",
] as const;

/* ── Landing + /demo: shared description of the technical demo ──────── */

export const demoIntroParagraphs = [
  "The demo is an interactive visualization of an agent ID protocol. It details and documents the specific steps each entity takes to allow an AI agent to securely access a web service on behalf of its deployer.",
  "Currently the demo follows a scripted set of steps that show how each component of the agent ID is assembled and used. Next, we will bring each entity to life, letting a viewer inspect network requests and server code as the process runs in real time.",
] as const;

/* ── /demo: short caption that accompanies the embedded walkthrough ─── */

export const walkthroughCaption =
  "Get a walkthrough of the technical demo by our technical lead Sam.";

export const walkthroughLede =
  "Our technical lead Sam walks you through our technical demo.";

/* ── /demo: "Purposes" three-paragraph block ────────────────────────── */

export const demoPurposes = [
  {
    label: "Explanation",
    body: "Designing protocols can be complicated. The interactive diagram helps explain how agent IDs work and why they are important at a high level.",
  },
  {
    label: "Demonstration",
    body: "Stepping through the protocol shows a more detailed view of what information is exchanged, where it comes from, and how it is secured.",
  },
  {
    label: "Implementation",
    body: "[In progress] Viewing the implementation of each step by each entity provides a concrete reference implementation of the protocol, paving the way for smooth adoption.",
  },
] as const;

/* ── /demo: forward-looking bullet list under "Purposes" ────────────── */

export const demoFutureUseCases = [
  "Integrating more identity and authorization protocols to promote easy adoption.",
  "Tabletop exercises exploring how to respond to cybersecurity incidents involving AI agents.",
  "Simulating many agents and services operating in this controlled environment in order to study what configurations or interventions lead to the best outcomes.",
] as const;

/* ── /about: project intro body paragraph ───────────────────────────── */

export const aboutIntroParagraph =
  "We want to advance secure and robust agent IDs globally: truly open, interoperable and safe. We define technical protocols, build proof of concepts and conduct policy research.";

/* ── /about: project timeline milestones (Q1–Q4 2026) ───────────────── */

export const aboutMilestones = [
  {
    id: "q1-2026",
    dateLabel: "Q1 2026",
    title: "Foundations",
    description:
      "Published foundational policy memo. Launched applied pilot in partnership with Singapore AISI.",
  },
  {
    id: "q2-2026",
    dateLabel: "Q2 2026",
    title: "Demo & partnerships",
    description:
      "Develop a complete technical demo for an illustrative use case. Workshops at ISE & ATX in Singapore. Onboarded Korea AISI as core partner.",
  },
  {
    id: "q3-2026",
    dateLabel: "Q3 2026",
    title: "Implementation & policy",
    description:
      "Fully implement cryptography and server code for the technical demo, enabling simulations and tabletop exercises. Additional research outputs, e.g. on agent emergency shutdowns. Workshops with industry leaders, including frontier AI developers, agent providers and enterprises. Expanding core project partners.",
  },
  {
    id: "q4-2026",
    dateLabel: "Q4 2026",
    title: "Testbed & adoption",
    description:
      "Fully functional testbed for configuring, observing, and simulating AI agents. Perpetuating project governance, advancing the protocol's recognition in key global fora.",
  },
] as const;

/* ── /join: hero lede + "How to contribute" body ────────────────────── */

export const joinHeroLede =
  "We'd love to shape the future of agent IDs with you—whether you're a researcher, a regulator, an AI developer or an agent deployer.";

export const joinHowToContribute =
  "We're building agent ID protocols in the open. Whether you want to contribute code, discuss adjacent work on agent governance, or share challenges you face managing agent infrastructure in practice — we'd like to hear from you.";

export const joinClosingHeading = "Let's talk.";

/* ── Home: JoinCommunity strip lede ─────────────────────────────────── */

export const homeJoinLede = joinHeroLede;

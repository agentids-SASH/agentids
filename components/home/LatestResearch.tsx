import Link from "next/link";
import { siteConfig, type ResearchOutput } from "@/lib/site";

/**
 * LatestResearch
 * ──────────────
 * Home-page section that surfaces the community's research outputs as
 * a card row. Heading reads simply "Research"; per the SASH spec we no
 * longer render the per-card illustration block, the small "hashtag"
 * pills under each card, or the eyebrow above the heading.
 *
 * Card data is sourced from `siteConfig.research.outputs` so a new
 * publication ships with a single config edit.
 *
 * "Coming soon" outputs render a quiet status pill, an inert title (no
 * outbound link), and a "Get notified" link into /join — so the card
 * reads as roadmap rather than vapourware.
 */

export function LatestResearch() {
  const outputs = siteConfig.research.outputs;

  return (
    <section
      aria-labelledby="latest-research-heading"
      className="border-b border-slate-200/80 bg-[#FBF7F0]"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="latest-research-heading"
            className="text-3xl font-semibold tracking-tight text-[#1a2744] sm:text-4xl"
          >
            Research
            <div
              className="mt-3 h-px max-w-md bg-gradient-to-r from-[#ea580c] via-[#ea580c]/50 to-transparent"
              aria-hidden
            />
          </h2>
          <Link
            href="/research"
            className="inline-flex items-center gap-2 rounded-full border border-[#1a2744] px-4 py-1.5 text-sm font-semibold text-[#1a2744] transition-colors hover:bg-[#1a2744] hover:text-white"
          >
            View all
            <span aria-hidden>→</span>
          </Link>
        </div>

        <ul className="mt-10 grid list-none gap-6 md:grid-cols-2">
          {outputs.map((item) => (
            <li key={item.id}>
              <ResearchCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default LatestResearch;

/* ────────────────────────────────────────────────────────────── */
/* Card                                                            */
/* ────────────────────────────────────────────────────────────── */

function ResearchCard({ item }: { item: ResearchOutput }) {
  const isLink = item.status === "published" && item.href !== "#";
  const isComing = item.status === "coming-soon";

  return (
    <article
      className={`group flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_rgba(15,23,42,0.05)] transition-all ${
        isLink
          ? "hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(15,23,42,0.08),0_12px_32px_rgba(15,23,42,0.08)]"
          : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
          {item.date}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0f4c5c]">
          {item.kind}
        </span>
      </div>

      <h3 className="text-lg font-semibold leading-snug text-[#1a2744]">
        {isLink ? (
          <Link
            href={item.href}
            className="underline-offset-4 group-hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a2744]/30"
          >
            {item.title}
          </Link>
        ) : (
          item.title
        )}
      </h3>

      {item.credit ? (
        <p className="text-xs leading-snug text-slate-500 sm:text-[13px]">
          {item.credit}
        </p>
      ) : null}

      <p className="text-sm leading-relaxed text-slate-600">
        {item.summary}
      </p>

      {isComing ? (
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0f4c5c]/20 bg-[#0f4c5c]/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0f4c5c]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#0f4c5c]"
              aria-hidden
            />
            Coming soon
          </span>
          <Link
            href="/join"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f4c5c] underline-offset-4 hover:underline"
          >
            {/* Get notified
            <span aria-hidden>→</span> */}
          </Link>
        </div>
      ) : null}
    </article>
  );
}

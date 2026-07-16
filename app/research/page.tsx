import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, type ResearchOutput } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Policy memos and applied research outputs.",
};

/**
 * /research
 * ─────────
 * Index of research outputs. Mirrors the homepage `LatestResearch`
 * card style at full-page width so a reader who clicks "Read our
 * research" lands on a page they recognise.
 *
 * Cards are sourced from `siteConfig.research.outputs`, so promoting
 * a "coming-soon" output to "published" is a one-line edit there.
 */
export default function ResearchPage() {
  const outputs = siteConfig.research.outputs;

  return (
    <div className="min-h-full bg-[#FBF7F0] text-[#1A1A1A]">
      <section
        className="border-b border-[rgba(26,26,26,0.12)]"
        style={{ padding: "clamp(56px, 10vw, 96px) clamp(16px, 5vw, 48px)" }}
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          <h1 className="text-4xl font-semibold tracking-tight text-[#1a2744] sm:text-5xl">
            Research
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Policy memos and applied research outputs from the Agent IDs
            community.
          </p>
        </div>
      </section>

      <section
        aria-label="Research outputs"
        style={{ padding: "clamp(40px, 8vw, 72px) clamp(16px, 5vw, 48px)" }}
      >
        <div className="mx-auto max-w-6xl">
          <ul className="grid list-none gap-6 md:grid-cols-2">
            {outputs.map((item) => (
              <li key={item.id} id={item.id} className="scroll-mt-24">
                <ResearchCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Card                                                            */
/* ────────────────────────────────────────────────────────────── */

function ResearchCard({ item }: { item: ResearchOutput }) {
  const isLink = item.status === "published" && item.href !== "#";
  const isComing = item.status === "coming-soon";

  const className = `group flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_rgba(15,23,42,0.05)] transition-all ${
    isLink
      ? "hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(15,23,42,0.08),0_12px_32px_rgba(15,23,42,0.08)]"
      : ""
  }`;

  const inner = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
          {item.date}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0f4c5c]">
          {item.kind}
        </span>
      </div>

      <h2 className="text-xl font-semibold leading-snug text-[#1a2744] sm:text-2xl">
        {item.title}
      </h2>

      {item.credit ? (
        <p className="text-xs leading-snug text-slate-500 sm:text-[13px]">
          {item.credit}
        </p>
      ) : null}

      <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
        {item.summary}
      </p>

      {isComing ? (
        <span
          className="mt-auto inline-flex items-center gap-1.5 self-start rounded-full border border-[#0f4c5c]/20 bg-[#0f4c5c]/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0f4c5c]"
          aria-label="Coming soon"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#0f4c5c]"
            aria-hidden
          />
          Coming soon
        </span>
      ) : isLink ? (
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-[#1a2744] underline-offset-4 group-hover:underline">
          Read the memo
          <span aria-hidden>→</span>
        </span>
      ) : null}
    </>
  );

  if (isLink) {
    return (
      <Link href={item.href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <article
      className={className}
      data-state={isComing ? "coming-soon" : "idle"}
    >
      {inner}
    </article>
  );
}

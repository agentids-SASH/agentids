import type { Metadata } from "next";
import Link from "next/link";
import { PocViewSwitcher } from "@/components/poc/PocViewSwitcher";
import { DemoVideo } from "@/components/demo/DemoVideo";
import { siteConfig } from "@/lib/site";
import {
  demoFutureUseCases,
  demoIntroParagraphs,
  demoPurposes,
  walkthroughLede,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Technical demo",
  description:
    "Agent ID Technical Demo — interactive explanation, demonstration, and reference implementation of a secure agent ID protocol.",
};

/**
 * /demo — Agent ID Technical Demo
 *
 * Page order is deliberate (per Sam's review note: "ensure the
 * walkthrough is visible from the opening view"):
 *
 *   1. H1 + concise 2-paragraph intro.
 *   2. Walkthrough section with three video slots — sits in the
 *      opening viewport on common laptop screens (~720–800px).
 *   3. Purposes (Explanation / Demonstration / Implementation).
 *   4. Future use-cases bullet list.
 *   5. Design & Code: PoC repo + design-doc links (TBA fallback when
 *      `siteConfig.demo.pocRepoUrl` / `designDocUrl` are still empty).
 *   6. Full embedded demo via `PocViewSwitcher`.
 *
 * All long prose lives in `lib/content`; all TBD links / video ids
 * live in `siteConfig.demo`. This page does not own copy or URLs.
 */
export default function DemoPage() {
  const { videos, pocRepoUrl, designDocUrl } = siteConfig.demo;

  return (
    <div className="bg-[#FBF7F0] text-[#1A1A1A]">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <section className="border-b border-[rgba(26,26,26,0.12)]">
        <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="text-3xl font-semibold tracking-tight text-[#1a2744] sm:text-4xl">
            Agent ID Technical Demo
          </h1>
          <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-slate-700 sm:text-lg">
            {demoIntroParagraphs.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Walkthrough — videos placed above the fold ─────────────── */}
      <section
        aria-labelledby="walkthrough-heading"
        className="border-b border-[rgba(26,26,26,0.12)] bg-white"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <div className="flex flex-col gap-2">
            <h2
              id="walkthrough-heading"
              className="text-2xl font-semibold tracking-tight text-[#1a2744] sm:text-3xl"
            >
              Walkthrough
            </h2>
            <p className="text-base leading-relaxed text-slate-700">
              {walkthroughLede}
            </p>
          </div>

          <ul className="mt-8 grid list-none gap-6 md:grid-cols-2 xl:grid-cols-3">
            {videos.map((video, i) => (
              <li key={video.id}>
                <DemoVideo
                  video={video}
                  caption={`Video ${i + 1}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Purposes ───────────────────────────────────────────────── */}
      <section
        aria-labelledby="purposes-heading"
        className="border-b border-[rgba(26,26,26,0.12)]"
      >
        <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <h2
            id="purposes-heading"
            className="text-2xl font-semibold tracking-tight text-[#1a2744] sm:text-3xl"
          >
            Purposes
          </h2>
          <ul className="mt-6 flex list-none flex-col gap-4 text-base leading-relaxed text-slate-700">
            {demoPurposes.map((p) => (
              <li key={p.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p>
                  <span className="font-semibold text-[#1a2744]">
                    {p.label}:
                  </span>{" "}
                  {p.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <h3 className="text-base font-semibold uppercase tracking-[0.16em] text-[#0f4c5c]">
              What&apos;s next
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              We have an exciting list of agent governance use-cases that
              the technical demo will enable, including:
            </p>
            <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-slate-700 sm:text-base">
              {demoFutureUseCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Design & Code ─────────────────────────────────────────── */}
      <section
        aria-labelledby="design-code-heading"
        className="border-b border-[rgba(26,26,26,0.12)] bg-white"
      >
        <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-14">
          <h2
            id="design-code-heading"
            className="text-2xl font-semibold tracking-tight text-[#1a2744] sm:text-3xl"
          >
            Design &amp; Code
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            We&apos;re building in public.
          </p>
          <ul className="mt-6 flex list-none flex-col gap-3">
            <li>
              <ResourceLink
                label="View the code behind the technical demo"
                href={pocRepoUrl}
              />
            </li>
            <li>
              <ResourceLink
                label="Read the design doc — requirements and architecture"
                href={designDocUrl}
                hint="Builds on our policy memo."
              />
            </li>
          </ul>
        </div>
      </section>

      {/* ── Full embedded demo ─────────────────────────────────────── */}
      <section
        aria-labelledby="full-demo-heading"
        className="border-b border-[rgba(26,26,26,0.12)]"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <h2
            id="full-demo-heading"
            className="text-2xl font-semibold tracking-tight text-[#1a2744] sm:text-3xl"
          >
            Full demo
          </h2>
          <PocViewSwitcher className="mt-8" />

          <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-slate-200 bg-white px-4 py-5 text-sm leading-relaxed text-slate-700 sm:px-5">
            <h3 className="font-semibold text-[#1a2744]">
              Scenario &amp; presets
            </h3>
            <p className="mt-2">
              The scenario follows a healthcare booking agent:{" "}
              <strong className="font-medium">MedBot SG</strong> requests
              patient appointment availability from a polyclinic API. Use
              the{" "}
              <strong className="font-medium">Agent ID state</strong>{" "}
              presets (Full Agent ID, No Deployer Info, No Safety
              Certification, No Agent ID) in the Consequences view to see
              which incident response phases succeed or stop entirely —
              missing credential sections cause hard stops, not gradual
              degradation.
            </p>
          </div>
        </div>
      </section>

      {/* ── Quiet "back home" link ─────────────────────────────────── */}
      <div className="mx-auto w-full max-w-4xl px-4 py-8 text-center sm:px-6">
        <Link
          href="/"
          className="text-sm text-slate-500 underline-offset-4 hover:text-[#1a2744] hover:underline"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */

function ResourceLink({
  label,
  href,
  hint,
}: {
  label: string;
  href: string;
  hint?: string;
}) {
  const isReady = href.trim() !== "";

  if (!isReady) {
    return (
      <div
        className="flex flex-col gap-1 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm"
        aria-disabled="true"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-medium text-slate-500">{label}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            TBA
          </span>
        </div>
        {hint && <p className="text-xs leading-relaxed text-slate-500">{hint}</p>}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4 text-sm transition-all hover:-translate-y-0.5 hover:border-[#1a2744]/40 hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_12px_28px_rgba(15,23,42,0.06)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium text-[#1a2744] group-hover:underline">
          {label}
        </span>
        <span aria-hidden className="text-[#1a2744]">
          →
        </span>
      </div>
      {hint && <p className="text-xs leading-relaxed text-slate-500">{hint}</p>}
    </a>
  );
}

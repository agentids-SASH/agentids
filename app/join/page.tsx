import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import {
  joinClosingHeading,
  joinHeroLede,
  joinHowToContribute,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Join the community",
  description:
    "Researchers, regulators, and industry collaborators welcome — plug into the Agent IDs research community.",
};

const CONTACT_EMAIL = siteConfig.contactEmail;
const MAIL_HREF = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

/**
 * /join
 *
 * Per the SASH spec the page reads top-down as:
 *   1. Hero — H1 + inclusive lede (no "Get involved" eyebrow).
 *   2. How to contribute — single short paragraph.
 *   3. Closing CTA — "Drop us a line" heading + email button (no
 *      "Questions?" eyebrow).
 *
 * The earlier "Three ways to contribute" lane cards and "Who this
 * community is for" audience grid have been intentionally retired.
 *
 * Email destination is sourced from `siteConfig.contactEmail` so ops
 * can swap in a different (monitored) inbox without touching JSX.
 */
export default function JoinPage() {
  return (
    <div className="bg-[#F5F0E8] text-[#1A1A1A]">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="border-b border-[rgba(26,26,26,0.12)]">
        <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="text-4xl font-semibold tracking-tight text-[#1a2744] sm:text-5xl">
            Join the community
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
            {joinHeroLede}
          </p>
        </div>
      </section>

      {/* ── How to contribute ──────────────────────────────────────── */}
      <section
        aria-labelledby="how-heading"
        className="border-b border-[rgba(26,26,26,0.12)] bg-[#FBF7F0]"
      >
        <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
          <h2
            id="how-heading"
            className="text-2xl font-semibold tracking-tight text-[#1a2744] sm:text-3xl"
          >
            How to contribute
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
            {joinHowToContribute}
          </p>
        </div>
      </section>

      {/* ── Closing CTA ────────────────────────────────────────────── */}
      <section className="bg-[#1a2744] text-white">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-start gap-5 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {joinClosingHeading}
            </h2>
          </div>
          <a
            href={MAIL_HREF("Agent IDs — questions")}
            className="inline-flex flex-shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#1a2744] transition-colors hover:bg-zinc-100"
          >
            Email the team
            <span aria-hidden> →</span>
          </a>
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

import Link from "next/link";
import { homeJoinLede } from "@/lib/content";

/**
 * JoinCommunity
 * ─────────────
 * Final content beat on the homepage before the stewards/partners
 * strips and footer.
 *
 * Per the SASH spec this section is a single CTA block now: heading,
 * inclusive lede, and one button into `/join`. The previous trio of
 * lane cards (Read & cite / Contribute on GitHub / Get in touch) has
 * been intentionally retired — that level of detail lives on the
 * `/join` page itself.
 */
export function JoinCommunity() {
  return (
    <section
      aria-labelledby="join-heading"
      className="border-b border-white/10 bg-[#1a2744] text-white"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-start gap-6 px-4 py-16 sm:px-6 sm:py-20 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2
            id="join-heading"
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Join the community
          </h2>
          <p className="text-base leading-relaxed text-white/75">
            {homeJoinLede}
          </p>
        </div>
        <Link
          href="/join"
          className="inline-flex flex-shrink-0 self-start rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#1a2744] transition-colors hover:bg-zinc-100 md:self-center"
        >
          Join the community
          <span aria-hidden> →</span>
        </Link>
      </div>
    </section>
  );
}

export default JoinCommunity;

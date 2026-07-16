import { workstreamsLede, workstreamsEdges } from "@/lib/content";

/**
 * Workstreams
 * ───────────
 * Home-page section under the heading "What we're working on".
 *
 * Per the SASH spec, this section is a single short prose block now —
 * the previous status-pill grid (and its accompanying lede + "View
 * repo" pill) has been intentionally retired. Copy lives in
 * `lib/content` so this file stays trivial to scan.
 */
export function Workstreams() {
  return (
    <section
      aria-labelledby="workstreams-heading"
      className="border-b border-slate-200/80 bg-white"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <h2
          id="workstreams-heading"
          className="text-3xl font-semibold tracking-tight text-[#1a2744] sm:text-4xl"
        >
          What we&apos;re working on
        </h2>
        <div
          className="mt-3 h-px max-w-md bg-gradient-to-r from-[#ea580c] via-[#ea580c]/50 to-transparent"
          aria-hidden
        />
        <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-slate-700">
          <p>{workstreamsLede}</p>
          <ul className="flex flex-col gap-3 pl-5 list-disc marker:text-[#ea580c]">
            {workstreamsEdges.map((edge) => (
              <li key={edge}>{edge}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Workstreams;

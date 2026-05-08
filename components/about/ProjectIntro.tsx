import { siteConfig } from "@/lib/site";
import { aboutIntroParagraph } from "@/lib/content";

/**
 * ProjectIntro
 * ────────────
 * Top section of the /about page. Server component — no client APIs needed.
 *
 * The H1 is the project's mission line (sourced from `siteConfig.mission`)
 * so the About header repeats the homepage hero's framing. The body
 * paragraph comes from `lib/content` so copy edits stay out of JSX.
 *
 * Per the SASH spec there is no "About this project" eyebrow and no
 * "View source on GitHub" link — both have been removed. Concordia is
 * intentionally absent from the byline; flip
 * `siteConfig.featureFlags.includeConcordia` to surface it.
 */
export function ProjectIntro() {
  return (
    <section
      aria-labelledby="about-project-heading"
      className="border-b border-[rgba(26,26,26,0.12)]"
      style={{ padding: "clamp(56px, 10vw, 96px) clamp(16px, 5vw, 48px)" }}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <h1
          id="about-project-heading"
          className="text-3xl font-semibold leading-tight tracking-tight text-[#1A2744] sm:text-4xl"
        >
          {siteConfig.mission}
        </h1>
        <div className="flex flex-col gap-4 text-base leading-relaxed text-[#1A1A1A] sm:text-lg">
          <p>{aboutIntroParagraph}</p>
        </div>
      </div>
    </section>
  );
}

export default ProjectIntro;

import Link from "next/link";
import { siteConfig } from "@/lib/site";

/**
 * Footer
 * ──────
 * Two-column layout:
 *   - About: project name + mission line.
 *   - Site nav: links match the top nav (Research / Demo / About /
 *     Join us). No separate "Community" column or GitHub link per the
 *     SASH spec.
 *
 * The "An initiative by" steward strip lives in `<StewardsRow>` above
 * the footer; it isn't repeated here. The right column is
 * intentionally just the legal line.
 *
 * Width matches the homepage wide sections (`max-w-6xl`) so the footer
 * doesn't read narrower than the page above it.
 */

const footerLinks = [
  { href: "/research", label: "Research" },
  { href: "/demo", label: "Demo" },
  { href: "/about", label: "About" },
  { href: "/join", label: "Join us" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* ── About ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <p className="text-sm font-semibold text-[#1a2744]">
              {siteConfig.name}
            </p>
            <p className="text-sm leading-relaxed text-slate-600">
              {siteConfig.mission}
            </p>
          </div>

          {/* ── Site nav ─────────────────────────────────────────── */}
          <nav aria-label="Footer navigation" className="flex flex-col gap-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Site
            </p>
            <ul className="flex list-none flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-700 underline-offset-4 hover:text-[#1a2744] hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Legal ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-3 md:items-end md:text-right">
            <p className="text-xs text-slate-500">
              © {year} SASH AgentID
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

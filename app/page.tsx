import Link from "next/link";
import Image from "next/image";
import { AgentStoryCarousel } from "@/components/home/AgentStoryCarousel";
import { LatestResearch } from "@/components/home/LatestResearch";
import { Workstreams } from "@/components/home/Workstreams";
import { JoinCommunity } from "@/components/home/JoinCommunity";
import { PocViewSwitcher } from "@/components/poc/PocViewSwitcher";
import { DemoVideo } from "@/components/demo/DemoVideo";
import { siteConfig } from "@/lib/site";
import { demoIntroParagraphs, walkthroughCaption } from "@/lib/content";
import { homeContent, homeWide } from "@/lib/layout";

const heroNoiseStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
} as const;

const PRIMARY_STEWARD = siteConfig.stewards[0];
const PRIMARY_VIDEO = siteConfig.demo.videos[0];

export default function HomePage() {
  const fullTechnicalDemo = siteConfig.demo.fullTechnicalDemo;
  return (
    <div>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#1a2744] via-[#1a2744] to-[#0f4c5c]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
          style={heroNoiseStyle}
          aria-hidden
        />

        <div
          className={`${homeContent} flex flex-col items-center py-4 text-center sm:py-8`}
        >
          <h1 className="text-4xl font-normal tracking-tight text-white sm:text-5xl md:text-6xl">
            {siteConfig.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {siteConfig.mission}
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            {siteConfig.hero.ctas.map((cta, i) => (
              <Link
                key={cta.id}
                href={cta.href}
                className={
                  i === 0
                    ? "inline-flex rounded-full bg-zinc-100 px-7 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
                    : "inline-flex rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/[0.06]"
                }
              >
                {cta.label}
              </Link>
            ))}
          </div>

          {/* Initiative line — quiet, sets institutional framing. */}
          {PRIMARY_STEWARD && (
            <p className="mt-9 text-xs text-zinc-500">
              An initiative by{" "}
              <a
                href={PRIMARY_STEWARD.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-zinc-300 underline-offset-4 hover:text-white hover:underline"
              >
                {PRIMARY_STEWARD.name}
              </a>
            </p>
          )}
        </div>
      </section>

      {/* ── Three-card story: arrival, verification, decision ──────── */}
      <AgentStoryCarousel />

      {/* ── Workstreams: what we're working on ─────────────────────── */}
      <Workstreams />

      {/* ── Research outputs ───────────────────────────────────────── */}
      <LatestResearch />

      {/* ── Technical Demo preview ─────────────────────────────────── */}
      <section className="border-b border-slate-200/80 bg-slate-50/50">
        <div className={`${homeWide} pb-12 pt-12 sm:pb-16 sm:pt-14`}>
          <h2 className="text-3xl font-semibold tracking-tight text-[#1a2744] sm:text-4xl">
            Technical Demo
          </h2>
          <div
            className="mt-3 h-px max-w-md bg-gradient-to-r from-[#ea580c] via-[#ea580c]/50 to-transparent"
            aria-hidden
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
            <div className="flex flex-col gap-4 text-base leading-relaxed text-slate-700">
              {demoIntroParagraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}

              <p className="mt-2 text-base font-medium text-[#1a2744]">
                We&apos;re building in public — {" "}
                <Link
                  href="/demo"
                  className="underline decoration-[#ea580c] decoration-2 underline-offset-4 hover:text-[#0f4c5c]"
                >
                  Learn more about the Technical Demo
                </Link>
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="mt-2 text-base font-medium text-[#1a2744]">
                <Link href={fullTechnicalDemo} className="block">
                        Explore the demo yourself!
                </Link>
              </p>

              <Link href={fullTechnicalDemo} className="block">
                <Image
                  src="/images/home/full-demo-agent-id-testbed.png"
                  alt="Agent ID Testbed demo preview"
                  width={1200}
                  height={675}
                  className="w-full rounded-lg border border-slate-200 shadow-sm transition-opacity hover:opacity-90"
                />
              </Link>

              {/* <DemoVideo
                video={PRIMARY_VIDEO}
                hideTitle
                caption={walkthroughCaption}
              /> */}
            </div>
          </div>

          {/* <PocViewSwitcher className="mt-12" /> */}
        </div>
      </section>

      {/* ── Join the community ─────────────────────────────────────── */}
      <JoinCommunity />
    </div>
  );
}

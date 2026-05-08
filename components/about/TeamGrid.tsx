import Image from "next/image";
import { siteConfig, type TeamMember } from "@/lib/site";
import { withPublicBasePath } from "@/lib/paths";

/**
 * TeamGrid
 * ────────
 * Cards for each team member listed in `siteConfig.team`.
 *
 * Design choices (per the SASH spec):
 *   - No "People" eyebrow above the H2.
 *   - Each card displays: avatar (photo or initials fallback), role,
 *     name (links to LinkedIn when `linkedinUrl` is provided), and a
 *     bio paragraph. Missing bios render a quiet skeleton block so the
 *     grid stays visually balanced while content is finalised.
 *   - `pending: true` members get a subdued border, a "Pending
 *     confirmation" pill, and no LinkedIn link.
 *
 * Photo handling: drop a square headshot at e.g. `/images/team/sam.jpg`
 * and set `photo: "/images/team/sam.jpg"` in the team entry. The
 * component applies a consistent rounded crop and a soft ring so the
 * grid reads as one set of portraits even with mixed source files.
 */

const PHOTO_TREATMENT =
  "h-[104px] w-[104px] rounded-full object-cover ring-1 ring-[#1A2744]/15";

export function TeamGrid() {
  return (
    <section
      aria-labelledby="about-team-heading"
      style={{ padding: "clamp(56px, 10vw, 96px) clamp(16px, 5vw, 48px)" }}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="about-team-heading"
          className="text-2xl font-semibold tracking-tight text-[#1A2744] sm:text-3xl"
        >
          Team
        </h2>

        <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {siteConfig.team.map((person) => (
            <li key={person.id}>
              <TeamCard person={person} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TeamGrid;

/* ────────────────────────────────────────────────────────────── */
/* Card                                                            */
/* ────────────────────────────────────────────────────────────── */

function TeamCard({ person }: { person: TeamMember }) {
  const isPending = person.pending === true;
  const className = `flex h-full flex-col rounded-2xl border ${
    isPending
      ? "border-dashed border-[rgba(26,26,26,0.18)] bg-white/60"
      : "border-[rgba(26,26,26,0.12)] bg-white shadow-[0_1px_3px_rgba(26,39,68,0.08),0_8px_24px_rgba(26,39,68,0.06)]"
  } p-6`;

  return (
    <article className={className}>
      <div className="flex flex-col items-center gap-5">
        <Avatar person={person} />
        <div className="w-full text-center">
          <p className="text-[11px] font-bold uppercase leading-snug tracking-[0.12em] text-[#1A2744] sm:text-xs">
            {person.title}
          </p>
          <p className="mt-2 text-lg font-semibold leading-snug text-[#1A1A1A]">
            <NameOrLink person={person} />
          </p>
          {isPending && (
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[rgba(26,26,26,0.18)] bg-[rgba(26,26,26,0.04)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B6B6B]">
              Pending confirmation
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 text-sm leading-relaxed text-[#1F2937]">
        {person.bio.trim() !== "" ? (
          <p>{person.bio}</p>
        ) : (
          <BioSkeleton />
        )}
      </div>
    </article>
  );
}

function Avatar({ person }: { person: TeamMember }) {
  if (person.photo) {
    return (
      <Image
        src={withPublicBasePath(person.photo)}
        alt={`${person.name} headshot`}
        width={104}
        height={104}
        className={PHOTO_TREATMENT}
      />
    );
  }
  return (
    <div
      className="flex h-[104px] w-[104px] shrink-0 items-center justify-center rounded-full border-2 border-[rgba(26,26,26,0.10)] bg-[#F5F0E8] text-xl font-semibold tracking-tight text-[#6B6B6B]"
      aria-hidden
    >
      {initials(person.name)}
    </div>
  );
}

function NameOrLink({ person }: { person: TeamMember }) {
  if (person.linkedinUrl && !person.pending) {
    return (
      <a
        href={person.linkedinUrl}
        target="_blank"
        rel="noreferrer"
        className="underline-offset-4 hover:text-[#1A2744] hover:underline"
      >
        {person.name}
      </a>
    );
  }
  return <>{person.name}</>;
}

function BioSkeleton() {
  return (
    <div
      className="flex flex-col gap-2"
      role="presentation"
      aria-hidden
    >
      <span className="block h-3 w-full rounded bg-[rgba(26,26,26,0.06)]" />
      <span className="block h-3 w-[92%] rounded bg-[rgba(26,26,26,0.06)]" />
      <span className="block h-3 w-[78%] rounded bg-[rgba(26,26,26,0.06)]" />
    </div>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

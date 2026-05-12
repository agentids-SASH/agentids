import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { withPublicBasePath } from "@/lib/paths";

/**
 * Partner logos above the footer. Assets live under `public/images/partners/`;
 * and set `href` on each entry in siteConfig.partnerLogos when URLs are final.
 */
export function PartnerLogosStrip() {
  const logos = siteConfig.partnerLogos;
  if (logos.length === 0) return null;

  return (
    <section
      aria-label="Partner organizations"
      className="border-b border-slate-200 bg-slate-50"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-6 sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Partners
        </p>

        <ul className="flex list-none flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {logos.map((logo) => {
            const inner = (
              /* 1. Stacked Container: Stacks image and text vertically with a gap */
              /* 2. The Bounding Box: Keeps the logo size consistent */
              /* 3. Name: Clean, professional typography */
              <div className="flex flex-col items-center gap-4">
                
                <div className="relative h-10 w-40"> 
                  <Image
                    src={withPublicBasePath(logo.image)}
                    alt={logo.name}
                    fill
                    className="object-contain opacity-80 transition-all hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 160px"
                  />
                </div>

                <span className="text-[10px] font-bold normal-case tracking-[0.15em] text-slate-600 text-center">
                  {logo.name}
                </span>
              </div>
            );

            return (
              <li key={logo.shortName} className="flex items-center">
                {logo.href ? (
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a2744] focus-visible:ring-offset-2"
                  >
                    {inner}
                  </a>
                ) : (
                  <span className="block">{inner}</span>
                )}
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}

export default PartnerLogosStrip;

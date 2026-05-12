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
              /* 1. The Bounding Box: 
                We set a fixed height (h-10) and width (w-40) for the 'slot'.
                'relative' is required for the Next.js 'fill' property to work.
              */
              <div className="relative h-10 w-40"> 
                <Image
                  src={withPublicBasePath(logo.image)}
                  alt={logo.name}
                  fill // 2. Forces image to fill the h-10 w-40 container
                  className="object-contain opacity-80 transition-all hover:opacity-100" // 3. Maintains aspect ratio
                  sizes="(max-width: 768px) 100vw, 160px"
                />
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

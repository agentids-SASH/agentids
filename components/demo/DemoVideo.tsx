import type { DemoVideo as DemoVideoData } from "@/lib/site";

/**
 * DemoVideo
 * ─────────
 * Renders a single walkthrough video slot.
 *
 *   - When `youtubeId` is non-empty, embeds a privacy-mode YouTube
 *     iframe via `youtube-nocookie.com` and uses lazy loading so the
 *     iframe doesn't block first paint when several stack on a page.
 *   - When `youtubeId` is empty (the launch-day default for unrecorded
 *     walkthroughs), renders a placeholder card with a "Coming soon"
 *     pill and the planned title — keeps the page layout stable while
 *     videos are still in production.
 *
 * Server-renderable; no client APIs needed.
 */
export type DemoVideoProps = {
  video: DemoVideoData;
  /**
   * When `true` the title is hidden (used in places like the homepage
   * preview where surrounding copy already names the video). Defaults
   * to `false`.
   */
  hideTitle?: boolean;
  /** Optional caption rendered beneath the embed/placeholder. */
  caption?: string;
  className?: string;
};

export function DemoVideo({
  video,
  hideTitle = false,
  caption,
  className = "",
}: DemoVideoProps) {
  // const videoId = video.youtubeId.trim();
  const hasVideo = video.youtubeId.trim() !== "";
  const thumbnailUrl = `https://i.ytimg.com/vi/${video.videoId.trim()}/maxresdefault.jpg`;

  return (
    <figure className={className}>
      <div className="group relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-[0_2px_4px_rgba(15,23,42,0.05),0_12px_28px_rgba(15,23,42,0.06)]">
        <div className="relative aspect-video w-full">
          {hasVideo ? (
            <a
              href={video.youtubeId}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 block h-full w-full"
            >
              {/* Thumbnail Image */}
              <img
                src={thumbnailUrl}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/30">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#1a2744] shadow-xl transition-transform group-hover:scale-110">
                  <PlayIcon />
                </div>
              </div>
            </a>
          ) : (
            <Placeholder title={video.title} />
          )}
        </div>
      </div>

      {(!hideTitle || caption) && (
        <figcaption className="mt-3 flex flex-col gap-1 text-sm">
          {!hideTitle && (
            <span className="font-medium text-[#1a2744]">{video.title}</span>
          )}
          {caption && (
            <span className="text-slate-600">{caption}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

// Simple Play Icon Sub-component
function PlayIcon() {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="ml-1 h-8 w-8"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}


// export function DemoVideo({
//   video,
//   hideTitle = false,
//   caption,
//   className = "",
// }: DemoVideoProps) {
//   const hasVideo = video.youtubeId.trim() !== "";

//   return (
//     <figure className={className}>
//       <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-[0_2px_4px_rgba(15,23,42,0.05),0_12px_28px_rgba(15,23,42,0.06)]">
//         <div className="relative aspect-video w-full">
//           {hasVideo ? (
//             <iframe
//               className="absolute inset-0 h-full w-full"
//               src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
//               title={video.title}
//               loading="lazy"
//               allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               referrerPolicy="strict-origin-when-cross-origin"
//               allowFullScreen
//             />
//           ) : (
//             <Placeholder title={video.title} />
//           )}
//         </div>
//       </div>

//       {(!hideTitle || caption) && (
//         <figcaption className="mt-3 flex flex-col gap-1 text-sm">
//           {!hideTitle && (
//             <span className="font-medium text-[#1a2744]">{video.title}</span>
//           )}
//           {caption && (
//             <span className="text-slate-600">{caption}</span>
//           )}
//         </figcaption>
//       )}
//     </figure>
//   );
// }

export default DemoVideo;

/* ────────────────────────────────────────────────────────────────────── */

function Placeholder({ title }: { title: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1a2744] via-[#1a2744] to-[#0f4c5c] px-6 text-center text-white"
      role="img"
      aria-label={`Walkthrough video coming soon: ${title}`}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ea580c]" aria-hidden />
        Coming soon
      </span>
      <p className="max-w-md text-sm font-medium leading-relaxed text-white/90 sm:text-base">
        {title}
      </p>
      <p className="text-xs text-white/55">
        Walkthrough video is on its way.
      </p>
    </div>
  );
}

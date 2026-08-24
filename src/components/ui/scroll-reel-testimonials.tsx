"use client";

import * as React from "react";

/* ----------------------------------------------------------------
 * ScrollReelTestimonials
 *
 * Counter-rotating scroll reel + per-character text rise.
 * The middle column is a real vertical list of portraits that
 * translates by one "pitch" per step; the outer columns counter-
 * rotate the opposite way. Text animates in character-by-character
 * with a stagger; the old block exits as a whole before the new
 * characters rise in sequence.
 * ---------------------------------------------------------------- */

export interface ScrollReelTestimonial {
  id?: string;
  /** The quote text */
  quote: string;
  /** Author name shown below the quote */
  author: string;
  /** Portrait image URL for the featured tile */
  image: string;
  /** Optional alt text for the portrait */
  alt?: string;
  /** Star rating (1-5) */
  rating?: number;
  /** Date of review */
  date?: string;
  /** Local Guide badge */
  isLocalGuide?: boolean;
  guideDetails?: string;
  /** Official owner response */
  ownerResponse?: string;
  ownerResponseDate?: string;
  /** Badge / category */
  badge?: string;
}

export interface ScrollReelTestimonialsProps {
  /** Testimonials to cycle through (one featured tile is generated per entry) */
  testimonials: ScrollReelTestimonial[];
  /** Per-character stagger in ms (default 6) */
  charStaggerMs?: number;
  /** Extra classes for the outer container */
  className?: string;
  /** Is RTL language */
  isRtl?: boolean;
  /** Open review modal handler */
  onOpenReviewModal?: () => void;
}

/* Geometry — middle column pitch between portrait centers:
 * 3 * (cell 121.33px + gap 8px) = 388px */
const CELL = 121.33;
const GAP = 8;
const STEP = 3 * (CELL + GAP);

const EXIT_MS = 240; // old text removed / new text mounted
const SLIDE_MS = 800; // column slide duration + interaction lock

const EASE_INOUT = "cubic-bezier(0.65,0,0.35,1)";

const QUOTE_CLASSES =
  "m-0 text-lg font-medium leading-[1.3] tracking-[-0.02em] text-foreground sm:text-[22px]";
const AUTHOR_CLASSES =
  "m-0 text-sm font-medium leading-[1.3] text-muted-foreground";

const FEATURED_SHADOW =
  "0 1.008px 0.705px -0.563px rgba(0,0,0,0.18), 0 2.389px 1.672px -1.125px rgba(0,0,0,0.17), 0 4.357px 3.05px -1.688px rgba(0,0,0,0.17), 0 7.244px 5.07px -2.25px rgba(0,0,0,0.16), 0 11.698px 8.188px -2.813px rgba(0,0,0,0.15), 0 19.148px 13.404px -3.375px rgba(0,0,0,0.13), 0 32.972px 23.08px -3.938px rgba(0,0,0,0.09), 0 60px 42px -4.5px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.6)";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* Blurred placeholder cell */
function Cell() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 rounded-xl border border-neutral-700/60 bg-gradient-to-b from-neutral-800 to-neutral-900 blur-[1px] shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]"
      style={{ width: CELL, height: CELL }}
    />
  );
}

/* Featured portrait tile with desaturation + gradient sheen overlays */
const Featured: React.FC<{ src: string; alt?: string }> = ({ src, alt }) => {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-xl bg-neutral-800 ring-1 ring-white/10"
      style={{ width: CELL, height: CELL, boxShadow: FEATURED_SHADOW }}
    >
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
      />
      {/* desaturate via saturation blend */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-white mix-blend-saturation"
      />
      {/* diagonal gradient sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] blur-[6px] mix-blend-overlay"
        style={{
          background:
            "linear-gradient(220.99deg, rgba(6,182,212,0) 32%, rgb(6,182,212) 41%, rgb(56,189,248) 47%, rgba(14,165,233,0.57) 54%, rgba(14,165,233,0) 65%)",
        }}
      />
    </div>
  );
};

/* Text split component. For Arabic cursive script, words animate as cohesive
 * unbroken units so Arabic letters connect correctly without ligature breakage.
 * For Latin text, per-character split with stagger is applied. */
function Chars({
  text,
  startIndex,
  staggerMs,
}: {
  text: string;
  startIndex: number;
  staggerMs: number;
}) {
  const isArabic = /[\u0600-\u06FF]/.test(text);
  const words = text.split(" ");
  let idx = startIndex;

  if (isArabic) {
    return (
      <>
        {words.map((word, wi) => {
          const delay = (startIndex + wi * 2) * staggerMs;
          return (
            <React.Fragment key={wi}>
              <span
                className="scroll-reel-char inline-block"
                style={{ animationDelay: `${delay}ms` }}
              >
                {word}
              </span>
              {wi < words.length - 1 ? " " : null}
            </React.Fragment>
          );
        })}
      </>
    );
  }

  return (
    <>
      {words.map((word, wi) => {
        const wordSpan = (
          <span key={wi} className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => {
              const delay = idx * staggerMs;
              idx++;
              return (
                <span
                  key={ci}
                  className="scroll-reel-char"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (wi < words.length - 1) idx++;
        return (
          <React.Fragment key={wi}>
            {wordSpan}
            {wi < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export const ScrollReelTestimonials: React.FC<ScrollReelTestimonialsProps> = ({
  testimonials,
  charStaggerMs = 6,
  className,
  isRtl = false,
  onOpenReviewModal,
}) => {
  /* Navigation state vs display state are kept separate so the
   * exiting block and the entering block never render together. */
  const [index, setIndex] = React.useState(0);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const animating = React.useRef(false);
  const timeouts = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const count = testimonials.length;

  React.useEffect(() => {
    /* Enable column transitions only after first paint so the reel
     * appears at its starting offset without a slide-in. */
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true))
    );
    return () => {
      cancelAnimationFrame(raf);
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const paginate = React.useCallback(
    (dir: 1 | -1) => {
      if (animating.current) return;
      const next = index + dir;
      if (next < 0 || next >= count) return;
      animating.current = true;

      setIndex(next);
      setExiting(true);

      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next);
          setExiting(false);
        }, EXIT_MS)
      );
      timeouts.current.push(
        setTimeout(() => {
          animating.current = false;
        }, SLIDE_MS)
      );
    },
    [index, count]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(-1);
    }
  };

  /* Middle column: 3 leading cells, then featured + 2 cells between
   * each testimonial, then 3 trailing cells. */
  const middleItems = React.useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; i: number }> = [];
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    testimonials.forEach((_, i) => {
      items.push({ type: "featured", i });
      if (i < count - 1) {
        items.push({ type: "cell" }, { type: "cell" });
      }
    });
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    return items;
  }, [testimonials, count]);

  const sideCellCount = 4 + 2 * count;
  const centerIdx = (count - 1) / 2;
  const middleY = (centerIdx - index) * STEP;
  const sideY = -middleY;

  const colStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none",
  });

  const current = testimonials[displayIndex] || testimonials[0];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        "relative flex w-full max-w-[1060px] flex-col items-stretch gap-2.5 overflow-hidden rounded-2xl border border-neutral-800 bg-[#0c121e] text-white shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 md:min-h-[320px] md:flex-row",
        className
      )}
    >
      {/* Reel section */}
      <div
        aria-hidden="true"
        className="relative h-56 w-full shrink-0 self-stretch overflow-hidden md:h-auto md:w-[380px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          {/* Left column */}
          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>

          {/* Middle column */}
          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(middleY)}
          >
            {middleItems.map((item, i) =>
              item.type === "featured" ? (
                <Featured
                  key={i}
                  src={testimonials[item.i].image}
                  alt={testimonials[item.i].alt}
                />
              ) : (
                <Cell key={i} />
              )
            )}
          </div>

          {/* Right column */}
          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch px-6 py-6 md:py-8">
        <div className="flex flex-col gap-3">
          {/* Header Row with Rating, Google Badge & Category */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-bold text-amber-400/90 font-mono">5.0</span>
              
              {current.isLocalGuide && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 text-[10px] font-semibold border border-amber-500/20">
                  <svg className="w-3 h-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {isRtl ? 'مرشد محلي' : 'Local Guide'}
                </span>
              )}
            </div>

            {current.date && (
              <span className="text-[11px] font-medium text-neutral-400">
                {current.date}
              </span>
            )}
          </div>

          {/* Text stage */}
          <div
            className="relative w-full max-w-[500px] overflow-hidden"
            aria-live="polite"
          >
            {/* Invisible in-flow copy sizes the stage to the current
              * quote at any viewport width, so wrapped text never clips. */}
            <div
              aria-hidden="true"
              className="invisible flex min-h-[120px] flex-col gap-3"
            >
              <p className={QUOTE_CLASSES}>{current.quote}</p>
              <p className={AUTHOR_CLASSES}>{current.author}</p>
            </div>
            <div
              key={displayIndex}
              className={cn(
                "absolute inset-x-0 top-0 flex flex-col gap-3 will-change-[transform,opacity]",
                exiting && "scroll-reel-exit"
              )}
            >
              <p className="m-0 text-sm sm:text-base md:text-lg font-bold leading-relaxed text-white">
                <Chars
                  text={current.quote}
                  startIndex={0}
                  staggerMs={charStaggerMs}
                />
              </p>
              <div className="flex flex-col gap-0.5">
                <p className="m-0 text-xs sm:text-sm font-semibold text-cyan-300">
                  <Chars
                    text={current.author}
                    startIndex={current.quote.length + 6}
                    staggerMs={charStaggerMs}
                  />
                </p>
                {current.guideDetails && (
                  <p className="text-[11px] text-neutral-400">
                    {current.guideDetails}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Owner Response Pill */}
          {current.ownerResponse && (
            <div className="mt-1 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-300 text-[11px]">
                    {isRtl ? 'رد هيكل الريادة (المالك)' : 'Response from HRC (Owner)'}
                  </span>
                  {current.ownerResponseDate && (
                    <span className="text-[10px] text-neutral-400">
                      {current.ownerResponseDate}
                    </span>
                  )}
                </div>
                <p className="text-neutral-300 text-[11px] mt-0.5 leading-relaxed line-clamp-2">
                  {current.ownerResponse}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Controls Bar */}
        <div className="mt-5 flex items-center justify-between border-t border-neutral-800/80 pt-3.5 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-neutral-400">
              <span className="text-cyan-400 font-bold">{index + 1}</span> / {count}
            </div>
            <div className="h-3 w-px bg-neutral-700" />
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isRtl ? 'تقييم موثق من Google' : 'Google Verified'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenReviewModal && (
              <button
                type="button"
                onClick={onOpenReviewModal}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors cursor-pointer mr-1"
              >
                {isRtl ? '+ تقييم جديد' : '+ Add Review'}
              </button>
            )}
            <button
              type="button"
              onClick={() => paginate(-1)}
              disabled={index === 0}
              aria-label="Previous testimonial"
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-neutral-700 bg-neutral-900 text-white transition-[opacity,transform,background-color] duration-200 hover:enabled:bg-cyan-950 hover:enabled:border-cyan-500 hover:enabled:scale-105 active:enabled:scale-95 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7.5 2.5 3.5 6l4 3.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              disabled={index === count - 1}
              aria-label="Next testimonial"
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-neutral-700 bg-neutral-900 text-white transition-[opacity,transform,background-color] duration-200 hover:enabled:bg-cyan-950 hover:enabled:border-cyan-500 hover:enabled:scale-105 active:enabled:scale-95 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m4.5 2.5 4 3.5-4 3.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollReelTestimonials;

/**
 * The "Chevron B" mark: a B whose two bowls are code chevrons ( > ) on a single spine,
 * followed by a terminal cursor. Reads as a letter and as code at once.
 * Every stroke has pathLength=1 so it can draw itself (see Intro).
 */
export const LOGO_PATHS = {
  spine: 'M13 8 V40',
  top: 'M13 8 H24 L32 16 L24 24 H13',
  bottom: 'M13 24 H26 L34 32 L26 40 H13',
  cursor: 'M38 40 H45',
};

export default function Logo({ className = '', title }: { className?: string; title?: string }) {
  return (
    <svg className={`logo ${className}`} viewBox="0 0 48 48" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path className="lg-stroke lg-spine" d={LOGO_PATHS.spine} pathLength={1} />
      <path className="lg-stroke lg-top" d={LOGO_PATHS.top} pathLength={1} />
      <path className="lg-stroke lg-bottom" d={LOGO_PATHS.bottom} pathLength={1} />
      <path className="lg-cursor" d={LOGO_PATHS.cursor} />
    </svg>
  );
}

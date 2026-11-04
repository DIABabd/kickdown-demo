/**
 * The hero car seen from above, small: lapis body, dark glass roof,
 * Kickdown-blue light outlines, white headlamps, red taillight bar.
 * No logos, no plate (too small to show). Front points up.
 */
export function JourneyCar() {
  return (
    <svg viewBox="0 -34 40 116" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="jc-beam" cx="0.5" cy="1" r="0.9">
          <stop offset="0" stopColor="#dbeeff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#dbeeff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="jc-paint" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#173f86" />
          <stop offset="0.5" stopColor="#2a63c4" />
          <stop offset="1" stopColor="#173f86" />
        </linearGradient>
      </defs>
      {/* Headlight beam on the road */}
      <path d="M8 2 L-4 -34 H44 L32 2 Z" fill="url(#jc-beam)" />
      {/* Mirrors */}
      <rect x="-1" y="24" width="5" height="4" rx="1.5" fill="#06090d" />
      <rect x="36" y="24" width="5" height="4" rx="1.5" fill="#06090d" />
      {/* Body */}
      <rect x="2" y="1" width="36" height="78" rx="11" fill="url(#jc-paint)" stroke="#009CDC" strokeWidth="1.2" />
      {/* Glass roof / glasshouse */}
      <rect x="7" y="22" width="26" height="44" rx="7" fill="#04070c" />
      <rect x="7" y="22" width="26" height="44" rx="7" fill="none" stroke="#7fdcff" strokeWidth="1.1" />
      {/* Roof rails */}
      <path d="M10.5 30 V58 M29.5 30 V58" stroke="#7fdcff" strokeWidth="0.9" strokeLinecap="round" />
      {/* Headlamps + light bar */}
      <rect x="5" y="2.2" width="8" height="2.4" rx="1" fill="#f2f8ff" />
      <rect x="27" y="2.2" width="8" height="2.4" rx="1" fill="#f2f8ff" />
      <rect x="13" y="3" width="14" height="0.9" fill="#7fdcff" />
      {/* Taillight bar */}
      <rect x="6" y="75.6" width="28" height="2" rx="1" fill="#ff2b2e" />
    </svg>
  );
}

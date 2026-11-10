/**
 * The small car on the journey road, seen from above (front points up):
 * deep metallic lapis body, dark glass roof, a fine light edge, white
 * headlamps with a short beam, a thin red taillight. No logos, no plate.
 * Same drawing language as the header progress car.
 */
export function JourneyCar() {
  return (
    <svg viewBox="0 -34 40 116" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="jc-beam" cx="0.5" cy="1" r="0.9">
          <stop offset="0" stopColor="#f2f6ff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#f2f6ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="jc-paint" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#10295a" />
          <stop offset="0.5" stopColor="#2b5bb0" />
          <stop offset="1" stopColor="#10295a" />
        </linearGradient>
      </defs>
      {/* Headlight beam on the road */}
      <path d="M8 2 L-4 -34 H44 L32 2 Z" fill="url(#jc-beam)" />
      {/* Mirrors */}
      <rect x="-1" y="24" width="5" height="4" rx="1.5" fill="#06090d" />
      <rect x="36" y="24" width="5" height="4" rx="1.5" fill="#06090d" />
      {/* Body */}
      <rect x="2" y="1" width="36" height="78" rx="11" fill="url(#jc-paint)" stroke="rgb(255 255 255 / 0.28)" strokeWidth="0.8" />
      {/* Glass roof */}
      <rect x="7" y="22" width="26" height="44" rx="7" fill="#04070c" />
      {/* Roof rails */}
      <path d="M10.5 30 V58 M29.5 30 V58" stroke="rgb(255 255 255 / 0.22)" strokeWidth="0.8" strokeLinecap="round" />
      {/* Headlamps */}
      <rect x="5" y="2.2" width="8" height="2.4" rx="1" fill="#f2f8ff" />
      <rect x="27" y="2.2" width="8" height="2.4" rx="1" fill="#f2f8ff" />
      {/* Taillight */}
      <rect x="6" y="75.6" width="28" height="2" rx="1" fill="#ff3236" />
    </svg>
  );
}

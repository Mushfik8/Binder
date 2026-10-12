export function HaikeiWavesBottom({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 400V280C120 260 240 240 360 245C480 250 600 280 720 290C840 300 960 290 1080 270C1200 250 1320 220 1380 205L1440 190V400H0Z"
        fill="#1A1412"
        fillOpacity="0.8"
      />
      <path
        d="M0 400V310C120 295 240 280 360 282C480 284 600 303 720 312C840 321 960 320 1080 308C1200 296 1320 273 1380 262L1440 250V400H0Z"
        fill="#2A1F18"
        fillOpacity="0.6"
      />
      <path
        d="M0 400V340C120 330 240 320 360 324C480 328 600 346 720 352C840 358 960 352 1080 342C1200 332 1320 318 1380 311L1440 304V400H0Z"
        fill="#3D2A1A"
        fillOpacity="0.4"
      />
      <path
        d="M0 400V365C120 358 240 352 360 356C480 360 600 374 720 378C840 382 960 376 1080 368C1200 360 1320 350 1380 345L1440 340V400H0Z"
        fill="#E8622C"
        fillOpacity="0.08"
      />
    </svg>
  );
}

export function HaikeiWavesTop({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 0V80C120 100 240 120 360 118C480 116 600 92 720 82C840 72 960 76 1080 88C1200 100 1320 120 1380 130L1440 140V0H0Z"
        fill="#1A1412"
        fillOpacity="0.6"
      />
      <path
        d="M0 0V50C120 65 240 80 360 78C480 76 600 57 720 50C840 43 960 48 1080 58C1200 68 1320 83 1380 90L1440 98V0H0Z"
        fill="#2A1F18"
        fillOpacity="0.4"
      />
      <path
        d="M0 0V25C120 35 240 45 360 44C480 43 600 31 720 27C840 23 960 27 1080 34C1200 41 1320 51 1380 56L1440 60V0H0Z"
        fill="#E8622C"
        fillOpacity="0.05"
      />
    </svg>
  );
}

export function HaikeiBlurryGradient({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="blur-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="80" />
        </filter>
      </defs>
      <rect width="800" height="600" fill="#0F0E0D" />
      <g filter="url(#blur-filter)">
        <circle cx="200" cy="200" r="200" fill="#1A1412" fillOpacity="0.8" />
        <circle cx="600" cy="400" r="250" fill="#2A1F18" fillOpacity="0.6" />
        <circle cx="400" cy="150" r="150" fill="#E8622C" fillOpacity="0.08" />
        <circle cx="650" cy="150" r="120" fill="#8B6914" fillOpacity="0.1" />
      </g>
    </svg>
  );
}

export function BinderLogo({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Binder logo"
      role="img"
    >
      {/* Ember/flame shape */}
      <path
        d="M24 4C24 4 18 14 18 22C18 26.4183 20.6863 30 24 30C27.3137 30 30 26.4183 30 22C30 14 24 4 24 4Z"
        fill="url(#ember-gradient)"
      />
      {/* Smoke wisps */}
      <path
        d="M20 30C20 30 18 34 19 38C20 42 22 44 24 44"
        stroke="#7A7068"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M28 30C28 30 30 33 29 37C28 41 26 43 24 44"
        stroke="#7A7068"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* Inner glow */}
      <ellipse cx="24" cy="20" rx="3" ry="5" fill="#F2D9A9" fillOpacity="0.4" />
      <defs>
        <linearGradient id="ember-gradient" x1="24" y1="4" x2="24" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F07840" />
          <stop offset="0.5" stopColor="#E8622C" />
          <stop offset="1" stopColor="#8B6914" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function BinderWordmark({ className }: { className?: string }) {
  return (
    <span className={`font-heading font-bold tracking-tight ${className || ''}`} style={{ fontFamily: 'var(--font-heading)' }}>
      Binder
    </span>
  );
}

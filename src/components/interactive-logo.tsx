'use client';

export default function InteractiveLogo() {
  return (
    <div className="group w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center cursor-pointer">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Outer Ring - Spins on hover */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeDasharray="10 10"
          className="transition-transform duration-1000 ease-linear group-hover:rotate-[360deg] origin-center"
        />
        {/* Middle Ring - Spins opposite direction */}
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="1.5"
          strokeDasharray="5 15"
          strokeLinecap="round"
          className="transition-transform duration-1000 ease-linear group-hover:-rotate-[360deg] origin-center"
        />
        {/* Inner Ring Glow */}
        <circle
          cx="100"
          cy="100"
          r="50"
          fill="hsl(var(--primary) / 0.1)"
          className="transition-all duration-300 group-hover:fill-hsl(var(--primary)/0.2)"
        />
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="50"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          className="group-hover:animate-pulse"
          filter="url(#glow)"
        />
      </svg>
      {/* Text in the center */}
      <div className="absolute text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white leading-none">AOS</h1>
        <p className="text-lg md:text-xl font-bold text-primary text-glow-gold tracking-tighter">New Year</p>
      </div>
    </div>
  );
}

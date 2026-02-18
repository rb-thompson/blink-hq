'use client';

export default function Header() {
  return (
    <div className="text-center py-4 relative z-10">
      <h1
        className="pixel-text tracking-widest animate-flicker"
        style={{
          fontSize: '18px',
          color: '#00f0ff',
          textShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff40, 0 0 40px #00f0ff20',
        }}
      >
        ⚡ BLINK HQ ⚡
      </h1>
      <div
        className="pixel-text mt-1"
        style={{
          fontSize: '8px',
          color: '#6a6a8a',
          letterSpacing: '0.3em',
        }}
      >
        AGENT OPERATIONS VISUALIZER // SPACE STATION CONTROL
      </div>
      {/* Decorative line */}
      <div className="flex items-center justify-center gap-2 mt-2">
        <div className="h-[1px] w-20" style={{ background: 'linear-gradient(90deg, transparent, #00f0ff40, transparent)' }} />
        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#00f0ff', boxShadow: '0 0 4px #00f0ff' }} />
        <div className="h-[1px] w-20" style={{ background: 'linear-gradient(90deg, transparent, #00f0ff40, transparent)' }} />
      </div>
    </div>
  );
}

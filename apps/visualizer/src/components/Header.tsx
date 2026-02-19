'use client';

export default function Header() {
  return (
    <div className="text-center py-4 relative z-10">
      <h1
        className="pixel-text tracking-widest"
        style={{
          fontSize: '16px',
          color: '#e0e0f0',
          letterSpacing: '0.4em',
        }}
      >
        BLINK HQ
      </h1>
      <div
        className="pixel-text mt-1"
        style={{
          fontSize: '7px',
          color: '#6a6a8a',
          letterSpacing: '0.2em',
        }}
      >
        AGENT OPERATIONS VISUALIZER
      </div>
      <div className="flex items-center justify-center gap-2 mt-2">
        <div className="h-[1px] w-16" style={{ background: 'linear-gradient(90deg, transparent, #00f0ff30, transparent)' }} />
        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#00f0ff', opacity: 0.5 }} />
        <div className="h-[1px] w-16" style={{ background: 'linear-gradient(90deg, transparent, #00f0ff30, transparent)' }} />
      </div>
    </div>
  );
}

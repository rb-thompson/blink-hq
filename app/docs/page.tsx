'use client';

import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0e1a] to-[#131629] text-center">
      <div className="mb-8">
        <div className="pixel-text glow-cyan mb-4" style={{ fontSize: '32px', letterSpacing: '0.1em' }}>
          📚 DOCS
        </div>
        <div className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-[#00f0ff40]" 
             style={{ background: 'radial-gradient(circle, #00f0ff20 0%, #131629 70%)' }}>
          <div className="pixel-text glow-yellow absolute inset-0 flex items-center justify-center m-auto w-full h-full" 
               style={{ fontSize: '48px' }}>🚧</div>
        </div>
        <div className="max-w-lg mx-auto">
          <h1 className="pixel-text glow-yellow mb-6" style={{ fontSize: '18px' }}>COMING SOON — FEATURE IN PROGRESS</h1>
          <p className="pixel-text mb-8" style={{ fontSize: '11px', lineHeight: '1.4', color: '#e0e0f0' }}>
            OpenClaw skills + docs. Browse agent capabilities, API references, tutorials.
          </p>
        </div>
      </div>
      <Link 
        href="/" 
        className="pixel-text inline-block glow-cyan px-8 py-3 border-2 rounded-lg transition-all hover:scale-105"
        style={{ 
          fontSize: '12px', 
          borderColor: '#00f0ff', 
          backgroundColor: '#00f0ff10',
          boxShadow: '0 0 12px #00f0ff30'
        }}
      >
        ← BACK TO DASHBOARD
      </Link>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  char: string;
}

const DATA_BITS = ['0', '1', '·', '░', '▒', '▓', '█', '◊', '○', '◦'];
const COLORS = ['#00f0ff', '#ff00aa', '#00ff88', '#ffaa00'];

export default function AmbientParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const pts: Particle[] = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 6 + Math.random() * 4,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      char: DATA_BITS[Math.floor(Math.random() * DATA_BITS.length)],
    }));
    setParticles(pts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute pixel-text"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            opacity: 0.15,
            animation: `float-particle ${p.duration}s ${p.delay}s infinite`,
          }}
        >
          {p.char}
        </div>
      ))}
    </div>
  );
}

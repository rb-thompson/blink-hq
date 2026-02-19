'use client';

import { useEffect, useState } from 'react';

// 8-bit adventure character style avatars with animation
const AVATAR_SIZE = 48;

function AnimatedAvatar({ character, size = AVATAR_SIZE }: { character: keyof typeof CHARACTER_DATA; size?: number }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % CHARACTER_DATA[character].frames.length);
    }, 300);
    return () => clearInterval(interval);
  }, [character]);

  const data = CHARACTER_DATA[character];
  const currentFrame = data.frames[frame];

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Shadow */}
      <ellipse cx="24" cy="44" rx="16" ry="2" fill="#000" opacity="0.3" />

      {/* Character body */}
      <rect x="18" y="20" width="12" height="16" rx="2" fill={data.colors.body} />
      <rect x="16" y="16" width="16" height="12" rx="4" fill={data.colors.head} />

      {/* Eyes */}
      <rect x="20" y="20" width="3" height="3" fill="#000" />
      <rect x="25" y="20" width="3" height="3" fill="#000" />

      {/* Mouth */}
      <rect x="22" y="25" width="4" height="2" fill="#000" />

      {/* Arms */}
      <rect x="14" y="22" width="6" height="4" rx="2" fill={data.colors.body} />
      <rect x="28" y="22" width="6" height="4" rx="2" fill={data.colors.body} />

      {/* Legs */}
      <rect x="19" y="36" width="4" height="8" rx="2" fill={data.colors.body} />
      <rect x="25" y="36" width="4" height="8" rx="2" fill={data.colors.body} />

      {/* Special features */}
      {data.special && data.special(frame)}

      {/* Animation effect */}
      {currentFrame === 1 && (
        <circle cx="24" cy="12" r="2" fill={data.colors.accent} opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="0.3s" repeatCount="1" />
        </circle>
      )}
    </svg>
  );
}

const CHARACTER_DATA = {
  Blink: {
    colors: { head: '#e0e0e0', body: '#00f0ff', accent: '#ffffff' },
    frames: [0, 1, 0, 1],
    special: (frame: number) => (
      <>
        {/* Lightning bolt antenna */}
        <path d="M24 8 L26 12 L22 12 L24 16" stroke="#ffff00" strokeWidth="2" fill="none" opacity={frame % 2 ? 1 : 0.5} />
        {/* Glowing aura */}
        {frame % 2 === 0 && (
          <circle cx="24" cy="24" r="20" stroke="#00f0ff" strokeWidth="1" fill="none" opacity="0.3">
            <animate attributeName="r" values="20;22;20" dur="0.6s" repeatCount="indefinite" />
          </circle>
        )}
      </>
    ),
  },

  Spark: {
    colors: { head: '#ffaa00', body: '#ff6600', accent: '#ffff00' },
    frames: [0, 1, 0, 1],
    special: (frame: number) => (
      <>
        {/* Flame hair */}
        <path d="M20 12 Q24 8 28 12 Q24 6 20 12" fill="#ff4400" opacity={0.8} />
        <path d="M22 10 Q24 6 26 10 Q24 4 22 10" fill="#ffff00" opacity={0.9} />
        {/* Spark particles */}
        {frame % 2 === 1 && (
          <>
            <circle cx="14" cy="18" r="1" fill="#ffff00" />
            <circle cx="34" cy="22" r="1" fill="#ffff00" />
            <circle cx="16" cy="32" r="1" fill="#ffaa00" />
          </>
        )}
      </>
    ),
  },

  Volt: {
    colors: { head: '#aaaaff', body: '#6666ff', accent: '#ffffff' },
    frames: [0, 1, 0, 1],
    special: (frame: number) => (
      <>
        {/* Brain dome */}
        <ellipse cx="24" cy="12" rx="8" ry="6" fill="#ffffff" opacity="0.7" />
        <path d="M18 12 Q20 10 22 12 Q24 8 26 12 Q28 10 30 12" stroke="#6666ff" strokeWidth="1" fill="none" />
        {/* Thinking bubbles */}
        {frame % 2 === 1 && (
          <>
            <circle cx="32" cy="8" r="2" fill="#ffffff" opacity="0.8" />
            <circle cx="36" cy="6" r="1.5" fill="#ffffff" opacity="0.6" />
            <text x="35" y="7" fontSize="6" fill="#6666ff" opacity="0.8">?</text>
          </>
        )}
      </>
    ),
  },

  Pixel: {
    colors: { head: '#ff88aa', body: '#ff4488', accent: '#ffffff' },
    frames: [0, 1, 0, 1],
    special: (frame: number) => (
      <>
        {/* Paint brush arm */}
        <rect x="30" y="20" width="8" height="2" fill="#8B4513" />
        <rect x="36" y="16" width="2" height="8" fill="#8B4513" />
        <circle cx="37" cy="15" r="2" fill="#ff4488" />
        {/* Color palette */}
        <rect x="12" y="8" width="4" height="4" fill="#ff0000" />
        <rect x="16" y="8" width="4" height="4" fill="#00ff00" />
        <rect x="12" y="12" width="4" height="4" fill="#0000ff" />
        <rect x="16" y="12" width="4" height="4" fill="#ffff00" />
      </>
    ),
  },

  Scout: {
    colors: { head: '#88aaff', body: '#4488ff', accent: '#ffffff' },
    frames: [0, 1, 0, 1],
    special: (frame: number) => (
      <>
        {/* Radar dish */}
        <ellipse cx="32" cy="10" rx="4" ry="3" fill="#cccccc" />
        <ellipse cx="32" cy="10" rx="3" ry="2" fill="#888888" />
        <rect x="30" y="8" width="4" height="2" fill="#666666" />
        {/* Scanning lines */}
        {frame % 2 === 1 && (
          <path d="M28 10 L36 10" stroke="#00ff00" strokeWidth="1" opacity="0.8" />
        )}
        {/* Binoculars */}
        <rect x="18" y="18" width="6" height="4" rx="1" fill="#000" />
        <rect x="24" y="18" width="6" height="4" rx="1" fill="#000" />
        <line x1="21" y1="20" x2="27" y2="20" stroke="#00ff00" strokeWidth="1" />
      </>
    ),
  },

  Echo: {
    colors: { head: '#88ffaa', body: '#44ff88', accent: '#ffffff' },
    frames: [0, 1, 0, 1],
    special: (frame: number) => (
      <>
        {/* Clipboard body */}
        <rect x="14" y="14" width="20" height="24" rx="2" fill="#f0f0f0" />
        <rect x="16" y="16" width="16" height="20" rx="1" fill="#ffffff" />
        {/* Checkmarks */}
        <path d="M18 24 L22 28 L30 20" stroke="#44ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 30 L22 34 L26 30" stroke="#44ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Floating checkmarks */}
        {frame % 2 === 1 && (
          <>
            <path d="M8 12 L12 16 L16 12" stroke="#44ff88" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            <path d="M36 16 L40 20 L44 16" stroke="#44ff88" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
          </>
        )}
      </>
    ),
  },

  Cipher: {
    colors: { head: '#ffaa88', body: '#ff8844', accent: '#ffffff' },
    frames: [0, 1, 0, 1],
    special: (frame: number) => (
      <>
        {/* Lock head */}
        <rect x="18" y="10" width="12" height="10" rx="1" fill="#cccccc" />
        <rect x="21" y="6" width="6" height="4" fill="#cccccc" />
        <circle cx="24" cy="16" r="2" fill="#000" />
        <rect x="23" y="16" width="2" height="3" fill="#000" />
        {/* Data streams */}
        <rect x="12" y="22" width="2" height="4" fill="#ff8844" opacity="0.8" />
        <rect x="14" y="26" width="4" height="2" fill="#ff8844" opacity="0.6" />
        <rect x="30" y="24" width="3" height="2" fill="#ff8844" opacity="0.7" />
        <rect x="32" y="28" width="2" height="3" fill="#ff8844" opacity="0.5" />
      </>
    ),
  },

  Atlas: {
    colors: { head: '#aa88ff', body: '#8844ff', accent: '#ffffff' },
    frames: [0, 1, 0, 1],
    special: (frame: number) => (
      <>
        {/* Globe head */}
        <circle cx="24" cy="14" rx="8" ry="6" fill="#4a90e2" />
        <path d="M16 14 Q24 8 32 14 Q24 20 16 14" fill="#2e7d32" opacity="0.6" />
        <circle cx="24" cy="14" r="8" stroke="#000" strokeWidth="1" fill="none" opacity="0.3" />
        <line x1="24" y1="6" x2="24" y2="22" stroke="#000" strokeWidth="1" opacity="0.3" />
        {/* Wide body with stacks */}
        <rect x="12" y="24" width="24" height="12" rx="2" fill="#8844ff" />
        <rect x="14" y="26" width="6" height="8" fill="#666666" />
        <rect x="20" y="26" width="6" height="8" fill="#666666" />
        <rect x="26" y="26" width="6" height="8" fill="#666666" />
      </>
    ),
  },

  // Additional cinema-ready avatars
  Rogue: {
    colors: { head: '#ff6666', body: '#cc3333', accent: '#ffffff' },
    frames: [0, 1, 0, 1],
    special: (frame: number) => (
      <>
        <rect x="14" y="18" width="4" height="4" fill="#000" opacity="0.8" />
        <rect x="30" y="18" width="4" height="4" fill="#000" opacity="0.8" />
        <rect x="18" y="22" width="12" height="2" fill="#000" />
        <rect x="16" y="24" width="16" height="2" fill="#000" />
        {frame % 2 === 1 && <circle cx="10" cy="16" r="1" fill="#ff6666" opacity="0.8" />}
      </>
    ),
  },

  Sage: {
    colors: { head: '#66ffaa', body: '#33cc88', accent: '#ffffff' },
    frames: [0, 1, 0, 1],
    special: (frame: number) => (
      <>
        <path d="M16 8 Q24 4 32 8 Q28 12 24 10 Q20 12 16 8" fill="#ffff88" opacity="0.8" />
        <circle cx="20" cy="22" r="2" fill="#000" />
        <circle cx="28" cy="22" r="2" fill="#000" />
        <rect x="22" y="26" width="4" height="2" fill="#000" />
        {frame % 2 === 1 && <text x="36" y="12" fontSize="6" fill="#66ffaa" opacity="0.8">Ω</text>}
      </>
    ),
  },

  Titan: {
    colors: { head: '#ffaa66', body: '#cc8844', accent: '#ffffff' },
    frames: [0, 1, 0, 1],
    special: (frame: number) => (
      <>
        <rect x="16" y="12" width="16" height="12" rx="2" fill="#ffaa66" />
        <rect x="18" y="14" width="12" height="8" fill="#000" opacity="0.8" />
        <circle cx="20" cy="20" r="1" fill="#ffaa66" />
        <circle cx="28" cy="20" r="1" fill="#ffaa66" />
        <rect x="22" y="24" width="4" height="2" fill="#ffaa66" />
        {frame % 2 === 1 && <path d="M12 16 L16 20 L12 24" stroke="#ffaa66" strokeWidth="1" fill="none" />}
      </>
    ),
  },

  Nova: {
    colors: { head: '#ff66ff', body: '#cc33cc', accent: '#ffffff' },
    frames: [0, 1, 0, 1],
    special: (frame: number) => (
      <>
        <circle cx="24" cy="12" r="6" fill="#ff66ff" opacity="0.6" />
        <circle cx="24" cy="12" r="4" fill="#ffffff" opacity="0.8" />
        <rect x="20" y="20" width="3" height="3" fill="#000" />
        <rect x="25" y="20" width="3" height="3" fill="#000" />
        <rect x="22" y="25" width="4" height="2" fill="#000" />
        {frame % 2 === 1 && (
          <>
            <circle cx="16" cy="14" r="1" fill="#ff66ff" opacity="0.8" />
            <circle cx="32" cy="10" r="1" fill="#ff66ff" opacity="0.8" />
          </>
        )}
      </>
    ),
  },

  Warden: {
    colors: { head: '#6666ff', body: '#3333cc', accent: '#ffffff' },
    frames: [0, 1, 0, 1],
    special: (frame: number) => (
      <>
        <rect x="18" y="10" width="12" height="12" rx="1" fill="#cccccc" />
        <rect x="21" y="6" width="6" height="4" fill="#cccccc" />
        <circle cx="24" cy="18" r="2" fill="#000" />
        <rect x="23" y="18" width="2" height="3" fill="#000" />
        <rect x="16" y="24" width="16" height="12" rx="2" fill="#3333cc" />
        <rect x="18" y="26" width="4" height="8" fill="#6666ff" />
        <rect x="22" y="26" width="4" height="8" fill="#6666ff" />
        <rect x="26" y="26" width="4" height="8" fill="#6666ff" />
      </>
    ),
  },
};

export function CinemaAvatar({ name, size = AVATAR_SIZE }: { name: string; size?: number }) {
  const characterKey = name as keyof typeof CHARACTER_DATA;
  if (!CHARACTER_DATA[characterKey]) return null;

  return <AnimatedAvatar character={characterKey} size={size} />;
}

// Export all character names for use
export const CINEMA_CHARACTERS = Object.keys(CHARACTER_DATA);
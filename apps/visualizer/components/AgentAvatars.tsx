'use client';

import { AGENT_COLORS } from './palette';

// Original pixel-art style agent avatars
function PixelAgent({ name, color, size = 48, isActive = false }: { name: string; color: string; size?: number; isActive?: boolean }) {
  const scale = size / 48;
  const opacity = isActive ? 1 : 0.7;

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
        imageRendering: 'pixelated',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {/* Shadow */}
        <ellipse cx="24" cy="44" rx="16" ry="2" fill="#000" opacity="0.3" />

        {/* Body - pixelated */}
        <rect x="16" y="24" width="16" height="16" fill={color} opacity={opacity} />
        <rect x="14" y="20" width="20" height="12" fill={color} opacity={opacity} />

        {/* Agent-specific pixel features */}
        {name === 'Blink' && (
          <>
            {/* Lightning bolt antenna */}
            <rect x="22" y="8" width="4" height="8" fill="#ffff00" opacity={0.9} />
            <rect x="20" y="14" width="2" height="2" fill="#000" />
            <rect x="26" y="14" width="2" height="2" fill="#000" />
          </>
        )}

        {name === 'Spark' && (
          <>
            {/* Flame on head */}
            <rect x="18" y="10" width="12" height="8" fill="#ff6600" opacity={0.8} />
            <rect x="20" y="12" width="8" height="4" fill="#ffff00" opacity={0.9} />
            <rect x="20" y="16" width="2" height="2" fill="#000" />
            <rect x="26" y="16" width="2" height="2" fill="#000" />
          </>
        )}

        {name === 'Volt' && (
          <>
            {/* Circuit pattern */}
            <rect x="16" y="12" width="16" height="8" fill="#aaaaff" opacity={0.8} />
            <rect x="18" y="14" width="2" height="2" fill="#6666ff" />
            <rect x="22" y="14" width="2" height="2" fill="#6666ff" />
            <rect x="26" y="14" width="2" height="2" fill="#6666ff" />
            <rect x="20" y="16" width="2" height="2" fill="#000" />
            <rect x="26" y="16" width="2" height="2" fill="#000" />
          </>
        )}

        {name === 'Pixel' && (
          <>
            {/* Paint brush */}
            <rect x="30" y="22" width="6" height="2" fill="#8B4513" />
            <rect x="34" y="18" width="2" height="8" fill="#8B4513" />
            <rect x="20" y="16" width="2" height="2" fill="#000" />
            <rect x="26" y="16" width="2" height="2" fill="#000" />
            {/* Color squares */}
            <rect x="14" y="10" width="4" height="4" fill="#ff0000" />
            <rect x="18" y="10" width="4" height="4" fill="#00ff00" />
            <rect x="14" y="14" width="4" height="4" fill="#0000ff" />
            <rect x="18" y="14" width="4" height="4" fill="#ffff00" />
          </>
        )}

        {name === 'Scout' && (
          <>
            {/* Radar dish */}
            <rect x="20" y="8" width="8" height="6" fill="#cccccc" />
            <rect x="22" y="12" width="4" height="2" fill="#666666" />
            <rect x="20" y="16" width="2" height="2" fill="#000" />
            <rect x="26" y="16" width="2" height="2" fill="#000" />
          </>
        )}

        {name === 'Echo' && (
          <>
            {/* Sound waves */}
            <rect x="14" y="12" width="20" height="8" fill="#44ff88" opacity={0.8} />
            <rect x="16" y="14" width="2" height="2" fill="#000" />
            <rect x="26" y="14" width="2" height="2" fill="#000" />
            {/* Checkmarks */}
            <rect x="18" y="18" width="4" height="2" fill="#00ff88" />
            <rect x="24" y="18" width="4" height="2" fill="#00ff88" />
          </>
        )}

        {name === 'Cipher' && (
          <>
            {/* Lock */}
            <rect x="18" y="10" width="12" height="10" fill="#cccccc" />
            <rect x="21" y="6" width="6" height="4" fill="#cccccc" />
            <circle cx="24" cy="16" r="1" fill="#000" />
            <rect x="20" y="18" width="2" height="2" fill="#000" />
            <rect x="26" y="18" width="2" height="2" fill="#000" />
          </>
        )}

        {name === 'Atlas' && (
          <>
            {/* Globe */}
            <circle cx="24" cy="14" r="8" fill="#4a90e2" opacity={0.8} />
            <rect x="20" y="12" width="8" height="4" fill="#2e7d32" opacity={0.6} />
            <rect x="20" y="16" width="2" height="2" fill="#000" />
            <rect x="26" y="16" width="2" height="2" fill="#000" />
          </>
        )}

        {/* Arms and legs - pixelated */}
        <rect x="12" y="26" width="6" height="3" fill={color} opacity={opacity * 0.8} />
        <rect x="30" y="26" width="6" height="3" fill={color} opacity={opacity * 0.8} />
        <rect x="19" y="40" width="4" height="4" fill={color} opacity={opacity * 0.6} />
        <rect x="25" y="40" width="4" height="4" fill={color} opacity={opacity * 0.6} />
      </svg>
    </div>
  );
}

export function AgentAvatar({ name, size = 48, isActive = false }: { name: string; size?: number; isActive?: boolean }) {
  const color = AGENT_COLORS[name] || '#00f0ff';
  return <PixelAgent name={name} color={color} size={size} isActive={isActive} />;
}

// Work activity visualizations remain the same
export function WorkVisualization({ workType, agentColor }: { workType: string; agentColor: string }) {
  const size = 80;

  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {workType === 'code' && (
        <>
          {/* Code brackets */}
          <path d="M20 25 L15 30 L20 35" stroke={agentColor} strokeWidth="2" fill="none" />
          <path d="M60 25 L65 30 L60 35" stroke={agentColor} strokeWidth="2" fill="none" />
          <rect x="25" y="28" width="30" height="2" fill={agentColor} opacity="0.8" />
          <rect x="25" y="32" width="20" height="2" fill={agentColor} opacity="0.6" />
          <rect x="25" y="36" width="25" height="2" fill={agentColor} opacity="0.4" />
        </>
      )}

      {workType === 'research' && (
        <>
          {/* Magnifying glass */}
          <circle cx="35" cy="35" r="15" stroke={agentColor} strokeWidth="2" fill="none" />
          <circle cx="35" cy="35" r="8" fill={agentColor} opacity="0.1" />
          <path d="M45 45 L55 55" stroke={agentColor} strokeWidth="3" strokeLinecap="round" />
          {/* Search lines */}
          <rect x="15" y="20" width="15" height="1" fill={agentColor} opacity="0.6" />
          <rect x="15" y="25" width="10" height="1" fill={agentColor} opacity="0.4" />
          <rect x="50" y="45" width="12" height="1" fill={agentColor} opacity="0.5" />
        </>
      )}

      {workType === 'analysis' && (
        <>
          {/* Circuit board */}
          <rect x="15" y="15" width="50" height="50" rx="3" stroke={agentColor} strokeWidth="2" fill="none" />
          <circle cx="25" cy="25" r="3" fill={agentColor} opacity="0.8" />
          <circle cx="40" cy="25" r="3" fill={agentColor} opacity="0.8" />
          <circle cx="55" cy="40" r="3" fill={agentColor} opacity="0.8" />
          <path d="M28 25 L37 25 M43 25 L52 40" stroke={agentColor} strokeWidth="2" />
          <path d="M25 28 L25 37 M40 28 L40 37" stroke={agentColor} strokeWidth="1" opacity="0.6" />
        </>
      )}

      {workType === 'creative' && (
        <>
          {/* Palette */}
          <circle cx="40" cy="40" r="20" fill={agentColor} opacity="0.2" />
          <circle cx="30" cy="35" r="4" fill="#ff0000" />
          <circle cx="45" cy="30" r="4" fill="#00ff00" />
          <circle cx="35" cy="50" r="4" fill="#0000ff" />
          <circle cx="50" cy="45" r="4" fill="#ffff00" />
          <circle cx="25" cy="45" r="4" fill="#ff00ff" />
          {/* Brush strokes */}
          <path d="M15 20 Q25 15 35 20" stroke={agentColor} strokeWidth="3" fill="none" />
          <path d="M50 55 Q60 50 70 55" stroke={agentColor} strokeWidth="3" fill="none" />
        </>
      )}

      {workType === 'review' && (
        <>
          {/* Checkmarks */}
          <path d="M20 30 L30 40 L45 20" stroke="#00ff88" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 35 L60 45 L75 25" stroke="#00ff88" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Document lines */}
          <rect x="15" y="15" width="20" height="25" rx="2" stroke={agentColor} strokeWidth="1" fill="none" />
          <rect x="18" y="20" width="14" height="1" fill={agentColor} opacity="0.6" />
          <rect x="18" y="23" width="10" height="1" fill={agentColor} opacity="0.4" />
          <rect x="18" y="26" width="12" height="1" fill={agentColor} opacity="0.5" />
        </>
      )}

      {workType === 'data' && (
        <>
          {/* Data streams */}
          <rect x="20" y="20" width="4" height="15" fill={agentColor} opacity="0.8" />
          <rect x="26" y="15" width="4" height="20" fill={agentColor} opacity="0.6" />
          <rect x="32" y="25" width="4" height="10" fill={agentColor} opacity="0.7" />
          <rect x="38" y="20" width="4" height="18" fill={agentColor} opacity="0.5" />
          <rect x="44" y="30" width="4" height="12" fill={agentColor} opacity="0.9" />
          {/* Flowing particles */}
          <circle cx="22" cy="18" r="1" fill={agentColor} opacity="0.8" />
          <circle cx="28" cy="12" r="1" fill={agentColor} opacity="0.6" />
          <circle cx="46" cy="28" r="1" fill={agentColor} opacity="0.7" />
        </>
      )}

      {workType === 'command' && (
        <>
          {/* Command terminal */}
          <rect x="15" y="15" width="50" height="50" rx="3" stroke={agentColor} strokeWidth="2" fill="none" />
          <rect x="20" y="25" width="40" height="3" fill={agentColor} opacity="0.6" />
          <rect x="20" y="32" width="30" height="3" fill={agentColor} opacity="0.4" />
          <rect x="20" y="39" width="35" height="3" fill={agentColor} opacity="0.5" />
          <rect x="20" y="46" width="20" height="3" fill={agentColor} opacity="0.7" />
          {/* Cursor */}
          <rect x="42" y="46" width="2" height="3" fill={agentColor} opacity="0.9" />
        </>
      )}
    </svg>
  );
}

// SVG icons for roles (16x16)
export const RoleIcons = {
  Commander: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 16, height: 16 }}>
      <path d="M8 2l6 6H2z" />
      <circle cx="8" cy="10" r="2" />
    </svg>
  ),
  Coder: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 16, height: 16 }}>
      <path d="M2 4l-1 1v6l1 1h12l1-1V5l-1-1H2zM3 6h10v4H3V6z" />
    </svg>
  ),
  Reasoner: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 16, height: 16 }}>
      <circle cx="8" cy="5" r="3" fill="none" stroke="currentColor" />
      <path d="M5 13c0-2 1.5-3 3-3s3 1 3 3" fill="none" stroke="currentColor" />
    </svg>
  ),
  Creative: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 16, height: 16 }}>
      <circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" />
      <circle cx="8" cy="8" r="2" />
    </svg>
  ),
  Researcher: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 16, height: 16 }}>
      <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" />
      <path d="M11 11l4 4" stroke="currentColor" strokeLinecap="round" />
    </svg>
  ),
  Reviewer: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 16, height: 16 }}>
      <path d="M3 8l4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  Data: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 16, height: 16 }}>
      <ellipse cx="8" cy="4" rx="5" ry="2" fill="none" stroke="currentColor" />
      <path d="M3 4v8c0 1 2 2 5 2s5-1 5-2V4" fill="none" stroke="currentColor" />
    </svg>
  ),
  LongContext: () => (
    <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 16, height: 16 }}>
      <rect x="3" y="3" width="10" height="10" rx="1" fill="none" stroke="currentColor" />
      <rect x="5" y="5" width="6" height="6" fill="currentColor" opacity="0.3" />
    </svg>
  ),
};
'use client';

import { AGENT_COLORS } from './palette';

// Clean vector-style agent avatars - focus on form and personality
function VectorAgent({ name, color, size = 48, isActive = false }: { name: string; color: string; size?: number; isActive?: boolean }) {
  const opacity = isActive ? 1 : 0.7;
  const glow = isActive ? `0 0 8px ${color}40` : 'none';

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: `drop-shadow(${glow})` }}>
      {/* Body - clean geometric shape */}
      <rect
        x="14"
        y="24"
        width="20"
        height="20"
        rx="4"
        fill={color}
        opacity={opacity}
        stroke={color}
        strokeWidth="1"
      />

      {/* Head - distinctive shape per agent */}
      <circle cx="24" cy="16" r="10" fill={color} opacity={opacity} stroke={color} strokeWidth="1" />

      {/* Agent-specific features */}
      {name === 'Blink' && (
        <>
          {/* Lightning bolt antenna */}
          <path d="M24 6 L26 10 L22 10 L24 14" stroke={color} strokeWidth="2" fill="none" opacity={0.9} />
          {/* Eyes - sharp */}
          <rect x="20" y="14" width="2" height="2" fill="#000" />
          <rect x="26" y="14" width="2" height="2" fill="#000" />
        </>
      )}

      {name === 'Spark' && (
        <>
          {/* Flame pattern on head */}
          <path d="M20 8 Q24 4 28 8 Q26 12 24 10 Q22 12 20 8" fill="#ffaa00" opacity={0.8} />
          {/* Eyes - energetic */}
          <circle cx="21" cy="15" r="1.5" fill="#000" />
          <circle cx="27" cy="15" r="1.5" fill="#000" />
        </>
      )}

      {name === 'Volt' && (
        <>
          {/* Circuit pattern on head */}
          <path d="M18 12 L22 12 L22 16 L26 16 L26 12 L30 12" stroke={color} strokeWidth="1" fill="none" opacity={0.6} />
          {/* Eyes - thoughtful */}
          <ellipse cx="21" cy="15" rx="1.5" ry="2" fill="#000" />
          <ellipse cx="27" cy="15" rx="1.5" ry="2" fill="#000" />
        </>
      )}

      {name === 'Pixel' && (
        <>
          {/* Paint brush arm */}
          <rect x="32" y="26" width="6" height="2" fill="#8B4513" />
          <rect x="36" y="22" width="2" height="8" fill="#8B4513" />
          {/* Eyes - creative */}
          <path d="M20 14 Q22 12 24 14 Q26 12 28 14" stroke="#000" strokeWidth="1" fill="none" />
        </>
      )}

      {name === 'Scout' && (
        <>
          {/* Radar dish */}
          <ellipse cx="32" cy="10" rx="4" ry="3" fill="#cccccc" />
          <ellipse cx="32" cy="10" rx="3" ry="2" fill="#888888" />
          {/* Eyes - alert */}
          <polygon points="20,14 22,12 24,14 22,16" fill="#000" />
          <polygon points="26,14 28,12 30,14 28,16" fill="#000" />
        </>
      )}

      {name === 'Echo' && (
        <>
          {/* Sound waves */}
          <path d="M16 16 Q18 14 20 16 Q18 18 16 16" stroke={color} strokeWidth="1" fill="none" opacity={0.7} />
          <path d="M28 16 Q30 14 32 16 Q30 18 28 16" stroke={color} strokeWidth="1" fill="none" opacity={0.7} />
          {/* Eyes - focused */}
          <rect x="20" y="14" width="3" height="3" fill="#000" rx="1" />
          <rect x="25" y="14" width="3" height="3" fill="#000" rx="1" />
        </>
      )}

      {name === 'Cipher' && (
        <>
          {/* Lock symbol */}
          <rect x="20" y="10" width="8" height="6" rx="1" fill="#cccccc" />
          <circle cx="24" cy="16" r="1.5" fill="#000" />
          <rect x="23" y="16" width="2" height="2" fill="#000" />
          {/* Eyes - calculating */}
          <path d="M20 14 L24 14 M24 14 L24 18" stroke="#000" strokeWidth="1" />
          <path d="M26 14 L30 14 M26 16 L30 16" stroke="#000" strokeWidth="1" />
        </>
      )}

      {name === 'Atlas' && (
        <>
          {/* Globe lines */}
          <circle cx="24" cy="14" r="8" stroke={color} strokeWidth="1" fill="none" opacity={0.4} />
          <path d="M16 14 L32 14" stroke={color} strokeWidth="1" opacity={0.4} />
          <path d="M24 6 L24 22" stroke={color} strokeWidth="1" opacity={0.4} />
          {/* Eyes - wise */}
          <circle cx="21" cy="15" r="1" fill="#000" />
          <circle cx="27" cy="15" r="1" fill="#000" />
          <circle cx="21" cy="15" r="0.3" fill="#fff" />
          <circle cx="27" cy="15" r="0.3" fill="#fff" />
        </>
      )}

      {/* Arms - subtle */}
      <rect x="10" y="28" width="8" height="3" rx="1.5" fill={color} opacity={opacity * 0.8} />
      <rect x="30" y="28" width="8" height="3" rx="1.5" fill={color} opacity={opacity * 0.8} />

      {/* Legs - subtle */}
      <rect x="17" y="44" width="4" height="4" rx="2" fill={color} opacity={opacity * 0.6} />
      <rect x="27" y="44" width="4" height="4" rx="2" fill={color} opacity={opacity * 0.6} />
    </svg>
  );
}

export function AgentAvatar({ name, size = 48, isActive = false }: { name: string; size?: number; isActive?: boolean }) {
  const color = AGENT_COLORS[name] || '#00f0ff';
  return <VectorAgent name={name} color={color} size={size} isActive={isActive} />;
}

// Work activity visualizations
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
          <rect x="42" y="42" width="8" height="3" rx="1.5" fill={agentColor} />
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
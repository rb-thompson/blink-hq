'use client';

import { AGENT_COLORS } from './palette';

// Pixel-art style SVG bot avatars
const AVATAR_SIZE = 40;

function BlinkAvatar({ color }: { color: string }) {
  return (
    <svg width={AVATAR_SIZE} height={AVATAR_SIZE} viewBox="0 0 40 40" fill="none">
      {/* Body - sleek rounded shape */}
      <rect x="10" y="14" width="20" height="20" rx="4" fill={color} opacity="0.9" />
      {/* Head dome */}
      <rect x="12" y="8" width="16" height="16" rx="8" fill={color} />
      {/* Lightning antenna */}
      <rect x="18" y="0" width="4" height="6" fill={color} opacity="0.7" />
      <polygon points="20,0 23,4 21,4 22,6 17,4 20,4" fill={color} />
      {/* Eyes */}
      <rect x="15" y="16" width="4" height="3" fill="#0a0e1a" />
      <rect x="21" y="16" width="4" height="3" fill="#0a0e1a" />
      {/* Chest detail */}
      <rect x="17" y="24" width="6" height="6" fill="#0a0e1a" opacity="0.3" />
    </svg>
  );
}

function SparkAvatar({ color }: { color: string }) {
  return (
    <svg width={AVATAR_SIZE} height={AVATAR_SIZE} viewBox="0 0 40 40" fill="none">
      {/* Compact body */}
      <rect x="12" y="16" width="16" height="18" rx="3" fill={color} opacity="0.9" />
      {/* Flame-styled head */}
      <polygon points="20,8 26,20 14,20" fill={color} />
      <polygon points="20,12 24,18 16,18" fill={color} opacity="0.6" />
      {/* Eyes */}
      <rect x="15" y="18" width="3" height="2" fill="#0a0e1a" />
      <rect x="22" y="18" width="3" height="2" fill="#0a0e1a" />
      {/* Spark details */}
      <rect x="10" y="24" width="2" height="2" fill={color} opacity="0.5" />
      <rect x="28" y="20" width="2" height="2" fill={color} opacity="0.5" />
    </svg>
  );
}

function VoltAvatar({ color }: { color: string }) {
  return (
    <svg width={AVATAR_SIZE} height={AVATAR_SIZE} viewBox="0 0 40 40" fill="none">
      {/* Round body */}
      <circle cx="20" cy="24" r="12" fill={color} opacity="0.9" />
      {/* Brain dome */}
      <rect x="12" y="6" width="16" height="14" rx="7" fill={color} />
      {/* Brain lines */}
      <rect x="16" y="10" width="8" height="2" fill="#0a0e1a" opacity="0.3" />
      <rect x="15" y="13" width="10" height="2" fill="#0a0e1a" opacity="0.3" />
      {/* Eyes */}
      <rect x="16" y="18" width="3" height="3" fill="#0a0e1a" />
      <rect x="21" y="18" width="3" height="3" fill="#0a0e1a" />
    </svg>
  );
}

function PixelAvatar({ color }: { color: string }) {
  return (
    <svg width={AVATAR_SIZE} height={AVATAR_SIZE} viewBox="0 0 40 40" fill="none">
      {/* Body */}
      <rect x="12" y="16" width="16" height="20" rx="3" fill={color} opacity="0.9" />
      {/* Head with hair */}
      <rect x="13" y="8" width="14" height="12" rx="4" fill={color} />
      <rect x="11" y="6" width="6" height="4" fill={color} />
      <rect x="23" y="6" width="6" height="4" fill={color} />
      {/* Paint brush arm */}
      <rect x="28" y="20" width="8" height="3" transform="rotate(-30 28 20)" fill="#e0e0f0" />
      <rect x="34" y="16" width="3" height="6" fill={color} />
      {/* Eyes */}
      <circle cx="17" cy="16" r="2" fill="#0a0e1a" />
      <circle cx="23" cy="16" r="2" fill="#0a0e1a" />
    </svg>
  );
}

function ScoutAvatar({ color }: { color: string }) {
  return (
    <svg width={AVATAR_SIZE} height={AVATAR_SIZE} viewBox="0 0 40 40" fill="none">
      {/* Body */}
      <rect x="12" y="18" width="16" height="18" rx="3" fill={color} opacity="0.9" />
      {/* Head */}
      <rect x="14" y="10" width="12" height="10" rx="2" fill={color} />
      {/* Radar/antenna */}
      <rect x="18" y="0" width="4" height="8" fill={color} opacity="0.7" />
      <rect x="14" y="4" width="12" height="2" rx="1" fill={color} />
      {/* Scanner dish */}
      <path d="M10 8c0-2 2-3 10-3s10 1 10 3" stroke={color} strokeWidth="2" fill="none" />
      {/* Eyes (scanner style) */}
      <rect x="16" y="14" width="8" height="3" fill="#0a0e1a" />
    </svg>
  );
}

function EchoAvatar({ color }: { color: string }) {
  return (
    <svg width={AVATAR_SIZE} height={AVATAR_SIZE} viewBox="0 0 40 40" fill="none">
      {/* Clipboard body */}
      <rect x="10" y="10" width="20" height="26" rx="2" fill={color} opacity="0.15" />
      <rect x="12" y="12" width="16" height="22" rx="1" fill={color} opacity="0.3" />
      {/* Clipboard clip */}
      <rect x="16" y="8" width="8" height="4" fill={color} />
      {/* Checkmarks on clipboard */}
      <path d="M14 20l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M14 28l4 4 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Head */}
      <rect x="16" y="16" width="8" height="6" fill={color} />
    </svg>
  );
}

function CipherAvatar({ color }: { color: string }) {
  return (
    <svg width={AVATAR_SIZE} height={AVATAR_SIZE} viewBox="0 0 40 40" fill="none">
      {/* Angular body - hexagon-ish */}
      <polygon points="20,6 34,16 30,34 10,34 6,16" fill={color} opacity="0.9" />
      {/* Lock head shape */}
      <rect x="14" y="8" width="12" height="10" rx="1" fill={color} />
      <rect x="17" y="4" width="6" height="4" fill={color} />
      {/* Lock keyhole */}
      <circle cx="20" cy="14" r="2" fill="#0a0e1a" />
      <rect x="19" y="14" width="2" height="3" fill="#0a0e1a" />
      {/* Data lines on body */}
      <rect x="12" y="22" width="4" height="2" fill="#0a0e1a" opacity="0.3" />
      <rect x="16" y="26" width="8" height="2" fill="#0a0e1a" opacity="0.3" />
      <rect x="10" y="30" width="6" height="2" fill="#0a0e1a" opacity="0.3" />
    </svg>
  );
}

function AtlasAvatar({ color }: { color: string }) {
  return (
    <svg width={AVATAR_SIZE} height={AVATAR_SIZE} viewBox="0 0 40 40" fill="none">
      {/* Wide body */}
      <rect x="6" y="18" width="28" height="16" rx="3" fill={color} opacity="0.9" />
      {/* Globe head */}
      <circle cx="20" cy="14" r="10" fill={color} />
      {/* Globe grid */}
      <ellipse cx="20" cy="14" rx="10" ry="4" stroke="#0a0e1a" strokeWidth="1" fill="none" opacity="0.3" />
      <line x1="20" y1="4" x2="20" y2="24" stroke="#0a0e1a" strokeWidth="1" opacity="0.3" />
      {/* Eyes peeking */}
      <rect x="14" y="13" width="4" height="3" fill="#0a0e1a" />
      <rect x="22" y="13" width="4" height="3" fill="#0a0e1a" />
      {/* Circuit lines on body */}
      <rect x="12" y="24" width="4" height="2" fill={color} opacity="0.5" />
      <rect x="24" y="24" width="4" height="2" fill={color} opacity="0.5" />
      <rect x="16" y="28" width="8" height="2" fill={color} opacity="0.5" />
    </svg>
  );
}

const AVATAR_COMPONENTS: Record<string, React.FC<{color: string}>> = {
  Blink: BlinkAvatar,
  Spark: SparkAvatar,
  Volt: VoltAvatar,
  Pixel: PixelAvatar,
  Scout: ScoutAvatar,
  Echo: EchoAvatar,
  Cipher: CipherAvatar,
  Atlas: AtlasAvatar,
};

export function AgentAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const color = AGENT_COLORS[name] || '#00f0ff';
  const Component = AVATAR_COMPONENTS[name] || BlinkAvatar;
  
  return (
    <div style={{ width: size, height: size }}>
      <Component color={color} />
    </div>
  );
}

// SVG icons for roles (16x16)
export const RoleIcons = {
  Commander: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="8" rx="1" fill="currentColor" opacity="0.8"/>
      <rect x="4" y="11" width="8" height="2" fill="currentColor" opacity="0.6"/>
      <rect x="6" y="13" width="4" height="2" fill="currentColor" opacity="0.4"/>
    </svg>
  ),
  Coder: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 5l-3 3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 5l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="7" y="2" width="2" height="12" fill="currentColor" opacity="0.5"/>
    </svg>
  ),
  Reasoner: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M5 13c0-2 1.5-3 3-3s3 1 3 3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="5" r="1" fill="currentColor"/>
    </svg>
  ),
  Creative: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="8" cy="8" r="2" fill="currentColor"/>
      <path d="M13 3l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Researcher: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M11 11l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Reviewer: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Data: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="4" rx="5" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M3 4v8c0 1 2 2 5 2s5-1 5-2V4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 8c0 1 2 2 5 2s5-1 5-2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  LongContext: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="3" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="5" y="5" width="6" height="6" fill="currentColor" opacity="0.5"/>
      <rect x="7" y="7" width="2" height="2" fill="currentColor"/>
    </svg>
  ),
};
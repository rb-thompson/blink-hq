// Blink HQ Color Palette ⚡

export const PALETTE = {
  // Primary accents
  cyan: '#00f0ff',
  green: '#00ff88',
  amber: '#ffaa00',
  magenta: '#ff00aa',
  
  // Extended palette
  teal: '#44ffcc',
  lime: '#88ff00',
  orange: '#ff8844',
  purple: '#aa44ff',
  blue: '#4488ff',
  red: '#ff4444',
  pink: '#ff44aa',
  gold: '#ffd700',
  
  // Backgrounds
  bgDeep: '#0a0e1a',
  bgPanel: '#131629',
  bgCard: '#1a1f3a',
  
  // Text
  text: '#e0e0f0',
  textDim: '#6a6a8a',
} as const;

// Assign distinct colors to each agent
export const AGENT_COLORS: Record<string, string> = {
  Blink: PALETTE.cyan,
  Spark: PALETTE.green,
  Volt: PALETTE.amber,
  Pixel: PALETTE.magenta,
  Scout: PALETTE.teal,
  Echo: PALETTE.lime,
  Cipher: PALETTE.orange,
  Atlas: PALETTE.purple,
};

export const ALL_COLORS = [
  PALETTE.cyan,
  PALETTE.green,
  PALETTE.amber,
  PALETTE.magenta,
  PALETTE.teal,
  PALETTE.lime,
  PALETTE.orange,
  PALETTE.purple,
  PALETTE.blue,
  PALETTE.red,
  PALETTE.pink,
  PALETTE.gold,
];

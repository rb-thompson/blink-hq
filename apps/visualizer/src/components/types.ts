import { AGENT_COLORS } from './palette';

export type AgentStatus = 'active' | 'idle' | 'thinking' | 'done' | 'error';

export interface Agent {
  name: string;
  role: keyof typeof import('./AgentAvatars').RoleIcons;
  status: AgentStatus;
  color: string;
  task: string;
  model: string;
}

export const AGENTS: Agent[] = [
  { name: 'Blink', role: 'Commander', status: 'active', color: AGENT_COLORS.Blink, task: 'Orchestrating squad operations', model: 'anthropic/claude-opus-4-6' },
  { name: 'Spark', role: 'Coder', status: 'active', color: AGENT_COLORS.Spark, task: 'Building visualizer components', model: 'anthropic/claude-sonnet-4-6' },
  { name: 'Volt', role: 'Reasoner', status: 'thinking', color: AGENT_COLORS.Volt, task: 'Analyzing architecture patterns', model: 'xai/grok-4-1-fast' },
  { name: 'Pixel', role: 'Creative', status: 'active', color: AGENT_COLORS.Pixel, task: 'Designing UI elements', model: 'anthropic/claude-sonnet-4-6' },
  { name: 'Scout', role: 'Researcher', status: 'idle', color: AGENT_COLORS.Scout, task: 'Standing by', model: 'xai/grok-4-1-fast' },
  { name: 'Echo', role: 'Reviewer', status: 'done', color: AGENT_COLORS.Echo, task: 'Code review complete', model: 'anthropic/claude-haiku-4-5' },
  { name: 'Cipher', role: 'Data', status: 'active', color: AGENT_COLORS.Cipher, task: 'Processing data streams', model: 'xai/grok-code-fast-1' },
  { name: 'Atlas', role: 'LongContext', status: 'idle', color: AGENT_COLORS.Atlas, task: 'Standing by', model: 'nvidia/moonshotai/kimi-k2.5' },
];

// Position config for office layout
export interface Position {
  transform?: string;
  top: string;
  left?: string;
  right?: string;
  width?: string;
  height?: string;
}

export const AGENT_POSITIONS: Record<string, Position> = {
  // Center top: Blink (Commander) - overlooking the office
  Blink: { top: '8%', left: '50%', width: '180px', height: '140px', transform: 'translateX(-50%)' },
  
  // Left side: Spark coder station (near Cipher) - collaboration corner
  Spark: { top: '35%', left: '15%', width: '150px', height: '130px' },
  
  // Right side: Cipher data station (near Spark) - data collaboration
  Cipher: { top: '35%', right: '15%', width: '150px', height: '130px', left: undefined },
  
  // Quiet corner: Volt (Reasoner) - needs space
  Volt: { top: '20%', left: '5%', width: '140px', height: '130px' },
  
  // Art corner: Pixel (Creative) - with color swatches on wall
  Pixel: { top: '20%', right: '5%', width: '140px', height: '130px', left: undefined },
  
  // Window side: Scout (Researcher) - watching the stars
  Scout: { top: '55%', left: '5%', width: '140px', height: '130px' },
  
  // Center position: Echo (Reviewer) - can see everyone's work
  Echo: { top: '55%', left: '50%', width: '150px', height: '130px', transform: 'translateX(-50%)' },
  
  // Big desk: Atlas (Long Context) - massive workspace
  Atlas: { top: '78%', left: '50%', width: '220px', height: '150px', transform: 'translateX(-50%)' },
};

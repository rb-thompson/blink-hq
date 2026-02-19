import { AGENT_COLORS } from './palette';

export type AgentStatus = 'active' | 'idle' | 'thinking' | 'done' | 'error';

export interface Agent {
  name: string;
  role: keyof typeof import('./AgentAvatars').RoleIcons;
  status: AgentStatus;
  color: string;
  task: string;
  model: string;
  position: 'coffee' | 'workstation' | 'completed';
  workType: 'code' | 'research' | 'analysis' | 'creative' | 'review' | 'data' | 'command' | 'none';
}

export const AGENTS: Agent[] = [
  { name: 'Blink', role: 'Commander', status: 'active', color: AGENT_COLORS.Blink, task: 'Orchestrating squad operations', model: 'anthropic/claude-opus-4-6', position: 'workstation', workType: 'command' },
  { name: 'Spark', role: 'Coder', status: 'active', color: AGENT_COLORS.Spark, task: 'Building visualizer components', model: 'anthropic/claude-sonnet-4-6', position: 'workstation', workType: 'code' },
  { name: 'Volt', role: 'Reasoner', status: 'thinking', color: AGENT_COLORS.Volt, task: 'Analyzing architecture patterns', model: 'xai/grok-4-1-fast', position: 'workstation', workType: 'analysis' },
  { name: 'Pixel', role: 'Creative', status: 'active', color: AGENT_COLORS.Pixel, task: 'Designing UI elements', model: 'anthropic/claude-sonnet-4-6', position: 'workstation', workType: 'creative' },
  { name: 'Scout', role: 'Researcher', status: 'idle', color: AGENT_COLORS.Scout, task: 'Standing by', model: 'xai/grok-4-1-fast', position: 'coffee', workType: 'none' },
  { name: 'Echo', role: 'Reviewer', status: 'done', color: AGENT_COLORS.Echo, task: 'Code review complete', model: 'anthropic/claude-haiku-4-5', position: 'completed', workType: 'none' },
  { name: 'Cipher', role: 'Data', status: 'active', color: AGENT_COLORS.Cipher, task: 'Processing data streams', model: 'xai/grok-code-fast-1', position: 'workstation', workType: 'data' },
  { name: 'Atlas', role: 'LongContext', status: 'idle', color: AGENT_COLORS.Atlas, task: 'Standing by', model: 'nvidia/moonshotai/kimi-k2.5', position: 'coffee', workType: 'none' },
];

// Work zone positions (where agents move when active)
export const WORK_ZONES = {
  Blink: { x: 20, y: 15 },
  Spark: { x: 35, y: 35 },
  Volt: { x: 5, y: 25 },
  Pixel: { x: 20, y: 35 },
  Scout: { x: 5, y: 45 },
  Echo: { x: 35, y: 15 },
  Cipher: { x: 35, y: 25 },
  Atlas: { x: 20, y: 45 },
};

// Coffee station (standby area)
export const COFFEE_STATION = { x: 50, y: 80 };

// Completed area
export const COMPLETED_AREA = { x: 80, y: 10 };

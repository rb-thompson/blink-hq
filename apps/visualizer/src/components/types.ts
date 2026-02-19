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

// Initial positions around coffee station (evenly spaced in a circle)
export const COFFEE_POSITIONS = {
  Scout: { x: 12, y: 35 },   // Top-left
  Atlas: { x: 18, y: 65 },   // Bottom-left
  Echo: { x: 12, y: 50 },    // Left-center (but will be at completed)
};

// Work zone positions (within the workstation grid area on the right)
export const WORK_ZONES = {
  // Top row workstations
  Blink: { x: 50, y: 20 },   // Top-left workstation
  Echo: { x: 75, y: 20 },    // Top-right workstation

  // Second row workstations
  Volt: { x: 50, y: 40 },    // Middle-left workstation
  Scout: { x: 75, y: 40 },   // Middle-right workstation

  // Third row workstations
  Spark: { x: 50, y: 60 },   // Bottom-left workstation
  Cipher: { x: 75, y: 60 },  // Bottom-right workstation

  // Bottom row workstations
  Pixel: { x: 50, y: 80 },   // Bottom-left workstation
  Atlas: { x: 75, y: 80 },   // Bottom-right workstation
};

// Coffee station center
export const COFFEE_STATION = { x: 15, y: 50 };

// Completed area
export const COMPLETED_AREA = { x: 85, y: 10 };
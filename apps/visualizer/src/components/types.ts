export type AgentStatus = 'active' | 'idle' | 'thinking' | 'done';

export interface Agent {
  name: string;
  role: string;
  status: AgentStatus;
  color: string;
  icon: string;
  task?: string;
}

export const AGENTS: Agent[] = [
  { name: 'Blink', role: 'Commander', status: 'active', color: '#00f0ff', icon: '⚡', task: 'Orchestrating squad operations' },
  { name: 'Spark', role: 'Coder', status: 'active', color: '#00ff88', icon: '🔥', task: 'Building visualizer components' },
  { name: 'Volt', role: 'Reasoner', status: 'thinking', color: '#ffaa00', icon: '🧠', task: 'Analyzing architecture patterns' },
  { name: 'Pixel', role: 'Creative', status: 'active', color: '#ff00aa', icon: '🎨', task: 'Designing UI elements' },
  { name: 'Scout', role: 'Researcher', status: 'idle', color: '#00f0ff', icon: '🔍', task: 'Standing by' },
  { name: 'Echo', role: 'Reviewer', status: 'done', color: '#00ff88', icon: '✓', task: 'Code review complete' },
  { name: 'Cipher', role: 'Data', status: 'active', color: '#ffaa00', icon: '🔐', task: 'Processing data streams' },
  { name: 'Atlas', role: 'Long Context', status: 'idle', color: '#ff00aa', icon: '🗺️', task: 'Standing by' },
];

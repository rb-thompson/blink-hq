export const AGENTS: Agent[] = [
  { name: 'Blink', role: 'Commander', status: 'idle', color: AGENT_COLORS.Blink, task: 'Standing by', model: 'anthropic/claude-opus-4-6', position: 'coffee', workType: 'none' },
  { name: 'Spark', role: 'Coder', status: 'idle', color: AGENT_COLORS.Spark, task: 'Standing by', model: 'anthropic/claude-sonnet-4-6', position: 'coffee', workType: 'none' },
  { name: 'Volt', role: 'Reasoner', status: 'idle', color: AGENT_COLORS.Volt, task: 'Standing by', model: 'xai/grok-4-1-fast', position: 'coffee', workType: 'none' },
  { name: 'Pixel', role: 'Creative', status: 'idle', color: AGENT_COLORS.Pixel, task: 'Standing by', model: 'anthropic/claude-sonnet-4-6', position: 'coffee', workType: 'none' },
  { name: 'Scout', role: 'Researcher', status: 'idle', color: AGENT_COLORS.Scout, task: 'Standing by', model: 'xai/grok-4-1-fast', position: 'coffee', workType: 'none' },
  { name: 'Echo', role: 'Reviewer', status: 'idle', color: AGENT_COLORS.Echo, task: 'Standing by', model: 'anthropic/claude-haiku-4-5', position: 'coffee', workType: 'none' },
  { name: 'Cipher', role: 'Data', status: 'idle', color: AGENT_COLORS.Cipher, task: 'Standing by', model: 'xai/grok-code-fast-1', position: 'coffee', workType: 'none' },
  { name: 'Atlas', role: 'LongContext', status: 'idle', color: AGENT_COLORS.Atlas, task: 'Standing by', model: 'nvidia/moonshotai/kimi-k2.5', position: 'coffee', workType: 'none' },
];

// Initial positions around coffee station in specific slots:
// #########
// #A#B#C#D#
// ##XXXXXX##
// ##XXXXXX##
// #E#F#G#H#
// #########
export const COFFEE_POSITIONS = {
  Scout: { x: 8, y: 30 },    // A - Top-left
  Atlas: { x: 18, y: 30 },   // B - Top-center-left
  Echo: { x: 8, y: 70 },     // E - Bottom-left
  Cipher: { x: 18, y: 70 },  // F - Bottom-center-left
  Blink: { x: 28, y: 30 },   // C - Top-center-right
  Volt: { x: 38, y: 30 },    // D - Top-right
  Spark: { x: 28, y: 70 },   // G - Bottom-center-right
  Pixel: { x: 38, y: 70 },   // H - Bottom-right
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
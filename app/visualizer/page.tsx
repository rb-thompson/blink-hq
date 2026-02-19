'use client';

import { useEffect, useState, useCallback } from 'react';
import AgentPanel from '../../components/AgentPanel';
import RestartButton from '../../components/RestartButton';

interface SubAgent {
  id: string;
  label?: string;
  status?: string;
  model?: string;
}

const SLOT_POSITIONS = [
  { x: 460, y: 80 },
  { x: 620, y: 80 },
  { x: 780, y: 80 },
  { x: 460, y: 220 },
  { x: 620, y: 220 },
  { x: 780, y: 220 },
];

const NEON_COLORS = ['#00f0ff', '#00ff88', '#ffaa00', '#ff00aa', '#00f0ff', '#00ff88'];

function WorkstationSlot({
  x,
  y,
  agent,
  color,
  onClick,
}: {
  x: number;
  y: number;
  agent?: SubAgent;
  color: string;
  onClick: () => void;
}) {
  const active = !!agent;
  const dimColor = '#2a2f4a';
  const bg = active ? '#1a1f3a' : '#0f1222';
  const border = active ? color : '#2a2f4a';
  const glow = active ? `drop-shadow(0 0 8px ${color}80)` : 'none';

  return (
    <g transform={`translate(${x}, ${y})`} style={{ filter: glow, cursor: active ? 'pointer' : 'default' }} onClick={onClick}>
      {/* Desk */}
      <rect x={-65} y={-10} width={130} height={100} rx={4} fill={bg} stroke={border} strokeWidth={active ? 1.5 : 1} />
      {/* Monitor base */}
      <rect x={-8} y={72} width={16} height={6} rx={2} fill={active ? color + '40' : dimColor} />
      <rect x={-4} y={76} width={8} height={4} rx={1} fill={active ? color + '60' : dimColor} />
      {/* Monitor screen */}
      <rect x={-42} y={2} width={84} height={56} rx={3} fill={active ? '#0a0e1a' : '#080b14'} stroke={active ? color + '80' : dimColor} strokeWidth={1} />
      {/* Screen glow/content */}
      {active && (
        <>
          <rect x={-36} y={8} width={72} height={44} rx={2} fill={color + '08'} />
          <line x1={-28} y1={16} x2={28} y2={16} stroke={color} strokeWidth={1} strokeOpacity={0.6} />
          <line x1={-28} y1={22} x2={18} y2={22} stroke={color} strokeWidth={1} strokeOpacity={0.4} />
          <line x1={-28} y1={28} x2={24} y2={28} stroke={color} strokeWidth={1} strokeOpacity={0.3} />
          <line x1={-28} y1={34} x2={14} y2={34} stroke={color} strokeWidth={1} strokeOpacity={0.4} />
          <rect x={-28} y={40} width={8} height={4} rx={1} fill={color} fillOpacity={0.8} />
          {/* Blinking cursor */}
          <rect x={-18} y={40} width={4} height={4} rx={0.5} fill={color}>
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
          </rect>
        </>
      )}
      {!active && (
        <text x={0} y={32} textAnchor="middle" fill={dimColor} fontSize={8} fontFamily="Courier New">
          VACANT
        </text>
      )}
      {/* Agent dot */}
      {active && (
        <circle cx={50} cy={88} r={5} fill={color} fillOpacity={0.9}>
          <animate attributeName="r" values="5;6;5" dur="2s" repeatCount="indefinite" />
          <animate attributeName="fill-opacity" values="0.9;0.6;0.9" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
      {/* Label */}
      <text x={0} y={108} textAnchor="middle" fill={active ? color : dimColor} fontSize={7} fontFamily="Courier New" fontWeight="bold">
        {active ? (agent?.label ?? agent?.id ?? '').slice(0, 14).toUpperCase() : '— EMPTY —'}
      </text>
      {active && agent?.model && (
        <text x={0} y={118} textAnchor="middle" fill={color + '80'} fontSize={5.5} fontFamily="Courier New">
          {agent.model.split('/').pop()?.slice(0, 18)}
        </text>
      )}
    </g>
  );
}

function CommanderDesk({ sessionActive }: { sessionActive: boolean }) {
  return (
    <g transform="translate(170, 180)">
      {/* Desk surface */}
      <rect x={-90} y={-20} width={180} height={130} rx={6} fill="#131629" stroke="#00f0ff40" strokeWidth={2}
        style={{ filter: 'drop-shadow(0 0 12px #00f0ff30)' }} />
      {/* Monitor */}
      <rect x={-60} y={-10} width={120} height={80} rx={4} fill="#0a0e1a" stroke="#00f0ff" strokeWidth={1.5} />
      {/* Screen content */}
      <rect x={-54} y={-4} width={108} height={68} rx={2} fill="#00f0ff08" />
      <line x1={-46} y1={4} x2={46} y2={4} stroke="#00f0ff" strokeWidth={1} strokeOpacity={0.8} />
      <line x1={-46} y1={10} x2={30} y2={10} stroke="#00f0ff" strokeWidth={1} strokeOpacity={0.5} />
      <line x1={-46} y1={16} x2={38} y2={16} stroke="#00f0ff" strokeWidth={1} strokeOpacity={0.4} />
      <line x1={-46} y1={22} x2={22} y2={22} stroke="#00f0ff" strokeWidth={1} strokeOpacity={0.3} />
      {/* Prompt line */}
      <text x={-46} y={34} fill="#00f0ff" fontSize={7} fontFamily="Courier New" fontWeight="bold">{'>'}</text>
      {sessionActive && (
        <text x={-38} y={34} fill="#00f0ff" fontSize={7} fontFamily="Courier New">
          <animate attributeName="opacity" values="1;1;1;0;0;0" dur="0.6s" repeatCount="indefinite" />
          thinking...
        </text>
      )}
      {/* Typing animation lines */}
      {sessionActive && (
        <>
          <rect x={-38} y={38} width={0} height={3} rx={1} fill="#00f0ff80">
            <animate attributeName="width" values="0;60;0" dur="3s" repeatCount="indefinite" />
          </rect>
          <rect x={-38} y={44} width={0} height={3} rx={1} fill="#00f0ff50">
            <animate attributeName="width" values="0;40;0" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
          </rect>
          <rect x={-38} y={50} width={0} height={3} rx={1} fill="#00f0ff30">
            <animate attributeName="width" values="0;50;0" dur="3.5s" begin="1s" repeatCount="indefinite" />
          </rect>
        </>
      )}
      {/* Monitor stand */}
      <rect x={-10} y={70} width={20} height={8} rx={2} fill="#00f0ff20" />
      <rect x={-20} y={76} width={40} height={4} rx={2} fill="#00f0ff30" />
      {/* Blink avatar */}
      <circle cx={0} cy={110} r={10} fill="#00f0ff20" stroke="#00f0ff" strokeWidth={1.5}
        style={{ filter: 'drop-shadow(0 0 6px #00f0ff)' }} />
      <text x={0} y={114} textAnchor="middle" fontSize={10}>⚡</text>
      {/* Name label */}
      <text x={0} y={130} textAnchor="middle" fill="#00f0ff" fontSize={9} fontFamily="Courier New" fontWeight="bold"
        style={{ filter: 'drop-shadow(0 0 4px #00f0ff)' }}>
        BLINK
      </text>
      <text x={0} y={140} textAnchor="middle" fill="#6a6a8a" fontSize={6} fontFamily="Courier New">
        COMMANDER
      </text>
    </g>
  );
}

export default function Visualizer() {
  const [subAgents, setSubAgents] = useState<SubAgent[]>([]);
  const [sessionActive, setSessionActive] = useState(true);
  const [time, setTime] = useState('--:--:--');
  const [selectedAgent, setSelectedAgent] = useState<SubAgent | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const saRes = await fetch('/api/openclaw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'subagents', args: { action: 'list' } }),
      });
      if (saRes.ok) {
        const saData = await saRes.json();
        const agents: SubAgent[] = Array.isArray(saData) ? saData : (saData?.agents ?? saData?.subagents ?? []);
        setSubAgents(agents);
      }
    } catch { /* ignore */ }

    try {
      const sessRes = await fetch('/api/openclaw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'session_status', args: {} }),
      });
      setSessionActive(sessRes.ok);
    } catch {
      setSessionActive(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const poll = setInterval(fetchData, 5000);
    const tick = setInterval(() => setTime(new Date().toLocaleTimeString('en-US', { hour12: false })), 1000);
    setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    return () => { clearInterval(poll); clearInterval(tick); };
  }, [fetchData]);

  return (
    <div style={{ backgroundColor: '#0a0e1a', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Grid background */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f0ff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 10, padding: '16px 20px', borderBottom: '1px solid #131629' }}>
        <div className="pixel-text glow-cyan" style={{ fontSize: '14px', letterSpacing: '0.3em' }}>
          BLINK HQ — OFFICE
        </div>
        <div className="pixel-text" style={{ fontSize: '7px', color: '#6a6a8a', marginTop: '2px' }}>
          LIVE WORKSPACE VIEW // {time}
        </div>
      </div>

      {/* Main scene */}
      <div style={{ position: 'relative', zIndex: 10, padding: '20px' }}>
        <svg
          viewBox="0 0 960 520"
          style={{ width: '100%', maxWidth: '960px', margin: '0 auto', display: 'block' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Room floor */}
          <rect x={10} y={10} width={940} height={480} rx={8} fill="#0d1120" stroke="#131629" strokeWidth={1} />

          {/* Section divider */}
          <line x1={350} y1={30} x2={350} y2={470} stroke="#00f0ff15" strokeWidth={1} strokeDasharray="4 4" />

          {/* Left section label */}
          <text x={180} y={50} textAnchor="middle" fill="#6a6a8a" fontSize={7} fontFamily="Courier New" fontWeight="bold" letterSpacing={2}>
            COMMAND STATION
          </text>

          {/* Right section label */}
          <text x={650} y={50} textAnchor="middle" fill="#6a6a8a" fontSize={7} fontFamily="Courier New" fontWeight="bold" letterSpacing={2}>
            SUB-AGENT WORKSTATIONS
          </text>

          {/* Commander desk */}
          <CommanderDesk sessionActive={sessionActive} />

          {/* Sub-agent workstation slots */}
          {SLOT_POSITIONS.map((pos, i) => (
            <WorkstationSlot
              key={i}
              x={pos.x}
              y={pos.y}
              agent={subAgents[i]}
              color={NEON_COLORS[i % NEON_COLORS.length]}
              onClick={() => setSelectedAgent(subAgents[i] || null)}
            />
          ))}

          {/* Slot indices for empty ones */}
          {SLOT_POSITIONS.map((pos, i) => !subAgents[i] && (
            <text key={`idx-${i}`} x={pos.x} y={pos.y + 130} textAnchor="middle" fill="#2a2f4a" fontSize={5.5} fontFamily="Courier New">
              SLOT {i + 1}
            </text>
          ))}
        </svg>
      </div>

      {/* Agent Panel */}
      <AgentPanel agent={selectedAgent} onClose={() => setSelectedAgent(null)} />

      {/* Status bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 48,
        right: 0,
        borderTop: '1px solid #131629',
        backgroundColor: '#0a0e1aee',
        padding: '6px 16px',
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        zIndex: 20,
      }}>
        <div className="pixel-text" style={{ fontSize: '7px' }}>
          <span style={{ color: '#6a6a8a' }}>COMMANDER: </span>
          <span style={{ color: '#00ff88' }}>{sessionActive ? 'ACTIVE' : 'IDLE'}</span>
        </div>
        <div className="pixel-text" style={{ fontSize: '7px' }}>
          <span style={{ color: '#6a6a8a' }}>SUB-AGENTS: </span>
          <span style={{ color: '#00f0ff' }}>{subAgents.length} / 6</span>
        </div>
        <div className="pixel-text" style={{ fontSize: '7px' }}>
          <span style={{ color: '#6a6a8a' }}>SLOTS AVAILABLE: </span>
          <span style={{ color: '#ffaa00' }}>{Math.max(0, 6 - subAgents.length)}</span>
        </div>
        <RestartButton />
        <div className="flex-1" />
        <div className="pixel-text" style={{ fontSize: '7px', color: '#6a6a8a' }}>
          {time}
        </div>
      </div>
    </div>
  );
}

'use client';

import { Agent } from './types';
import { AgentAvatar } from './AgentAvatars';

const CODE_LINES = [
  'const agent = new Agent();',
  'await agent.execute(task);',
  'return response.data;',
];

const DATA_CHARS = '01█▓░▒';

function BlinkingCursor({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-[3px] h-[6px] ml-[1px]"
      style={{
        backgroundColor: color,
        animation: 'blink-cursor 1s step-end infinite',
      }}
    />
  );
}

function StatusDot({ status, color }: { status: string; color: string }) {
  let style: React.CSSProperties = {};
  switch (status) {
    case 'active':
      style = { backgroundColor: color, boxShadow: `0 0 6px ${color}`, animation: 'pulse-active 1.5s ease-in-out infinite' };
      break;
    case 'thinking':
      return (
        <div className="w-3 h-3 relative">
          <div
            className="absolute inset-0 border border-t-transparent rounded-full"
            style={{ borderColor: color, borderTopColor: 'transparent', animation: 'pulse-thinking 1s linear infinite' }}
          />
        </div>
      );
    case 'done':
      style = { backgroundColor: '#00ff88' };
      break;
    default:
      style = { backgroundColor: '#6a6a8a', opacity: 0.4 };
  }
  return <div className="w-2 h-2 rounded-full" style={style} />;
}

function MonitorScreen({ agent, variant }: { agent: Agent; variant: string }) {
  const isWide = variant === 'atlas' || variant === 'command';
  const isLarge = variant === 'atlas';

  return (
    <div
      className={`relative border rounded-sm overflow-hidden ${isLarge ? 'w-20 h-12' : isWide ? 'w-16 h-10' : 'w-12 h-8'}`}
      style={{ borderColor: agent.color + '40', backgroundColor: '#0a0e1a', boxShadow: agent.status === 'active' ? `0 0 8px ${agent.color}30` : 'none' }}
    >
      {variant === 'code' && (
        <div className="absolute inset-1 overflow-hidden opacity-70" style={{ fontSize: '5px', lineHeight: '6px', color: agent.color }}>
          {CODE_LINES.map((line, i) => <div key={i} className="whitespace-nowrap truncate">{line}</div>)}
          <BlinkingCursor color={agent.color} />
        </div>
      )}

      {(variant === 'data' || variant === 'holo') && (
        <div className="absolute inset-1 overflow-hidden opacity-60" style={{ fontSize: '5px', lineHeight: '6px', color: agent.color }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>{Array.from({ length: 8 }).map(() => DATA_CHARS[Math.floor(Math.random() * DATA_CHARS.length)]).join('')}</div>
          ))}
        </div>
      )}

      {variant === 'pixel' && (
        <div className="absolute inset-1 grid grid-cols-4 grid-rows-2 gap-[2px]">
          {['#00f0ff', '#ff00aa', '#00ff88', '#ffaa00', '#44ffcc', '#88ff00', '#aa44ff', '#4488ff'].map((c, i) => (
            <div key={i} className="rounded-[1px]" style={{ backgroundColor: c, opacity: 0.7 }} />
          ))}
        </div>
      )}

      {variant === 'scout' && (
        <div className="absolute inset-1 flex flex-col gap-[2px]">
          <div className="h-1.5 rounded-sm" style={{ backgroundColor: agent.color, opacity: 0.3 }} />
          <div className="h-1 rounded-sm" style={{ backgroundColor: agent.color, opacity: 0.2 }} />
          <div className="h-1 rounded-sm" style={{ backgroundColor: agent.color, opacity: 0.15 }} />
        </div>
      )}

      {variant === 'echo' && (
        <div className="absolute inset-1 flex flex-col gap-[2px]">
          {[{pass: true}, {pass: true}, {pass: false}, {pass: true}].map((item, i) => (
            <div key={i} className="flex items-center gap-[2px]">
              <span style={{ fontSize: '5px', color: item.pass ? '#00ff88' : '#ff4444' }}>{item.pass ? '✓' : '✗'}</span>
              <div className="h-[2px] flex-1 rounded-full" style={{ backgroundColor: (item.pass ? '#00ff88' : '#ff4444') + '30' }} />
            </div>
          ))}
        </div>
      )}

      {variant === 'command' && (
        <div className="absolute inset-1 overflow-hidden" style={{ fontSize: '5px', lineHeight: '6px', color: agent.color }}>
          <div>$ ./deploy.sh</div>
          <div style={{ opacity: 0.7 }}>[INFO] Starting...</div>
          <div style={{ opacity: 0.7 }}>[OK] Squad ready</div>
          <BlinkingCursor color={agent.color} />
        </div>
      )}

      {variant === 'atlas' && (
        <div className="absolute inset-2 grid grid-cols-6 grid-rows-2 gap-[2px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-[1px]" style={{ backgroundColor: agent.color, opacity: 0.2 + (i % 3) * 0.15 }} />
          ))}
        </div>
      )}

      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${agent.color}, transparent)` }} />
    </div>
  );
}

export default function Workstation({ agent, variant }: { agent: Agent; variant?: string }) {
  const deskColor = agent.color + '15';
  const borderColor = agent.color + '30';
  const variantType = variant || 'code';

  return (
    <div className="relative group" style={{ cursor: 'pointer' }}>
      <div
        className="relative p-3 rounded-md border transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
        style={{
          backgroundColor: deskColor,
          borderColor,
          boxShadow: agent.status === 'active' ? `0 0 20px ${agent.color}20, inset 0 0 20px ${agent.color}05` : 'none',
        }}
      >
        <div className="absolute top-1 right-1">
          <StatusDot status={agent.status} color={agent.color} />
        </div>

        <div className="absolute -top-7 left-1/2 -translate-x-1/2">
          <AgentAvatar name={agent.name} size={32} />
        </div>

        <div className="flex gap-1 justify-center mb-2">
          <MonitorScreen agent={agent} variant={variantType} />
          {(variantType === 'atlas' || variantType === 'command') && <MonitorScreen agent={agent} variant="data" />}
        </div>

        <div className="text-center mt-2">
          <div className="pixel-text font-bold" style={{ fontSize: '9px', color: agent.color }}>{agent.name}</div>
          <div className="pixel-text" style={{ fontSize: '7px', color: agent.color + '80' }}>{agent.role}</div>
        </div>

        {agent.status !== 'idle' && agent.task && (
          <div className="pixel-text text-center max-w-24 truncate mt-1" style={{ fontSize: '6px', color: agent.color + '60' }}>{agent.task}</div>
        )}
      </div>
    </div>
  );
}

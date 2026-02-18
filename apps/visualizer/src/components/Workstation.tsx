'use client';

import { Agent } from './types';
import { useEffect, useState } from 'react';

const CODE_LINES = [
  'const agent = new Agent();',
  'await agent.execute(task);',
  'return response.data;',
  'if (status === "done") {',
  '  notify(commander);',
  '}',
  'async function reason() {',
  '  const ctx = getContext();',
  '  return analyze(ctx);',
  'import { pipeline } from',
  'export default handler;',
  'const res = await fetch(',
];

const DATA_CHARS = '01█▓░▒╔╗╚╝║═';

function CodeStream({ color }: { color: string }) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines(prev => {
        const next = [...prev, CODE_LINES[Math.floor(Math.random() * CODE_LINES.length)]];
        return next.slice(-4);
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-1 overflow-hidden opacity-60" style={{ fontSize: '6px', lineHeight: '8px', color }}>
      {lines.map((line, i) => (
        <div key={i} className="whitespace-nowrap">{line}</div>
      ))}
    </div>
  );
}

function DataStream({ color }: { color: string }) {
  const [chars, setChars] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      let s = '';
      for (let i = 0; i < 20; i++) s += DATA_CHARS[Math.floor(Math.random() * DATA_CHARS.length)];
      setChars(s);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-1 overflow-hidden opacity-50" style={{ fontSize: '6px', lineHeight: '7px', color, wordBreak: 'break-all' }}>
      {chars}
    </div>
  );
}

function BlinkingCursor({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-[4px] h-[8px] ml-[2px]"
      style={{
        backgroundColor: color,
        animation: 'blink-cursor 1s step-end infinite',
      }}
    />
  );
}

function StatusIndicator({ status, color }: { status: string; color: string }) {
  const baseClass = 'w-2 h-2 rounded-full';

  if (status === 'active') {
    return (
      <div
        className={baseClass}
        style={{
          backgroundColor: color,
          animation: 'pulse-active 2s ease-in-out infinite',
        }}
      />
    );
  }
  if (status === 'thinking') {
    return (
      <div className="w-3 h-3 relative">
        <div
          className="absolute inset-0 border border-t-transparent rounded-full"
          style={{
            borderColor: color,
            borderTopColor: 'transparent',
            animation: 'pulse-thinking 1s linear infinite',
          }}
        />
      </div>
    );
  }
  if (status === 'done') {
    return <span style={{ color, fontSize: '10px' }}>✓</span>;
  }
  return (
    <div
      className={baseClass}
      style={{ backgroundColor: color, opacity: 0.3 }}
    />
  );
}

function MonitorScreen({ agent, variant }: { agent: Agent; variant: 'code' | 'data' | 'holo' | 'art' | 'browse' | 'review' | 'command' }) {
  const isWide = variant === 'command' || variant === 'browse';

  return (
    <div
      className={`relative border rounded-sm overflow-hidden ${isWide ? 'w-16 h-10' : 'w-12 h-8'}`}
      style={{
        borderColor: agent.color + '40',
        backgroundColor: '#0a0e1a',
        boxShadow: agent.status === 'active' ? `0 0 8px ${agent.color}30` : 'none',
      }}
    >
      {/* Screen content */}
      {(variant === 'code' || variant === 'command') && <CodeStream color={agent.color} />}
      {(variant === 'data' || variant === 'holo') && <DataStream color={agent.color} />}
      {variant === 'art' && (
        <div className="absolute inset-1 grid grid-cols-4 grid-rows-3 gap-[1px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[1px]"
              style={{
                backgroundColor: ['#ff00aa', '#00f0ff', '#00ff88', '#ffaa00'][i % 4],
                opacity: 0.3 + Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      )}
      {variant === 'browse' && (
        <div className="absolute inset-1 flex flex-col gap-[2px]">
          <div className="h-1 rounded-full" style={{ backgroundColor: agent.color, opacity: 0.4, width: '60%' }} />
          <div className="h-1 rounded-full" style={{ backgroundColor: agent.color, opacity: 0.2, width: '80%' }} />
          <div className="h-1 rounded-full" style={{ backgroundColor: agent.color, opacity: 0.3, width: '40%' }} />
          <div className="h-1 rounded-full" style={{ backgroundColor: agent.color, opacity: 0.2, width: '70%' }} />
        </div>
      )}
      {variant === 'review' && (
        <div className="absolute inset-1 flex flex-col gap-[2px]">
          {[true, false, true, true, false].map((pass, i) => (
            <div key={i} className="flex items-center gap-[2px]">
              <span style={{ fontSize: '5px', color: pass ? '#00ff88' : '#ff4444' }}>{pass ? '✓' : '✗'}</span>
              <div className="h-[2px] flex-1 rounded-full" style={{ backgroundColor: pass ? '#00ff8830' : '#ff444430' }} />
            </div>
          ))}
        </div>
      )}

      {/* Screen glow */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ background: `radial-gradient(ellipse at center, ${agent.color}, transparent)` }}
      />

      {/* Cursor */}
      {agent.status !== 'idle' && (
        <div className="absolute bottom-1 right-1">
          <BlinkingCursor color={agent.color} />
        </div>
      )}
    </div>
  );
}

function PixelAvatar({ agent }: { agent: Agent }) {
  return (
    <div className="flex flex-col items-center gap-[2px]">
      {/* Head */}
      <div
        className="w-3 h-3 rounded-sm"
        style={{
          backgroundColor: agent.color + '80',
          boxShadow: agent.status === 'active' ? `0 0 4px ${agent.color}` : 'none',
        }}
      />
      {/* Body */}
      <div
        className="w-4 h-3 rounded-sm"
        style={{ backgroundColor: agent.color + '50' }}
      />
    </div>
  );
}

const VARIANT_MAP: Record<string, 'code' | 'data' | 'holo' | 'art' | 'browse' | 'review' | 'command'> = {
  Blink: 'command',
  Spark: 'code',
  Volt: 'holo',
  Pixel: 'art',
  Scout: 'browse',
  Echo: 'review',
  Cipher: 'data',
  Atlas: 'command',
};

export default function Workstation({ agent }: { agent: Agent }) {
  const variant = VARIANT_MAP[agent.name] || 'code';
  const hasDualMonitor = agent.name === 'Spark' || agent.name === 'Atlas';

  return (
    <div className="flex flex-col items-center gap-1 p-2">
      {/* Desk area */}
      <div
        className="relative p-3 rounded-md border"
        style={{
          backgroundColor: '#131629',
          borderColor: agent.color + '20',
          boxShadow: agent.status === 'active' ? `0 0 12px ${agent.color}15, inset 0 0 20px ${agent.color}05` : 'none',
        }}
      >
        {/* Status indicator */}
        <div className="absolute top-1 right-1">
          <StatusIndicator status={agent.status} color={agent.color} />
        </div>

        {/* Icon */}
        <div className="text-center mb-1" style={{ fontSize: '14px' }}>
          {agent.icon}
        </div>

        {/* Monitors */}
        <div className="flex gap-1 justify-center">
          <MonitorScreen agent={agent} variant={variant} />
          {hasDualMonitor && <MonitorScreen agent={agent} variant={variant === 'command' ? 'data' : 'code'} />}
        </div>

        {/* Avatar at desk */}
        <div className="flex justify-center mt-1">
          <PixelAvatar agent={agent} />
        </div>
      </div>

      {/* Name plate */}
      <div className="text-center">
        <div
          className="pixel-text font-bold"
          style={{ color: agent.color, fontSize: '9px' }}
        >
          {agent.name}
        </div>
        <div className="pixel-text" style={{ color: agent.color + '80', fontSize: '7px' }}>
          {agent.role}
        </div>
      </div>

      {/* Task label */}
      {agent.status !== 'idle' && agent.task && (
        <div
          className="pixel-text text-center max-w-24 truncate"
          style={{ fontSize: '6px', color: agent.color + '60' }}
        >
          {agent.task}
        </div>
      )}
    </div>
  );
}

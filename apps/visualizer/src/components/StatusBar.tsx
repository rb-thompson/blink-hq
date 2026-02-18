'use client';

import { useEffect, useState } from 'react';
import { AGENTS } from './types';

export default function StatusBar() {
  const [time, setTime] = useState('00:00:00');
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeCount = AGENTS.filter(a => a.status !== 'idle').length;
  const hours = Math.floor(uptime / 3600);
  const mins = Math.floor((uptime % 3600) / 60);
  const secs = uptime % 60;
  const uptimeStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-8 flex items-center justify-between px-4 z-50 border-t"
      style={{
        backgroundColor: '#0a0e1aee',
        borderColor: '#00f0ff20',
      }}
    >
      <div className="flex items-center gap-6 pixel-text" style={{ fontSize: '9px' }}>
        <span className="glow-cyan">BLINK HQ v0.1</span>
        <span style={{ color: '#6a6a8a' }}>│</span>
        <span style={{ color: '#00ff88' }}>
          AGENTS ONLINE: <span className="glow-green">{activeCount}/{AGENTS.length}</span>
        </span>
        <span style={{ color: '#6a6a8a' }}>│</span>
        <span style={{ color: '#ffaa00' }}>
          UPTIME: <span className="glow-amber">{uptimeStr}</span>
        </span>
      </div>
      <div className="flex items-center gap-6 pixel-text" style={{ fontSize: '9px' }}>
        <span style={{ color: '#00f0ff' }}>
          SYS: <span className="glow-cyan">{time} EST</span>
        </span>
        <span style={{ color: '#6a6a8a' }}>│</span>
        <span className="glow-green">STATUS: OPERATIONAL</span>
        <span
          className="inline-block w-2 h-2 rounded-full ml-1"
          style={{
            backgroundColor: '#00ff88',
            animation: 'pulse-active 2s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}

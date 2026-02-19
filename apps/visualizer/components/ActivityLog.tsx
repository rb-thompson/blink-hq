'use client';

import { useEffect, useState } from 'react';

interface LogEntry {
  id: number;
  time: string;
  agent: string;
  color: string;
  message: string;
}

const LOG_MESSAGES = [
  { agent: 'Blink', color: '#00f0ff', message: 'Dispatching task to Spark: build visualizer components' },
  { agent: 'Spark', color: '#00ff88', message: 'Writing Workstation.tsx — 247 lines' },
  { agent: 'Volt', color: '#ffaa00', message: 'Analyzing optimal layout patterns for 8 agents' },
  { agent: 'Pixel', color: '#ff00aa', message: 'Generating color palette variants' },
  { agent: 'Echo', color: '#00ff88', message: 'Review passed: StatusBar component ✓' },
  { agent: 'Cipher', color: '#ffaa00', message: 'Processing agent telemetry data stream' },
  { agent: 'Blink', color: '#00f0ff', message: 'All systems nominal — 8/8 agents reporting' },
  { agent: 'Scout', color: '#00f0ff', message: 'Scanning for new framework releases' },
  { agent: 'Atlas', color: '#ff00aa', message: 'Loaded 256K context window — ready for analysis' },
  { agent: 'Spark', color: '#00ff88', message: 'Compilation successful — 0 errors, 0 warnings' },
  { agent: 'Volt', color: '#ffaa00', message: 'Reasoning complete: recommended isometric layout' },
  { agent: 'Pixel', color: '#ff00aa', message: 'Asset generation: 8-bit avatars complete' },
  { agent: 'Echo', color: '#00ff88', message: 'Linting pass: all files clean ✓' },
  { agent: 'Cipher', color: '#ffaa00', message: 'Encrypted backup checkpoint saved' },
  { agent: 'Blink', color: '#00f0ff', message: 'Mission status: AHEAD OF SCHEDULE ⚡' },
];

export default function ActivityLog() {
  const [entries, setEntries] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Seed initial entries
    const now = new Date();
    const initial = LOG_MESSAGES.slice(0, 5).map((m, i) => ({
      id: i,
      time: new Date(now.getTime() - (5 - i) * 3000).toLocaleTimeString('en-US', { hour12: false }),
      ...m,
    }));
    setEntries(initial);

    let counter = 5;
    const interval = setInterval(() => {
      const msg = LOG_MESSAGES[counter % LOG_MESSAGES.length];
      const entry: LogEntry = {
        id: counter,
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        ...msg,
      };
      setEntries(prev => [...prev.slice(-12), entry]);
      counter++;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="border rounded-md p-2 overflow-hidden"
      style={{
        backgroundColor: '#0a0e1a',
        borderColor: '#00f0ff15',
        maxHeight: '160px',
      }}
    >
      <div className="pixel-text mb-1 pb-1 border-b" style={{ fontSize: '8px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
        ▸ ACTIVITY LOG
      </div>
      <div className="space-y-[2px] overflow-hidden">
        {entries.map(entry => (
          <div key={entry.id} className="flex gap-2 pixel-text" style={{ fontSize: '7px' }}>
            <span style={{ color: '#6a6a8a', flexShrink: 0 }}>{entry.time}</span>
            <span style={{ color: entry.color, flexShrink: 0, minWidth: '32px' }}>{entry.agent}</span>
            <span style={{ color: '#e0e0f080' }} className="truncate">{entry.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

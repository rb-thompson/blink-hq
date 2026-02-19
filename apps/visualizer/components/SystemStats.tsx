'use client';

import { useEffect, useState } from 'react';

interface Stat {
  label: string;
  value: string;
  color: string;
  barPercent: number;
}

export default function SystemStats() {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'CPU LOAD', value: '34%', color: '#00f0ff', barPercent: 34 },
    { label: 'MEMORY', value: '12.4 GB', color: '#00ff88', barPercent: 44 },
    { label: 'TOKENS/MIN', value: '2,847', color: '#ffaa00', barPercent: 71 },
    { label: 'TASKS TODAY', value: '127', color: '#ff00aa', barPercent: 63 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev =>
        prev.map(s => ({
          ...s,
          barPercent: Math.max(10, Math.min(95, s.barPercent + (Math.random() - 0.5) * 8)),
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="border rounded-md p-2"
      style={{
        backgroundColor: '#0a0e1a',
        borderColor: '#00f0ff15',
      }}
    >
      <div className="pixel-text mb-2 pb-1 border-b" style={{ fontSize: '8px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
        ▸ SYSTEM TELEMETRY
      </div>
      <div className="space-y-2">
        {stats.map(stat => (
          <div key={stat.label}>
            <div className="flex justify-between pixel-text mb-[2px]" style={{ fontSize: '7px' }}>
              <span style={{ color: stat.color }}>{stat.label}</span>
              <span style={{ color: stat.color + 'aa' }}>{stat.value}</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#ffffff08' }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${stat.barPercent}%`,
                  backgroundColor: stat.color,
                  boxShadow: `0 0 6px ${stat.color}60`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

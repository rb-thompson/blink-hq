'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';

type Status = 'online' | 'busy' | 'idle';

interface Agent {
  name: string;
  role: string;
  model: string;
  status: Status;
  icon: string;
  color: string;
  task: string;
}

const AGENTS: Agent[] = [
  { name: 'Blink', role: 'Commander', model: 'anthropic/claude-opus-4-6', status: 'busy', icon: '⚡', color: '#00f0ff', task: 'Orchestrating squad' },
  { name: 'Spark', role: 'Coder', model: 'anthropic/claude-sonnet-4-6', status: 'busy', icon: '🔥', color: '#00ff88', task: 'Building components' },
  { name: 'Volt', role: 'Reasoner', model: 'xai/grok-4-1-fast', status: 'busy', icon: '🧠', color: '#ffaa00', task: 'Architecture analysis' },
  { name: 'Pixel', role: 'Creative', model: 'anthropic/claude-sonnet-4-6', status: 'online', icon: '🎨', color: '#ff00aa', task: 'Design ready' },
  { name: 'Scout', role: 'Researcher', model: 'xai/grok-4-1-fast', status: 'idle', icon: '🔍', color: '#00f0ff', task: 'Standing by' },
  { name: 'Echo', role: 'Reviewer', model: 'anthropic/claude-haiku-4-5', status: 'online', icon: '✓', color: '#00ff88', task: 'Monitoring' },
  { name: 'Cipher', role: 'Data', model: 'xai/grok-code-fast-1', status: 'busy', icon: '🔐', color: '#ffaa00', task: 'Processing streams' },
  { name: 'Atlas', role: 'Long Context', model: 'nvidia/moonshotai/kimi-k2.5', status: 'idle', icon: '🗺️', color: '#ff00aa', task: 'Standing by' },
];

const ACTIVITIES = [
  { agent: 'Blink', color: '#00f0ff', msg: 'Dispatched build task to Spark' },
  { agent: 'Spark', color: '#00ff88', msg: 'Compiled visualizer — 0 errors ✓' },
  { agent: 'Volt', color: '#ffaa00', msg: 'Reasoning: optimal agent layout' },
  { agent: 'Echo', color: '#00ff88', msg: 'Code review passed: StatusBar.tsx' },
  { agent: 'Cipher', color: '#ffaa00', msg: 'Telemetry snapshot saved' },
  { agent: 'Pixel', color: '#ff00aa', msg: 'Generated avatar sprite sheet' },
  { agent: 'Blink', color: '#00f0ff', msg: 'System health check: ALL GREEN' },
  { agent: 'Scout', color: '#00f0ff', msg: 'Found 3 new framework updates' },
  { agent: 'Atlas', color: '#ff00aa', msg: 'Context buffer: 184K / 256K' },
  { agent: 'Spark', color: '#00ff88', msg: 'Hot reload: page.tsx updated' },
];

const TASKS = [
  { id: 1, name: 'Build visualizer v0.1', agent: 'Spark', status: 'active' as const, progress: 78 },
  { id: 2, name: 'Design agent avatars', agent: 'Pixel', status: 'completed' as const, progress: 100 },
  { id: 3, name: 'Analyze layout patterns', agent: 'Volt', status: 'active' as const, progress: 45 },
  { id: 4, name: 'Web research: pixel art libs', agent: 'Scout', status: 'pending' as const, progress: 0 },
  { id: 5, name: 'Review PR #001', agent: 'Echo', status: 'completed' as const, progress: 100 },
  { id: 6, name: 'Process telemetry data', agent: 'Cipher', status: 'active' as const, progress: 62 },
];

function StatusDot({ status, color }: { status: Status; color: string }) {
  if (status === 'busy') return (
    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, animation: 'pulse 1.5s infinite', boxShadow: `0 0 6px ${color}` }} />
  );
  if (status === 'online') return (
    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, opacity: 0.7 }} />
  );
  return <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#6a6a8a', opacity: 0.4 }} />;
}

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="border rounded-md p-3" style={{ backgroundColor: '#1a1f3a', borderColor: agent.color + '20' }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '16px' }}>{agent.icon}</span>
          <div>
            <div className="pixel-text" style={{ fontSize: '10px', color: agent.color }}>{agent.name}</div>
            <div className="pixel-text" style={{ fontSize: '7px', color: '#6a6a8a' }}>{agent.role}</div>
          </div>
        </div>
        <StatusDot status={agent.status} color={agent.color} />
      </div>
      <div className="pixel-text" style={{ fontSize: '6px', color: '#6a6a8a', marginBottom: '4px' }}>{agent.model}</div>
      <div className="pixel-text" style={{ fontSize: '7px', color: agent.color + 'aa' }}>{agent.task}</div>
    </div>
  );
}

export default function Dashboard() {
  const [activityLog, setActivityLog] = useState(ACTIVITIES.slice(0, 5).map((a, i) => ({ ...a, id: i, time: '--:--:--' })));
  const [time, setTime] = useState('--:--:--');
  const [uptime, setUptime] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Set initial times on client
    const now = new Date();
    setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    setActivityLog(prev => prev.map((entry, i) => ({
      ...entry,
      time: new Date(now.getTime() - (4 - i) * 3000).toLocaleTimeString('en-US', { hour12: false })
    })));

    const interval = setInterval(() => {
      const act = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
      setActivityLog(prev => [...prev.slice(-7), { 
        ...act, 
        id: Date.now(), 
        time: new Date().toLocaleTimeString('en-US', { hour12: false }) 
      }]);
    }, 4000);

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
      setUptime(p => p + 1);
    }, 1000);

    return () => { clearInterval(interval); clearInterval(timer); };
  }, []);

  const busyCount = AGENTS.filter(a => a.status === 'busy').length;
  const onlineCount = AGENTS.filter(a => a.status !== 'idle').length;

  // Don't render dynamic time content until client-side
  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Sidebar />
        <div className="pl-16">
          <div className="p-4">
            <div className="text-center mb-6">
              <h1 className="pixel-text" style={{ fontSize: '20px', letterSpacing: '0.3em', color: '#e0e0f0' }}>
                BLINK HQ — MISSION CONTROL
              </h1>
              <div className="pixel-text mt-1" style={{ fontSize: '8px', color: '#6a6a8a' }}>
                AGENT ORCHESTRATION DASHBOARD // LOADING...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="pl-16">
        <div className="p-4">
          <div className="text-center mb-6">
            <h1 className="pixel-text" style={{ fontSize: '20px', letterSpacing: '0.3em', color: '#e0e0f0' }}>
              BLINK HQ — MISSION CONTROL
            </h1>
            <div className="pixel-text mt-1" style={{ fontSize: '8px', color: '#6a6a8a' }}>
              AGENT ORCHESTRATION DASHBOARD // {time} EST
            </div>
          </div>

          <div className="flex justify-center gap-8 mb-6">
            {[
              { label: 'AGENTS', value: `${onlineCount}/${AGENTS.length}`, color: '#00f0ff' },
              { label: 'ACTIVE', value: String(busyCount), color: '#00ff88' },
              { label: 'TASKS TODAY', value: '127', color: '#ffaa00' },
              { label: 'TOKENS', value: '48.2K', color: '#ff00aa' },
              { label: 'UPTIME', value: `${Math.floor(uptime / 60)}m ${uptime % 60}s`, color: '#00f0ff' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="pixel-text" style={{ fontSize: '7px', color: '#6a6a8a' }}>{s.label}</div>
                <div className="pixel-text" style={{ fontSize: '14px', color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <div className="border rounded-md p-3 mb-3" style={{ backgroundColor: '#131629', borderColor: '#00f0ff15' }}>
                <div className="pixel-text mb-3 pb-2 border-b" style={{ fontSize: '9px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
                  ▸ AGENT ROSTER
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {AGENTS.map(a => <AgentCard key={a.name} agent={a} />)}
                </div>
              </div>
            </div>

            <div className="col-span-5 flex flex-col gap-4">
              <div className="border rounded-md p-3" style={{ backgroundColor: '#131629', borderColor: '#00f0ff15' }}>
                <div className="pixel-text mb-3 pb-2 border-b" style={{ fontSize: '9px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
                  ▸ TASK QUEUE
                </div>
                <div className="space-y-2">
                  {TASKS.map(task => (
                    <div key={task.id} className="flex items-center gap-3 p-2 rounded" style={{ backgroundColor: '#1a1f3a' }}>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="pixel-text" style={{ fontSize: '8px', color: '#e0e0f0' }}>{task.name}</span>
                          <span className="pixel-text" style={{
                            fontSize: '7px',
                            color: task.status === 'completed' ? '#00ff88' : task.status === 'active' ? '#ffaa00' : '#6a6a8a',
                          }}>
                            {task.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="pixel-text" style={{ fontSize: '6px', color: '#6a6a8a' }}>{task.agent}</span>
                          <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: '#ffffff08' }}>
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${task.progress}%`,
                                backgroundColor: task.status === 'completed' ? '#00ff88' : task.status === 'active' ? '#ffaa00' : '#6a6a8a',
                              }}
                            />
                          </div>
                          <span className="pixel-text" style={{ fontSize: '6px', color: '#6a6a8a' }}>{task.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-md p-3 flex-1" style={{ backgroundColor: '#131629', borderColor: '#00f0ff15' }}>
                <div className="pixel-text mb-3 pb-2 border-b" style={{ fontSize: '9px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
                  ▸ ACTIVITY FEED
                </div>
                <div className="space-y-1">
                  {activityLog.map(entry => (
                    <div key={entry.id} className="flex gap-2 pixel-text" style={{ fontSize: '7px', animation: 'slide-in 0.3s ease-out' }}>
                      <span style={{ color: '#6a6a8a', flexShrink: 0 }}>{entry.time}</span>
                      <span style={{ color: entry.color, flexShrink: 0, minWidth: '36px' }}>{entry.agent}</span>
                      <span style={{ color: '#e0e0f080' }}>{entry.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-3 flex flex-col gap-4">
              <div className="border rounded-md p-3" style={{ backgroundColor: '#131629', borderColor: '#00f0ff15' }}>
                <div className="pixel-text mb-3 pb-2 border-b" style={{ fontSize: '9px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
                  ▸ SYSTEM HEALTH
                </div>
                {[
                  { label: 'CPU', value: 34, color: '#00f0ff' },
                  { label: 'MEMORY', value: 44, color: '#00ff88' },
                  { label: 'DISK', value: 2, color: '#ffaa00' },
                  { label: 'NETWORK', value: 18, color: '#ff00aa' },
                ].map(m => (
                  <div key={m.label} className="mb-2">
                    <div className="flex justify-between pixel-text" style={{ fontSize: '7px' }}>
                      <span style={{ color: m.color }}>{m.label}</span>
                      <span style={{ color: m.color + 'aa' }}>{m.value}%</span>
                    </div>
                    <div className="h-1 rounded-full mt-[2px]" style={{ backgroundColor: '#ffffff08' }}>
                      <div className="h-full rounded-full" style={{ width: `${m.value}%`, backgroundColor: m.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="border rounded-md p-3" style={{ backgroundColor: '#131629', borderColor: '#00f0ff15' }}>
                <div className="pixel-text mb-3 pb-2 border-b" style={{ fontSize: '9px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
                  ▸ PROVIDERS
                </div>
                {[
                  { name: 'Anthropic', status: 'connected', color: '#00ff88' },
                  { name: 'xAI', status: 'connected', color: '#00ff88' },
                  { name: 'NVIDIA', status: 'connected', color: '#00ff88' },
                ].map(p => (
                  <div key={p.name} className="flex items-center justify-between mb-1">
                    <span className="pixel-text" style={{ fontSize: '8px', color: '#e0e0f0' }}>{p.name}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="pixel-text" style={{ fontSize: '6px', color: p.color }}>{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border rounded-md p-3" style={{ backgroundColor: '#131629', borderColor: '#00f0ff15' }}>
                <div className="pixel-text mb-3 pb-2 border-b" style={{ fontSize: '9px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
                  ▸ QUICK ACTIONS
                </div>
                {['Deploy Squad', 'Run Diagnostics', 'Open Visualizer', 'View Logs'].map(action => (
                  <button
                    key={action}
                    className="w-full mb-1 py-1.5 px-2 rounded pixel-text text-left border transition-colors hover:bg-white/5"
                    style={{ fontSize: '8px', color: '#00f0ff', borderColor: '#00f0ff20', backgroundColor: 'transparent' }}
                  >
                    {'>'} {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
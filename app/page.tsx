'use client';

import { useEffect, useState, useCallback } from 'react';
import RestartButton from '../components/RestartButton';

interface Session {
  id: string;
  model?: string;
  totalTokens?: number;
  contextTokens?: number;
  lastActive?: string;
  transcriptPath?: string;
}

interface SubAgent {
  id: string;
  label?: string;
  status?: string;
  model?: string;
}

interface HistorySparklines {
  cpu: number[];
  ram_pct: number[];
  gpu_util: number[];
}

interface SystemStats {
  current: { /* new shape */ };
  historySparklines: HistorySparklines;
  // ...
}

interface SessionStatus {
  model?: string;
  totalTokens?: number;
  contextTokens?: number;
}

interface TranscriptMessage {
  role?: string;
  content?: string | { type: string; text?: string }[];
  timestamp?: string;
}

function formatBytes(bytes: number): string {
  const gb = bytes / (1024 * 1024 * 1024);
  if (gb >= 1) return `${gb.toFixed(1)}GB`;
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(0)}MB`;
}

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function getContentText(content: string | { type: string; text?: string }[] | undefined): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    const textPart = content.find(c => c.type === 'text');
    return textPart?.text ?? '';
  }
  return '';
}

export default function Dashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [subAgents, setSubAgents] = useState<SubAgent[]>([]);
  const [sessionStatus, setSessionStatus] = useState<SessionStatus | null>(null);
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [historyData, setHistoryData] = useState<HistorySparklines>({ cpu: [], ram_pct: [] });
  const [gatewayOk, setGatewayOk] = useState<boolean | null>(null);
  const [recentMessages, setRecentMessages] = useState<TranscriptMessage[]>([]);
  const [time, setTime] = useState('--:--:--');
  const [mounted, setMounted] = useState(false);

  const fetchData = async () => {
    try {
      // Fetch sessions
      const sessRes = await fetch('/api/openclaw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'sessions_list', args: { limit: 20, messageLimit: 3 } }),
      });
      if (sessRes.ok) {
        const sessData = await sessRes.json();
        const sessArray: Session[] = Array.isArray(sessData) ? sessData : (sessData?.sessions ?? []);
        setSessions(sessArray);
        setGatewayOk(true);
      // removed else to fix parsing

        // Fetch recent messages from primary session's transcript
        const primarySession = sessArray[0];
        if (primarySession?.transcriptPath) {
          try {
            const logsRes = await fetch(`/api/logs?path=${encodeURIComponent(primarySession.transcriptPath)}`);
            if (logsRes.ok) {
              const logs = await logsRes.json();
              if (Array.isArray(logs)) {
                setRecentMessages(logs.slice(-6));
              }
            }
          } catch { /* ignore */ }
        }
      } else {
        setGatewayOk(false);
      }
    } catch (e) {
      setGatewayOk(false);
      console.warn('OpenClaw offline - data will show 0. Run: openclaw gateway start', e);
    }

    try {
      // Fetch sub-agents
      const saRes = await fetch('/api/openclaw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'subagents', args: { action: 'list' } }),
      });
      if (saRes.ok) {
        const saData = await saRes.json();
        const agentsArray: SubAgent[] = Array.isArray(saData) ? saData : (saData?.agents ?? saData?.subagents ?? []);
        setSubAgents(agentsArray);
      }
      if (!saRes.ok) {
        console.warn('OpenClaw subagents fetch failed');
      }
    } catch (e) {
      console.warn('OpenClaw subagents error', e);
    }

    try {
      // Fetch session status
      const statusRes = await fetch('/api/openclaw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'session_status', args: {} }),
      });
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        setSessionStatus(statusData);
      }
    } catch { /* ignore */ }

    try {
      // Fetch system stats
      const sysRes = await fetch('/api/system');
      if (sysRes.ok) {
        const sysData = await sysRes.json();
        setSystemStats(sysData);
        setHistoryData(sysData.historySparklines ?? { cpu: [], ram_pct: [] });
      }
    } catch { /* ignore */ }
  };

  useEffect(() => {
    setMounted(true);
    fetchData();
    const poll = setInterval(fetchData, 5000);
    const tick = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    return () => { clearInterval(poll); clearInterval(tick); };
  }, [fetchData]);

  const primarySession = sessions[0] ?? null;
  const model = sessionStatus?.model ?? primarySession?.model ?? 'claude-opus-4-6';
  const totalTokens = sessionStatus?.totalTokens ?? primarySession?.totalTokens ?? 0;
  const contextTokens = sessionStatus?.contextTokens ?? primarySession?.contextTokens ?? 200000;
  const tokenPct = contextTokens > 0 ? Math.round((totalTokens / contextTokens) * 100) : 0;

  if (!mounted) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="pixel-text glow-cyan" style={{ fontSize: '12px' }}>
          INITIALIZING...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="pixel-text" style={{ fontSize: '18px', letterSpacing: '0.3em', color: '#e0e0f0' }}>
          BLINK HQ — MISSION CONTROL
        </h1>
        <div className="pixel-text mt-1" style={{ fontSize: '8px', color: '#6a6a8a' }}>
          AGENT ORCHESTRATION DASHBOARD // {time}
        </div>
      </div>

      {/* Top stats bar */}
      <div className="flex justify-between items-center mb-5 flex-wrap">
        <div className="flex gap-8 flex-wrap">
          {[
            { label: 'SESSIONS', value: String(sessions.length), color: '#00f0ff' },
            { label: 'SUB-AGENTS', value: String(subAgents.length), color: '#00ff88' },
            { label: 'TOKENS', value: totalTokens > 0 ? `${(totalTokens / 1000).toFixed(1)}K` : '—', color: '#ffaa00' },
            { label: 'CTX %', value: `${tokenPct}%`, color: tokenPct > 80 ? '#ff00aa' : '#ffaa00' },
            { label: 'UPTIME', value: systemStats ? formatUptime(systemStats.uptime) : '—', color: '#00f0ff' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="pixel-text" style={{ fontSize: '7px', color: '#6a6a8a' }}>{s.label}</div>
              <div className="pixel-text" style={{ fontSize: '14px', color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
        <RestartButton className="ml-4" />
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4">

        {/* Left: Current session (Blink) */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="border rounded-md p-3" style={{ backgroundColor: '#131629', borderColor: '#00f0ff20' }}>
            <div className="pixel-text mb-3 pb-2 border-b" style={{ fontSize: '9px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
              ▸ COMMANDER SESSION
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: '20px' }}>⚡</span>
              <div>
                <div className="pixel-text glow-cyan" style={{ fontSize: '11px' }}>BLINK</div>
                <div className="pixel-text" style={{ fontSize: '7px', color: '#6a6a8a' }}>Commander</div>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full" style={{
                backgroundColor: '#00ff88',
                boxShadow: '0 0 6px #00ff88',
                animation: 'pulse 1.5s infinite',
              }} />
            </div>
            <div className="pixel-text mb-2" style={{ fontSize: '7px', color: '#6a6a8a' }}>
              MODEL: <span style={{ color: '#00f0ff' }}>{model.split('/').pop()}</span>
            </div>
            <div className="pixel-text mb-1" style={{ fontSize: '7px', color: '#6a6a8a' }}>
              TOKENS: {totalTokens.toLocaleString()} / {contextTokens.toLocaleString()}
            </div>
            <div className="h-1.5 rounded-full mb-2" style={{ backgroundColor: '#ffffff08' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(tokenPct, 100)}%`,
                  backgroundColor: tokenPct > 80 ? '#ff00aa' : tokenPct > 50 ? '#ffaa00' : '#00f0ff',
                  boxShadow: tokenPct > 80 ? '0 0 6px #ff00aa' : '0 0 4px #00f0ff40',
                }}
              />
            </div>
            <div className="pixel-text" style={{ fontSize: '6px', color: '#6a6a8a' }}>
              CONTEXT: {tokenPct}% USED
            </div>
          </div>

          {/* OpenClaw status */}
          <div className="border rounded-md p-3" style={{ backgroundColor: '#131629', borderColor: '#00f0ff15' }}>
            <div className="pixel-text mb-3 pb-2 border-b" style={{ fontSize: '9px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
              ▸ OPENCLAW STATUS
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="pixel-text" style={{ fontSize: '8px', color: '#e0e0f0' }}>Gateway</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{
                  backgroundColor: gatewayOk === null ? '#6a6a8a' : gatewayOk ? '#00ff88' : '#ff00aa',
                  boxShadow: gatewayOk ? '0 0 4px #00ff88' : undefined,
                }} />
                <span className="pixel-text" style={{ fontSize: '6px', color: gatewayOk === null ? '#6a6a8a' : gatewayOk ? '#00ff88' : '#ff00aa' }}>
                  {gatewayOk === null ? 'checking' : gatewayOk ? 'connected' : 'offline'}
                </span>
              </div>
            </div>
            <div className="pixel-text" style={{ fontSize: '6px', color: '#6a6a8a' }}>
              127.0.0.1:18789
            </div>
            <RestartButton />
          </div>
        </div>

        {/* Center: Sub-agents + Activity feed */}
        <div className="col-span-6 flex flex-col gap-4">
          {/* Active sub-agents */}
          <div className="border rounded-md p-3" style={{ backgroundColor: '#131629', borderColor: '#00f0ff15' }}>
            <div className="pixel-text mb-3 pb-2 border-b" style={{ fontSize: '9px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
              ▸ ACTIVE SUB-AGENTS ({subAgents.length})
            </div>
            {subAgents.length === 0 ? (
              <div className="pixel-text text-center py-4" style={{ fontSize: '8px', color: '#6a6a8a' }}>
                No sub-agents running
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {subAgents.map((agent) => (
                  <div key={agent.id} className="border rounded p-2" style={{ backgroundColor: '#1a1f3a', borderColor: '#00f0ff20' }}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="pixel-text" style={{ fontSize: '9px', color: '#00f0ff' }}>
                        {agent.label ?? agent.id}
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full" style={{
                        backgroundColor: agent.status === 'running' ? '#00ff88' : '#ffaa00',
                        animation: 'pulse 1.5s infinite',
                      }} />
                    </div>
                    {agent.model && (
                      <div className="pixel-text" style={{ fontSize: '6px', color: '#6a6a8a' }}>
                        {agent.model.split('/').pop()}
                      </div>
                    )}
                    {agent.status && (
                      <div className="pixel-text mt-1" style={{ fontSize: '6px', color: '#ffaa00' }}>
                        {agent.status}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity feed */}
          <div className="border rounded-md p-3 flex-1" style={{ backgroundColor: '#131629', borderColor: '#00f0ff15' }}>
            <div className="pixel-text mb-3 pb-2 border-b" style={{ fontSize: '9px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
              ▸ RECENT TRANSCRIPT
            </div>
            {recentMessages.length === 0 ? (
              <div className="pixel-text text-center py-4" style={{ fontSize: '8px', color: '#6a6a8a' }}>
                No transcript data
              </div>
            ) : (
              <div className="space-y-2 overflow-y-auto" style={{ maxHeight: '200px' }}>
                {recentMessages.map((msg, i) => {
                  const text = getContentText(msg.content);
                  const isUser = msg.role === 'user';
                  return (
                    <div key={i} className="flex gap-2 pixel-text" style={{ fontSize: '7px', animation: 'slide-in 0.3s ease-out' }}>
                      <span style={{ color: isUser ? '#ffaa00' : '#00f0ff', flexShrink: 0, minWidth: '52px' }}>
                        {isUser ? 'USER' : 'BLINK'}
                      </span>
                      <span style={{ color: '#e0e0f080' }}>
                        {text.slice(0, 120)}{text.length > 120 ? '...' : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: System health */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="border rounded-md p-3" style={{ backgroundColor: '#131629', borderColor: '#00f0ff15' }}>
            <div className="pixel-text mb-3 pb-2 border-b" style={{ fontSize: '9px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
              ▸ SYSTEM HEALTH
            </div>
            {[
              { label: 'CPU', value: systemStats?.current?.cpu?.avg ?? 0, color: '#00f0ff' },
              { label: 'MEMORY', value: systemStats?.current?.ram?.pct ?? 0, color: '#00ff88' },
            ].map(m => (
              <div key={m.label} className="mb-3">
                <div className="flex justify-between pixel-text mb-1" style={{ fontSize: '7px' }}>
                  <span style={{ color: m.color }}>{m.label}</span>
                  <span style={{ color: m.color + 'aa' }}>{m.value}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ backgroundColor: '#ffffff08' }}>
                  <div className="h-full rounded-full transition-all" style={{
                    width: `${m.value}%`,
                    backgroundColor: m.value > 80 ? '#ff00aa' : m.color,
                    boxShadow: `0 0 4px ${m.color}40`,
                  }} />
                </div>
              </div>
            ))}
            {systemStats && (
              <>
                <div className="pixel-text mb-1" style={{ fontSize: '7px', color: '#6a6a8a' }}>
                  MEM: <span style={{ color: '#00ff88' }}>
                    {formatBytes(systemStats.memory.used)} / {formatBytes(systemStats.memory.total)}
                  </span>
                </div>
                <div className="pixel-text" style={{ fontSize: '7px', color: '#6a6a8a' }}>
                  LOAD: <span style={{ color: '#ffaa00' }}>
                    {systemStats.loadAvg[0]?.toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Sessions list */}
          <div className="border rounded-md p-3 flex-1" style={{ backgroundColor: '#131629', borderColor: '#00f0ff15' }}>
            <div className="pixel-text mb-3 pb-2 border-b" style={{ fontSize: '9px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
              ▸ SESSIONS ({sessions.length})
            </div>
            {sessions.length === 0 ? (
              <div className="pixel-text" style={{ fontSize: '7px', color: '#6a6a8a' }}>No sessions</div>
            ) : (
              <div className="space-y-2">
                {sessions.slice(0, 5).map((sess, i) => (
                  <div key={sess.id} className="p-1.5 rounded" style={{ backgroundColor: '#1a1f3a' }}>
                    <div className="pixel-text" style={{ fontSize: '7px', color: i === 0 ? '#00f0ff' : '#e0e0f080' }}>
                      {i === 0 ? '⚡ ' : '  '}{sess.id.slice(0, 12)}...
                    </div>
                    {sess.model && (
                      <div className="pixel-text" style={{ fontSize: '6px', color: '#6a6a8a' }}>
                        {sess.model.split('/').pop()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

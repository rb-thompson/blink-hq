'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface Session {
  id: string;
  transcriptPath?: string;
  model?: string;
}

interface LogEntry {
  role?: string;
  content?: string | { type: string; text?: string }[];
  timestamp?: string;
  usage?: { input_tokens?: number; output_tokens?: number };
  type?: string;
}

function getContentText(content: string | { type: string; text?: string }[] | undefined): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .filter(c => c.type === 'text' && c.text)
      .map(c => c.text ?? '')
      .join(' ');
  }
  return '';
}

function formatTs(ts: string | undefined): string {
  if (!ts) return '--:--:--';
  try {
    return new Date(ts).toLocaleTimeString('en-US', { hour12: false });
  } catch {
    return ts.slice(0, 8);
  }
}

export default function LogsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch('/api/openclaw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'sessions_list', args: { limit: 20, messageLimit: 0 } }),
      });
      if (res.ok) {
        const data = await res.json();
        const arr: Session[] = Array.isArray(data) ? data : (data?.sessions ?? []);
        setSessions(arr);
        if (arr.length > 0 && !selectedSession) {
          setSelectedSession(arr[0]);
        }
      }
    } catch { /* ignore */ }
  }, [selectedSession]);

  const fetchLogs = useCallback(async (session: Session) => {
    if (!session.transcriptPath) {
      setError('No transcript path for this session');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/logs?path=${encodeURIComponent(session.transcriptPath)}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setLogs(data);
          setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        } else if (data.error) {
          setError(data.error);
        }
      } else {
        setError('Failed to load logs');
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  useEffect(() => {
    if (selectedSession) {
      fetchLogs(selectedSession);
    }
  }, [selectedSession, fetchLogs]);

  return (
    <div className="min-h-screen p-4 flex flex-col" style={{ maxHeight: '100vh' }}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="pixel-text" style={{ fontSize: '16px', letterSpacing: '0.3em', color: '#e0e0f0' }}>
            SESSION LOGS
          </h1>
          <div className="pixel-text mt-1" style={{ fontSize: '7px', color: '#6a6a8a' }}>
            TRANSCRIPT VIEWER // {logs.length} ENTRIES
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedSession && (
            <button
              onClick={() => fetchLogs(selectedSession)}
              className="pixel-text px-3 py-2 rounded border transition-colors hover:bg-white/5"
              style={{ fontSize: '8px', color: '#00f0ff', borderColor: '#00f0ff40' }}
            >
              ↻ REFRESH
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Session selector */}
        <div className="flex-shrink-0" style={{ width: '240px' }}>
          <div className="border rounded-md p-3" style={{ backgroundColor: '#131629', borderColor: '#00f0ff15' }}>
            <div className="pixel-text mb-3 pb-2 border-b" style={{ fontSize: '9px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
              ▸ SESSIONS ({sessions.length})
            </div>
            {sessions.length === 0 ? (
              <div className="pixel-text" style={{ fontSize: '7px', color: '#6a6a8a' }}>
                No sessions found
              </div>
            ) : (
              <div className="space-y-1">
                {sessions.map((sess, i) => (
                  <button
                    key={sess.id}
                    onClick={() => setSelectedSession(sess)}
                    className="w-full text-left p-2 rounded border transition-colors hover:bg-white/5"
                    style={{
                      backgroundColor: selectedSession?.id === sess.id ? '#1a1f3a' : 'transparent',
                      borderColor: selectedSession?.id === sess.id ? '#00f0ff30' : 'transparent',
                    }}
                  >
                    <div className="pixel-text" style={{ fontSize: '7px', color: i === 0 ? '#00f0ff' : '#e0e0f080' }}>
                      {i === 0 ? '⚡ ' : '  '}{sess.id.slice(0, 14)}...
                    </div>
                    {sess.model && (
                      <div className="pixel-text mt-0.5" style={{ fontSize: '6px', color: '#6a6a8a' }}>
                        {sess.model.split('/').pop()}
                      </div>
                    )}
                    {sess.transcriptPath ? (
                      <div className="pixel-text mt-0.5" style={{ fontSize: '5px', color: '#6a6a8a40' }}>
                        has transcript
                      </div>
                    ) : (
                      <div className="pixel-text mt-0.5" style={{ fontSize: '5px', color: '#ff00aa40' }}>
                        no transcript
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Log viewer */}
        <div className="flex-1 min-w-0 border rounded-md flex flex-col" style={{ backgroundColor: '#131629', borderColor: '#00f0ff15' }}>
          <div className="pixel-text p-3 pb-2 border-b flex-shrink-0" style={{ fontSize: '9px', color: '#6a6a8a', borderColor: '#ffffff10' }}>
            ▸ TRANSCRIPT{selectedSession ? ` — ${selectedSession.id.slice(0, 20)}...` : ''}
          </div>
          <div
            className="flex-1 overflow-y-auto p-3 space-y-2"
            style={{ minHeight: 0 }}
          >
            {loading && (
              <div className="pixel-text text-center py-8" style={{ fontSize: '8px', color: '#6a6a8a' }}>
                LOADING...
              </div>
            )}
            {error && (
              <div className="pixel-text text-center py-4" style={{ fontSize: '7px', color: '#ff00aa' }}>
                {error}
              </div>
            )}
            {!loading && !error && logs.length === 0 && (
              <div className="pixel-text text-center py-8" style={{ fontSize: '8px', color: '#6a6a8a' }}>
                {selectedSession ? 'No log entries found' : 'Select a session to view logs'}
              </div>
            )}
            {!loading && logs.map((entry, i) => {
              const isUser = entry.role === 'user';
              const isAssistant = entry.role === 'assistant';
              const text = getContentText(entry.content);
              const color = isUser ? '#ffaa00' : isAssistant ? '#00f0ff' : '#6a6a8a';
              const roleLabel = isUser ? 'USER' : isAssistant ? 'BLINK' : (entry.role ?? entry.type ?? 'SYS').toUpperCase();

              return (
                <div
                  key={i}
                  className="border-l-2 pl-3 py-1"
                  style={{
                    borderColor: color + '40',
                    backgroundColor: '#0a0e1a40',
                    borderRadius: '0 4px 4px 0',
                    animation: 'slide-in 0.2s ease-out',
                  }}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className="pixel-text" style={{ fontSize: '7px', color, minWidth: '40px' }}>
                      {roleLabel}
                    </span>
                    <span className="pixel-text" style={{ fontSize: '6px', color: '#6a6a8a' }}>
                      {formatTs(entry.timestamp)}
                    </span>
                    {entry.usage && (
                      <span className="pixel-text" style={{ fontSize: '6px', color: '#6a6a8a40' }}>
                        in:{entry.usage.input_tokens ?? 0} out:{entry.usage.output_tokens ?? 0}
                      </span>
                    )}
                  </div>
                  {text && (
                    <div className="pixel-text" style={{ fontSize: '7px', color: '#e0e0f080', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {text.slice(0, 400)}{text.length > 400 ? '...' : ''}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

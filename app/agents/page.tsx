'use client';

import { useEffect, useState } from 'react';
import RestartButton from '../../components/RestartButton';

interface Agent {
  id: string;
  name: string;
  icon: string;
  color: string;
  role: string;
  defaultModel: string;
  description: string;
}

const BLANK_AGENT: Omit<Agent, 'id'> = {
  name: '',
  icon: '🤖',
  color: '#00f0ff',
  role: '',
  defaultModel: 'anthropic/claude-sonnet-4-6',
  description: '',
};

function AgentCard({
  agent,
  onEdit,
  onDelete,
}: {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="border rounded-md p-3" style={{ backgroundColor: '#1a1f3a', borderColor: agent.color + '30' }}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '20px' }}>{agent.icon}</span>
          <div>
            <div className="pixel-text" style={{ fontSize: '10px', color: agent.color }}>{agent.name}</div>
            <div className="pixel-text" style={{ fontSize: '7px', color: '#6a6a8a' }}>{agent.role}</div>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(agent)}
            className="pixel-text px-2 py-1 rounded border hover:bg-white/5 transition-colors"
            style={{ fontSize: '6px', color: '#00f0ff', borderColor: '#00f0ff20' }}
          >
            EDIT
          </button>
          <button
            onClick={() => onDelete(agent.id)}
            className="pixel-text px-2 py-1 rounded border hover:bg-white/5 transition-colors"
            style={{ fontSize: '6px', color: '#ff00aa', borderColor: '#ff00aa20' }}
          >
            DEL
          </button>
        </div>
      </div>
      <div className="pixel-text mb-1" style={{ fontSize: '6px', color: '#6a6a8a' }}>
        {agent.defaultModel}
      </div>
      <div className="pixel-text" style={{ fontSize: '7px', color: '#e0e0f080' }}>
        {agent.description}
      </div>
    </div>
  );
}

function EditModal({
  agent,
  onSave,
  onCancel,
}: {
  agent: Partial<Agent> & { id?: string };
  onSave: (agent: Agent) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Omit<Agent, 'id'>>({
    name: agent.name ?? '',
    icon: agent.icon ?? '🤖',
    color: agent.color ?? '#00f0ff',
    role: agent.role ?? '',
    defaultModel: agent.defaultModel ?? 'anthropic/claude-sonnet-4-6',
    description: agent.description ?? '',
  });

  const field = (key: keyof typeof form, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    const id = agent.id ?? form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    onSave({ id, ...form });
  };

  const inputStyle = {
    backgroundColor: '#0a0e1a',
    border: '1px solid #00f0ff20',
    borderRadius: '4px',
    color: '#e0e0f0',
    padding: '4px 8px',
    fontFamily: 'Courier New, monospace',
    fontSize: '10px',
    width: '100%',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '4px',
    color: '#6a6a8a',
    fontFamily: 'Courier New, monospace',
    fontSize: '7px',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: '#0a0e1acc',
      zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div className="border rounded-lg p-5" style={{ backgroundColor: '#131629', borderColor: '#00f0ff30', width: '400px', maxWidth: '90vw' }}>
        <div className="pixel-text mb-4" style={{ fontSize: '11px', color: '#00f0ff' }}>
          {agent.id ? '▸ EDIT AGENT' : '▸ NEW AGENT'}
        </div>
        <div className="space-y-3">
          <div>
            <label style={labelStyle}>Name</label>
            <input style={inputStyle} value={form.name} onChange={e => field('name', e.target.value)} placeholder="Spark" />
          </div>
          <div className="flex gap-2">
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Icon</label>
              <input style={inputStyle} value={form.icon} onChange={e => field('icon', e.target.value)} placeholder="🔥" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Color</label>
              <input style={inputStyle} value={form.color} onChange={e => field('color', e.target.value)} placeholder="#00ff88" />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Role</label>
            <input style={inputStyle} value={form.role} onChange={e => field('role', e.target.value)} placeholder="Coder" />
          </div>
          <div>
            <label style={labelStyle}>Default Model</label>
            <input style={inputStyle} value={form.defaultModel} onChange={e => field('defaultModel', e.target.value)} placeholder="anthropic/claude-sonnet-4-6" />
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <input style={inputStyle} value={form.description} onChange={e => field('description', e.target.value)} placeholder="Builds components and features" />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded pixel-text border transition-colors hover:bg-white/5"
            style={{ fontSize: '8px', color: '#00ff88', borderColor: '#00ff8840' }}
          >
            SAVE
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded pixel-text border transition-colors hover:bg-white/5"
            style={{ fontSize: '8px', color: '#6a6a8a', borderColor: '#6a6a8a40' }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(Partial<Agent> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/agents')
      .then(r => r.json())
      .then(data => { setAgents(data); setLoading(false); })
      .catch(() => setLoading(false));

    fetch('/api/agent-stats')
      .then(r => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const saveAgents = async (updated: Agent[]) => {
    setSaving(true);
    try {
      await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAgent = async (agent: Agent) => {
    const updated = editing?.id
      ? agents.map(a => a.id === agent.id ? agent : a)
      : [...agents, agent];
    setAgents(updated);
    setEditing(null);
    await saveAgents(updated);
  };

  const handleDelete = async (id: string) => {
    const updated = agents.filter(a => a.id !== id);
    setAgents(updated);
    await saveAgents(updated);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="pixel-text" style={{ fontSize: '16px', letterSpacing: '0.3em', color: '#e0e0f0' }}>
              AGENT CONFIG
            </h1>
            <div className="pixel-text mt-1" style={{ fontSize: '7px', color: '#6a6a8a' }}>
              SUB-AGENT TEMPLATES // {agents.length} DEFINED
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="pixel-text glow-green" style={{ fontSize: '7px' }}>
                SAVED ✓
              </span>
            )}
            {saving && (
              <span className="pixel-text" style={{ fontSize: '7px', color: '#ffaa00' }}>
                SAVING...
              </span>
            )}
            <RestartButton />
            <button
              onClick={() => setEditing(BLANK_AGENT)}
              className="pixel-text px-3 py-2 rounded border transition-colors hover:bg-white/5"
              style={{ fontSize: '8px', color: '#00f0ff', borderColor: '#00f0ff40' }}
            >
              + NEW AGENT
            </button>
          </div>
        </div>

        {loading ? (
          <div className="pixel-text text-center py-12" style={{ fontSize: '9px', color: '#6a6a8a' }}>
            LOADING...
          </div>
        ) : agents.length === 0 ? (
          <div className="pixel-text text-center py-12" style={{ fontSize: '9px', color: '#6a6a8a' }}>
            No agents defined. Click + NEW AGENT to add one.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {agents.map(agent => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onEdit={a => setEditing(a)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {editing !== null && (
        <EditModal
          agent={editing}
          onSave={handleSaveAgent}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
}

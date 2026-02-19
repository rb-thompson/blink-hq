'use client';

export default function LegendPanel() {
  const statuses = [
    { status: 'active', color: '#00f0ff', label: 'EXECUTING', desc: 'Currently on task' },
    { status: 'thinking', color: '#ffaa00', label: 'THINKING', desc: 'Reasoning/processing' },
    { status: 'idle', color: '#6a6a8a', label: 'IDLE', desc: 'Standing by' },
    { status: 'done', color: '#00ff88', label: 'COMPLETE', desc: 'Task finished' },
    { status: 'error', color: '#ff4444', label: 'ERROR', desc: 'Something failed' },
  ];

  return (
    <div
      className="border rounded-md p-3 flex flex-wrap items-center justify-center gap-4"
      style={{ backgroundColor: '#131629', borderColor: '#00f0ff15' }}
    >
      <span className="pixel-text mr-2" style={{ fontSize: '8px', color: '#6a6a8a' }}>STATUS KEY:</span>
      {statuses.map(({ status, color, label, desc }) => (
        <div key={status} className="flex items-center gap-1.5" title={desc}>
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: status === 'active' ? color : status === 'thinking' ? 'transparent' : color,
              border: status === 'thinking' ? `2px solid ${color}` : 'none',
              borderTopColor: status === 'thinking' ? 'transparent' : undefined,
              animation: status === 'active' ? 'pulse-active 1.5s infinite' : status === 'thinking' ? 'pulse-thinking 1s linear infinite' : 'none',
            }}
          />
          <span className="pixel-text" style={{ fontSize: '7px', color }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

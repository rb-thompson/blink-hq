'use client';

export default function Header() {
  return (
    <div className="bg-slate-900 border-b border-slate-700 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">⚡</span>
          </div>
          <div>
            <h1 className="text-lg font-mono font-bold text-slate-200">BLINK HQ</h1>
            <div className="text-xs text-slate-500 font-mono">Agent Operations Center</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <div>Status: <span className="text-green-400">OPERATIONAL</span></div>
          <div>Agents: <span className="text-cyan-400">8/8</span></div>
          <div>Uptime: <span className="text-purple-400">24:13:42</span></div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { Agent } from './types';

export default function Workstation({ agent, variant }: { agent: Agent; variant?: string }) {
  return (
    <div className="w-32 h-24 bg-slate-700 rounded border flex items-center justify-center">
      <div className="text-xs text-white font-mono">
        {agent.name}
      </div>
    </div>
  );
}
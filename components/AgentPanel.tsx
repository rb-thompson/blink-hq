'use client';

import { useState } from 'react';

interface SubAgent {
  id: string;
  label?: string;
  status?: string;
  model?: string;
}

interface AgentPanelProps {
  agent: SubAgent | null;
  onClose: () => void;
}

export default function AgentPanel({ agent, onClose }: AgentPanelProps) {
  if (!agent) return null;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-80 bg-[#0a0e1a/95] backdrop-blur-sm border-l border-[#00f0ff20] z-50 animate-slide-in-right p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="pixel-text glow-cyan text-xl">AGENT PANEL</h2>
        <button onClick={onClose} className="text-2xl glow-red hover:scale-110">&times;</button>
      </div>
      <div className="space-y-4 flex-1">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="pixel-text text-xs opacity-75 mb-1">ID</div>
            <div className="pixel-text glow-green font-mono">{agent.id.slice(0, 16)}...</div>
          </div>
          <div>
            <div className="pixel-text text-xs opacity-75 mb-1">LABEL</div>
            <div className="pixel-text glow-yellow">{agent.label || 'Unnamed'}</div>
          </div>
        </div>
        {agent.model && (
          <div>
            <div className="pixel-text text-xs opacity-75 mb-1">MODEL</div>
            <div className="pixel-text glow-blue font-mono">{agent.model.split('/').pop()}</div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div className="pixel-text text-xs opacity-75 mb-1">TOKENS</div>
          <div className="pixel-text text-xs opacity-75 mb-1">STATUS</div>
          <div>-- / --</div>  {/* Stub — from agent_stats DB later */}
          <div className={`pixel-text ${agent.status === 'running' ? 'glow-green' : 'glow-orange'}`}>
            {agent.status || 'idle'}
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-[#00f0ff20]">
          <div className="space-y-2">
            <button className="w-full pixel-text glow-orange py-2 px-4 border rounded text-xs hover:scale-105">
              🔄 Refresh
            </button>
            <button className="w-full pixel-text glow-red py-2 px-4 border rounded text-xs hover:scale-105">
              💀 Kill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
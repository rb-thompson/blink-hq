'use client';

import { useState, useEffect } from 'react';
import { AGENTS, Agent, WORK_ZONES, COFFEE_STATION, COMPLETED_AREA } from './types';
import { AgentAvatar } from './AgentAvatars';

interface AgentPosition {
  x: number;
  y: number;
  isMoving: boolean;
}

export default function AgentScene() {
  const [agentPositions, setAgentPositions] = useState<Record<string, AgentPosition>>({});
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  // Initialize positions
  useEffect(() => {
    const initialPositions: Record<string, AgentPosition> = {};
    AGENTS.forEach(agent => {
      if (agent.position === 'coffee') {
        initialPositions[agent.name] = { x: COFFEE_STATION.x, y: COFFEE_STATION.y, isMoving: false };
      } else if (agent.position === 'workstation') {
        const zone = WORK_ZONES[agent.name as keyof typeof WORK_ZONES];
        initialPositions[agent.name] = { x: zone.x, y: zone.y, isMoving: false };
      } else {
        initialPositions[agent.name] = { x: COMPLETED_AREA.x, y: COMPLETED_AREA.y, isMoving: false };
      }
    });
    setAgentPositions(initialPositions);
  }, []);

  const handleAgentClick = (agent: Agent) => {
    if (agent.status === 'idle') {
      // Move from coffee to workstation
      moveAgent(agent.name, WORK_ZONES[agent.name as keyof typeof WORK_ZONES]);
    }
  };

  const moveAgent = (agentName: string, targetPosition: { x: number; y: number }) => {
    setAgentPositions(prev => ({
      ...prev,
      [agentName]: { ...prev[agentName], isMoving: true }
    }));

    setTimeout(() => {
      setAgentPositions(prev => ({
        ...prev,
        [agentName]: { x: targetPosition.x, y: targetPosition.y, isMoving: false }
      }));
    }, 1000);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Coffee station - left side (30%) */}
      <div
        className="absolute"
        style={{ left: '5%', top: '40%', width: '25%', height: '40%' }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
            {/* Coffee machine */}
            <rect x="30" y="40" width="140" height="90" rx="15" fill="#2a2a2a" stroke="#404040" strokeWidth="3" />
            <rect x="40" y="50" width="120" height="15" rx="7" fill="#1a1a1a" />
            <rect x="40" y="70" width="120" height="15" rx="7" fill="#1a1a1a" />
            <circle cx="60" cy="105" r="8" fill="#333" />
            <circle cx="85" cy="105" r="8" fill="#333" />
            <circle cx="125" cy="105" r="8" fill="#8B4513" />
            <circle cx="150" cy="105" r="8" fill="#8B4513" />
            {/* Steam */}
            <path d="M115 25 Q125 15 135 25 Q125 10 115 25" stroke="#fff" strokeWidth="2" opacity="0.6" />
            <path d="M140 20 Q150 10 160 20 Q150 5 140 20" stroke="#fff" strokeWidth="2" opacity="0.4" />
          </svg>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm text-slate-400 font-mono font-bold">
            ☕ COFFEE STATION
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 font-mono">
            Standby Area
          </div>
        </div>
      </div>

      {/* Workstations placeholder - right side (70%) */}
      <div
        className="absolute border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center"
        style={{ left: '35%', top: '10%', width: '60%', height: '80%' }}
      >
        <div className="text-slate-500 font-mono text-center">
          <div className="text-lg mb-2">💻 WORKSTATIONS</div>
          <div className="text-sm">8 Agent Workstations</div>
          <div className="text-xs mt-2">Right side - 70% of space</div>
        </div>
      </div>

      {/* Floating agents - can move between coffee station and workstations */}
      {AGENTS.map(agent => {
        const position = agentPositions[agent.name];
        if (!position || agent.position === 'workstation') return null; // Skip agents already at workstations

        return (
          <div
            key={agent.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out cursor-pointer z-20"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            onMouseEnter={() => setHoveredAgent(agent.name)}
            onMouseLeave={() => setHoveredAgent(null)}
            onClick={() => handleAgentClick(agent)}
          >
            <div className="relative">
              {/* Agent avatar */}
              <AgentAvatar name={agent.name} size={48} />

              {/* Hover tooltip */}
              {hoveredAgent === agent.name && (
                <div
                  className="absolute top-full mt-2 p-2 rounded font-mono text-xs whitespace-nowrap z-30"
                  style={{
                    backgroundColor: '#1a1a2a',
                    border: `1px solid ${agent.color}40`,
                    color: '#e0e0e0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div style={{ color: agent.color }}>{agent.name}</div>
                  <div className="text-slate-400">{agent.role}</div>
                  <div className="text-xs mt-1">Click to activate</div>
                </div>
              )}

              {/* Movement trail */}
              {position.isMoving && (
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-50"
                  style={{
                    backgroundColor: agent.color + '40',
                    transform: 'scale(2)',
                  }}
                />
              )}
            </div>
          </div>
        );
      })}

      {/* Scene title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <h1 className="text-2xl font-mono font-bold text-slate-300 tracking-wider">
          AGENT OPERATIONS
        </h1>
        <div className="text-xs text-slate-500 text-center mt-1 font-mono">
          Live Activity Visualization
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-xs text-slate-500 font-mono max-w-xs">
        <div className="mb-1">📍 <strong>Coffee Station:</strong> Agents wait here when idle</div>
        <div className="mb-1">💻 <strong>Workstations:</strong> Agents move here when active</div>
        <div>🖱️ <strong>Click idle agents</strong> to move them to workstations</div>
      </div>

      {/* Status summary */}
      <div className="absolute bottom-4 right-4 flex gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-slate-400">
            Active: {AGENTS.filter(a => a.status === 'active' || a.status === 'thinking').length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-500"></div>
          <span className="text-slate-400">
            Standby: {AGENTS.filter(a => a.status === 'idle').length}
          </span>
        </div>
      </div>
    </div>
  );
}
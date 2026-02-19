'use client';

import { useState, useEffect } from 'react';
import { AGENTS, Agent, WORK_ZONES, COFFEE_STATION, COMPLETED_AREA } from './types';
import { AgentAvatar, WorkVisualization } from './AgentAvatars';

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
      // Update agent status to active
      // This would be handled by real agent integration
    } else if (agent.status === 'active' || agent.status === 'thinking') {
      // Could move to completed area when done
      // For now, just toggle hover
    }
  };

  const moveAgent = (agentName: string, targetPosition: { x: number; y: number }) => {
    setAgentPositions(prev => ({
      ...prev,
      [agentName]: { ...prev[agentName], isMoving: true }
    }));

    // Animate movement
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

      {/* Coffee station - central hub */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${COFFEE_STATION.x}%`, top: `${COFFEE_STATION.y}%` }}
      >
        <div className="relative">
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
            {/* Coffee machine */}
            <rect x="20" y="20" width="80" height="50" rx="8" fill="#2a2a2a" stroke="#404040" strokeWidth="2" />
            <rect x="25" y="25" width="70" height="8" rx="4" fill="#1a1a1a" />
            <rect x="25" y="38" width="70" height="8" rx="4" fill="#1a1a1a" />
            <circle cx="35" cy="55" r="4" fill="#333" />
            <circle cx="50" cy="55" r="4" fill="#333" />
            <circle cx="75" cy="55" r="4" fill="#8B4513" />
            <circle cx="90" cy="55" r="4" fill="#8B4513" />
            {/* Steam */}
            <path d="M70 15 Q75 10 80 15 Q75 8 70 15" stroke="#fff" strokeWidth="1" opacity="0.6" />
            <path d="M85 12 Q90 7 95 12 Q90 5 85 12" stroke="#fff" strokeWidth="1" opacity="0.4" />
          </svg>
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 font-mono">
            COFFEE STATION
          </div>
        </div>
      </div>

      {/* Agents */}
      {AGENTS.map(agent => {
        const position = agentPositions[agent.name];
        if (!position) return null;

        const isHovered = hoveredAgent === agent.name;
        const isAtWork = agent.position === 'workstation' && (agent.status === 'active' || agent.status === 'thinking');

        return (
          <div
            key={agent.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out cursor-pointer"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              zIndex: isHovered ? 50 : 10,
            }}
            onMouseEnter={() => setHoveredAgent(agent.name)}
            onMouseLeave={() => setHoveredAgent(null)}
            onClick={() => handleAgentClick(agent)}
          >
            <div className="relative flex flex-col items-center">
              {/* Agent avatar */}
              <div
                className={`transition-all duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`}
                style={{
                  filter: isHovered ? `drop-shadow(0 0 20px ${agent.color}60)` : 'none',
                }}
              >
                <AgentAvatar
                  name={agent.name}
                  size={isHovered ? 64 : 48}
                  isActive={agent.status === 'active' || agent.status === 'thinking'}
                />
              </div>

              {/* Name label - only visible on hover */}
              <div
                className={`mt-2 px-2 py-1 rounded-md font-mono text-xs transition-all duration-300 ${
                  isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  backgroundColor: agent.color + '20',
                  border: `1px solid ${agent.color}40`,
                  color: agent.color,
                }}
              >
                {agent.name}
              </div>

              {/* Work visualization - only when at workstation and active */}
              {isAtWork && (
                <div
                  className={`mt-2 transition-all duration-500 ${
                    isHovered ? 'opacity-30 scale-90' : 'opacity-80 scale-100'
                  }`}
                >
                  <WorkVisualization workType={agent.workType} agentColor={agent.color} />
                </div>
              )}

              {/* Status indicator */}
              <div
                className={`mt-1 w-2 h-2 rounded-full transition-all duration-300 ${
                  isHovered ? 'scale-125' : 'scale-100'
                }`}
                style={{
                  backgroundColor: agent.status === 'active' ? '#00ff88' :
                                   agent.status === 'thinking' ? '#ffaa00' :
                                   agent.status === 'idle' ? '#6a6a8a' :
                                   agent.status === 'done' ? '#00f0ff' : '#ff4444',
                  boxShadow: agent.status === 'active' || agent.status === 'thinking' ?
                    `0 0 8px ${agent.status === 'active' ? '#00ff88' : '#ffaa00'}60` : 'none',
                }}
              />

              {/* Task info - only on hover */}
              {isHovered && (
                <div
                  className="absolute top-full mt-2 p-3 rounded-lg font-mono text-xs max-w-xs text-center transition-all duration-300 opacity-100 scale-100"
                  style={{
                    backgroundColor: '#1a1a2a',
                    border: `1px solid ${agent.color}40`,
                    color: '#e0e0e0',
                    boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 20px ${agent.color}20`,
                  }}
                >
                  <div className="font-bold mb-1" style={{ color: agent.color }}>
                    {agent.role}
                  </div>
                  <div className="text-slate-400 mb-2">
                    {agent.model}
                  </div>
                  <div className="text-slate-300">
                    {agent.task}
                  </div>
                  <div className="mt-2 text-xs" style={{ color: agent.color }}>
                    Status: {agent.status.toUpperCase()}
                  </div>
                </div>
              )}

              {/* Movement trail */}
              {position.isMoving && (
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    backgroundColor: agent.color + '20',
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

      {/* Status summary */}
      <div className="absolute bottom-4 right-4 flex gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
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
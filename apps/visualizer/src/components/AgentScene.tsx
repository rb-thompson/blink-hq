'use client';

import { useState, useEffect } from 'react';
import { AGENTS, Agent, WORK_ZONES, COFFEE_POSITIONS, COFFEE_STATION, COMPLETED_AREA } from './types';
import Workstation from './Workstation';
import { AgentAvatar } from './AgentAvatars';

interface AgentPosition {
  x: number;
  y: number;
  isMoving: boolean;
  isAtWorkstation: boolean;
}

export default function AgentScene() {
  const [agentPositions, setAgentPositions] = useState<Record<string, AgentPosition>>({});
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [agentStatuses, setAgentStatuses] = useState<Record<string, Agent['status']>>({});

  // Initialize positions and statuses
  useEffect(() => {
    const initialPositions: Record<string, AgentPosition> = {};
    const initialStatuses: Record<string, Agent['status']> = {};

    AGENTS.forEach(agent => {
      if (agent.position === 'coffee') {
        const coffeePos = COFFEE_POSITIONS[agent.name as keyof typeof COFFEE_POSITIONS] || COFFEE_STATION;
        initialPositions[agent.name] = { x: coffeePos.x, y: coffeePos.y, isMoving: false, isAtWorkstation: false };
      } else if (agent.position === 'workstation') {
        const zone = WORK_ZONES[agent.name as keyof typeof WORK_ZONES];
        initialPositions[agent.name] = { x: zone.x, y: zone.y, isMoving: false, isAtWorkstation: true };
      } else {
        initialPositions[agent.name] = { x: COMPLETED_AREA.x, y: COMPLETED_AREA.y, isMoving: false, isAtWorkstation: false };
      }
      initialStatuses[agent.name] = agent.status;
    });

    setAgentPositions(initialPositions);
    setAgentStatuses(initialStatuses);
  }, []);

  // Random movement system
  useEffect(() => {
    const movementInterval = setInterval(() => {
      const agentsAtCoffee = AGENTS.filter(agent =>
        agent.position === 'coffee' &&
        agentStatuses[agent.name] === 'idle'
      );

      const agentsAtWork = AGENTS.filter(agent =>
        agentStatuses[agent.name] === 'active' ||
        agentStatuses[agent.name] === 'thinking'
      );

      // Randomly move agent from coffee to workstation
      if (agentsAtCoffee.length > 0 && Math.random() < 0.3) {
        const randomAgent = agentsAtCoffee[Math.floor(Math.random() * agentsAtCoffee.length)];
        moveToWorkstation(randomAgent);
      }

      // Randomly move agent from workstation back to coffee
      if (agentsAtWork.length > 0 && Math.random() < 0.2) {
        const randomAgent = agentsAtWork[Math.floor(Math.random() * agentsAtWork.length)];
        moveToCoffee(randomAgent);
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(movementInterval);
  }, [agentStatuses]);

  const moveToWorkstation = (agent: Agent) => {
    const workZone = WORK_ZONES[agent.name as keyof typeof WORK_ZONES];
    if (!workZone) return;

    setAgentPositions(prev => ({
      ...prev,
      [agent.name]: { ...prev[agent.name], isMoving: true }
    }));

    setAgentStatuses(prev => ({
      ...prev,
      [agent.name]: Math.random() < 0.7 ? 'active' : 'thinking'
    }));

    setTimeout(() => {
      setAgentPositions(prev => ({
        ...prev,
        [agent.name]: { x: workZone.x, y: workZone.y, isMoving: false, isAtWorkstation: true }
      }));
    }, 1000);
  };

  const moveToCoffee = (agent: Agent) => {
    const coffeePos = COFFEE_POSITIONS[agent.name as keyof typeof COFFEE_POSITIONS] || COFFEE_STATION;

    setAgentPositions(prev => ({
      ...prev,
      [agent.name]: { ...prev[agent.name], isMoving: true }
    }));

    setAgentStatuses(prev => ({
      ...prev,
      [agent.name]: 'idle'
    }));

    setTimeout(() => {
      setAgentPositions(prev => ({
        ...prev,
        [agent.name]: { x: coffeePos.x, y: coffeePos.y, isMoving: false, isAtWorkstation: false }
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

      {/* Coffee station - left side */}
      <div
        className="absolute"
        style={{ left: '3%', top: '20%', width: '25%', height: '60%' }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
            {/* Coffee machine */}
            <rect x="35" y="50" width="150" height="100" rx="20" fill="#2a2a2a" stroke="#404040" strokeWidth="3" />
            <rect x="45" y="60" width="130" height="18" rx="9" fill="#1a1a1a" />
            <rect x="45" y="82" width="130" height="18" rx="9" fill="#1a1a1a" />
            <circle cx="65" cy="115" r="9" fill="#333" />
            <circle cx="90" cy="115" r="9" fill="#333" />
            <circle cx="135" cy="115" r="9" fill="#8B4513" />
            <circle cx="160" cy="115" r="9" fill="#8B4513" />
            {/* Steam */}
            <path d="M125 30 Q135 20 145 30 Q135 15 125 30" stroke="#fff" strokeWidth="2" opacity="0.6" />
            <path d="M150 25 Q160 15 170 25 Q160 10 150 25" stroke="#fff" strokeWidth="2" opacity="0.4" />
          </svg>
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-slate-400 font-mono font-bold">
            ☕ COFFEE STATION
          </div>
        </div>
      </div>

      {/* Workstations - right side */}
      <div
        className="absolute"
        style={{ left: '35%', top: '5%', width: '60%', height: '90%' }}
      >
        {/* 4x2 grid of workstations */}
        <div className="grid grid-cols-2 grid-rows-4 gap-3 w-full h-full p-2">
          {/* Row 1 */}
          <Workstation agent={AGENTS.find(a => a.name === 'Blink')!} variant="command" showAvatar={agentPositions.Blink?.isAtWorkstation} />
          <Workstation agent={AGENTS.find(a => a.name === 'Echo')!} variant="echo" showAvatar={agentPositions.Echo?.isAtWorkstation} />

          {/* Row 2 */}
          <Workstation agent={AGENTS.find(a => a.name === 'Volt')!} variant="volt" showAvatar={agentPositions.Volt?.isAtWorkstation} />
          <Workstation agent={AGENTS.find(a => a.name === 'Scout')!} variant="scout" showAvatar={agentPositions.Scout?.isAtWorkstation} />

          {/* Row 3 */}
          <Workstation agent={AGENTS.find(a => a.name === 'Spark')!} variant="spark" showAvatar={agentPositions.Spark?.isAtWorkstation} />
          <Workstation agent={AGENTS.find(a => a.name === 'Cipher')!} variant="cipher" showAvatar={agentPositions.Cipher?.isAtWorkstation} />

          {/* Row 4 */}
          <Workstation agent={AGENTS.find(a => a.name === 'Pixel')!} variant="pixel" showAvatar={agentPositions.Pixel?.isAtWorkstation} />
          <Workstation agent={AGENTS.find(a => a.name === 'Atlas')!} variant="atlas" showAvatar={agentPositions.Atlas?.isAtWorkstation} />
        </div>
      </div>

      {/* Floating agents */}
      {AGENTS.map(agent => {
        const position = agentPositions[agent.name];
        if (!position || position.isAtWorkstation) return null;

        const currentStatus = agentStatuses[agent.name] || agent.status;

        return (
          <div
            key={agent.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out z-20"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            onMouseEnter={() => setHoveredAgent(agent.name)}
            onMouseLeave={() => setHoveredAgent(null)}
          >
            <div className="relative">
              {/* Agent avatar */}
              <AgentAvatar name={agent.name} size={48} isActive={currentStatus === 'active' || currentStatus === 'thinking'} />

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
                  <div className="text-xs mt-1">Status: {currentStatus.toUpperCase()}</div>
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
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
        <h1 className="text-xl font-mono font-bold text-slate-300 tracking-wider">
          AGENT OPERATIONS
        </h1>
        <div className="text-xs text-slate-500 text-center mt-1 font-mono">
          Live Activity Visualization
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 left-2 text-xs text-slate-500 font-mono max-w-xs">
        <div className="mb-1">🎲 <strong>Random Movement:</strong> Agents automatically disperse and return</div>
        <div className="mb-1">💻 <strong>Workstations:</strong> Right side with glitchy operating screens</div>
        <div>☕ <strong>Coffee Station:</strong> Left side standby area</div>
      </div>

      {/* Status summary */}
      <div className="absolute bottom-2 right-2 flex gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-slate-400">
            Active: {Object.values(agentStatuses).filter(status => status === 'active' || status === 'thinking').length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-500"></div>
          <span className="text-slate-400">
            Standby: {Object.values(agentStatuses).filter(status => status === 'idle').length}
          </span>
        </div>
      </div>
    </div>
  );
}
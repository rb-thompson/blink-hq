'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Workstation from '@/components/Workstation';
import StatusBar from '@/components/StatusBar';
import AmbientParticles from '@/components/AmbientParticles';
import StarField from '@/components/StarField';
import LegendPanel from '@/components/LegendPanel';
import { AGENTS, Agent } from '@/components/types';
import { PottedPlant, ServerRack, CoffeeStation, WindowComponent as Window } from '@/components/OfficeFurniture';

function Tooltip({ agent, visible, x, y }: { agent: Agent | null; visible: boolean; x: number; y: number }) {
  if (!visible || !agent) return null;

  return (
    <div
      className="fixed z-50 p-3 rounded border pointer-events-none"
      style={{
        left: x,
        top: y,
        backgroundColor: '#131629ee',
        borderColor: agent.color + '40',
        boxShadow: `0 0 20px ${agent.color}20`,
        transform: 'translate(-50%, -100%) translateY(-10px)',
      }}
    >
      <div className="pixel-text" style={{ fontSize: '10px', color: agent.color, marginBottom: '4px' }}>
        {agent.name}
      </div>
      <div className="pixel-text" style={{ fontSize: '8px', color: '#6a6a8a', marginBottom: '2px' }}>
        {agent.role}
      </div>
      <div className="pixel-text" style={{ fontSize: '7px', color: '#e0e0f080' }}>
        {agent.model}
      </div>
      <div className="pixel-text mt-2" style={{ fontSize: '7px', color: agent.color + 'aa' }}>
        ▸ {agent.task}
      </div>
      <div className="mt-1">
        <span
          className="pixel-text px-1 rounded"
          style={{
            fontSize: '6px',
            backgroundColor: agent.status === 'active' ? '#00ff8820' : agent.status === 'idle' ? '#6a6a8a20' : agent.status === 'thinking' ? '#ffaa0020' : agent.status === 'done' ? '#00f0ff20' : '#ff444420',
            color: agent.status === 'active' ? '#00ff88' : agent.status === 'idle' ? '#6a6a8a' : agent.status === 'thinking' ? '#ffaa00' : agent.status === 'done' ? '#00f0ff' : '#ff4444',
          }}
        >
          {agent.status.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const [tooltip, setTooltip] = useState<{ agent: Agent | null; visible: boolean; x: number; y: number }>({ agent: null, visible: false, x: 0, y: 0 });

  const handleAgentHover = (agent: Agent, e: React.MouseEvent) => {
    setTooltip({ agent, visible: true, x: e.clientX, y: e.clientY });
  };

  const handleAgentMove = (e: React.MouseEvent) => {
    setTooltip(prev => prev.visible ? { ...prev, x: e.clientX, y: e.clientY } : prev);
  };

  const handleAgentLeave = () => {
    setTooltip({ agent: null, visible: false, x: 0, y: 0 });
  };

  return (
    <div className="scanlines crt-vignette min-h-screen relative" onMouseMove={handleAgentMove}>
      <Tooltip {...tooltip} />
      <StarField />
      <AmbientParticles />
      <Sidebar />

      <div className="relative z-10 min-h-screen flex flex-col pl-16 pb-8">
        <Header />

        <div className="flex-1 flex flex-col items-center justify-start pt-4 px-4">
          <div
            className="relative w-full max-w-6xl min-h-[600px] border rounded-lg p-6"
            style={{ backgroundColor: '#13162980', borderColor: '#00f0ff10', backdropFilter: 'blur(4px)' }}
          >
            <div className="absolute -top-3 left-4 px-2 pixel-text" style={{ fontSize: '8px', color: '#6a6a8a', backgroundColor: '#131629' }}>
              ▸ OPERATIONS FLOOR — DECK 7
            </div>

            {/* Office furniture */}
            <Window top="8%" left="3%" width={50} />
            <Window top="25%" left="3%" width={50} />
            <ServerRack top="6%" left="85%" />
            <CoffeeStation top="70%" left="85%" />
            <PottedPlant top="45%" left="10%" size="large" />
            <PottedPlant top="20%" left="25%" size="small" />
            <PottedPlant top="75%" left="18%" size="small" />
            <PottedPlant top="15%" left="75%" size="large" />

            {/* Office grid layout - 4x2 grid with equal spacing */}
            <div className="grid grid-cols-4 grid-rows-2 gap-4 mt-12">
              {/* Row 1 */}
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Volt')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Volt')!} variant="volt" />
              </div>
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Blink')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Blink')!} variant="command" />
              </div>
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Pixel')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Pixel')!} variant="pixel" />
              </div>
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Scout')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Scout')!} variant="scout" />
              </div>

              {/* Row 2 */}
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Spark')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Spark')!} variant="spark" />
              </div>
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Echo')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Echo')!} variant="echo" />
              </div>
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Cipher')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Cipher')!} variant="cipher" />
              </div>
              <div className="flex justify-center" onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Atlas')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Atlas')!} variant="atlas" />
              </div>
            </div>

            {/* Floor marker */}
            <div className="absolute bottom-4 left-4 pixel-text" style={{ fontSize: '6px', color: '#6a6a8a' }}>
              ██████▓▓▓██████▓▓▓██████
            </div>
          </div>

          <div className="mt-4 w-full max-w-6xl">
            <LegendPanel />
          </div>
        </div>
      </div>

      <StatusBar />
    </div>
  );
}
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
import { PottedPlant, ServerRack, CoffeeStation, Window } from '@/components/OfficeFurniture';

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
      <div className="pixel-text" style={{ fontSize: '10px', color: agent.color, marginBottom: '4px' }}>{agent.name}</div>
      <div className="pixel-text" style={{ fontSize: '8px', color: '#6a6a8a', marginBottom: '2px' }}>{agent.role}</div>
      <div className="pixel-text" style={{ fontSize: '7px', color: '#e0e0f080' }}>{agent.model}</div>
      <div className="pixel-text mt-2" style={{ fontSize: '7px', color: agent.color + 'aa' }}>▸ {agent.task}</div>
      <div className="mt-1">
        <span className="pixel-text px-1 rounded" style={{ fontSize: '6px', backgroundColor: agent.status === 'active' ? '#00ff8820' : agent.status === 'idle' ? '#6a6a8a20' : agent.status === 'thinking' ? '#ffaa0020' : '#00f0ff20', color: agent.status === 'active' ? '#00ff88' : agent.status === 'idle' ? '#6a6a8a' : agent.status === 'thinking' ? '#ffaa00' : '#00f0ff' }}>
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
            className="relative w-full max-w-6xl min-h-[600px] border rounded-lg"
            style={{ backgroundColor: '#13162960', borderColor: '#00f0ff10', backdropFilter: 'blur(4px)' }}
          >
            <div className="absolute -top-3 left-4 px-2 pixel-text" style={{ fontSize: '8px', color: '#6a6a8a', backgroundColor: '#131629' }}>
              ▸ OPERATIONS FLOOR — DECK 7
            </div>
            
            {/* <Window top="10%" left="2%" width={60} /> */}
            {/* <Window top="30%" left="2%" width={60} /> */}
            {/* <ServerRack top="8%" right="4%" /> */}
            {/* <CoffeeStation top="65%" right="8%" /> */}
            {/* <PottedPlant top="50%" left="8%" size="large" /> */}
            {/* <PottedPlant top="25%" left="22%" size="small" /> */}
            {/* <PottedPlant top="72%" left="15%" size="small" /> */}
            {/* <PottedPlant top="15%" right="18%" size="large" /> */}
            
            {/* Atlas - bottom center */}
            <div className="absolute" style={{ bottom: '8%', left: '50%', transform: 'translateX(-50%)' }}>
              <div onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Atlas')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Atlas')!} variant="atlas" />
              </div>
            </div>
            
            {/* Echo - center */}
            <div className="absolute" style={{ top: '58%', left: '50%', transform: 'translateX(-50%)' }}>
              <div onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Echo')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Echo')!} variant="echo" />
              </div>
            </div>
            
            {/* Spark - middle left */}
            <div className="absolute" style={{ top: '55%', left: '25%' }}>
              <div onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Spark')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Spark')!} variant="spark" />
              </div>
            </div>
            
            {/* Cipher - middle right */}
            <div className="absolute" style={{ top: '55%', right: '25%' }}>
              <div onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Cipher')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Cipher')!} variant="cipher" />
              </div>
            </div>
            
            {/* Scout - by windows */}
            <div className="absolute" style={{ top: '40%', left: '8%' }}>
              <div onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Scout')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Scout')!} variant="scout" />
              </div>
            </div>
            
            {/* Blink - top center */}
            <div className="absolute" style={{ top: '15%', left: '50%', transform: 'translateX(-50%)' }}>
              <div onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Blink')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Blink')!} variant="command" />
              </div>
            </div>
            
            {/* Volt - top left */}
            <div className="absolute" style={{ top: '22%', left: '20%' }}>
              <div onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Volt')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Volt')!} variant="volt" />
              </div>
            </div>
            
            {/* Pixel - top right */}
            <div className="absolute" style={{ top: '22%', right: '20%' }}>
              <div onMouseEnter={(e) => handleAgentHover(AGENTS.find(a => a.name === 'Pixel')!, e)} onMouseLeave={handleAgentLeave}>
                <Workstation agent={AGENTS.find(a => a.name === 'Pixel')!} variant="pixel" />
              </div>
            </div>
            
            <div className="absolute bottom-2 left-4 pixel-text" style={{ fontSize: '6px', color: '#6a6a8a' }}>
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

import Header from '@/components/Header';
import Workstation from '@/components/Workstation';
import StatusBar from '@/components/StatusBar';
import AmbientParticles from '@/components/AmbientParticles';
import StarField from '@/components/StarField';
import ActivityLog from '@/components/ActivityLog';
import SystemStats from '@/components/SystemStats';
import { AGENTS } from '@/components/types';

export default function Home() {
  // Layout: Blink center top, others arranged around
  const topRow = AGENTS.filter(a => ['Volt', 'Blink', 'Pixel'].includes(a.name));
  const midRow = AGENTS.filter(a => ['Scout', 'Spark', 'Cipher', 'Echo'].includes(a.name));
  const botAgent = AGENTS.filter(a => a.name === 'Atlas');

  // Ensure correct order
  const topOrdered = [
    AGENTS.find(a => a.name === 'Volt')!,
    AGENTS.find(a => a.name === 'Blink')!,
    AGENTS.find(a => a.name === 'Pixel')!,
  ];
  const midOrdered = [
    AGENTS.find(a => a.name === 'Scout')!,
    AGENTS.find(a => a.name === 'Spark')!,
    AGENTS.find(a => a.name === 'Cipher')!,
    AGENTS.find(a => a.name === 'Echo')!,
  ];

  return (
    <div className="scanlines crt-vignette min-h-screen relative">
      {/* Background layers */}
      <StarField />
      <AmbientParticles />

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen pb-8">
        <Header />

        {/* Office floor layout */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 px-4">
          {/* Room border */}
          <div
            className="relative border rounded-lg p-4 max-w-5xl w-full"
            style={{
              backgroundColor: '#131629aa',
              borderColor: '#00f0ff10',
              backdropFilter: 'blur(4px)',
            }}
          >
            {/* Room label */}
            <div className="absolute -top-3 left-4 px-2 pixel-text" style={{ fontSize: '8px', color: '#6a6a8a', backgroundColor: '#131629' }}>
              ▸ OPERATIONS FLOOR — DECK 7
            </div>

            {/* Top row: Volt - BLINK - Pixel */}
            <div className="flex justify-center gap-4 mb-2">
              {topOrdered.map(agent => (
                <Workstation key={agent.name} agent={agent} />
              ))}
            </div>

            {/* Decorative floor line */}
            <div className="flex items-center justify-center gap-2 my-1">
              <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(90deg, transparent, #00f0ff10, transparent)' }} />
            </div>

            {/* Mid row: Scout - Spark - Cipher - Echo */}
            <div className="flex justify-center gap-3">
              {midOrdered.map(agent => (
                <Workstation key={agent.name} agent={agent} />
              ))}
            </div>

            {/* Floor line */}
            <div className="flex items-center justify-center gap-2 my-1">
              <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(90deg, transparent, #00f0ff10, transparent)' }} />
            </div>

            {/* Bottom: Atlas (wide desk) */}
            <div className="flex justify-center">
              {botAgent.map(agent => (
                <Workstation key={agent.name} agent={agent} />
              ))}
            </div>
          </div>

          {/* Side panels */}
          <div className="max-w-5xl w-full grid grid-cols-2 gap-3 mt-2">
            <ActivityLog />
            <SystemStats />
          </div>
        </div>
      </div>

      <StatusBar />
    </div>
  );
}

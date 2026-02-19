'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import AgentScene from '@/components/AgentScene';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <div className="pl-16">
        <Header />
        <div className="h-screen">
          <AgentScene />
        </div>
      </div>
    </div>
  );
}
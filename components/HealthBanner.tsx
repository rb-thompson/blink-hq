'use client';

import { useEffect, useState } from 'react';

interface SubAgent {
  id: string;
  status?: string;
}

interface SystemCurrent {
  openclaw_service?: string;
}

export default function HealthBanner() {
  const [service, setService] = useState<string>('checking');
  const [agentsOnline, setAgentsOnline] = useState<number>(0);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const sysRes = await fetch('/api/system');
        if (sysRes.ok) {
          const sysData = await sysRes.json();
          setService(sysData.current?.openclaw_service || 'unknown');
        }
      } catch {}

      try {
        const saRes = await fetch('/api/openclaw', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tool: 'subagents', args: { action: 'list' } }),
        });
        if (saRes.ok) {
          const saData = await saRes.json();
          const agents: SubAgent[] = Array.isArray(saData) ? saData : (saData?.agents ?? []);
          setAgentsOnline(agents.filter(a => a.status === 'running').length);
        }
      } catch {}
    };

    fetchHealth();
    const poll = setInterval(fetchHealth, 10000); // 10s
    return () => clearInterval(poll);
  }, []);

  const serviceColor = service === 'active' ? 'glow-green' : 'glow-red';

  return (
    <div className="health-banner pixel-text text-xs border-b border-[#131629] py-2 px-4 flex gap-4 items-center justify-center" style={{ backgroundColor: '#0a0e1a' }}>
      <span style={{ color: '#6a6a8a' }}>
        Gateway {service === 'active' ? 'Healthy' : service}
      </span>
      • <span style={{ color: '#00f0ff' }}>{agentsOnline} Agents Online</span>
      • Listening on <span style={{ color: '#6a6a8a' }}>127.0.0.1:18789</span>
    </div>
  );
}
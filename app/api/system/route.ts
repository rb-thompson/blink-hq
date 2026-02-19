import os from 'os';

function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    const start = os.cpus();
    setTimeout(() => {
      const end = os.cpus();
      let idle = 0;
      let total = 0;
      for (let i = 0; i < start.length; i++) {
        const s = start[i].times;
        const e = end[i].times;
        const idleDiff = e.idle - s.idle;
        const totalDiff =
          (e.user - s.user) +
          (e.nice - s.nice) +
          (e.sys - s.sys) +
          (e.irq - s.irq) +
          idleDiff;
        idle += idleDiff;
        total += totalDiff;
      }
      resolve(total === 0 ? 0 : Math.round(100 * (1 - idle / total)));
    }, 100);
  });
}

export async function GET() {
  const cpuUsage = await getCpuUsage();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memUsage = Math.round((usedMem / totalMem) * 100);
  const uptime = Math.round(process.uptime());
  const loadAvg = os.loadavg();

  return Response.json({
    cpu: cpuUsage,
    memory: {
      used: usedMem,
      total: totalMem,
      percent: memUsage,
    },
    uptime,
    loadAvg,
  });
}

import si from 'systeminformation';
import os from 'os';
import db, { MetricSnapshot } from './db.js';

const CACHE_TTL = 30000; // 30s
let cache: MetricSnapshot | null = null;
let cacheTime = 0;

export const getSnapshot = async (): Promise<MetricSnapshot> => {
  const now = Date.now();
  if (cache && now - cacheTime < CACHE_TTL) return cache;

  const platform = os.platform();
  const snapshot: MetricSnapshot = {
    timestamp: new Date().toISOString(),
    cpu_avg: 0,
    cpu_cores: [],
    ram_used_gb: 0,
    ram_total_gb: 0,
    gpu: undefined,
    disks: [],
    net_io_rx_mb: 0,
    net_io_tx_mb: 0,
    temps: {},
    openclaw_service: undefined,
  };

  // CPU
  const cpu = await si.currentLoad();
  snapshot.cpu_avg = Math.round(cpu.avg ?? 0);
  snapshot.cpu_cores = cpu.cpus.map(c => Math.round(c.load ?? 0));

  // RAM (GB)
  const mem = await si.mem();
  snapshot.ram_used_gb = Math.round((mem.used / 1024 / 1024 / 1024) * 100) / 100;
  snapshot.ram_total_gb = Math.round((mem.total / 1024 / 1024 / 1024) * 100) / 100;

  // GPU (first controller)
  try {
    const gpus = await si.graphics();
    if (gpus.controllers?.[0]) {
      const g = gpus.controllers[0];
      snapshot.gpu = {
        util: Math.round(g.utilizationGpu ?? 0),
        vram_used_gb: Math.round((g.memoryUsed ?? 0) / 1024 / 1024 / 1024 * 100) / 100,
        temp_c: Math.round(g.temperatureGpu ?? 0),
      };
    }
  } catch {}

  // Disks
  const fs = await si.fsSize();
  snapshot.disks = fs
    .filter(d => d.size > 0 && d.use?.['%'] !== undefined)
    .map(d => ({ mount: d.mount, used_pct: Math.round(d.use['%']) }));

  // Network I/O (first iface, MB/s cumulative? snapshot total)
  const net = await si.networkStats();
  if (net[0]) {
    snapshot.net_io_rx_mb = Math.round(net[0].rx_bytes / 1024 / 1024 * 100) / 100;
    snapshot.net_io_tx_mb = Math.round(net[0].tx_bytes / 1024 / 1024 * 100) / 100;
  }

  // Temps
  const sensors = await si.sensors();
  snapshot.temps = sensors.main?.reduce((acc, s) => {
    acc[s.name || ''] = Math.round(s.value ?? 0);
    return acc;
  }, {} as Record<string, number>) || {};

  // OpenClaw service (Linux)
  if (platform === 'linux') {
    try {
      const svc = await si.service('openclaw');
      snapshot.openclaw_service = svc.running ? 'active' : 'inactive';
    } catch {
      snapshot.openclaw_service = 'unknown';
    }
  }

  // Store to DB
  const insert = db.prepare(`
    INSERT INTO metrics_history (
      cpu_avg, cpu_cores, ram_used_gb, ram_total_gb, gpu_util, gpu_vram_used_gb, gpu_temp_c,
      disks, net_io_rx_mb, net_io_tx_mb, temps, openclaw_service
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insert.run(
    snapshot.cpu_avg,
    JSON.stringify(snapshot.cpu_cores),
    snapshot.ram_used_gb,
    snapshot.ram_total_gb,
    snapshot.gpu?.util || null,
    snapshot.gpu?.vram_used_gb || null,
    snapshot.gpu?.temp_c || null,
    JSON.stringify(snapshot.disks),
    snapshot.net_io_rx_mb,
    snapshot.net_io_tx_mb,
    JSON.stringify(snapshot.temps),
    snapshot.openclaw_service || null
  );

  cache = snapshot;
  cacheTime = now;
  return snapshot;
};

export const getHistorySummary = (limit = 20) => {
  const rows = db
    .prepare(`
      SELECT * FROM metrics_history ORDER BY timestamp DESC LIMIT ?
    `)
    .all(limit);
  return {
    cpu: rows.map(r => r.cpu_avg),
    ram_pct: rows.map(r => Math.round((r.ram_used_gb / r.ram_total_gb) * 100)),
    gpu_util: rows.map(r => r.gpu_util || 0),
    // Add more as needed
  };
};
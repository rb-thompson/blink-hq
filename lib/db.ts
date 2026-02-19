import Database from 'better-sqlite3';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';

const dataDir = path.join(process.cwd(), 'data');
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, 'blinkhq.db');
const db = new Database(dbPath, { verbose: console.log });

export interface MetricSnapshot {
  timestamp: string;
  cpu_avg: number;
  cpu_cores: number[];
  ram_used_gb: number;
  ram_total_gb: number;
  gpu?: {
    util: number;
    vram_used_gb: number;
    temp_c: number;
  };
  disks: Array<{ mount: string; used_pct: number }>;
  net_io_rx_mb: number;
  net_io_tx_mb: number;
  temps: Record<string, number>;
  openclaw_service?: 'active' | 'inactive';
}

export interface AgentStat {
  agent_id: string;
  requests: number;
  tokens_in: number;
  tokens_out: number;
  last_active: string;
}

export interface AlertConfig {
  id: number;
  metric: string;
  threshold: number;
  enabled: boolean;
}

export const initDB = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS metrics_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      cpu_avg REAL,
      cpu_cores TEXT,
      ram_used_gb REAL,
      ram_total_gb REAL,
      gpu_util REAL,
      gpu_vram_used_gb REAL,
      gpu_temp_c REAL,
      disks TEXT,
      net_io_rx_mb REAL,
      net_io_tx_mb REAL,
      temps TEXT,
      openclaw_service TEXT
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS agent_stats (
      agent_id TEXT PRIMARY KEY,
      requests INTEGER DEFAULT 0,
      tokens_in INTEGER DEFAULT 0,
      tokens_out INTEGER DEFAULT 0,
      last_active DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS alerts_config (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      metric TEXT UNIQUE,
      threshold REAL,
      enabled BOOLEAN DEFAULT 1
    )
  `);
  const insertAlert = db.prepare(`
    INSERT OR IGNORE INTO alerts_config (metric, threshold) VALUES (?, ?)
  `);
  insertAlert.run('cpu_high', 90);
  insertAlert.run('disk_low', 85);
  insertAlert.run('ram_high', 90);

  db.exec(`
    CREATE TABLE IF NOT EXISTS alerts_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      alert_id INTEGER,
      triggered DATETIME DEFAULT CURRENT_TIMESTAMP,
      resolved DATETIME NULL
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);
  const insertSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
  insertSetting.run('dark_mode', '1');
  insertSetting.run('zoom', '1.3');

  console.log('🗄️ BlinkHQ DB initialized');
};

initDB();

export default db;

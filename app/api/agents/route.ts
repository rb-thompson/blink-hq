/**
 * Agent Config API
 *
 * Reads and writes sub-agent template definitions stored in data/agents.json.
 * These are NOT live OpenClaw sessions — they're Brandon's planning config:
 * which named sub-agents he commonly spawns, what model they use, their
 * role description, icon, and color for the visualizer.
 *
 * GET  /api/agents  → returns the full agents array
 * POST /api/agents  → replaces the full agents array (sent as JSON body)
 *
 * The /agents page uses this to render the config UI and save changes.
 */
import fs from 'fs';
import path from 'path';

const AGENTS_FILE = path.join(process.cwd(), 'data', 'agents.json');

export async function GET() {
  try {
    const raw = fs.readFileSync(AGENTS_FILE, 'utf-8');
    return Response.json(JSON.parse(raw));
  } catch {
    return Response.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    fs.writeFileSync(AGENTS_FILE, JSON.stringify(body, null, 2), 'utf-8');
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

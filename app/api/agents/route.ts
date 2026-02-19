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

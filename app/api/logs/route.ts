import fs from 'fs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const transcriptPath = searchParams.get('path');

  if (!transcriptPath) {
    return Response.json({ error: 'No path provided' }, { status: 400 });
  }

  try {
    const raw = fs.readFileSync(transcriptPath, 'utf-8');
    const lines = raw.trim().split('\n').filter(Boolean);
    const entries = lines.map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    }).filter(Boolean);

    // Return last 50 entries
    const last50 = entries.slice(-50);
    return Response.json(last50);
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}

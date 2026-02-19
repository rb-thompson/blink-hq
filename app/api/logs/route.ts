/**
 * Session Transcript API
 *
 * Reads the OpenClaw session transcript from disk and returns the last 50
 * JSONL entries. The transcript path is surfaced by sessions_list
 * (as `transcriptPath`) and passed in as a query param.
 *
 * GET /api/logs?path=/home/brandon/.openclaw/workspace/<session-id>.jsonl
 *
 * Each JSONL line is a structured message object with fields like:
 *   { role, content, timestamp, model, stopReason, ... }
 *
 * Content can be a string or an array of typed blocks (text, thinking, toolCall).
 * The Logs page renders these in a readable timeline.
 *
 * Why read from disk instead of the gateway API?
 * The gateway's sessions_list only returns a few recent messages. Reading the
 * JSONL directly gives us the full transcript without extra round-trips.
 * This works fine because the app runs locally alongside OpenClaw.
 */
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

    const entries = lines
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    // Return last 50 entries — enough for the log view without overloading
    const last50 = entries.slice(-50);
    return Response.json(last50);
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}

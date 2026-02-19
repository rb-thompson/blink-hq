/**
 * OpenClaw Gateway Proxy
 *
 * Forwards tool-invoke requests from the browser to the locally running
 * OpenClaw gateway. Keeps the auth token server-side so it never touches
 * the client bundle.
 *
 * Usage from the browser:
 *   POST /api/openclaw
 *   Body: { tool: "sessions_list", args: { limit: 20 } }
 *
 * Supported tools (subset used by this app):
 *   - sessions_list  → active sessions + token counts
 *   - subagents      → currently spawned sub-agent runs
 *   - session_status → current session model + usage
 *
 * The gateway sits at OPENCLAW_GATEWAY_URL (see .env.local).
 * Auth: Bearer token from OPENCLAW_GATEWAY_TOKEN.
 */
export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${process.env.OPENCLAW_GATEWAY_URL}/tools/invoke`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENCLAW_GATEWAY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return Response.json(data);
}

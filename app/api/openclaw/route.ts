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

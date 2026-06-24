import { getSlots } from "@/lib/slots-cache"

// GET /api/slots — top live eBay slots, JSON. Served from the same 60s cache
// as the server render, so the client hook's background refresh is cheap.
export async function GET() {
  return Response.json(await getSlots())
}

import { cacheLife } from "next/cache"
import { fetchSlots, type Slot } from "./slots"

/**
 * Cached eBay Live slots. Renders instantly from the in-memory cache and
 * refreshes server-side every 60s (stale-while-revalidate), so every page
 * load is fast (~0.5s) but the data stays dynamic. Fails open to [] so the
 * landing page never breaks if eBay is down.
 */
export async function getSlots(): Promise<Slot[]> {
  "use cache"
  cacheLife({ stale: 60, revalidate: 60, expire: 300 })
  try {
    return await fetchSlots(4)
  } catch {
    return []
  }
}

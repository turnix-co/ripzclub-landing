import { cacheLife } from "next/cache"
import { fetchSlots, fetchEvent, type Slot } from "./slots"
import { FEATURED_EVENTS } from "./featured"

const eventIdOf = (href: string): string | null =>
  href.match(/ebaylive\/events\/([A-Za-z0-9]+)/)?.[1] ?? null

/**
 * Cached eBay Live slots. Renders instantly from the in-memory cache and
 * refreshes server-side every 60s (stale-while-revalidate), so every page
 * load is fast (~0.5s) but the data stays dynamic. Fails open to [] so the
 * landing page never breaks if eBay is down.
 *
 * Shows keep eBay's natural order. A featured/sponsored show (lib/featured.ts)
 * is fetched straight from its own eBay event page so we have its REAL
 * title/time/status/thumbnail/description, then swapped IN PLACE for the matching
 * seller tile — same position, just the richer data + (in the UI) the highlight.
 * If the direct fetch fails we keep the scraped tile; if it isn't in the list at
 * all it simply isn't shown.
 */
export async function getSlots(): Promise<Slot[]> {
  "use cache"
  cacheLife({ stale: 60, revalidate: 60, expire: 300 })
  try {
    const [seller, fetched] = await Promise.all([
      fetchSlots(4).catch(() => [] as Slot[]),
      Promise.all(FEATURED_EVENTS.map((f) => fetchEvent(f.id).catch(() => null))),
    ])

    const richById = new Map<string, Slot>()
    for (const s of fetched) {
      const id = s && eventIdOf(s.href)
      if (id) richById.set(id, s)
    }

    // Swap each featured show for its richer, real-data version — in place.
    return seller.map((s) => {
      const id = eventIdOf(s.href)
      return id && richById.has(id) ? richById.get(id)! : s
    })
  } catch {
    return []
  }
}

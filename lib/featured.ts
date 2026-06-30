import type { Slot } from "./slots"

/**
 * eBay-sponsored / featured shows.
 *
 * The pinned card is built from the event's REAL data, fetched straight from its
 * eBay Live page (title, time, status, thumbnail, description) — see
 * `fetchEvent` in lib/slots.ts and the merge in lib/slots-cache.ts. So normally
 * the `id` is all you need.
 *
 * `id` is the last path segment of the event's eBay Live URL, e.g.
 *   https://www.ebay.com.au/ebaylive/events/7acc3iq94GV7dxS0  ->  "7acc3iq94GV7dxS0"
 *
 * `headline`, `blurb` and `tag` are OPTIONAL marketing overrides — set one only
 * if you want to show custom copy instead of eBay's real title / description /
 * state label on the featured card.
 */
export type FeaturedEvent = {
  id: string
  /** Override the real eBay title on the featured card. */
  headline?: string
  /** Override the real eBay description shown under the title. */
  blurb?: string
  /** Override the state label with a custom tag (e.g. "Weekly Flagship"). */
  tag?: string
}

export const FEATURED_EVENTS: FeaturedEvent[] = [
  // "One could Say it's really really DARK!!" — eBay-sponsored, real data pulled live.
  { id: "7acc3iq94GV7dxS0" },
]

/** The featured config for a slot, or undefined if it isn't featured. */
export function featuredFor(slot: Pick<Slot, "href">): FeaturedEvent | undefined {
  return FEATURED_EVENTS.find((f) => slot.href.includes(f.id))
}

/** True when a slot links to one of the featured/sponsored eBay events. */
export function isFeatured(slot: Pick<Slot, "href">): boolean {
  return featuredFor(slot) !== undefined
}

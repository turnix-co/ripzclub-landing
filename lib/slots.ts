import { JSDOM } from "jsdom"

const SELLER_URL =
  "https://www.ebay.com.au/ebaylive/sellers/uyrpxfoktc2"

export type SlotState = "live" | "replay" | "upcoming"

export type Slot = {
  title: string
  state: SlotState
  /** ISO 8601 start time, or null if eBay didn't supply one. */
  startTime: string | null
  /** Live viewer count, only present for live streams. */
  viewers: number | null
  /** Link to the stream/event page. */
  href: string
  /** Thumbnail image. */
  image: string | null
}

const STATE_MAP: Record<string, SlotState> = {
  LIVE: "live",
  RECORDED: "replay",
  UPCOMING: "upcoming",
}

// The page embeds the same events twice: once as DOM tiles in the
// <ol class="live-event-video-grid">, and once as a JSON island. The DOM is
// what was asked for and is order-stable; the JSON island is the only place
// with a precise ISO startTime. They're index-aligned, so we zip them.
// ponytail: regex over the JSON island instead of a real parser — it's a flat
// list of {startTime,state,title}; full JSON.parse if eBay nests it later.
const ISLAND_RE =
  /"startTime":"([^"]*)","state":"([A-Z]+)","tags":\[[^\]]*\],"title":"((?:[^"\\]|\\.)*)"/g

function islandStartTimes(html: string): (string | null)[] {
  const out: (string | null)[] = []
  let m: RegExpExecArray | null
  while ((m = ISLAND_RE.exec(html))) {
    out.push(m[1] || null)
  }
  return out
}

/** Parse eBay Live seller HTML into the top `limit` stream slots. */
export function parseSlots(html: string, limit = 4): Slot[] {
  const doc = new JSDOM(html).window.document
  const tiles = [
    ...doc.querySelectorAll<HTMLLIElement>(
      "ol.live-event-video-grid li[data-live-event-tile]"
    ),
  ]
  const startTimes = islandStartTimes(html)

  return tiles.slice(0, limit).map((li, i) => {
    const img = li.querySelector("img")
    const link = li.querySelector<HTMLAnchorElement>("a[href]")
    const text = li.textContent?.replace(/\s+/g, " ").trim() ?? ""

    let state: SlotState = "replay"
    if (/^LIVE\b/.test(text)) state = "live"
    else if (/^Set a reminder/.test(text)) state = "upcoming"

    // Live tiles render "LIVE • 10" — pull the viewer count when present.
    const viewerMatch = text.match(/^LIVE\s*•\s*([\d,]+)/)
    const viewers = viewerMatch
      ? Number(viewerMatch[1].replace(/,/g, ""))
      : null

    return {
      title: img?.alt?.trim() || "Untitled stream",
      state,
      startTime: startTimes[i] ?? null,
      viewers,
      href: link?.href ?? SELLER_URL,
      image: img?.getAttribute("src") ?? null,
    }
  })
}

/** Fetch the live seller page and return its top slots. */
export async function fetchSlots(limit = 4): Promise<Slot[]> {
  const res = await fetch(SELLER_URL, {
    headers: {
      // eBay 403s the default jsdom/node UA; use a real browser string.
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    },
  })
  if (!res.ok) throw new Error(`eBay Live fetch failed: ${res.status}`)
  return parseSlots(await res.text(), limit)
}

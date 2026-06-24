// Run: npx tsx lib/slots.test.ts   (asserts against the saved eBay fixture)
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import assert from "node:assert/strict"
import { parseSlots } from "./slots.js"

const here = dirname(fileURLToPath(import.meta.url))
const html = readFileSync(join(here, "__fixtures__/ebay-live.html"), "utf8")

const slots = parseSlots(html, 4)

assert.equal(slots.length, 4, "should return exactly 4 slots")

// Tile 0 is the live show with a viewer count and an ISO startTime.
assert.equal(slots[0].title, "Hump Day Games and Prizes")
assert.equal(slots[0].state, "live")
assert.equal(slots[0].viewers, 10)
assert.equal(slots[0].startTime, "2026-06-24T09:01:47Z")
assert.match(slots[0].href, /\/ebaylive\/events\//)

// Tiles 1-2 are upcoming (UPCOMING -> "upcoming"), tile 3 is a replay.
assert.equal(slots[1].state, "upcoming")
assert.equal(slots[1].title, "KnixRipz Mystery Japanese Wheel")
assert.equal(slots[1].viewers, null)
assert.equal(slots[3].state, "replay")

// Every slot must have a usable title and link.
for (const s of slots) {
  assert.ok(s.title && s.title !== "Untitled stream", `title for ${s.title}`)
  assert.ok(s.href.startsWith("https://"), `href for ${s.title}`)
}

console.log("✓ all slot parser assertions passed")
for (const s of slots) {
  console.log(`  [${s.state}] ${s.title}` + (s.viewers ? ` (${s.viewers} watching)` : ""))
}

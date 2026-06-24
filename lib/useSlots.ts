"use client"

import { useEffect, useState } from "react"
import type { Slot } from "./slots"

/**
 * Live eBay slots. Renders instantly from the server-provided `initial` (no
 * client-server waterfall), then refetches /api/slots once on mount so a long-
 * lived tab still picks up freshly-started streams. Race-safe via an `ignore`
 * flag, per the React docs' useEffect data-fetching pattern.
 */
export function useSlots(initial: Slot[]): Slot[] {
  const [slots, setSlots] = useState(initial)

  useEffect(() => {
    let ignore = false
    fetch("/api/slots")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Slot[] | null) => {
        if (!ignore && data?.length) setSlots(data)
      })
      .catch(() => {}) // fail open: keep showing the server data
    return () => {
      ignore = true
    }
  }, [])

  return slots
}

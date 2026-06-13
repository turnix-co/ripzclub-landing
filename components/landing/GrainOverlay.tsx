"use client"

import { useEffect, useRef } from "react"

/**
 * Fixed film-grain texture painted over the whole page. The noise tile is
 * generated client-side so we don't ship an image asset for it.
 */
export function GrainOverlay() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 110
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const data = ctx.createImageData(110, 110)
    for (let i = 0; i < data.data.length; i += 4) {
      const v = Math.random() * 255
      data.data[i] = v
      data.data[i + 1] = v
      data.data[i + 2] = v
      data.data[i + 3] = 30
    }
    ctx.putImageData(data, 0, 0)
    el.style.backgroundImage = `url(${canvas.toDataURL()})`
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] bg-repeat opacity-[.05]"
    />
  )
}

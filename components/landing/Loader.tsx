"use client"

import { useEffect, useRef } from "react"
import { Wordmark } from "./Wordmark"

/**
 * Full-screen loading overlay. Holds for a brief beat once the page has loaded,
 * then fades out and removes itself from the layout.
 */
export function Loader() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let hidden = false
    let hideTimer: ReturnType<typeof setTimeout> | undefined
    let removeTimer: ReturnType<typeof setTimeout> | undefined
    const start = performance.now()

    const hide = () => {
      if (hidden) return
      hidden = true
      el.style.transition = "opacity .45s ease"
      el.style.opacity = "0"
      removeTimer = setTimeout(() => {
        el.style.display = "none"
      }, 480)
    }

    const finish = () => {
      if (hidden || hideTimer) return
      hideTimer = setTimeout(hide, Math.max(0, 800 - (performance.now() - start)))
    }

    if (document.readyState === "complete") finish()
    else window.addEventListener("load", finish, { once: true })

    const fallback = setTimeout(hide, 4000)

    return () => {
      window.removeEventListener("load", finish)
      if (hideTimer) clearTimeout(hideTimer)
      if (removeTimer) clearTimeout(removeTimer)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="loader-failopen fixed inset-0 z-[200] flex flex-col items-center justify-center gap-[30px]"
      style={{ background: "linear-gradient(160deg,#141019 0%,#0A0B0E 55%,#07080B 100%)" }}
    >
      <Wordmark variant="loader" />
      <div className="h-[3px] w-[min(240px,60vw)] overflow-hidden rounded-[2px] bg-paper/12">
        <div
          className="h-full w-[42%] rounded-[2px] animate-[loadBar_1.2s_ease-in-out_infinite]"
          style={{ background: "linear-gradient(90deg,#FF9E2C,#2E7BE6)" }}
        />
      </div>
      <div className="font-grotesk text-[.62rem] uppercase tracking-[.3em] text-paper/45">
        Loading the drop
      </div>
    </div>
  )
}

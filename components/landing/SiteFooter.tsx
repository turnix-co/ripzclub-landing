"use client"

import { useEffect, useRef } from "react"

/**
 * Closing footer: brand line + social links, then a fine-print copyright line.
 * The link bar gently rises into view the first time it's scrolled to (skipped
 * when the user prefers reduced motion).
 */
export function SiteFooter() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return

    el.style.opacity = "0"
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          el.style.opacity = ""
          el.animate(
            [
              { transform: "translateY(28px)", opacity: 0 },
              { transform: "translateY(0)", opacity: 1 },
            ],
            { duration: 600, easing: "cubic-bezier(.22,1,.36,1)" },
          )
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="relative z-[4] mx-auto mt-[clamp(56px,9vh,104px)] w-full max-w-[1320px]">
      <div
        ref={barRef}
        className="relative z-[2] mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-6 border-t border-paper/12 pt-5"
      >
        <div className="flex items-center gap-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="RipzClub"
            className="block h-[34px] [filter:brightness(0)_invert(1)]"
          />
          <div className="font-grotesk text-[.7rem] uppercase tracking-[.18em] text-paper/50">
            © 2026 RipzClub
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-[22px]">
          <a href="https://ripzclub.com" target="_blank" rel="noopener" className="footer-link">
            Website
          </a>
          <a href="https://discord.gg/W75rRdqCz4" target="_blank" rel="noopener" className="footer-link">
            Discord
          </a>
          <a
            href="https://www.ebay.com.au/ebaylive/sellers/uyrpxfoktc2"
            target="_blank"
            rel="noopener"
            className="footer-link"
          >
            eBay Live
          </a>
          <a
            href="https://www.instagram.com/knixripz"
            target="_blank"
            rel="noopener"
            className="footer-link"
          >
            Instagram
          </a>
          <span className="font-grotesk text-[.68rem] uppercase tracking-[.18em] text-paper/32 whitespace-nowrap">
            TikTok <span className="text-[.82em] text-paper/45">(soon)</span>
          </span>
        </div>
      </div>
      <div className="relative z-[2] mx-auto mt-[22px] max-w-[1320px] text-center font-grotesk text-[.58rem] uppercase tracking-[.14em] text-paper/30">
        © 2026 KNIXRIPZ × RIPZCLUB · Owned &amp; ripped in Australia · 18+ collect responsibly
      </div>
    </div>
  )
}

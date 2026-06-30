"use client"

import type { CSSProperties } from "react"
import type { Slot, SlotState } from "@/lib/slots"
import { featuredFor, isFeatured, type FeaturedEvent } from "@/lib/featured"
import { useSlots } from "@/lib/useSlots"

/** Where the "Bookmark on eBay" CTA sends people — the RipzClub seller page. */
const SELLER_URL = "https://www.ebay.com.au/ebaylive/sellers/uyrpxfoktc2"

type Tone = "gold" | "blue"

const TONE: Record<Tone, { badge: string; badgeText: string; accent: string; time: string }> = {
  gold: {
    badge: "linear-gradient(160deg,#FFD89A,#FF9E2C)",
    badgeText: "#2A1402",
    accent: "linear-gradient(110deg,rgba(255,158,44,.16),transparent 62%)",
    time: "#F0631A",
  },
  blue: {
    badge: "linear-gradient(160deg,#BFEBFF,#46A6F5)",
    badgeText: "#06122c",
    accent: "linear-gradient(110deg,rgba(70,166,245,.16),transparent 62%)",
    time: "#1E6BD8",
  },
}

const STATE_META: Record<
  SlotState,
  { tone: Tone; pill: string; pillText: string; tag: string }
> = {
  live: { tone: "gold", pill: "linear-gradient(160deg,#FF7A7A,#E8132B)", pillText: "#FFF", tag: "Live" },
  upcoming: { tone: "blue", pill: "linear-gradient(160deg,#BFEBFF,#46A6F5)", pillText: "#06122c", tag: "Upcoming" },
  replay: { tone: "gold", pill: "linear-gradient(160deg,#FFD89A,#FF9E2C)", pillText: "#2A1402", tag: "Watch back" },
}

const PILL_LABEL: Record<SlotState, string> = { live: "LIVE", upcoming: "SOON", replay: "REPLAY" }

const TIME_FMT = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Sydney",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
})

// Splits a formatted time into number + am/pm so we can style "PM" small,
// like the old hardcoded layout did. Live shows show the viewer count instead.
function timeParts(slot: Slot): { main: string; suffix: string } {
  if (slot.state === "live") {
    return { main: slot.viewers ? String(slot.viewers) : "ON AIR", suffix: slot.viewers ? "watching" : "" }
  }
  if (!slot.startTime) return { main: "Soon", suffix: "" }
  const [main, suffix = ""] = TIME_FMT.format(new Date(slot.startTime)).split(" ")
  return { main, suffix: suffix.toUpperCase() }
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6 3h12v2h3v3a4 4 0 0 1-4 4 6 6 0 0 1-4 3v2h3v2H8v-2h3v-2a6 6 0 0 1-4-3 4 4 0 0 1-4-4V5h3V3Zm0 4H5v1a2 2 0 0 0 1 1.7V7Zm12 0v2.7A2 2 0 0 0 19 8V7h-1Z" />
    </svg>
  )
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6 2h12a1 1 0 0 1 1 1v18.3a.7.7 0 0 1-1.1.6L12 18.6l-5.9 3.3A.7.7 0 0 1 5 21.3V3a1 1 0 0 1 1-1z" />
    </svg>
  )
}

/** Full-width CTA above the schedule nudging people to save the shows on eBay. */
function BookmarkCTA() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#F3BC56]/22 bg-[linear-gradient(100deg,rgba(243,188,86,.07),rgba(243,188,86,.03)_52%,rgba(232,19,43,.05))] px-[clamp(18px,3vw,32px)] py-[clamp(13px,2vw,18px)] backdrop-blur-[8px] sm:flex-row sm:justify-between sm:gap-5">
      <div className="flex items-center gap-3 text-center sm:text-left">
        <BookmarkIcon className="size-[19px] shrink-0 text-[#F3BC56] [filter:drop-shadow(0_2px_5px_rgba(243,188,86,.45))]" />
        <span className="font-poppins text-[clamp(.8rem,1.7vw,.95rem)] font-semibold text-paper">
          Bookmark these shows on eBay so you never miss a live rip.
        </span>
      </div>
      <a
        href={SELLER_URL}
        target="_blank"
        rel="noopener"
        className="shrink-0 whitespace-nowrap rounded-full border border-[#F3BC56]/55 bg-[#F3BC56]/[.14] px-5 py-2.5 font-oswald text-[11px] font-semibold uppercase tracking-[.16em] text-[#F3BC56] transition-colors duration-200 hover:bg-[#F3BC56]/[.24]"
      >
        Bookmark on eBay
      </a>
    </div>
  )
}

/** A single schedule row. `featured` adds the gold ring + warm glow + optional copy. */
function SlotCard({
  slot,
  featured = false,
  config,
}: {
  slot: Slot
  featured?: boolean
  config?: FeaturedEvent
}) {
  const meta = STATE_META[slot.state]
  const tone = TONE[meta.tone]
  const { main, suffix } = timeParts(slot)

  const title = config?.headline ?? slot.title
  const tagLabel = config?.tag ?? meta.tag
  const blurb = featured ? config?.blurb ?? slot.description : null
  const accent = featured
    ? "linear-gradient(110deg,rgba(243,188,86,.20),transparent 64%)"
    : tone.accent
  const timeColor = featured ? "#F3BC56" : tone.time

  return (
    <a
      href={slot.href}
      target="_blank"
      rel="noreferrer"
      className={
        "relative flex items-center gap-4 rounded-2xl px-[18px] py-[14px] backdrop-blur-[8px] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-[3px] " +
        (featured
          ? "ring-1 ring-[#F3BC56]/65 shadow-[0_0_30px_rgba(243,188,86,.22),0_18px_40px_rgba(0,0,0,.55)] hover:shadow-[0_0_38px_rgba(243,188,86,.3),0_26px_52px_rgba(0,0,0,.62)]"
          : "shadow-[0_16px_34px_rgba(0,0,0,.5)] hover:shadow-[0_24px_48px_rgba(0,0,0,.6)]")
      }
      style={{ background: `linear-gradient(rgba(255,255,255,.1),rgba(255,255,255,.1)), ${accent}` }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-square w-[clamp(58px,15vw,78px)] shrink-0 overflow-hidden rounded-[13px] shadow-[0_6px_16px_rgba(0,0,0,.32)]">
        {slot.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- remote eBay thumb, no loader needed
          <img src={slot.image} alt="" className="size-full object-cover" loading="lazy" />
        ) : (
          <div className="size-full" style={{ background: tone.badge }} />
        )}
      </div>

      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col items-stretch gap-3 min-[560px]:flex-row min-[560px]:items-center min-[560px]:justify-between min-[560px]:gap-[14px]">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="shrink-0 rounded-full px-[8px] py-[2px] font-grotesk text-[.5rem] font-bold uppercase tracking-[.14em]"
              style={{ background: meta.pill, color: meta.pillText }}
            >
              {PILL_LABEL[slot.state]}
            </span>
            <div className="min-w-0 flex-1 truncate font-display text-[clamp(16px,2vw,22px)] tracking-[.02em] text-paper">
              {title}
            </div>
          </div>

          {blurb && (
            <p className="mt-1.5 line-clamp-2 max-w-[460px] font-poppins text-[clamp(12px,1.5vw,13.5px)] leading-snug text-paper/65">
              {blurb}
            </p>
          )}

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span
              className={
                featured
                  ? "rounded-full border border-[#F3BC56]/45 bg-[#F3BC56]/[.14] px-[9px] py-1 font-grotesk text-[.54rem] font-semibold uppercase tracking-[.12em] text-[#F3BC56]"
                  : "rounded-full border border-paper/14 bg-white/[.06] px-[9px] py-1 font-grotesk text-[.54rem] font-semibold uppercase tracking-[.12em] text-paper/72"
              }
            >
              {tagLabel}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-[9px] min-[560px]:items-end">
          <div
            className="whitespace-nowrap font-display text-[clamp(18px,2.2vw,26px)] leading-none"
            style={{ color: timeColor }}
          >
            {main}
            {suffix && <span className="ml-0.5 text-[.58em]">{suffix}</span>}
          </div>
          <div className="inline-flex items-center gap-1.5 whitespace-nowrap font-grotesk text-[.52rem] font-bold uppercase tracking-[.14em] text-paper/55">
            <span className="size-[5px] rounded-full bg-ripz shadow-[0_0_8px_rgba(232,19,43,.75)]" />
            eBay Live · AEST
          </div>
        </div>
      </div>
    </a>
  )
}

/** The pinned, sponsored show: a gold "Featured Show" badge over a highlighted card. */
function FeaturedShow({ slot, config }: { slot: Slot; config?: FeaturedEvent }) {
  return (
    <div className="relative mt-3">
      {/* Gold "Featured Show" badge, top-left, sitting on the card's edge */}
      <div
        className="absolute left-[clamp(14px,3vw,22px)] top-0 z-[5] inline-flex -translate-y-1/2 items-center gap-1.5 rounded-full border border-[#fff5d6]/55 px-3 py-1 font-oswald text-[10px] font-semibold uppercase tracking-[.16em] text-[#3a2607] shadow-[0_6px_16px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.6)]"
        style={
          { background: "linear-gradient(180deg,#ffe8a8 0%,#f3bc56 52%,#dd9730 100%)" } as CSSProperties
        }
      >
        <TrophyIcon className="size-3" />
        Featured Show
      </div>
      <SlotCard slot={slot} featured config={config} />
    </div>
  )
}

export function ShowScheduleClient({ initial }: { initial: Slot[] }) {
  const slots = useSlots(initial) // eBay's natural order; featured shows are highlighted in place
  if (slots.length === 0) return null

  return (
    <div className="mt-[clamp(30px,4.5vh,46px)] flex w-full max-w-[1080px] flex-col">
      <BookmarkCTA />
      <div className="mt-[clamp(18px,3vh,28px)] flex flex-col gap-4">
        {slots.map((slot) => {
          const config = featuredFor(slot)
          return isFeatured(slot) ? (
            <FeaturedShow key={slot.href} slot={slot} config={config} />
          ) : (
            <SlotCard key={slot.href} slot={slot} />
          )
        })}
      </div>
    </div>
  )
}

"use client"

import type { Slot, SlotState } from "@/lib/slots"
import { useSlots } from "@/lib/useSlots"

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

export function ShowScheduleClient({ initial }: { initial: Slot[] }) {
  const slots = useSlots(initial)
  if (slots.length === 0) return null

  return (
    <div className="mt-[clamp(30px,4.5vh,46px)] flex w-[min(700px,92vw)] flex-col gap-4">
      {slots.map((slot) => {
        const meta = STATE_META[slot.state]
        const tone = TONE[meta.tone]
        const { main, suffix } = timeParts(slot)
        return (
          <a
            key={slot.href}
            href={slot.href}
            target="_blank"
            rel="noreferrer"
            className="relative flex items-center gap-4 rounded-2xl px-[18px] py-[14px] shadow-[0_16px_34px_rgba(0,0,0,.5)] backdrop-blur-[8px] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-[3px] hover:shadow-[0_24px_48px_rgba(0,0,0,.6)]"
            style={{ background: `linear-gradient(rgba(255,255,255,.1),rgba(255,255,255,.1)), ${tone.accent}` }}
          >
            {/* Thumbnail */}
            <div className="relative aspect-square w-[clamp(58px,15vw,74px)] shrink-0 overflow-hidden rounded-[13px] shadow-[0_6px_16px_rgba(0,0,0,.32)]">
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
                    {slot.title}
                  </div>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-paper/14 bg-white/[.06] px-[9px] py-1 font-grotesk text-[.54rem] font-semibold uppercase tracking-[.12em] text-paper/72">
                    {meta.tag}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-[9px] min-[560px]:items-end">
                <div
                  className="whitespace-nowrap font-display text-[clamp(18px,2.2vw,26px)] leading-none"
                  style={{ color: tone.time }}
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
      })}
    </div>
  )
}

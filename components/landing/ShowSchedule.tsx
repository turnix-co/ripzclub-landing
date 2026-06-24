type Tone = "gold" | "blue"

type Slot = {
  day: string
  tone: Tone
  title: string
  tags: string[]
  time: string
}

const SLOTS: Slot[] = [
  { day: "TUE", tone: "gold", title: "Pokémon Night", tags: ["Singles", "Slabs", "Sealed"], time: "7:30" },
  { day: "THU", tone: "blue", title: "One Piece & Sports", tags: ["TCG", "Sports", "Specials"], time: "7:30" },
  { day: "SAT", tone: "gold", title: "Mystery Bag Madness", tags: ["Bags", "Breaks", "Grails"], time: "6:00" },
  { day: "SUN", tone: "blue", title: "Grail Hunt & Specials", tags: ["Vintage", "Graded", "Chase"], time: "5:00" },
]

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

/**
 * "Show Schedule" block: the orange-circled heading and the weekly line-up of
 * eBay Live shows. Layout collapses each card to a stacked column under ~560px.
 */
export function ShowSchedule() {
  return (
    <div
      data-screen-label="02 · Show Schedule"
      className="relative z-[4] mt-[clamp(58px,9.5vh,104px)] flex w-full flex-col items-center"
    >
      <div className="text-center font-display text-[clamp(28px,3.2vw,48px)] tracking-[.04em] text-paper">
        SHOW{" "}
        <span className="relative inline-block text-paper">
          SCHEDULE
          <svg
            viewBox="0 0 100 44"
            className="pointer-events-none absolute -left-[12%] -top-[56%] h-[210%] w-[124%] overflow-visible"
          >
            <path
              d="M8,22 C12,6 88,2 94,18 C99,34 64,43 30,40 C10,38 4,30 12,16"
              fill="none"
              stroke="#FF9E2C"
              strokeWidth="2.4"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="1"
              className="animate-[dash_1s_ease-out_.6s_both]"
            />
          </svg>
        </span>
      </div>
      <div className="mt-[18px] font-grotesk text-[.72rem] uppercase tracking-[.24em] text-paper/60">
        Live every week · All times AEST
      </div>

      <div className="mt-[clamp(30px,4.5vh,46px)] flex w-[min(700px,92vw)] flex-col gap-4">
        {SLOTS.map((slot) => {
          const tone = TONE[slot.tone]
          return (
            <div
              key={slot.day + slot.title}
              className="relative flex items-center gap-4 rounded-2xl px-[18px] py-[14px] shadow-[0_16px_34px_rgba(0,0,0,.5)] backdrop-blur-[8px] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-[3px] hover:shadow-[0_24px_48px_rgba(0,0,0,.6)]"
              style={{ background: `linear-gradient(rgba(255,255,255,.1),rgba(255,255,255,.1)), ${tone.accent}` }}
            >
              {/* Day badge */}
              <div
                className="flex aspect-square w-[clamp(58px,15vw,74px)] shrink-0 flex-col items-center justify-center gap-0.5 rounded-[13px] shadow-[0_6px_16px_rgba(0,0,0,.32)]"
                style={{ background: tone.badge, color: tone.badgeText }}
              >
                <div className="font-display text-[clamp(19px,3vw,28px)] leading-[.88] tracking-[.02em]">
                  {slot.day}
                </div>
                <div className="font-grotesk text-[.46rem] font-bold uppercase tracking-[.2em] opacity-[.72]">
                  Weekly
                </div>
              </div>

              {/* Body */}
              <div className="flex min-w-0 flex-1 flex-col items-start gap-3 min-[560px]:flex-row min-[560px]:items-center min-[560px]:justify-between min-[560px]:gap-[14px]">
                <div className="min-w-0">
                  <div className="font-display text-[clamp(16px,2vw,22px)] tracking-[.02em] text-paper">
                    {slot.title}
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {slot.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-paper/14 bg-white/[.06] px-[9px] py-1 font-grotesk text-[.54rem] font-semibold uppercase tracking-[.12em] text-paper/72"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-start gap-[9px] min-[560px]:items-end">
                  <div
                    className="whitespace-nowrap font-display text-[clamp(18px,2.2vw,26px)] leading-none"
                    style={{ color: tone.time }}
                  >
                    {slot.time}
                    <span className="ml-0.5 text-[.58em]">PM</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 whitespace-nowrap font-grotesk text-[.52rem] font-bold uppercase tracking-[.14em] text-paper/55">
                    <span className="size-[5px] rounded-full bg-ripz shadow-[0_0_8px_rgba(232,19,43,.75)]" />
                    eBay Live · AEST
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

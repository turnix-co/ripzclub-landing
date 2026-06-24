import { Suspense } from "react"
import { getSlots } from "@/lib/slots-cache"
import { ShowScheduleClient } from "./ShowScheduleClient"

/**
 * "Show Schedule" block — the orange-circled heading and the line-up of eBay
 * Live shows, pulled live from the RipzClub seller page (see lib/slots-cache.ts).
 * Server-fetches the cached slots; the client half refreshes them in place.
 */
export async function ShowSchedule() {
  const initial = await getSlots()

  return (
    <div
      data-screen-label="02 · Show Schedule"
      className="relative z-[4] mt-[clamp(58px,9.5vh,104px)] flex w-full flex-col items-center"
    >
      <div className="text-center font-display text-[clamp(28px,3.2vw,48px)] tracking-[.04em] text-paper">
        LIVE{" "}
        <span className="relative inline-block text-paper">
          TONIGHT
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
        Live on eBay · All times AEST
      </div>

      <Suspense fallback={null}>
        <ShowScheduleClient initial={initial} />
      </Suspense>
    </div>
  )
}

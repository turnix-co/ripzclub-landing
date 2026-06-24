import { Wordmark } from "./Wordmark"
import { ShowSchedule } from "./ShowSchedule"
import { SocialCards } from "./SocialCards"
import { AlertSignup } from "./AlertSignup"
import { SiteFooter } from "./SiteFooter"

const EBAY_LIVE = "https://www.ebay.com.au/ebaylive/sellers/uyrpxfoktc2"
const SITE = "https://ripzclub.com"

function Divider() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative z-[4] mt-[clamp(48px,8vh,92px)] flex w-[min(340px,70vw)] items-center gap-3"
    >
      <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(245,245,244,.22)_50%,transparent)]" />
    </div>
  )
}

/**
 * The single-screen "billboard": layered gradient/ray background, the RIPZCLUB
 * •LIVE wordmark, headline + CTAs, the weekly show schedule, the community block
 * with social cards, the drop-alert signup, and the closing footer.
 */
export function Billboard() {
  return (
    <section
      data-screen-label="01 · The Billboard"
      className="relative flex min-h-[56vh] flex-col items-center justify-center overflow-hidden px-5 pt-[clamp(94px,14vh,156px)] pb-[clamp(50px,8vh,92px)]"
      style={{
        background:
          "linear-gradient(102deg,#0A1A33 0%,#0A1120 36%,#0A0B11 50%,#1A0E12 64%,#2A0C10 100%)",
      }}
    >
      {/* ── Background decoration ─────────────────────────────────────── */}
      {/* Blue glow (left) + warm glow (right) */}
      <div
        className="pointer-events-none absolute -left-[10%] -top-[24%] h-[96%] w-[58vw] blur-[48px]"
        style={{ background: "radial-gradient(closest-side,rgba(46,123,230,.5),transparent 72%)" }}
      />
      <div
        className="pointer-events-none absolute -right-[10%] -bottom-[24%] h-[96%] w-[58vw] blur-[48px]"
        style={{ background: "radial-gradient(closest-side,rgba(255,95,40,.42),transparent 72%)" }}
      />
      {/* Center light beam */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-[10vw] -translate-x-1/2"
        style={{ background: "radial-gradient(ellipse at center,rgba(150,185,255,.08),transparent 66%)" }}
      />
      {/* Conic rays — cool on the left, warm on the right */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[130vh] w-[130vw] -translate-x-1/2 -translate-y-1/2 opacity-85"
        style={{
          background:
            "repeating-conic-gradient(from -8deg at 50% 50%,rgba(90,160,255,.16) 0deg 2.2deg,transparent 2.2deg 11deg)",
          maskImage:
            "radial-gradient(circle at 50% 50%,transparent 12%,#000 30%,transparent 60%),linear-gradient(90deg,#000 0%,transparent 46%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%,transparent 12%,#000 30%,transparent 60%),linear-gradient(90deg,#000 0%,transparent 46%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[130vh] w-[130vw] -translate-x-1/2 -translate-y-1/2 opacity-85"
        style={{
          background:
            "repeating-conic-gradient(from -8deg at 50% 50%,rgba(255,140,60,.16) 0deg 2.2deg,transparent 2.2deg 11deg)",
          maskImage:
            "radial-gradient(circle at 50% 50%,transparent 12%,#000 30%,transparent 60%),linear-gradient(270deg,#000 0%,transparent 46%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%,transparent 12%,#000 30%,transparent 60%),linear-gradient(270deg,#000 0%,transparent 46%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      />
      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[.22]"
        style={{
          background:
            "repeating-linear-gradient(99deg,rgba(90,160,255,.6) 0 2px,transparent 2px 15px)",
          maskImage: "linear-gradient(90deg,#000 0%,transparent 46%)",
          WebkitMaskImage: "linear-gradient(90deg,#000 0%,transparent 46%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[.22]"
        style={{
          background:
            "repeating-linear-gradient(81deg,rgba(255,140,60,.6) 0 2px,transparent 2px 15px)",
          maskImage: "linear-gradient(270deg,#000 0%,transparent 46%)",
          WebkitMaskImage: "linear-gradient(270deg,#000 0%,transparent 46%)",
        }}
      />

      {/* ── Logo ──────────────────────────────────────────────────────── */}
      <div className="absolute left-[max(3vw,18px)] top-[max(3vh,16px)] z-[6]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt="RipzClub"
          className="block h-[min(7vh,52px)] [filter:brightness(0)_invert(1)]"
        />
      </div>

      {/* ── Wordmark ──────────────────────────────────────────────────── */}
      <Wordmark variant="hero" />

      {/* ── Headline + subline ────────────────────────────────────────── */}
      <div className="relative z-[4] mt-[clamp(34px,5.5vh,56px)] max-w-[92vw] text-center">
        <div className="font-display text-[clamp(17px,2.8vw,36px)] leading-none tracking-[.03em] text-paper whitespace-nowrap">
          EVERY PACK. ONE GRADED HIT.{" "}
          <span className="inline-block translate-y-[-1px] rotate-[-3deg] whitespace-nowrap font-marker text-[.82em] text-[#FF9E2C] [text-shadow:0_0_16px_rgba(255,158,44,.35)]">
            guaranteed.
          </span>
        </div>
        <div className="mt-5 font-grotesk text-[clamp(.6rem,1.1vw,.72rem)] uppercase tracking-[.22em] text-paper/62">
          Certified slabs. Instant reveals. RipzSafe 80% floor.
        </div>
      </div>

      {/* ── Primary CTAs ──────────────────────────────────────────────── */}
      <div className="relative z-[4] mt-[clamp(28px,4.5vh,44px)] flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={EBAY_LIVE}
            target="_blank"
            rel="noopener"
            className="relative inline-flex items-center whitespace-nowrap rounded-full bg-white px-7 py-[15px] font-display text-[clamp(14px,1.5vw,19px)] tracking-[.06em] text-ink shadow-[4px_4px_0_rgba(0,0,0,.4)] transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#E8132B]"
          >
            WATCH THE LIVE
            <span className="absolute -right-[10px] -top-[9px] inline-flex items-center gap-1 rotate-[6deg] rounded-[4px] bg-ripz px-[7px] py-[3px] font-grotesk text-[9px] font-bold tracking-[.14em] text-white shadow-[2px_2px_0_rgba(0,0,0,.45)]">
              <span className="size-[5px] rounded-full bg-white animate-[zPulse_1.4s_ease-in-out_infinite]" />
              LIVE
            </span>
          </a>
          <a
            href={SITE}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] border-paper/40 bg-transparent px-7 py-[15px] font-display text-[clamp(14px,1.5vw,19px)] tracking-[.06em] text-paper transition-colors duration-[250ms] hover:border-[#46A6F5] hover:text-[#46A6F5]"
          >
            BROWSE THE DROP
          </a>
        </div>
      </div>

      {/* ── Show schedule ─────────────────────────────────────────────── */}
      <ShowSchedule />

      <Divider />

      {/* ── Community block + social cards ────────────────────────────── */}
      <div className="relative z-[4] mt-[clamp(36px,6vh,64px)] flex w-full flex-col items-center gap-[38px]">
        <div className="text-center font-display text-[clamp(28px,3.2vw,48px)] tracking-[.04em] text-paper">
          JOIN THE{" "}
          <span className="relative inline-block text-paper">
            COMMUNITY
            <svg
              viewBox="0 0 100 44"
              className="pointer-events-none absolute -left-[14%] -top-[56%] h-[210%] w-[128%] overflow-visible"
            >
              <path
                d="M8,22 C12,6 88,2 94,18 C99,34 64,43 30,40 C10,38 4,30 12,16"
                fill="none"
                stroke="#2E7BE6"
                strokeWidth="2.4"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset="1"
                className="animate-[dash_1s_ease-out_.6s_both]"
              />
            </svg>
          </span>
          <div className="mt-[18px] font-grotesk text-[.72rem] uppercase tracking-[.24em] text-paper/60">
            Be part of every rip — join the community.
          </div>
        </div>

        <SocialCards />
      </div>

      <Divider />

      {/* ── Drop-alert signup ─────────────────────────────────────────── */}
      <AlertSignup />

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <SiteFooter />
    </section>
  )
}

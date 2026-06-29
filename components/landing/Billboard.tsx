import { Wordmark } from "./Wordmark"
import { StreamerLineup } from "./StreamerLineup"
import { ShowSchedule } from "./ShowSchedule"
import { DiscordBanner } from "./DiscordBanner"
import { AlertSignup } from "./AlertSignup"
import { SiteFooter } from "./SiteFooter"

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
 * wordmark, the featured-streamer headline, the drop-alert / monthly-prize signup,
 * the Discord community banner (primary funnel), the weekly show schedule, and the
 * closing footer.
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

      {/* ── Wordmark ──────────────────────────────────────────────────── */}
      <Wordmark variant="hero" />

      {/* ── Featuring the crew (streamer line-up) ─────────────────────── */}
      <StreamerLineup />

      {/* ── Win a prize / drop-alert signup ───────────────────────────── */}
      <AlertSignup />

      {/* ── Discord community banner (primary funnel) ─────────────────── */}
      <DiscordBanner />

      <Divider />

      {/* ── Show schedule ─────────────────────────────────────────────── */}
      <ShowSchedule />

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <SiteFooter />
    </section>
  )
}

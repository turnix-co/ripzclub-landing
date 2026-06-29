import type { CSSProperties } from "react"

/**
 * "Featuring The Crew" — the streamer line-up that sits under the hero wordmark.
 * A row of circular avatars (gradient ring + radial glow + skewed name + accent
 * underline), one per RIPZCLUB streamer, wrapping on small screens.
 *
 * Avatars are data-driven: drop a streamer's portrait into `/public` and point
 * `img` at it. Any streamer without an `img` renders a polished monogram tile
 * (their initial over the dark gradient) so the row never shows a broken image
 * while we wait on the remaining photos.
 */

type Accent = {
  /** 3px gradient ring around the avatar. */
  ring: string
  /** Soft radial glow bleeding out behind the avatar. */
  glow: string
  /** Colour of the little underline beneath the name. */
  underline: string
}

const AMBER: Accent = {
  ring: "linear-gradient(150deg,#FFD08A,#F0631A)",
  glow: "rgba(255,158,44,.5)",
  underline: "#FF9E2C",
}
const BLUE: Accent = {
  ring: "linear-gradient(150deg,#BFEBFF,#1E6BD8)",
  glow: "rgba(70,166,245,.5)",
  underline: "#46A6F5",
}
const RED: Accent = {
  ring: "linear-gradient(150deg,#FF8A8A,#C20E22)",
  glow: "rgba(232,19,43,.55)",
  underline: "#E8132B",
}

type Streamer = {
  name: string
  accent: Accent
  /** Portrait in /public; omit to render the monogram placeholder instead. */
  img?: string
  /** Vertical framing of the portrait inside the circle. */
  objectPosition?: string
}

const STREAMERS: Streamer[] = [
  { name: "PINKY", accent: AMBER, img: "/PINKY.webp", objectPosition: "50% 16%" },
  { name: "GERRIE", accent: BLUE, img: "/GERRIE.png", objectPosition: "50% 24%" },
  { name: "KNIXRIPZ", accent: BLUE, img: "/KNIXRIPZ.webp", objectPosition: "50% 28%" },
  { name: "LEE", accent: BLUE, img: "/LEE.png", objectPosition: "50% 26%" },
  { name: "A-ARON", accent: AMBER, img: "/A-ARON.webp", objectPosition: "50% 10%" },
  { name: "MICKEVO", accent: RED, img: "/MICKEVO.webp", objectPosition: "50% 18%" },
]

const INNER_BG = "radial-gradient(120% 90% at 50% 0%,#1b2440,#0c1019 72%)"

function Avatar({ name, accent, img, objectPosition }: Streamer) {
  return (
    <div className="flex flex-col items-center gap-[clamp(11px,1.2vw,16px)]">
      {/* avatar — ring + glow, lifts on hover (pure CSS, no JS) */}
      <div className="relative flex cursor-pointer items-end justify-center transition-transform duration-[250ms] ease-out hover:scale-[1.07]">
        <div
          aria-hidden="true"
          className="absolute bottom-[-6px] left-1/2 z-0 h-[128%] w-[128%] -translate-x-1/2 rounded-full blur-[26px]"
          style={{ background: `radial-gradient(closest-side,${accent.glow},transparent 72%)` }}
        />
        <div
          className="relative z-[1] rounded-full p-[3px] shadow-[0_14px_30px_rgba(0,0,0,.5)]"
          style={{ background: accent.ring }}
        >
          <div
            className="size-[clamp(104px,12.6vw,150px)] overflow-hidden rounded-full"
            style={{ background: INNER_BG }}
          >
            {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img}
                alt={name}
                loading="lazy"
                className="size-full object-cover"
                style={{ objectPosition }}
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex size-full items-center justify-center font-display text-[clamp(40px,5vw,58px)] text-paper/25"
                style={{ transform: "skewX(-4deg)" }}
              >
                {name.charAt(0)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* name */}
      <div
        className="whitespace-nowrap font-display text-[clamp(13px,1.45vw,18px)] tracking-[.05em] text-paper"
        style={{ transform: "skewX(-4deg)", textShadow: "0 2px 8px rgba(0,0,0,.55)" } as CSSProperties}
      >
        {name}
      </div>

      {/* accent underline */}
      <div
        className="mt-[-4px] h-[3px] w-[46px] rounded-[2px]"
        style={{ background: `linear-gradient(90deg,transparent,${accent.underline},transparent)` }}
      />
    </div>
  )
}

export function StreamerLineup() {
  return (
    <div className="relative z-[4] mt-[clamp(14px,2.5vh,26px)] max-w-[min(1180px,95vw)] text-center">
      {/* — FEATURING THE CREW — small label with flanker dashes */}
      <div className="flex items-center justify-center gap-3 font-grotesk text-[clamp(.62rem,1.2vw,.82rem)] uppercase tracking-[.34em] text-paper/55">
        <span aria-hidden className="h-px w-[clamp(20px,3vw,36px)] bg-[linear-gradient(90deg,transparent,#FFB23E)]" />
        Featuring The Crew
        <span aria-hidden className="h-px w-[clamp(20px,3vw,36px)] bg-[linear-gradient(90deg,#FFB23E,transparent)]" />
      </div>

      {/* streamer line-up */}
      <div className="mt-[clamp(20px,3.2vh,38px)] flex flex-wrap items-end justify-center gap-[clamp(10px,2vw,30px)]">
        {STREAMERS.map((s) => (
          <Avatar key={s.name} {...s} />
        ))}
      </div>

      <div className="mt-[clamp(22px,3.4vh,34px)] font-grotesk text-[clamp(.6rem,1.1vw,.72rem)] uppercase tracking-[.22em] text-paper/62">
        The best streamers bringing live streams to you every day!
      </div>
    </div>
  )
}

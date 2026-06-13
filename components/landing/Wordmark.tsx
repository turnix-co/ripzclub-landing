import type { CSSProperties } from "react"

type WordmarkProps = {
  /** "hero" is the large animated billboard mark, "loader" is the compact loading-screen mark. */
  variant?: "hero" | "loader"
}

const GOLD_FILL = "linear-gradient(180deg,#FFE49A 0%,#FFB23E 40%,#F0631A 70%,#BE410B 100%)"
const BLUE_FILL = "linear-gradient(180deg,#BFEBFF 0%,#46A6F5 40%,#1E6BD8 70%,#0E3C86 100%)"

const clip: CSSProperties = {
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  paintOrder: "stroke fill",
}

/**
 * The KNIXRIPZ × RIPZCLUB wordmark: a skewed gold half, a rotated outlined "X",
 * and a skewed blue half. Shared between the loader and the hero billboard.
 */
export function Wordmark({ variant = "hero" }: WordmarkProps) {
  const hero = variant === "hero"
  const skew = hero ? "skewX(-6deg)" : "skewX(-7deg)"
  const sideSize = hero ? "min(10vw, 96px)" : "clamp(26px, 5vw, 54px)"
  const xSize = hero ? "min(10vw, 100px)" : "clamp(26px, 5vw, 54px)"

  return (
    <div
      className="relative z-[4] flex items-center justify-center font-luckiest leading-[.82]"
      style={{
        gap: hero ? "min(2vw, 22px)" : undefined,
        animation: hero ? undefined : "zPulse 1.4s ease-in-out infinite",
      }}
    >
      <span
        style={{
          ...clip,
          fontSize: sideSize,
          backgroundImage: GOLD_FILL,
          WebkitTextStroke: hero ? "clamp(1.5px,.3vw,3.5px) #2A1402" : "1.5px #2A1402",
          transform: skew,
          filter: hero
            ? "drop-shadow(0 3px 0 rgba(40,18,2,.55)) drop-shadow(0 9px 11px rgba(0,0,0,.22))"
            : undefined,
          animation: hero ? "rise .7s cubic-bezier(.22,1,.36,1) .08s both" : undefined,
        }}
      >
        KNIXRIPZ
      </span>
      <span
        className="relative z-[3]"
        style={{
          fontSize: xSize,
          color: "#FFFFFF",
          WebkitTextStroke: hero ? "clamp(1.8px,.36vw,4.5px) #16233f" : "1.6px #16233f",
          paintOrder: "stroke fill",
          transform: "rotate(-8deg)",
          margin: hero ? undefined : "0 -.05em",
          filter: hero
            ? "drop-shadow(0 0 16px rgba(255,255,255,.7)) drop-shadow(0 6px 8px rgba(10,20,40,.42))"
            : "drop-shadow(0 0 12px rgba(255,255,255,.55))",
          animation: hero ? "rise .7s cubic-bezier(.22,1,.36,1) .2s both" : undefined,
        }}
      >
        X
      </span>
      <span
        style={{
          ...clip,
          fontSize: sideSize,
          backgroundImage: BLUE_FILL,
          WebkitTextStroke: hero ? "clamp(1.5px,.3vw,3.5px) #06122c" : "1.5px #06122c",
          transform: skew,
          filter: hero
            ? "drop-shadow(0 3px 0 rgba(2,10,30,.55)) drop-shadow(0 9px 11px rgba(0,0,0,.22))"
            : undefined,
          animation: hero ? "rise .7s cubic-bezier(.22,1,.36,1) .32s both" : undefined,
        }}
      >
        RIPZCLUB
      </span>
    </div>
  )
}

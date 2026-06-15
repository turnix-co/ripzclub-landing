import type { CSSProperties } from "react"

type WordmarkProps = {
  /** "hero" is the large animated billboard mark, "loader" is the compact loading-screen mark. */
  variant?: "hero" | "loader"
}

const GOLD_FILL = "linear-gradient(180deg,#FFE49A 0%,#FFB23E 40%,#F0631A 70%,#BE410B 100%)"
const BLUE_FILL = "linear-gradient(180deg,#BFEBFF 0%,#46A6F5 40%,#1E6BD8 70%,#0E3C86 100%)"

/**
 * Minimal, mobile-safe gradient-clip recipe. This element carries ONLY the clip —
 * no filter / transform / animation, which on mobile WebKit/Blink force the
 * background-clip:text layer to rasterize at the (short) line box and chop the
 * gradient to the top half of the glyphs. `line-height:1` + `box-decoration-break`
 * + `-webkit-text-fill-color` make the whole letter fill, every browser.
 */
const clipFill = (fill: string, stroke: string): CSSProperties => ({
  display: "inline-block",
  lineHeight: 1,
  backgroundImage: fill,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
  WebkitTextStroke: stroke,
  paintOrder: "stroke fill",
  WebkitBoxDecorationBreak: "clone",
  boxDecorationBreak: "clone",
})

/**
 * The KNIXRIPZ × RIPZCLUB wordmark: a skewed gold half, a rotated outlined "X",
 * and a skewed blue half. Shared between the loader and the hero billboard.
 *
 * Each gradient word is a wrapper (skew + drop-shadow + entrance) around an inner
 * span that does the gradient clip — keeping effects off the clipped text is what
 * stops the fill from chopping in half on mobile.
 */
export function Wordmark({ variant = "hero" }: WordmarkProps) {
  const hero = variant === "hero"
  const skew = hero ? "skewX(-6deg)" : "skewX(-7deg)"
  const sideSize = hero ? "min(10vw, 96px)" : "clamp(26px, 5vw, 54px)"
  const xSize = hero ? "min(10vw, 100px)" : "clamp(26px, 5vw, 54px)"
  const goldStroke = hero ? "clamp(1.5px,.3vw,3.5px) #2A1402" : "1.5px #2A1402"
  const blueStroke = hero ? "clamp(1.5px,.3vw,3.5px) #06122c" : "1.5px #06122c"

  return (
    <div
      className="relative z-[4] flex items-center justify-center font-luckiest leading-[.82]"
      style={{
        gap: hero ? "min(2vw, 22px)" : undefined,
        animation: hero ? undefined : "zPulse 1.4s ease-in-out infinite",
      }}
    >
      {/* GOLD — wrapper owns skew + shadow + entrance; inner span owns the clip */}
      <span
        style={{
          display: "inline-block",
          lineHeight: 1,
          fontSize: sideSize,
          transform: skew,
          filter: hero
            ? "drop-shadow(0 3px 0 rgba(40,18,2,.55)) drop-shadow(0 9px 11px rgba(0,0,0,.22))"
            : undefined,
          animation: hero ? "rise .7s cubic-bezier(.22,1,.36,1) .08s both" : undefined,
        }}
      >
        <span style={clipFill(GOLD_FILL, goldStroke)}>KNIXRIPZ</span>
      </span>

      {/* X — solid white fill, so filter + stroke can stay on the same element */}
      <span
        className="relative z-[3]"
        style={{
          display: "inline-block",
          lineHeight: 1,
          fontSize: xSize,
          color: "#FFFFFF",
          WebkitTextFillColor: "#FFFFFF",
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

      {/* BLUE */}
      <span
        style={{
          display: "inline-block",
          lineHeight: 1,
          fontSize: sideSize,
          transform: skew,
          filter: hero
            ? "drop-shadow(0 3px 0 rgba(2,10,30,.55)) drop-shadow(0 9px 11px rgba(0,0,0,.22))"
            : undefined,
          animation: hero ? "rise .7s cubic-bezier(.22,1,.36,1) .32s both" : undefined,
        }}
      >
        <span style={clipFill(BLUE_FILL, blueStroke)}>RIPZCLUB</span>
      </span>
    </div>
  )
}

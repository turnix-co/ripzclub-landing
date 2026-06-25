import type { CSSProperties } from "react"

type WordmarkProps = {
  /** "hero" is the large animated billboard mark, "loader" is the compact loading-screen mark. */
  variant?: "hero" | "loader"
}

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
 * The RIPZCLUB wordmark: a skewed, blue gradient-clipped "RIPZCLUB", shared between
 * the loader and the hero billboard.
 *
 * The gradient word is a wrapper (skew + drop-shadow + entrance) around an inner
 * span that does only the clip — keeping effects off the clipped text is what stops
 * the fill from chopping in half on mobile.
 */
export function Wordmark({ variant = "hero" }: WordmarkProps) {
  const hero = variant === "hero"
  const skew = hero ? "skewX(-6deg)" : "skewX(-7deg)"
  const blueStroke = hero ? "clamp(1.5px,.3vw,3.5px) #06122c" : "1.5px #06122c"

  return (
    <div
      className="relative z-[4] flex flex-wrap items-center justify-center font-luckiest leading-[.82]"
      style={{
        fontSize: hero ? undefined : "clamp(26px, 5vw, 54px)",
        animation: hero ? undefined : "zPulse 1.4s ease-in-out infinite",
      }}
    >
      {/* RIPZCLUB — blue. Wrapper owns skew + shadow + entrance; inner owns the clip. */}
      <span
        style={{
          display: "inline-block",
          lineHeight: 1,
          fontSize: hero ? "min(11vw, 112px)" : undefined,
          transform: skew,
          filter: hero
            ? "drop-shadow(0 3px 0 rgba(2,10,30,.55)) drop-shadow(0 9px 11px rgba(0,0,0,.22))"
            : undefined,
          animation: hero ? "rise .7s cubic-bezier(.22,1,.36,1) .08s both" : undefined,
        }}
      >
        <span style={clipFill(BLUE_FILL, blueStroke)}>RIPZCLUB</span>
      </span>
    </div>
  )
}

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
 * The RIPZCLUB •LIVE wordmark: a skewed blue "RIPZCLUB", a pulsing red dot, and a
 * skewed gold "LIVE", the dot+LIVE tilted as a unit. Shared between the loader and
 * the hero billboard.
 *
 * Every gradient word is a wrapper (skew + drop-shadow + entrance) around an inner
 * span that does only the clip — keeping effects off the clipped text is what stops
 * the fill from chopping in half on mobile.
 */
export function Wordmark({ variant = "hero" }: WordmarkProps) {
  const hero = variant === "hero"
  const skew = hero ? "skewX(-6deg)" : "skewX(-7deg)"
  const blueStroke = hero ? "clamp(1.5px,.3vw,3.5px) #06122c" : "1.5px #06122c"
  const goldStroke = hero ? "clamp(1.3px,.26vw,3px) #2A1402" : "1.3px #2A1402"

  return (
    <div
      className="relative z-[4] flex flex-wrap items-center justify-center font-luckiest leading-[.82]"
      style={{
        fontSize: hero ? undefined : "clamp(26px, 5vw, 54px)",
        gap: hero ? "min(2.2vw, 26px)" : ".22em",
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

      {/* •LIVE — red dot + gold LIVE, the whole group tilted */}
      <span
        className="relative z-[3]"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: ".16em",
          lineHeight: 1,
          fontSize: hero ? "min(7.4vw, 72px)" : ".6em",
          transform: "rotate(-6deg)",
          animation: hero ? "rise .7s cubic-bezier(.22,1,.36,1) .24s both" : undefined,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: hero ? ".38em" : ".42em",
            height: hero ? ".38em" : ".42em",
            borderRadius: "50%",
            background: "#E8132B",
            boxShadow: hero ? "0 0 18px rgba(232,19,43,.8)" : "0 0 12px rgba(232,19,43,.7)",
            animation: "zPulse 1.4s ease-in-out infinite",
          }}
        />
        {/* LIVE wrapper owns skew + shadow; inner owns the clip */}
        <span
          style={{
            display: "inline-block",
            lineHeight: 1,
            transform: skew,
            filter: hero ? "drop-shadow(0 3px 0 rgba(40,18,2,.5))" : undefined,
          }}
        >
          <span style={clipFill(GOLD_FILL, goldStroke)}>LIVE</span>
        </span>
      </span>
    </div>
  )
}

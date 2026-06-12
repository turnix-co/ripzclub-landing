'use client'

import { useRef, useEffect } from 'react'

const LEFT_ITEMS = [
  { num: '01', title: 'GRADED CHECKLISTS', text: 'Every checklist is verified through professional grading standards.' },
  { num: '02', title: 'RANDOMIZED ASSEMBLY', text: 'Every card is randomized and packed under strict supervision.' },
  { num: '03', title: 'AUTHENTICATED', text: 'Every card is authenticated and confirmed genuine.' },
]

const RIGHT_ITEMS = [
  { num: '04', title: 'SEALED PLACEMENT', text: 'Every placement is secured and known only through the grading system.' },
  { num: '05', title: 'AUS-WIDE INSURED', text: 'Every graded slab is stored and shipped fully insured across Australia.' },
  { num: '06', title: 'RIPZSAFE FLOOR', text: 'Every pull is backed by the RipzSafe 80% value floor.' },
]

const EMBERS = [
  { left: '12%', bottom: '8%', size: 4, color: 'rgba(235,96,82,.6)', blur: '.5px', dur: '11s', delay: '0s' },
  { left: '26%', bottom: '4%', size: 3, color: 'rgba(245,245,244,.4)', blur: '.5px', dur: '14s', delay: '-4s' },
  { left: '41%', bottom: '10%', size: 5, color: 'rgba(235,96,82,.45)', blur: '1px', dur: '12.5s', delay: '-8s' },
  { left: '57%', bottom: '5%', size: 3, color: 'rgba(232,195,106,.45)', blur: '.5px', dur: '15s', delay: '-2s' },
  { left: '70%', bottom: '9%', size: 4, color: 'rgba(235,96,82,.55)', blur: '.5px', dur: '10.5s', delay: '-6s' },
  { left: '84%', bottom: '4%', size: 3, color: 'rgba(245,245,244,.35)', blur: '.5px', dur: '13.5s', delay: '-10s' },
  { left: '91%', bottom: '11%', size: 4, color: 'rgba(232,195,106,.4)', blur: '1px', dur: '16s', delay: '-12s' },
  { left: '6%', bottom: '6%', size: 3, color: 'rgba(235,96,82,.4)', blur: '.5px', dur: '12s', delay: '-9s' },
]

export function CertificateSection() {
  const closeRef = useRef<HTMLDivElement>(null)

  function whenInView(el: HTMLElement, ratio: number, cb: () => void) {
    let fired = false
    const check = () => {
      if (fired) return
      const r = el.getBoundingClientRect(), vh = window.innerHeight
      const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0)
      if (visible > Math.min(r.height, vh * 0.6) * ratio) {
        fired = true
        window.removeEventListener('scroll', check)
        cb()
      }
    }
    window.addEventListener('scroll', check, { passive: true })
    setTimeout(check, 150)
  }

  useEffect(() => {
    const rm = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
    if (rm) return

    const closeEl = closeRef.current
    if (closeEl) {
      closeEl.style.opacity = '0'
      whenInView(closeEl, 0.4, () => {
        closeEl.style.opacity = ''
        closeEl.animate([
          { transform: 'translateY(28px)', opacity: '0' },
          { transform: 'translateY(0)', opacity: '1' },
        ], { duration: 600, easing: 'cubic-bezier(.22,1,.36,1)' })
      })
    }
  }, [])

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-[radial-gradient(ellipse_at_50%_100%,rgba(232,19,43,.08),transparent_50%),linear-gradient(180deg,#16070B_0%,#0B080A_32%,#050506_100%)] px-[5vw] pb-[7vh] pt-[12vh]">
      {/* Ghost watermark */}
      <div className="pointer-events-none absolute -right-[1.5vw] top-[4vh] font-display text-[min(17vh,13vw)] leading-none tracking-[.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(245,245,244,.09)] [writing-mode:vertical-rl]">VERIFIED</div>

      {/* Aurora blobs */}
      <div className="pointer-events-none absolute -left-[14%] -top-[10%] h-[56vh] w-[56vw] rounded-full bg-[radial-gradient(closest-side,rgba(232,19,43,.5),transparent_70%)] opacity-[.07] blur-[46px] [animation:auroraDrift_26s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-[14%] -right-[16%] h-[52vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,rgba(232,195,106,.45),transparent_70%)] opacity-[.05] blur-[50px] [animation:auroraDrift_32s_ease-in-out_-12s_infinite_reverse]" />

      {/* Rising embers */}
      {EMBERS.map((e, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: e.left,
            bottom: e.bottom,
            width: e.size,
            height: e.size,
            background: e.color,
            filter: `blur(${e.blur})`,
            animation: `emberUp ${e.dur} linear ${e.delay} infinite`,
          }}
        />
      ))}

      {/* Dot grid + scatter marks */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[40%] w-[24vw] bg-[radial-gradient(rgba(245,245,244,.5)_1px,transparent_1.6px)] bg-[length:12px_12px] opacity-[.05] [mask-image:radial-gradient(circle_at_0_100%,#000,transparent_75%)]" />
      <div className="pointer-events-none absolute left-[8%] top-[14%] font-grotesk text-[16px] text-paper/14">+</div>
      <div className="pointer-events-none absolute bottom-[22%] right-[10%] font-grotesk text-[14px] text-paper/12">+</div>
      <div className="pointer-events-none absolute bottom-[14%] left-[13%] h-1.5 w-1.5 rotate-45 border border-paper/16" />
      <div className="pointer-events-none absolute -left-[2vw] bottom-[6vh] font-grotesk text-[.58rem] uppercase tracking-[.32em] text-paper/16 [writing-mode:vertical-rl]">RZC · Authentication Protocol</div>

      {/* Centered header */}
      <div className="relative z-[2] mx-auto flex max-w-[880px] flex-col items-center gap-5 text-center">
        <div className="flex items-center gap-3.5">
          <div className="h-px w-[34px] bg-[linear-gradient(90deg,transparent,rgba(232,19,43,.8))]" />
          <div className="font-grotesk text-[.64rem] font-bold uppercase tracking-[.34em] text-[#FF2D43]">The Guarantee</div>
          <div className="h-px w-[34px] bg-[linear-gradient(90deg,rgba(232,19,43,.8),transparent)]" />
        </div>
        <div className="font-display text-[clamp(34px,4.6vw,72px)] leading-[1.08] text-paper">
          WHAT DOES{' '}
          <span className="relative inline-block">
            PSA VERIFIED
            <svg viewBox="0 0 220 18" className="absolute -bottom-3 left-0 w-full overflow-visible">
              <path d="M4,6 C60,2 160,2 216,5" fill="none" stroke="#E8132B" strokeWidth="4" strokeLinecap="round" />
              <path d="M10,13 C70,9 150,9 210,12" fill="none" stroke="#E8132B" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>{' '}
          MEAN?
        </div>
        <div className="max-w-[560px] font-grotesk text-[.68rem] uppercase leading-[1.9] tracking-[.2em] text-paper/50">
          RipzClub ensures every pack delivers a verified, authentic, and collectible experience.
        </div>
      </div>

      {/* Two columns flanking the pack */}
      <div className="relative z-[2] mx-auto mt-[2.5vh] flex max-w-[1280px] flex-wrap items-center justify-center gap-y-[5vw] gap-x-[3.5vw]">
        {/* Left column */}
        <div className="flex min-w-[min(280px,100%)] flex-1 basis-[280px] flex-col items-center gap-[26px] min-[880px]:items-end min-[880px]:gap-[38px]">
          {LEFT_ITEMS.map((item) => (
            <div key={item.num} className="flex max-w-[320px] flex-col items-center gap-[7px] text-center min-[880px]:items-end min-[880px]:text-right">
              <div className="flex items-center gap-2.5">
                <span className="hidden font-grotesk text-[.6rem] font-bold tracking-[.2em] text-[#FF2D43] min-[880px]:inline">{item.num}</span>
                <span className="font-display text-[clamp(15px,1.2vw,18px)] tracking-[.08em] text-paper">{item.title}</span>
              </div>
              <div className="font-grotesk text-[13.5px] leading-[1.65] text-paper/80">{item.text}</div>
            </div>
          ))}
        </div>

        {/* Center pack */}
        <div className="relative flex flex-none flex-col items-center px-[18px] py-[26px] max-[879px]:order-first">
          <div className="pointer-events-none absolute left-1/2 top-[46%] aspect-square w-[150%] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(232,19,43,.22)_40deg,transparent_90deg,transparent_160deg,rgba(232,195,106,.13)_200deg,transparent_250deg,transparent_320deg,rgba(232,19,43,.16)_348deg,transparent_360deg)] blur-[18px] [animation:glareSpin_16s_linear_infinite]" />
          <div className="pointer-events-none absolute left-1/2 top-[46%] aspect-square w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-paper/10" />
          <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-[24%] w-[90%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(232,19,43,.3),transparent_65%)] blur-[24px]" />
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/pack-red.png" alt="PSA Verified Pack" draggable={false} className="block h-[min(44vh,400px)] w-auto -rotate-2 select-none [filter:drop-shadow(0_0_26px_rgba(232,19,43,.22))_drop-shadow(0_22px_38px_rgba(0,0,0,.6))]" />
            {/* Lens flare */}
            <div className="pointer-events-none absolute left-[14%] top-[9%] -ml-[65px] -mt-[65px] h-[130px] w-[130px] opacity-0 mix-blend-screen [animation:flarePulse_3.2s_ease-out_1.4s_infinite]">
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,.95),rgba(255,210,170,.4)_26%,rgba(232,19,43,.18)_45%,transparent_68%)]" />
              <div className="absolute -left-[55%] -right-[55%] top-1/2 -mt-px h-0.5 bg-[linear-gradient(90deg,transparent,rgba(255,235,215,.85),transparent)]" />
              <div className="absolute -bottom-[55%] -top-[55%] left-1/2 -ml-px w-0.5 bg-[linear-gradient(180deg,transparent,rgba(255,235,215,.7),transparent)]" />
              <div className="absolute left-[8%] right-[8%] top-1/2 h-px rotate-45 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)]" />
              <div className="absolute left-[8%] right-[8%] top-1/2 h-px -rotate-45 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)]" />
              <div className="absolute left-[76%] top-[76%] h-3.5 w-3.5 rounded-full border border-[rgba(255,235,215,.4)]" />
            </div>
          </div>
          <div className="mt-[22px] flex items-center gap-[22px]">
            <div className="-rotate-3 font-marker text-[clamp(20px,2vw,26px)] text-paper">RipzClub</div>
            <div className="rotate-3 whitespace-nowrap rounded-md border-2 border-[#B68A35] px-2.5 py-[5px] font-grotesk text-[.58rem] font-bold tracking-[.22em] text-gold">AUS-WIDE INSURED</div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex min-w-[min(280px,100%)] flex-1 basis-[280px] flex-col items-center gap-[26px] min-[880px]:items-start min-[880px]:gap-[38px]">
          {RIGHT_ITEMS.map((item) => (
            <div key={item.num} className="flex max-w-[320px] flex-col items-center gap-[7px] text-center min-[880px]:items-start min-[880px]:text-left">
              <div className="flex items-center gap-2.5">
                <span className="font-display text-[clamp(15px,1.2vw,18px)] tracking-[.08em] text-paper">{item.title}</span>
                <span className="hidden font-grotesk text-[.6rem] font-bold tracking-[.2em] text-[#FF2D43] min-[880px]:inline">{item.num}</span>
              </div>
              <div className="font-grotesk text-[13.5px] leading-[1.65] text-paper/80">{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="relative z-[2] mx-auto mt-[7vh] max-w-[680px] text-center font-grotesk text-[.62rem] leading-[1.7] tracking-[.08em] text-paper/38">
        PSA is a trademark of Collectors Universe, Inc. RipzClub references professional grading standards; no affiliation is implied unless officially licensed.
      </div>

      {/* Footer bar */}
      <div ref={closeRef} className="mx-auto mt-[9vh] flex max-w-[1320px] flex-wrap items-center justify-between gap-6 border-t border-paper/12 pt-[34px]">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="RipzClub" className="block h-9 invert-[96%]" />
          <div className="font-grotesk text-[.7rem] uppercase tracking-[.18em] text-paper/55">© 2026 RipzClub</div>
        </div>
        <div className="flex flex-wrap items-center gap-[22px]">
          <a href="https://ripzclub.com" target="_blank" rel="noopener" className="footer-link">Website</a>
          <a href="https://discord.gg/W75rRdqCz4" target="_blank" rel="noopener" className="footer-link">Discord</a>
          <a href="https://www.ebay.com.au/ebaylive/sellers/uyrpxfoktc2" target="_blank" rel="noopener" className="footer-link">eBay Live</a>
        </div>
      </div>
    </section>
  )
}

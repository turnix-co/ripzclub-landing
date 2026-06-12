export function SocialLinksSection() {
  return (
    <section className="relative flex min-h-[50vh] flex-col items-center justify-center gap-14 overflow-hidden bg-paper px-4 pb-[12vh] pt-[11vh]">
      {/* Corner brackets */}
      <div className="pointer-events-none absolute left-3.5 top-3.5 size-[18px] border-l-[1.5px] border-t-[1.5px] border-ink/40" />
      <div className="pointer-events-none absolute right-3.5 top-3.5 size-[18px] border-r-[1.5px] border-t-[1.5px] border-ink/40" />
      <div className="pointer-events-none absolute bottom-3.5 left-3.5 size-[18px] border-b-[1.5px] border-l-[1.5px] border-ink/40" />
      <div className="pointer-events-none absolute bottom-3.5 right-3.5 size-[18px] border-b-[1.5px] border-r-[1.5px] border-ink/40" />
      {/* Dot grids */}
      <div className="pointer-events-none absolute left-0 top-0 h-[55%] w-[26vw] bg-[radial-gradient(rgba(10,10,12,.6)_1px,transparent_1.5px)] [background-size:12px_12px] opacity-[.055] [mask-image:radial-gradient(circle_at_0_0,#000,transparent_75%)] [-webkit-mask-image:radial-gradient(circle_at_0_0,#000,transparent_75%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[55%] w-[26vw] bg-[radial-gradient(rgba(10,10,12,.6)_1px,transparent_1.5px)] [background-size:12px_12px] opacity-[.055] [mask-image:radial-gradient(circle_at_100%_100%,#000,transparent_75%)] [-webkit-mask-image:radial-gradient(circle_at_100%_100%,#000,transparent_75%)]" />
      {/* Stamp */}
      <svg viewBox="0 0 120 120" className="pointer-events-none absolute right-[5%] top-[12%] w-[min(8vw,92px)] rotate-[10deg] opacity-45">
        <defs><path id="rzc-stamp2-arc" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" /></defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="#E8132B" strokeWidth="2" />
        <circle cx="60" cy="60" r="30" fill="none" stroke="#E8132B" strokeWidth="1.5" />
        <text fill="#E8132B" fontSize="12.5" fontFamily="Space Grotesk, sans-serif" letterSpacing="3.5">
          <textPath href="#rzc-stamp2-arc">AUS · INSURED · GRADED ·</textPath>
        </text>
      </svg>
      {/* Plus marks */}
      <div className="pointer-events-none absolute left-[7%] top-[22%] font-grotesk text-[17px] text-ink/30">+</div>
      <div className="pointer-events-none absolute bottom-[18%] left-[11%] font-grotesk text-[14px] text-ink/25">+</div>
      <div className="pointer-events-none absolute bottom-[26%] right-[9%] font-grotesk text-[16px] text-ink/28">+</div>
      <div className="pointer-events-none absolute left-[16%] top-[48%] size-1.5 rotate-45 bg-ripz/40" />
      <div className="pointer-events-none absolute right-[14%] top-[58%] size-1.5 rotate-45 border border-ink/35" />
      <div className="pointer-events-none absolute left-[18px] top-1/2 -translate-y-1/2 font-grotesk text-[.58rem] uppercase tracking-[.32em] text-ink/30 [writing-mode:vertical-rl]">RipzClub · The Stream · Australia</div>

      {/* Heading */}
      <div className="text-center font-display text-[clamp(32px,3.6vw,56px)] tracking-[.04em] text-ink">
        JOIN THE{' '}
        <span className="relative inline-block text-ink">
          CLUB
          <svg viewBox="0 0 100 44" className="pointer-events-none absolute -left-[22%] -top-[56%] h-[210%] w-[144%] overflow-visible">
            <path d="M8,22 C12,6 88,2 94,18 C99,34 64,43 30,40 C10,38 4,30 12,16" fill="none" stroke="#E8132B" strokeWidth="2.4" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" className="animate-[dash_1s_ease-out_.6s_both]" />
          </svg>
        </span>
        <div className="mt-[18px] font-grotesk text-[.72rem] uppercase tracking-[.24em] text-ink/55">Follow the rips. Never miss a pull.</div>
      </div>

      {/* Social cards */}
      <div className="box-border flex w-full max-w-[1020px] flex-wrap justify-center gap-x-[18px] gap-y-[26px] px-4">
        <div className="[transform:rotate(-2deg)_translateY(4px)]">
          <a href="https://ripzclub.com" target="_blank" rel="noopener" className="social-link">
            <svg viewBox="0 0 48 48" className="size-[38px] shrink-0"><circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" strokeWidth="3" /><ellipse cx="24" cy="24" rx="8" ry="17" fill="none" stroke="currentColor" strokeWidth="2.6" /><line x1="7" y1="24" x2="41" y2="24" stroke="currentColor" strokeWidth="2.6" /></svg>
            WEBSITE
          </a>
        </div>
        <div className="[transform:rotate(1.5deg)_translateY(-2px)]">
          <a href="[DISCORD_URL]" target="_blank" rel="noopener" className="social-link">
            <svg viewBox="0 0 48 48" className="size-[38px] shrink-0"><path d="M14 12 C20 9 28 9 34 12 C39 19 41 27 40 34 C36 38 31 39 29 39 L27.5 35.5 C31 34.6 33 33 33 33 C28 36 20 36 15 33 C15 33 17 34.6 20.5 35.5 L19 39 C17 39 12 38 8 34 C7 27 9 19 14 12 Z" fill="currentColor" /><circle cx="18.5" cy="26" r="3.1" fill="#FFFFFF" /><circle cx="29.5" cy="26" r="3.1" fill="#FFFFFF" /></svg>
            DISCORD
          </a>
        </div>
        <div className="relative [transform:rotate(-1deg)_translateY(-4px)]">
          <div className="pointer-events-none absolute -right-[9px] -top-[11px] z-[2] rotate-[7deg] whitespace-nowrap rounded-[3px] bg-ripz px-2 py-1 font-grotesk text-[9px] font-bold tracking-[.18em] text-paper shadow-[2px_2px_0_#0A0A0C]">THE STREAM</div>
          <a href="[EBAY_LIVE_URL]" target="_blank" rel="noopener" className="social-link">
            <svg viewBox="0 0 48 48" className="size-[38px] shrink-0"><circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="3" /><path d="M20 16.5 L33 24 L20 31.5 Z" fill="currentColor" /></svg>
            EBAY LIVE
          </a>
        </div>
        <div className="[transform:rotate(-1.5deg)_translateY(2px)]">
          <a href="[INSTAGRAM_URL]" target="_blank" rel="noopener" className="social-link">
            <svg viewBox="0 0 48 48" className="size-[38px] shrink-0"><rect x="8" y="8" width="32" height="32" rx="9" fill="none" stroke="currentColor" strokeWidth="3" /><circle cx="24" cy="24" r="7.5" fill="none" stroke="currentColor" strokeWidth="3" /><circle cx="33.4" cy="14.6" r="2.5" fill="currentColor" /></svg>
            INSTAGRAM
          </a>
        </div>
        <div className="[transform:rotate(2.5deg)_translateY(4px)]">
          <a href="[TIKTOK_URL]" target="_blank" rel="noopener" className="social-link">
            <svg viewBox="0 0 48 48" className="size-[38px] shrink-0"><path d="M27 8 L27 30.5 A7.5 7.5 0 1 1 21 23.2 L21 17.6 A13 13 0 1 0 33 30.5 L33 17 A11 11 0 0 0 40 19.6 L40 13.8 A9.5 9.5 0 0 1 33 8 Z" fill="currentColor" /></svg>
            TIKTOK
          </a>
        </div>
      </div>
    </section>
  )
}

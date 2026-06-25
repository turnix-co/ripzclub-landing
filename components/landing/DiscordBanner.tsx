const DISCORD_URL = "https://discord.gg/W75rRdqCz4"

const DiscordGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.3 5.4A16 16 0 0 0 15.3 4l-.2.4a13 13 0 0 1 3.5 1.7 14 14 0 0 0-12.2 0A13 13 0 0 1 9.9 4.4L9.7 4a16 16 0 0 0-4 1.4C2.8 9.6 2 13.7 2.3 17.7a16 16 0 0 0 5 2.5l.6-1a10 10 0 0 1-1.7-.8l.4-.3a11 11 0 0 0 9.6 0l.4.3a10 10 0 0 1-1.7.8l.6 1a16 16 0 0 0 5-2.5c.4-4.7-.7-8.7-3.2-12.3ZM9 15.5c-.9 0-1.7-.9-1.7-1.9S8 11.7 9 11.7s1.7.9 1.7 1.9S9.9 15.5 9 15.5Zm6 0c-.9 0-1.7-.9-1.7-1.9s.8-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9Z" />
  </svg>
)

/**
 * Full-width Discord community banner — the page's primary funnel. Replaces the
 * old multi-platform social card row; its single job is to drive joins to the
 * RipzClub Discord, so the button is deliberately large and high-contrast.
 */
export function DiscordBanner() {
  return (
    <div className="relative z-[4] mt-[clamp(42px,6vh,70px)] w-full max-w-[1080px]">
      <div
        className="relative flex flex-col items-center overflow-hidden rounded-[28px] border border-white/15 px-[clamp(24px,5vw,64px)] py-[clamp(38px,5vw,62px)] text-center shadow-[0_40px_90px_rgba(40,46,160,.45)]"
        style={{ background: "linear-gradient(135deg,#5865f2 0%,#4348c4 55%,#3a2f9e 100%)" }}
      >
        {/* Oversized watermark glyph */}
        <DiscordGlyph className="pointer-events-none absolute -right-[5%] -top-[34%] h-[160%] w-auto text-white/10" />
        {/* Soft light wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[10%] top-[6%] h-[130%] w-[55%] blur-[64px]"
          style={{ background: "radial-gradient(closest-side,rgba(255,255,255,.26),transparent 70%)" }}
        />

        <span className="relative inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-[7px] font-oswald text-[11px] font-semibold uppercase tracking-[.2em] text-white">
          <DiscordGlyph className="size-4" />
          The Community
        </span>

        <h2 className="relative mt-5 font-display text-[clamp(30px,5vw,56px)] leading-[.95] tracking-[.02em] text-white">
          Join the RipzClub community
        </h2>
        <p className="relative mt-4 max-w-[560px] font-poppins text-[clamp(14px,1.6vw,17px)] text-white/80">
          Every drop, every giveaway, every live rip — our Discord is where it
          all happens first. Come hang with the club.
        </p>

        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener"
          className="relative mt-7 inline-flex items-center gap-3 rounded-full bg-white px-[clamp(30px,5vw,56px)] py-[clamp(16px,2vw,22px)] font-display text-[clamp(18px,2.4vw,26px)] tracking-[.05em] text-[#4046c0] shadow-[6px_6px_0_rgba(0,0,0,.35)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[9px_9px_0_rgba(0,0,0,.5)]"
        >
          <DiscordGlyph className="size-[clamp(22px,3vw,30px)]" />
          JOIN THE DISCORD
        </a>
      </div>
    </div>
  )
}

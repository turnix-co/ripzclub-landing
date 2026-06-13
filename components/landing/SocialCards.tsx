import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const iconClass = "size-[38px] shrink-0"

const WebsiteIcon = (
  <svg viewBox="0 0 48 48" className={iconClass}>
    <circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" strokeWidth="3" />
    <ellipse cx="24" cy="24" rx="8" ry="17" fill="none" stroke="currentColor" strokeWidth="2.6" />
    <line x1="7" y1="24" x2="41" y2="24" stroke="currentColor" strokeWidth="2.6" />
  </svg>
)

const DiscordIcon = (
  <svg viewBox="0 0 48 48" className={iconClass}>
    <path
      d="M14 12 C20 9 28 9 34 12 C39 19 41 27 40 34 C36 38 31 39 29 39 L27.5 35.5 C31 34.6 33 33 33 33 C28 36 20 36 15 33 C15 33 17 34.6 20.5 35.5 L19 39 C17 39 12 38 8 34 C7 27 9 19 14 12 Z"
      fill="currentColor"
    />
    <circle cx="18.5" cy="26" r="3.1" fill="#FFFFFF" />
    <circle cx="29.5" cy="26" r="3.1" fill="#FFFFFF" />
  </svg>
)

const EbayIcon = (
  <svg viewBox="0 0 48 48" className={iconClass}>
    <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="3" />
    <path d="M20 16.5 L33 24 L20 31.5 Z" fill="currentColor" />
  </svg>
)

const InstagramIcon = (
  <svg viewBox="0 0 48 48" className={iconClass}>
    <rect x="8" y="8" width="32" height="32" rx="9" fill="none" stroke="currentColor" strokeWidth="3" />
    <circle cx="24" cy="24" r="7.5" fill="none" stroke="currentColor" strokeWidth="3" />
    <circle cx="33.4" cy="14.6" r="2.5" fill="currentColor" />
  </svg>
)

const TiktokIcon = (
  <svg viewBox="0 0 48 48" className={iconClass}>
    <path
      d="M27 8 L27 30.5 A7.5 7.5 0 1 1 21 23.2 L21 17.6 A13 13 0 1 0 33 30.5 L33 17 A11 11 0 0 0 40 19.6 L40 13.8 A9.5 9.5 0 0 1 33 8 Z"
      fill="currentColor"
    />
  </svg>
)

type Badge = { text: string; className: string }

type Card = {
  label: string
  icon: ReactNode
  /** Per-card jaunty rotation/offset so the row feels hand-arranged. */
  wrap: string
  href?: string
  badge?: Badge
  disabled?: boolean
}

const CARDS: Card[] = [
  {
    label: "WEBSITE",
    icon: WebsiteIcon,
    href: "https://ripzclub.com",
    wrap: "rotate-[-2deg] translate-y-[4px]",
  },
  {
    label: "DISCORD",
    icon: DiscordIcon,
    href: "https://discord.gg/W75rRdqCz4",
    wrap: "rotate-[1.5deg] -translate-y-[2px]",
  },
  {
    label: "EBAY LIVE",
    icon: EbayIcon,
    href: "https://www.ebay.com.au/ebaylive/sellers/uyrpxfoktc2",
    wrap: "rotate-[-1deg] -translate-y-[4px]",
    badge: { text: "THE STREAM", className: "bg-ripz text-paper shadow-[2px_2px_0_#0A0A0C]" },
  },
  {
    label: "INSTAGRAM",
    icon: InstagramIcon,
    href: "https://www.instagram.com/knixripz",
    wrap: "rotate-[-1.5deg] translate-y-[2px]",
  },
  {
    label: "TIKTOK",
    icon: TiktokIcon,
    wrap: "rotate-[2.5deg] translate-y-[4px]",
    badge: { text: "SOON", className: "bg-[#46506B] text-paper shadow-[2px_2px_0_rgba(0,0,0,.45)]" },
    disabled: true,
  },
]

export function SocialCards() {
  return (
    <div className="box-border flex w-full max-w-[1020px] flex-wrap items-center justify-center gap-x-[18px] gap-y-[26px] px-4">
      {CARDS.map((card) => (
        <div key={card.label} className={cn("relative", card.wrap)}>
          {card.badge && (
            <div
              className={cn(
                "pointer-events-none absolute -right-[9px] -top-[11px] z-[2] rotate-[7deg] whitespace-nowrap rounded-[3px] px-2 py-1 font-grotesk text-[9px] font-bold tracking-[.18em]",
                card.badge.className,
              )}
            >
              {card.badge.text}
            </div>
          )}
          {card.disabled ? (
            <div className="social-link pointer-events-none opacity-55">
              {card.icon}
              {card.label}
            </div>
          ) : (
            <a href={card.href} target="_blank" rel="noopener" className="social-link">
              {card.icon}
              {card.label}
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

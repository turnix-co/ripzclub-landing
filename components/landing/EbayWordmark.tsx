import { cn } from "@/lib/utils"

/**
 * The eBay logotype in its four brand colours (red/blue/yellow/green). Used for
 * the "Featured · Sponsored by eBay" tag and the "Follow us on eBay" button.
 * Inherits font-size from its parent; pass `className` to tweak.
 */
export function EbayWordmark({ className }: { className?: string }) {
  return (
    <span
      aria-label="eBay"
      className={cn("font-extrabold lowercase tracking-tight", className)}
      style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
    >
      <span aria-hidden="true" style={{ color: "#E53238" }}>e</span>
      <span aria-hidden="true" style={{ color: "#0064D2" }}>b</span>
      <span aria-hidden="true" style={{ color: "#F5AF02" }}>a</span>
      <span aria-hidden="true" style={{ color: "#86B817" }}>y</span>
    </span>
  )
}

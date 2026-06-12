import type { Metadata } from "next"
import { Anton, Space_Grotesk, Permanent_Marker } from "next/font/google"
import "./globals.css"

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-permanent-marker",
  display: "swap",
})

export const metadata: Metadata = {
  title: "RipzClub — Every Pack. One Graded Hit.",
  description: "Certified slabs. Instant reveals. RipzSafe 80% floor. Australia's premier trading card rip club.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${spaceGrotesk.variable} ${permanentMarker.variable}`}>
      <body>{children}</body>
    </html>
  )
}

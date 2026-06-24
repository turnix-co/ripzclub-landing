"use client"

import { useRef, useState } from "react"

/**
 * "Get drop alerts" block: the monthly-giveaway ticket banner, the email capture
 * form, and the in-place confirmation once a valid address is submitted.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

export function AlertSignup() {
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = inputRef.current?.value.trim() ?? ""
    if (v.indexOf("@") < 1 || v.indexOf(".") < 0) {
      inputRef.current?.focus()
      return
    }
    setBusy(true)
    try {
      const res = await fetch(`${API_URL}/api/alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v }),
      })
      if (!res.ok) throw new Error("Signup failed")
      setDone(true)
    } catch {
      inputRef.current?.focus()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="relative z-[4] mt-[clamp(58px,9.5vh,104px)] flex w-full flex-col items-center gap-[18px]">
      <div className="win-ticket mx-4 inline-flex rotate-[-1.5deg] items-center justify-center gap-2 border border-[#FF9E2C]/40 bg-[#FF9E2C]/13 px-6 py-[9px] font-grotesk text-[clamp(.58rem,1vw,.68rem)] font-bold uppercase tracking-[.2em] text-[#FFC877]">
        <span className="size-1.5 rounded-full bg-[#FF9E2C] shadow-[0_0_9px_rgba(255,158,44,.8)]" />
        Win a prize every month
      </div>

      <div className="text-center font-display text-[clamp(18px,2.4vw,30px)] leading-[1.1] tracking-[.02em] text-paper">
        Get drop alerts before every live.
      </div>

      {done ? (
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#46A6F5]/45 bg-[#46A6F5]/12 px-[26px] py-[15px] font-display text-[clamp(14px,1.5vw,18px)] tracking-[.03em] text-[#BFEBFF]">
          <span className="text-[#46A6F5]">✓</span>
          You&apos;re in — we&apos;ll ping you before every drop.
        </div>
      ) : (
        <form onSubmit={submit} className="flex w-full flex-wrap items-center justify-center gap-4">
          <input
            ref={inputRef}
            type="email"
            required
            placeholder="Enter your email"
            className="min-w-[min(300px,82vw)] rounded-full border-[1.5px] border-paper/30 bg-white/[.07] px-[22px] py-[15px] font-grotesk text-[15px] text-paper outline-none focus:border-paper/55"
          />
          <button
            type="submit"
            disabled={busy}
            className="relative inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-[30px] py-[15px] font-display text-[clamp(14px,1.5vw,19px)] tracking-[.06em] text-ink shadow-[4px_4px_0_rgba(232,19,43,.9)] transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#E8132B] disabled:opacity-60"
          >
            {busy ? "SENDING…" : "GET ALERTS"}
            <span className="absolute -right-[10px] -top-[9px] rotate-[6deg] whitespace-nowrap rounded-[4px] bg-[#FF9E2C] px-[7px] py-[3px] font-grotesk text-[9px] font-bold tracking-[.12em] text-[#1A0E02] shadow-[2px_2px_0_rgba(0,0,0,.45)]">
              WIN MONTHLY
            </span>
          </button>
        </form>
      )}

      <div className="font-grotesk text-[.6rem] uppercase tracking-[.14em] text-paper/42">
        Free to enter · One winner drawn monthly · No spam
      </div>
    </div>
  )
}

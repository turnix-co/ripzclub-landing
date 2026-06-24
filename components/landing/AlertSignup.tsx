"use client";

import { useRef, useState } from "react";

/**
 * "Win a prize every month" giveaway card: a gold-ribbon glass card split into
 * the monthly prize showcase (left) and the drop-alert signup form (right).
 * On a valid submit it posts to the backend and swaps the form for a check.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const TrophyIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6 3h12v2h3v3a4 4 0 0 1-4 4 6 6 0 0 1-4 3v2h3v2H8v-2h3v-2a6 6 0 0 1-4-3 4 4 0 0 1-4-4V5h3V3Zm0 4H5v1a2 2 0 0 0 1 1.7V7Zm12 0v2.7A2 2 0 0 0 19 8V7h-1Z" />
  </svg>
);

export function AlertSignup() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim() ?? "";
    if (email.indexOf("@") < 1 || email.indexOf(".") < 0) {
      emailRef.current?.focus();
      return;
    }
    const data = new FormData(formRef.current!);
    setBusy(true);
    try {
      const res = await fetch(`${API_URL}/api/alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: data.get("first"),
          lastName: data.get("last"),
          instagram: data.get("instagram"),
          discord: data.get("discord"),
        }),
      });
      if (!res.ok) throw new Error("Signup failed");
      setDone(true);
    } catch {
      emailRef.current?.focus();
    } finally {
      setBusy(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-paper/12 bg-white/[.05] px-[15px] py-[13px] font-poppins text-[14.5px] text-paper outline-none transition-colors placeholder:text-paper/35 focus:border-[#F3BC56] focus:bg-[#F3BC56]/[.06]";
  const labelClass =
    "mb-1.5 block font-oswald text-[11px] font-medium uppercase tracking-[.14em] text-paper/70";

  return (
    <div className="relative z-[4] mt-[clamp(58px,9.5vh,104px)] w-full max-w-[1080px]">
      <div className="relative rounded-[28px] border border-white/12 bg-[rgba(16,18,28,.55)] px-[clamp(24px,4vw,56px)] pb-[clamp(36px,4vw,52px)] pt-[clamp(44px,5vw,64px)] shadow-[0_40px_90px_rgba(0,0,0,.55)] backdrop-blur-[18px]">
        {/* ── Gold ribbon banner ───────────────────────────────────── */}
        <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center">
          {/* left wing — darker gold, notched (V-cut) outer end, sits behind plate */}
          <span
            aria-hidden="true"
            className="h-[34px] w-[clamp(26px,4vw,46px)] bg-[linear-gradient(180deg,#e0ad48,#b9801f)] shadow-[0_6px_14px_rgba(0,0,0,.4)]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 16px 50%)",
            }}
          />
          {/* center plate */}
          <div className="relative z-[2] -mx-[6px] inline-flex items-center gap-2.5 rounded-[10px] border border-[#fff5d6]/60 bg-[linear-gradient(180deg,#ffe8a8_0%,#f3bc56_52%,#dd9730_100%)] px-[34px] py-[14px] font-oswald text-[clamp(12px,1.5vw,15px)] font-semibold uppercase tracking-[.22em] text-[#3a2607] shadow-[0_10px_24px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.6)]">
            <span className="size-[18px]">{TrophyIcon}</span>
            Win a prize every month
          </div>
          {/* right wing — mirror of the left */}
          <span
            aria-hidden="true"
            className="h-[34px] w-[clamp(26px,4vw,46px)] bg-[linear-gradient(180deg,#e0ad48,#b9801f)] shadow-[0_6px_14px_rgba(0,0,0,.4)]"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, calc(100% - 16px) 50%, 100% 100%, 0 100%)",
            }}
          />
        </div>

        <div className="grid items-stretch gap-[clamp(28px,4vw,52px)] md:grid-cols-[1fr_1px_1.05fr]">
          {/* ── LEFT: prize showcase ───────────────────────────────── */}
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F3BC56]/40 bg-[#F3BC56]/[.14] px-3.5 py-[7px] font-oswald text-[11px] font-semibold uppercase tracking-[.18em] text-[#F3BC56]">
              <span className="size-3.5">{TrophyIcon}</span>
              This month&apos;s prize
            </span>

            <div className="relative my-[clamp(20px,3vw,34px)] flex w-full justify-center">
              {/* amber→blue radial glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-6%_8%_14%] rounded-full blur-[8px]"
                style={{
                  background:
                    "radial-gradient(closest-side,rgba(243,188,86,.34),transparent 70%),radial-gradient(closest-side at 60% 70%,rgba(70,140,245,.26),transparent 72%)",
                }}
              />
              {/* elliptical pedestal shadow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[2%] left-1/2 h-[26px] w-[62%] -translate-x-1/2 rounded-[50%] bg-black/55 blur-[16px]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/prize-box.png"
                alt="Sealed premium trading card booster box"
                className="relative w-[min(300px,76%)] [filter:drop-shadow(0_22px_30px_rgba(0,0,0,.5))]"
              />
            </div>

            <h3 className="mb-1.5 font-poppins text-[clamp(18px,2.2vw,23px)] font-bold text-paper">
              Premium Mystery Box
            </h3>
            <p className="mb-4 font-oswald text-[13px] tracking-[.06em] text-paper/60">
              Sealed Booster Pack · Graded Hit Inside
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ripz/50 bg-ripz/[.16] px-3.5 py-[7px] font-oswald text-[11px] font-semibold uppercase tracking-[.18em] text-[#ff5c70]">
              <span className="size-1.5 rounded-full bg-[#ff5c70]" />
              Factory Sealed · 1 Winner
            </span>
          </div>

          {/* vertical divider */}
          <div
            aria-hidden="true"
            className="hidden bg-[linear-gradient(180deg,transparent,rgba(255,255,255,.16)_18%,rgba(255,255,255,.16)_82%,transparent)] md:block"
          />

          {/* ── RIGHT: signup form ─────────────────────────────────── */}
          <div>
            {done ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
                <div className="flex size-[76px] items-center justify-center rounded-full border-2 border-[#22c55e] bg-[#22c55e]/15">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-10"
                  >
                    <path d="M4 12.5 10 18.5 20 6.5" />
                  </svg>
                </div>
                <h2 className="font-poppins text-[28px] font-bold text-paper">
                  You&apos;re on the list!
                </h2>
                <p className="font-poppins text-sm text-paper/60">
                  Watch your inbox — you&apos;re entered in this month&apos;s
                  draw.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={submit} noValidate>
                <h2 className="mb-2 font-poppins text-[clamp(24px,3vw,32px)] font-bold leading-[1.1] text-paper">
                  Get drop alerts before every live.
                </h2>
                <p className="mb-[22px] font-poppins text-sm text-paper/62">
                  Join the list, lock your spot, and you&apos;re automatically
                  in this month&apos;s prize draw.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass} htmlFor="first">
                      First name
                    </label>
                    <input
                      id="first"
                      name="first"
                      placeholder="Jordan"
                      autoComplete="given-name"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="last">
                      Last name
                    </label>
                    <input
                      id="last"
                      name="last"
                      placeholder="Carter"
                      autoComplete="family-name"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className={labelClass} htmlFor="email">
                    Email address
                  </label>
                  <input
                    ref={emailRef}
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    autoComplete="email"
                    className={fieldClass}
                  />
                </div>

                {/* socials divider */}
                <div className="my-[22px] mb-1 flex items-center gap-3 font-oswald text-[11px] uppercase tracking-[.16em] text-paper/45">
                  <span className="h-px flex-1 bg-white/12" />
                  Your socials · optional
                  <span className="h-px flex-1 bg-white/12" />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="relative">
                    <span className="absolute left-[7px] top-1/2 flex size-[38px] -translate-y-1/2 items-center justify-center rounded-[9px] bg-[linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth={2}
                        className="size-5"
                      >
                        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle
                          cx="17.2"
                          cy="6.8"
                          r="1.1"
                          fill="#fff"
                          stroke="none"
                        />
                      </svg>
                    </span>
                    <input
                      name="instagram"
                      placeholder="Instagram handle"
                      aria-label="Instagram handle"
                      className={`${fieldClass} pl-[54px]`}
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-[7px] top-1/2 flex size-[38px] -translate-y-1/2 items-center justify-center rounded-[9px] bg-[#5865f2]">
                      <svg viewBox="0 0 24 24" fill="#fff" className="size-5">
                        <path d="M19.3 5.4A16 16 0 0 0 15.3 4l-.2.4a13 13 0 0 1 3.5 1.7 14 14 0 0 0-12.2 0A13 13 0 0 1 9.9 4.4L9.7 4a16 16 0 0 0-4 1.4C2.8 9.6 2 13.7 2.3 17.7a16 16 0 0 0 5 2.5l.6-1a10 10 0 0 1-1.7-.8l.4-.3a11 11 0 0 0 9.6 0l.4.3a10 10 0 0 1-1.7.8l.6 1a16 16 0 0 0 5-2.5c.4-4.7-.7-8.7-3.2-12.3ZM9 15.5c-.9 0-1.7-.9-1.7-1.9S8 11.7 9 11.7s1.7.9 1.7 1.9S9.9 15.5 9 15.5Zm6 0c-.9 0-1.7-.9-1.7-1.9s.8-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9Z" />
                      </svg>
                    </span>
                    <input
                      name="discord"
                      placeholder="Discord username"
                      aria-label="Discord username"
                      className={`${fieldClass} pl-[54px]`}
                    />
                  </div>
                </div>

                {/* GET ALERTS button with red offset shadow + WIN MONTHLY badge */}
                <div className="relative mx-auto mt-[26px] w-[min(320px,100%)]">
                  <span className="absolute inset-[5px_-5px_-5px_5px] rounded-full bg-ripz" />
                  <span className="absolute -top-[11px] right-3.5 z-[3] inline-flex rotate-[7deg] items-center gap-1 rounded-[5px] bg-[linear-gradient(180deg,#ffe8a8,#f3bc56)] px-2 py-1 font-oswald text-[10px] font-semibold uppercase tracking-[.12em] text-[#3a2607] shadow-[0_4px_10px_rgba(0,0,0,.4)]">
                    Win monthly
                  </span>
                  <button
                    type="submit"
                    disabled={busy}
                    className="relative z-[2] w-full rounded-full bg-white py-4 font-display text-[18px] tracking-[.07em] text-ink disabled:opacity-60"
                  >
                    {busy ? "SENDING…" : "GET ALERTS"}
                  </button>
                </div>

                <p className="mt-4 text-center font-oswald text-[10.5px] uppercase tracking-[.16em] text-paper/40">
                  Free to enter · One winner drawn monthly · No spam
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

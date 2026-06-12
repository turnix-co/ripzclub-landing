"use client";

import { useRef, useEffect } from "react";

const CARDS = [
  {
    k: "1",
    img: "/pack-navy.png",
    float: "animate-[floaty_8.6s_ease-in-out_0s_infinite]",
    mask: "[mask-image:url('/pack-navy.png')] [-webkit-mask-image:url('/pack-navy.png')]",
  },
  {
    k: "2",
    img: "/pack-gold.png",
    float: "animate-[floaty_7.4s_ease-in-out_-1.6s_infinite]",
    mask: "[mask-image:url('/pack-gold.png')] [-webkit-mask-image:url('/pack-gold.png')]",
  },
  {
    k: "3",
    img: "/pack-red.png",
    float: "animate-[floaty_6.4s_ease-in-out_-3s_infinite]",
    mask: "[mask-image:url('/pack-red.png')] [-webkit-mask-image:url('/pack-red.png')]",
  },
];

type SlotCfg = {
  x: string;
  y: string;
  s: number;
  ry: number;
  r: number;
  z: number;
  b: number;
  g: string;
};

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const embersRef = useRef<HTMLCanvasElement>(null);
  const burstRef = useRef<HTMLCanvasElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);

  const elsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const wrapsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const moversRef = useRef<Record<string, HTMLDivElement | null>>({});
  const imgsRef = useRef<Record<string, HTMLImageElement | null>>({});
  const sheensRef = useRef<Record<string, HTMLDivElement | null>>({});

  const orderRef = useRef(["1", "2", "3"]);
  const hoveredRef = useRef<string | null>(null);
  const bootedRef = useRef(false);
  const heroVisibleRef = useRef(true);
  const rmRef = useRef(false);

  const cycleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spotTRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const zTRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bootTRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef(0);

  function slotCfg(): SlotCfg[] {
    const m = typeof window !== "undefined" && window.innerWidth < 700;
    return [
      {
        x: m ? "-30vw" : "-32vw",
        y: m ? "-9vh" : "0vh",
        s: m ? 0.56 : 0.7,
        ry: 14,
        r: -3,
        z: 2,
        b: 0.75,
        g: "drop-shadow(0 18px 30px rgba(0,0,0,.6)) drop-shadow(0 0 10px rgba(245,245,244,.08))",
      },
      {
        x: "0vw",
        y: m ? "-9vh" : "0vh",
        s: 1.08,
        ry: 0,
        r: 0,
        z: 5,
        b: 1,
        g: "drop-shadow(0 22px 36px rgba(0,0,0,.6)) drop-shadow(0 0 20px rgba(232,195,106,.22))",
      },
      {
        x: m ? "30vw" : "32vw",
        y: m ? "-9vh" : "0vh",
        s: m ? 0.56 : 0.7,
        ry: -14,
        r: 3,
        z: 2,
        b: 0.75,
        g: "drop-shadow(0 18px 30px rgba(0,0,0,.6)) drop-shadow(0 0 10px rgba(245,245,244,.08))",
      },
    ];
  }

  function slotT(c: SlotCfg) {
    return `translateX(${c.x}) translateY(${c.y}) scale(${c.s}) rotateY(${c.ry}deg) rotate(${c.r}deg)`;
  }

  function apply(skipZ?: string) {
    if (!bootedRef.current) {
      orderRef.current.forEach((k, i) => {
        const mv = moversRef.current[k],
          wr = wrapsRef.current[k];
        if (!mv) return;
        if (wr) wr.style.zIndex = i === 1 ? "5" : "2";
        mv.style.transform =
          "translateX(0vw) translateY(85vh) scale(0.72) rotateY(0deg) rotate(0deg)";
        mv.style.filter = "brightness(.9)";
      });
      return;
    }
    const cfg = slotCfg();
    orderRef.current.forEach((k, i) => {
      const c = cfg[i],
        mv = moversRef.current[k],
        im = imgsRef.current[k],
        wr = wrapsRef.current[k];
      if (!mv) return;
      if (wr && k !== skipZ) wr.style.zIndex = String(c.z);
      mv.style.transform = slotT(c);
      mv.style.filter = `brightness(${c.b})`;
      if (im && hoveredRef.current !== k) im.style.filter = c.g;
    });
  }

  function setTilt(k: string, rx: number, ry: number, hot: boolean) {
    const el = elsRef.current[k];
    if (!el) return;
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    const im = imgsRef.current[k];
    if (!im) return;
    const i = orderRef.current.indexOf(k);
    im.style.filter = hot
      ? i === 1
        ? "drop-shadow(0 22px 36px rgba(0,0,0,.6)) drop-shadow(0 0 30px rgba(232,195,106,.4))"
        : "drop-shadow(0 18px 30px rgba(0,0,0,.6)) drop-shadow(0 0 18px rgba(232,19,43,.35))"
      : slotCfg()[i].g;
  }

  function hoverCard(k: string, e: React.MouseEvent) {
    hoveredRef.current = k;
    if (hoverTRef.current) clearTimeout(hoverTRef.current);
    if (rmRef.current) return;
    const el = elsRef.current[k];
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTilt(
      k,
      ((e.clientY - r.top) / r.height - 0.5) * -10,
      ((e.clientX - r.left) / r.width - 0.5) * 10,
      true,
    );
  }

  function unhover(k: string) {
    setTilt(k, 0, 0, false);
    if (hoverTRef.current) clearTimeout(hoverTRef.current);
    hoverTRef.current = setTimeout(() => {
      hoveredRef.current = null;
    }, 600);
  }

  function spotlight(k: string) {
    if (
      rmRef.current ||
      !heroVisibleRef.current ||
      (typeof document !== "undefined" && document.hidden)
    )
      return;
    const t = elsRef.current[k],
      im = imgsRef.current[k],
      sh = sheensRef.current[k];
    if (t)
      t.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.05)", offset: 0.5 },
          { transform: "scale(1)" },
        ],
        { duration: 350, easing: "ease-out" },
      );
    if (im && hoveredRef.current !== k)
      im.animate(
        [
          {
            filter:
              "drop-shadow(0 22px 36px rgba(0,0,0,.6)) drop-shadow(0 0 14px rgba(232,195,106,.18))",
          },
          {
            filter:
              "drop-shadow(0 22px 36px rgba(0,0,0,.6)) drop-shadow(0 0 32px rgba(232,195,106,.45))",
            offset: 0.4,
          },
          {
            filter:
              "drop-shadow(0 22px 36px rgba(0,0,0,.6)) drop-shadow(0 0 20px rgba(232,195,106,.22))",
          },
        ],
        { duration: 750, easing: "ease-out" },
      );
    if (bloomRef.current)
      bloomRef.current.animate(
        [
          { transform: "translate(-50%,-50%) scale(1)", opacity: "0" },
          {
            transform: "translate(-50%,-50%) scale(1.3)",
            opacity: "0.3",
            offset: 0.45,
          },
          { transform: "translate(-50%,-50%) scale(1.15)", opacity: "0" },
        ],
        { duration: 1200, easing: "ease-in-out" },
      );
    if (sh)
      sh.animate(
        [
          { transform: "translateX(-150%) skewX(-18deg)" },
          { transform: "translateX(260%) skewX(-18deg)" },
        ],
        { duration: 900, easing: "ease-in-out" },
      );
    foilBurst(16, 0.55);
  }

  function cycle() {
    const old = orderRef.current.slice();
    orderRef.current = [old[2], old[0], old[1]];
    const wrapK = old[2];
    const cfg = slotCfg();
    const wr = wrapsRef.current[wrapK],
      mv = moversRef.current[wrapK];
    if (wr) wr.style.zIndex = "1";
    if (mv && !rmRef.current) {
      mv.animate(
        [
          { transform: slotT(cfg[2]), filter: "brightness(.75)" },
          {
            transform: `translateX(0vw) translateY(calc(${cfg[0].y} + 36px)) scale(0.7) rotateY(6deg) rotate(0deg)`,
            filter: "brightness(.6)",
            offset: 0.5,
          },
          { transform: slotT(cfg[0]), filter: "brightness(.75)" },
        ],
        { duration: 820, easing: "cubic-bezier(.45,.05,.3,1)" },
      );
    }
    apply(wrapK);
    if (zTRef.current) clearTimeout(zTRef.current);
    zTRef.current = setTimeout(() => {
      if (wr)
        wr.style.zIndex = orderRef.current.indexOf(wrapK) === 1 ? "5" : "2";
    }, 830);
    if (spotTRef.current) clearTimeout(spotTRef.current);
    spotTRef.current = setTimeout(() => spotlight(orderRef.current[1]), 840);
  }

  function clickCard(k: string) {
    hoveredRef.current = null;
    if (hoverTRef.current) clearTimeout(hoverTRef.current);
    const i = orderRef.current.indexOf(k);
    if (i !== 1) {
      const o = orderRef.current;
      orderRef.current = i === 0 ? [o[2], o[0], o[1]] : [o[1], o[2], o[0]];
      apply();
      if (spotTRef.current) clearTimeout(spotTRef.current);
      spotTRef.current = setTimeout(() => spotlight(orderRef.current[1]), 840);
    }
    startCycle();
  }

  function startCycle() {
    if (rmRef.current) return;
    if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
    cycleTimerRef.current = setInterval(() => {
      if (!heroVisibleRef.current || document.hidden || hoveredRef.current)
        return;
      cycle();
    }, 3800);
  }

  function foilBurst(n: number, pow: number) {
    const cv = burstRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = cv.clientWidth * dpr;
    cv.height = cv.clientHeight * dpr;
    const cols = ["#E8C36A", "#E8132B", "#F5F5F4"];
    type Flake = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      vr: number;
      w: number;
      h: number;
      c: string;
    };
    const F: Flake[] = [];
    const cx2 = cv.width / 2,
      cy2 = cv.height * 0.64;
    for (let i = 0; i < n; i++) {
      F.push({
        x: cx2,
        y: cy2,
        vx: (Math.random() - 0.5) * 17 * dpr * pow,
        vy: (-4 - Math.random() * 10) * dpr * pow,
        r: Math.random() * 3.14,
        vr: (Math.random() - 0.5) * 0.32,
        w: (3 + Math.random() * 6) * dpr,
        h: (2 + Math.random() * 4) * dpr,
        c: cols[i % 3],
      });
    }
    const t0 = performance.now();
    const step = (t: number) => {
      const k = (t - t0) / 1500;
      ctx.clearRect(0, 0, cv.width, cv.height);
      if (k >= 1) return;
      for (const f of F) {
        f.x += f.vx;
        f.y += f.vy;
        f.vy += 0.5 * dpr;
        f.r += f.vr;
        ctx.save();
        ctx.globalAlpha = 1 - k;
        ctx.translate(f.x, f.y);
        ctx.rotate(f.r);
        ctx.fillStyle = f.c;
        ctx.fillRect(-f.w / 2, -f.h / 2, f.w, f.h);
        ctx.restore();
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function makeGrain() {
    if (!grainRef.current) return;
    const c = document.createElement("canvas");
    c.width = c.height = 110;
    const x = c.getContext("2d");
    if (!x) return;
    const d = x.createImageData(110, 110);
    for (let i = 0; i < d.data.length; i += 4) {
      const v = Math.random() * 255;
      d.data[i] = v;
      d.data[i + 1] = v;
      d.data[i + 2] = v;
      d.data[i + 3] = 30;
    }
    x.putImageData(d, 0, 0);
    grainRef.current.style.backgroundImage = `url(${c.toDataURL()})`;
  }

  function startEmbers() {
    const cv = embersRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fit = () => {
      cv.width = cv.clientWidth * dpr;
      cv.height = cv.clientHeight * dpr;
    };
    fit();
    window.addEventListener("resize", fit);
    type Ember = {
      x: number;
      y: number;
      s: number;
      v: number;
      a: number;
      sw: number;
      tw: number;
    };
    const P: Ember[] = [];
    for (let i = 0; i < 52; i++) {
      P.push({
        x: Math.random(),
        y: Math.random(),
        s: 1 + Math.random() * 2,
        v: 0.0005 + Math.random() * 0.0011,
        a: Math.random() * 6.28,
        sw: 6 + Math.random() * 18,
        tw: Math.random() * 6.28,
      });
    }
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      if (!heroVisibleRef.current || document.hidden) return;
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const p of P) {
        p.y -= p.v;
        p.a += 0.01;
        p.tw += 0.05;
        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        ctx.fillStyle = `rgba(235,96,82,${Math.max(0.05, 0.26 + Math.sin(p.tw) * 0.2).toFixed(3)})`;
        ctx.fillRect(
          p.x * cv.width + Math.sin(p.a) * p.sw,
          p.y * cv.height,
          p.s * dpr,
          p.s * dpr,
        );
      }
    };
    tick();
  }

  function bootLoader() {
    const start = performance.now();
    const imgs = Array.from(document.images).filter((img) =>
      /pack-(navy|gold|red)\.png/.test(img.getAttribute("src") || ""),
    );
    const ready = Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((res) => {
              img.addEventListener("load", () => res(), { once: true });
              img.addEventListener("error", () => res(), { once: true });
            }),
      ),
    );
    const finish = () => {
      if (bootedRef.current) return;
      bootedRef.current = true;
      const cfg = slotCfg();
      [1, 0, 2].forEach((slot, n) => {
        setTimeout(
          () => {
            const k = orderRef.current[slot],
              c = cfg[slot];
            const mv = moversRef.current[k],
              wr = wrapsRef.current[k],
              im = imgsRef.current[k];
            if (!mv) return;
            if (wr) wr.style.zIndex = String(c.z);
            mv.style.transform = slotT(c);
            mv.style.filter = `brightness(${c.b})`;
            if (im) im.style.filter = c.g;
          },
          80 + n * 200,
        );
      });
      if (loaderRef.current) {
        const anim = loaderRef.current.animate(
          [{ opacity: "1" }, { opacity: "0" }],
          { duration: 450, easing: "ease-out", fill: "forwards" },
        );
        anim.onfinish = () => {
          if (loaderRef.current) loaderRef.current.style.display = "none";
        };
      }
      if (!rmRef.current) {
        spotTRef.current = setTimeout(
          () => spotlight(orderRef.current[1]),
          1900,
        );
        startCycle();
      }
    };
    bootTRef.current = setTimeout(finish, 4000);
    ready.then(() => {
      setTimeout(finish, Math.max(0, 800 - (performance.now() - start)));
    });
  }

  useEffect(() => {
    rmRef.current =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onResize = () => apply();
    window.addEventListener("resize", onResize);
    let onScrollHero: (() => void) | null = null;
    const hero = heroRef.current;
    if (hero) {
      onScrollHero = () => {
        const r = hero.getBoundingClientRect();
        heroVisibleRef.current =
          r.bottom > 60 && r.top < window.innerHeight * 0.85;
      };
      window.addEventListener("scroll", onScrollHero, { passive: true });
      onScrollHero();
    }
    setTimeout(() => apply(), 80);
    if (!rmRef.current) startEmbers();
    bootLoader();
    makeGrain();
    return () => {
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
      if (spotTRef.current) clearTimeout(spotTRef.current);
      if (zTRef.current) clearTimeout(zTRef.current);
      if (hoverTRef.current) clearTimeout(hoverTRef.current);
      if (bootTRef.current) clearTimeout(bootTRef.current);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      if (onScrollHero) window.removeEventListener("scroll", onScrollHero);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Loader overlay */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-7 bg-[linear-gradient(160deg,#15090B_0%,#0A0A0C_55%,#050506_100%)]"
      >
        <div className="font-display text-[clamp(36px,5vw,64px)] tracking-[.02em] text-paper">
          RIP
          <span className="inline-block text-ripz [text-shadow:0_0_26px_rgba(232,19,43,.5)] animate-[zPulse_1.1s_ease-in-out_infinite]">
            Z
          </span>
          CLUB
        </div>
        <div className="h-[3px] w-[min(240px,60vw)] overflow-hidden rounded-[2px] bg-paper/12">
          <div className="h-full w-[40%] rounded-[2px] bg-ripz animate-[loadBar_1.2s_ease-in-out_infinite]" />
        </div>
        <div className="font-grotesk text-[.62rem] uppercase tracking-[.3em] text-paper/45">
          Loading the drop
        </div>
      </div>

      {/* Hero section */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[660px] overflow-hidden bg-[linear-gradient(160deg,#15090B_0%,#0A0A0C_55%,#0A0507_100%)]"
      >
        <div className="pointer-events-none absolute -left-[12%] -top-[22%] h-[72vh] w-[72vw] rounded-full bg-[radial-gradient(closest-side,rgba(232,19,43,.85),transparent_70%)] opacity-[.09] blur-[50px] animate-[auroraDrift_20s_ease-in-out_infinite]" />
        <canvas
          ref={embersRef}
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
        />
        <div className="pointer-events-none absolute left-0 top-0 h-[30vh] w-[28vw] bg-[radial-gradient(rgba(245,245,244,.55)_1px,transparent_1.6px)] [background-size:11px_11px] opacity-[.06] [mask-image:radial-gradient(circle_at_0_0,#000,transparent_75%)] [-webkit-mask-image:radial-gradient(circle_at_0_0,#000,transparent_75%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[64%] aspect-square w-[min(76vh,58vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/6" />
        <div className="pointer-events-none absolute left-1/2 top-[64%] aspect-square w-[min(100vh,78vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-paper/[4.5%]" />
        <div className="pointer-events-none absolute -bottom-[8%] left-1/2 h-[36vh] w-[84vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(232,19,43,.1),transparent_62%)] blur-[28px]" />
        <div className="pointer-events-none absolute left-[11%] top-[20%] font-grotesk text-[17px] text-paper/16">
          +
        </div>
        <div className="pointer-events-none absolute right-[13%] top-[15%] font-grotesk text-[14px] text-paper/13">
          +
        </div>
        <div className="pointer-events-none absolute left-[7%] top-[64%] font-grotesk text-[15px] text-paper/14">
          +
        </div>
        <div className="pointer-events-none absolute right-[8%] top-[58%] font-grotesk text-[18px] text-paper/15">
          +
        </div>
        <div className="pointer-events-none absolute left-[22%] top-[86%] font-grotesk text-[14px] text-paper/12">
          +
        </div>
        <div className="pointer-events-none absolute left-[17%] top-[41%] size-1.5 rotate-45 border border-paper/20" />
        <div className="pointer-events-none absolute right-[19%] top-[35%] size-[5px] rotate-45 bg-ripz/30" />
        <div className="pointer-events-none absolute right-[11%] top-[80%] size-1.5 rotate-45 border border-paper/16" />
        <div className="pointer-events-none absolute right-4 top-[38%] font-grotesk text-[.58rem] uppercase tracking-[.32em] text-paper/22 [writing-mode:vertical-rl]">
          Certified · Graded · Insured
        </div>
        <div className="absolute left-3 top-3 z-[3] size-[18px] border-l border-t border-paper/45 opacity-50" />
        <div className="absolute right-3 top-3 z-[3] size-[18px] border-r border-t border-paper/45 opacity-50" />
        <svg
          viewBox="0 0 120 120"
          className="absolute bottom-[14vh] left-[6vw] z-[3] w-[min(9vw,104px)] -rotate-12 opacity-[.42]"
        >
          <defs>
            <path
              id="rzc-stamp-arc"
              d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
            />
          </defs>
          <circle
            cx="60"
            cy="60"
            r="56"
            fill="none"
            stroke="#E8132B"
            strokeWidth="2"
          />
          <circle
            cx="60"
            cy="60"
            r="30"
            fill="none"
            stroke="#E8132B"
            strokeWidth="1.5"
          />
          <text
            fill="#E8132B"
            fontSize="12.5"
            fontFamily="Space Grotesk, sans-serif"
            letterSpacing="3.5"
          >
            <textPath href="#rzc-stamp-arc">AUS · INSURED · GRADED ·</textPath>
          </text>
        </svg>

        {/* Stage */}
        <div className="absolute inset-0 z-[3]">
          {/* Wordmark */}
          <div className="absolute left-1/2 top-[24%] z-[3] flex -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[min(max(15vw,74px),28vh)] leading-[.92] text-paper">
            <span className="inline-block animate-[rise_.7s_cubic-bezier(.22,1,.36,1)_.05s_both]">
              R
            </span>
            <span className="inline-block animate-[rise_.7s_cubic-bezier(.22,1,.36,1)_.09s_both]">
              I
            </span>
            <span className="inline-block animate-[rise_.7s_cubic-bezier(.22,1,.36,1)_.13s_both]">
              P
            </span>
            <span className="inline-block text-ripz [text-shadow:0_0_34px_rgba(232,19,43,.55)] animate-[rise_.7s_cubic-bezier(.22,1,.36,1)_.17s_both]">
              Z
            </span>
            <span className="inline-block animate-[rise_.7s_cubic-bezier(.22,1,.36,1)_.21s_both]">
              C
            </span>
            <span className="inline-block animate-[rise_.7s_cubic-bezier(.22,1,.36,1)_.25s_both]">
              L
            </span>
            <span className="inline-block animate-[rise_.7s_cubic-bezier(.22,1,.36,1)_.29s_both]">
              U
            </span>
            <span className="inline-block animate-[rise_.7s_cubic-bezier(.22,1,.36,1)_.33s_both]">
              B
            </span>
          </div>
          {/* Bloom */}
          <div
            ref={bloomRef}
            className="pointer-events-none absolute left-1/2 top-[64%] z-[4] aspect-square w-[min(58vh,34vw)] rounded-full bg-[radial-gradient(closest-side,rgba(232,195,106,.32),transparent_70%)] opacity-0 [transform:translate(-50%,-50%)]"
          />
          {/* Cards */}
          {CARDS.map((card) => (
            <div
              key={card.k}
              ref={(el) => {
                wrapsRef.current[card.k] = el;
              }}
              onMouseMove={(e) => hoverCard(card.k, e)}
              onMouseLeave={() => unhover(card.k)}
              onClick={() => clickCard(card.k)}
              className="absolute left-1/2 top-[calc(64%-5px)] z-[2] -translate-x-1/2 -translate-y-1/2 cursor-pointer will-change-transform perspective-[1200px]"
            >
              <div className="relative">
                <div
                  ref={(el) => {
                    moversRef.current[card.k] = el;
                  }}
                  className="transform-3d [transition:transform_.82s_cubic-bezier(.45,.05,.3,1),filter_.82s_ease]"
                >
                  <div className={card.float}>
                    <div
                      ref={(el) => {
                        elsRef.current[card.k] = el;
                      }}
                      className="relative [transition:transform_.45s_cubic-bezier(.22,1,.36,1)]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        ref={(el) => {
                          imgsRef.current[card.k] = el;
                        }}
                        src={card.img}
                        alt="Graded slab"
                        draggable={false}
                        className="block h-[min(44vh,max(26vw,240px))] w-auto select-none [transition:filter_.82s_ease]"
                      />
                      <div
                        className={`pointer-events-none absolute inset-0 overflow-hidden [mask-size:100%_100%] [-webkit-mask-size:100%_100%] ${card.mask}`}
                      >
                        <div
                          ref={(el) => {
                            sheensRef.current[card.k] = el;
                          }}
                          className="absolute -bottom-[10%] -top-[10%] left-0 w-[46%] bg-[linear-gradient(100deg,transparent,rgba(255,255,255,.55),transparent)] [transform:translateX(-150%)_skewX(-18deg)]"
                        />
                      </div>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.img}
                      alt=""
                      draggable={false}
                      className="pointer-events-none absolute left-0 top-[calc(100%+7px)] block h-[min(44vh,max(26vw,240px))] w-auto -scale-y-100 select-none [mask-image:linear-gradient(to_bottom,rgba(0,0,0,.25),transparent_65%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,.25),transparent_65%)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <canvas
          ref={burstRef}
          className="pointer-events-none absolute inset-0 z-[12] h-full w-full"
        />

        {/* Logo */}
        <div className="absolute left-[max(3vw,20px)] top-[4vh] z-[15] -rotate-6 bg-paper px-3 pb-[7px] pt-[10px] shadow-[6px_6px_0_#E8132B]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="RipzClub"
            className="block h-[min(7.5vh,58px)]"
          />
        </div>

        {/* BE THE PULL stamp */}
        <div className="absolute right-[max(3vw,20px)] top-[5vh] z-[15] rotate-[5deg] rounded-xl border-[3px] border-ripz px-4 py-1.75 font-marker text-[clamp(14px,1.6vw,22px)] tracking-[.05em] text-ripz opacity-[.92] shadow-[inset_0_0_0_1.5px_rgba(232,19,43,.35)]">
          BE THE PULL.
        </div>

        {/* Headline */}
        <div className="absolute bottom-[9vh] left-[max(4vw,20px)] z-15 max-w-[min(58vw,620px)]">
          <div className="font-display text-[clamp(18px,min(2.4vw,4vh),46px)] leading-[1.15] tracking-[.03em] text-paper">
            EVERY PACK. ONE GRADED{" "}
            <span className="relative inline-block">
              HIT.
              <span className="absolute -left-[14%] -top-[52%] -rotate-4 whitespace-nowrap font-marker text-[.92em] text-ripz [text-shadow:0_0_18px_rgba(232,19,43,.4)] animate-[wipeIn_.6s_ease-out_1.5s_both]">
                guaranteed.
              </span>
            </span>
          </div>
          <div className="mt-3 font-grotesk text-[.7rem] uppercase tracking-[.22em] text-paper/62">
            Certified slabs. Instant reveals. RipzSafe 80% floor.
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pointer-events-none absolute bottom-[3.5vh] left-1/2 z-[15] flex -translate-x-1/2 flex-col items-center gap-2.5">
          <div className="font-grotesk text-[.6rem] uppercase tracking-[.34em] text-paper/45">
            Scroll
          </div>
          <div className="relative h-11 w-px overflow-hidden bg-paper/14">
            <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(180deg,transparent,#E8132B_45%,#FF2D43)] animate-[scrollDrop_2s_cubic-bezier(.45,.05,.55,.95)_infinite]" />
          </div>
        </div>
      </section>

      {/* Grain overlay */}
      <div
        ref={grainRef}
        className="pointer-events-none fixed inset-0 z-[80] bg-repeat opacity-[.05]"
      />
    </>
  );
}

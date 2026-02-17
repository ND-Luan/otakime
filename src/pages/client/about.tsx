"use client";
import { useEffect, useRef, useState } from "react";

/* ─── Brand tokens ─── */
const G = "#ADF709"; // lime green
const P = "#F3ADC3"; // soft pink
const B = "#00CCFF"; // cyan blue

/* ─── Scroll-triggered fade-in hook ─── */
function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(36px)",
      transition: `opacity .8s ease ${delay}s, transform .8s ease ${delay}s`,
    },
  };
}

/* ─── Tiny reusable wrapper ─── */
function F({ d = 0, children, className = "" }: { d?: number; children: React.ReactNode; className?: string }) {
  const { ref, style } = useFadeIn(d);
  return <div ref={ref} style={style} className={className}>{children}</div>;
}

/* ─── Data ─── */
const features = [
  {
    icon: "✦",
    label: "Smart Workspace",
    desc: "An intelligent canvas that adapts to how your team thinks and collaborates.",
    accent: G,
  },
  {
    icon: "◈",
    label: "Real-time Sync",
    desc: "Every change — everywhere, instantly. No refresh needed, no conflicts.",
    accent: B,
  },
  {
    icon: "⬡",
    label: "Aesthetic First",
    desc: "We believe beautiful tools make people more productive. Design is our feature.",
    accent: P,
  },
  {
    icon: "▲",
    label: "AI Powered",
    desc: "Built-in intelligence that suggests, summarises, and surfaces what matters.",
    accent: G,
  },
  {
    icon: "●",
    label: "Privacy by Default",
    desc: "End-to-end encryption. No ads. No tracking. Your data belongs to you.",
    accent: B,
  },
  {
    icon: "◇",
    label: "Deeply Integrated",
    desc: "Connects with 200+ tools in your stack — Slack, Notion, Figma, and beyond.",
    accent: P,
  },
];

const team = [
  { initials: "LN", name: "Linh Nguyễn", role: "Founder & CEO", accent: B, quote: "Design is the silent ambassador of your brand." },
  { initials: "MT", name: "Minh Trần",   role: "Head of Engineering", accent: G, quote: "Code is poetry written for machines and humans alike." },
  { initials: "HP", name: "Hà Phạm",    role: "Creative Director", accent: P, quote: "Every great interface starts with a great feeling." },
  { initials: "ĐL", name: "Đức Lê",     role: "Product Manager", accent: G, quote: "Simplicity is the ultimate sophistication." },
];

const timeline = [
  { year: "2021", title: "The Idea", body: "Two friends, one whiteboard, and a frustration with clunky software. The seed of Melarist was planted in a tiny Hà Nội café.", accent: B },
  { year: "2022", title: "Founded", body: "We raised our first seed round and assembled a four-person founding team. First prototype shipped within 60 days.", accent: G },
  { year: "2023", title: "10K Users", body: "Word-of-mouth growth took us from 0 to 10,000 active users without spending a single dollar on ads.", accent: P },
  { year: "2024", title: "Global Reach", body: "Expanded to 30+ countries. Launched the AI layer, real-time multiplayer, and mobile apps on iOS & Android.", accent: B },
  { year: "2025", title: "Today", body: "12,000+ teams trust Melarist daily. We're just getting started — the next chapter is the biggest one yet.", accent: G },
];

const stats = [
  { val: "12K+", label: "Active Teams" },
  { val: "30+",  label: "Countries" },
  { val: "98%",  label: "Satisfaction" },
  { val: "5M+",  label: "Tasks Done" },
];

/* ══════════════════════════════════════
   HOME PAGE
══════════════════════════════════════ */
export default function HomePage() {
  /* cursor glow */
  const [mouse, setMouse] = useState({ x: -300, y: -300 });
  useEffect(() => {
    const h = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  /* marquee items */
  const ticker = ["Smart Workspace", "Real-time Sync", "AI Powered", "Privacy First", "Beautiful by Default", "Built for Teams"];

  return (
    <div
      className="bg-[#060608] text-white overflow-x-hidden"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* ── Cursor glow ── */}
      <div
        className="pointer-events-none fixed z-50 rounded-full blur-3xl opacity-20 transition-all duration-150"
        style={{
          width: 180, height: 180,
          background: `radial-gradient(circle, ${G}, ${B})`,
          transform: `translate(${mouse.x - 90}px,${mouse.y - 90}px)`,
        }}
      />

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* huge bg word */}
        <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span
            className="font-black uppercase leading-none"
            style={{
              fontSize: "22vw",
              WebkitTextStroke: "1px rgba(255,255,255,0.04)",
              color: "transparent",
              letterSpacing: "-0.05em",
            }}
          >
            MELARIST
          </span>
        </div>

        {/* ambient orbs */}
        {[
          { c: B, t: "8%",  l: "5%",  s: 400, a: 0 },
          { c: G, t: "60%", l: "75%", s: 360, a: 1.5 },
          { c: P, t: "45%", l: "30%", s: 280, a: 0.8 },
        ].map((o, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl opacity-15 animate-pulse"
            style={{
              width: o.s, height: o.s,
              background: o.c,
              top: o.t, left: o.l,
              animationDelay: `${o.a}s`,
              animationDuration: "4s",
            }}
          />
        ))}

        {/* pill badge */}
        <div
          className="relative z-10 inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-bold tracking-[4px] uppercase mb-10 border"
          style={{ color: G, borderColor: G + "44", background: G + "11",
            animation: "fadeUp .8s ease .1s both",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: G }} />
          Now in open beta
        </div>

        {/* headline */}
        <h1
          className="relative z-10 font-black leading-[.9] tracking-tight mb-6"
          style={{
            fontSize: "clamp(3.2rem, 10vw, 9rem)",
            animation: "fadeUp .9s ease .2s both",
          }}
        >
          The workspace
          <br />
          <span
            style={{
              background: `linear-gradient(120deg, ${G} 0%, ${B} 45%, ${P} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            your team
          </span>
          <br />
          deserves.
        </h1>

        <p
          className="relative z-10 max-w-xl text-lg text-white/40 leading-relaxed mb-12"
          style={{ fontFamily: "system-ui, sans-serif", fontWeight: 300, animation: "fadeUp .9s ease .35s both" }}
        >
          Melarist is a beautifully crafted productivity platform — where design meets intelligence, and clarity meets speed.
        </p>

        <div
          className="relative z-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animation: "fadeUp .9s ease .5s both" }}
        >
          <a
            href="/register"
            className="px-9 py-4 rounded-full font-bold text-[#060608] text-sm tracking-widest uppercase transition hover:scale-105"
            style={{
              background: `linear-gradient(90deg, ${G}, ${B})`,
              boxShadow: `0 0 50px ${G}40`,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Start Free — 30 days
          </a>
          <a
            href="/about"
            className="px-9 py-4 rounded-full text-sm tracking-widest uppercase border border-white/15 hover:border-white/40 transition hover:scale-105"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Learn More →
          </a>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
          <span className="text-[10px] tracking-[4px] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>scroll</span>
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom,white,transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ══ TICKER ══ */}
      <div className="border-y border-white/5 py-4 overflow-hidden relative">
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: "marquee 18s linear infinite" }}>
          {[...ticker, ...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className="text-sm font-bold tracking-widest uppercase"
              style={{
                fontFamily: "system-ui, sans-serif",
                color: i % 3 === 0 ? G : i % 3 === 1 ? B : P,
              }}
            >
              {t} &nbsp;/
            </span>
          ))}
        </div>
      </div>

      {/* ══ STATS ══ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <F key={s.label} d={i * .1}>
              <div className="p-8 rounded-2xl border border-white/5 hover:border-white/10 transition text-center group cursor-default">
                <div
                  className="text-5xl font-black mb-2 transition group-hover:scale-110 origin-bottom inline-block"
                  style={{
                    background: `linear-gradient(135deg,${G},${B})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.val}
                </div>
                <div className="text-white/35 text-xs tracking-widest uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>
                  {s.label}
                </div>
              </div>
            </F>
          ))}
        </div>
      </section>

      {/* ══ INTRO / ABOUT ══ */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <F>
            <div className="text-xs font-bold tracking-[4px] uppercase mb-5" style={{ color: P, fontFamily: "system-ui, sans-serif" }}>
              What is Melarist?
            </div>
            <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Software that{" "}
              <span style={{ WebkitTextStroke: `1.5px ${G}`, color: "transparent" }}>feels</span>
              <br />as good as it works.
            </h2>
            <p className="text-white/40 leading-loose text-base mb-6" style={{ fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
              We started Melarist because we were tired of ugly, clunky, and overwhelming tools. Most productivity software is built for power, not for people. We flipped that — building something powerful <em>because</em> it's delightful.
            </p>
            <p className="text-white/40 leading-loose text-base" style={{ fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
              Whether you're a solo creator, a startup sprint team, or an enterprise with complex workflows — Melarist moulds itself to you, not the other way around.
            </p>
          </F>

          {/* Right — graphic */}
          <F d={.2}>
            <div className="relative h-80 flex items-center justify-center">
              {/* grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={`${i * 14.28}%`} x2="100%" y2={`${i * 14.28}%`} stroke="white" strokeWidth=".5" />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={`v${i}`} x1={`${i * 14.28}%`} y1="0" x2={`${i * 14.28}%`} y2="100%" stroke="white" strokeWidth=".5" />
                ))}
              </svg>
              {/* rings */}
              {[320, 240, 160, 80].map((sz, i) => (
                <div
                  key={sz}
                  className="absolute rounded-full border opacity-25"
                  style={{
                    width: sz, height: sz,
                    borderColor: [G, B, P, G][i],
                    animation: `spin ${10 + i * 4}s linear infinite ${i % 2 ? "reverse" : ""}`,
                  }}
                />
              ))}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black z-10 rotate-12"
                style={{ background: G, color: "#060608" }}
              >
                M
              </div>
            </div>
          </F>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="py-28 px-6 border-t border-white/5">
        <F>
          <div className="text-center mb-20">
            <div className="text-xs font-bold tracking-[4px] uppercase mb-4" style={{ color: B, fontFamily: "system-ui, sans-serif" }}>
              What We Offer
            </div>
            <h2 className="text-5xl md:text-6xl font-black">Everything you need.</h2>
          </div>
        </F>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <F key={f.label} d={i * .08}>
              <div
                className="group relative p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden cursor-default h-full"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 rounded-3xl"
                  style={{ background: f.accent }}
                />
                <div className="text-4xl mb-6" style={{ color: f.accent, fontFamily: "monospace" }}>{f.icon}</div>
                <h3
                  className="text-lg font-black mb-3"
                  style={{ color: f.accent }}
                >
                  {f.label}
                </h3>
                <p className="text-white/35 text-sm leading-relaxed" style={{ fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
                  {f.desc}
                </p>
              </div>
            </F>
          ))}
        </div>
      </section>

      {/* ══ FOUNDING TIMELINE ══ */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <F>
            <div className="text-center mb-20">
              <div className="text-xs font-bold tracking-[4px] uppercase mb-4" style={{ color: G, fontFamily: "system-ui, sans-serif" }}>
                Our Story
              </div>
              <h2 className="text-5xl md:text-6xl font-black">How we got here.</h2>
            </div>
          </F>

          <div className="relative">
            {/* vertical line */}
            <div
              className="absolute left-[72px] top-4 bottom-4 w-px"
              style={{ background: `linear-gradient(to bottom, ${G}, ${B}, ${P})`, opacity: .25 }}
            />

            <div className="flex flex-col gap-12">
              {timeline.map((t, i) => (
                <F key={t.year} d={i * .12}>
                  <div className="flex gap-8 items-start">
                    {/* year bubble */}
                    <div
                      className="flex-shrink-0 w-[72px] text-center"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black mx-auto"
                        style={{
                          background: t.accent + "22",
                          border: `1.5px solid ${t.accent}55`,
                          color: t.accent,
                          fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        {t.year}
                      </div>
                    </div>
                    {/* content */}
                    <div className="pt-2 pb-2">
                      <h3
                        className="text-xl font-black mb-2"
                        style={{ color: t.accent }}
                      >
                        {t.title}
                      </h3>
                      <p className="text-white/40 leading-relaxed text-sm" style={{ fontFamily: "system-ui, sans-serif", fontWeight: 300 }}>
                        {t.body}
                      </p>
                    </div>
                  </div>
                </F>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <F>
            <div className="text-center mb-20">
              <div className="text-xs font-bold tracking-[4px] uppercase mb-4" style={{ color: P, fontFamily: "system-ui, sans-serif" }}>
                The People
              </div>
              <h2 className="text-5xl md:text-6xl font-black">Built by humans,<br />
                <span style={{ WebkitTextStroke: `1.5px ${P}`, color: "transparent" }}>for humans.</span>
              </h2>
            </div>
          </F>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((p, i) => (
              <F key={p.name} d={i * .1}>
                <div
                  className="group text-center p-7 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-500 cursor-default"
                >
                  {/* avatar */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: p.accent + "1A",
                      border: `1.5px solid ${p.accent}44`,
                      color: p.accent,
                    }}
                  >
                    {p.initials}
                  </div>
                  <div className="font-black text-base mb-1">{p.name}</div>
                  <div
                    className="text-[10px] font-bold tracking-widest uppercase mb-4"
                    style={{ color: p.accent, fontFamily: "system-ui, sans-serif" }}
                  >
                    {p.role}
                  </div>
                  <div
                    className="w-6 h-px mx-auto mb-4 opacity-30"
                    style={{ background: p.accent }}
                  />
                  <p
                    className="text-white/25 text-xs leading-relaxed italic"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    "{p.quote}"
                  </p>
                </div>
              </F>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-36 px-6 relative overflow-hidden border-t border-white/5">
        {/* diagonal stripe bg */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(-55deg, ${G} 0, ${G} 1px, transparent 0, transparent 40px)`,
          }}
        />
        {/* glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${G}, ${B})` }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <F>
            <h2
              className="font-black leading-[.95] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
            >
              Your best work
              <br />
              <span
                style={{
                  background: `linear-gradient(120deg, ${G} 0%, ${B} 50%, ${P} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                starts here.
              </span>
            </h2>

            <p
              className="text-white/35 text-lg mb-12 max-w-md mx-auto"
              style={{ fontFamily: "system-ui, sans-serif", fontWeight: 300 }}
            >
              30 days free. No credit card. Cancel anytime. Join 12,000+ teams already building with Melarist.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/register"
                className="px-10 py-4 rounded-full font-bold text-[#060608] text-sm tracking-widest uppercase transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(90deg, ${G}, ${B})`,
                  boxShadow: `0 0 60px ${G}40`,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Get Started Free
              </a>
              <a
                href="/login"
                className="px-10 py-4 rounded-full text-sm tracking-widest uppercase border border-white/15 hover:border-white/40 transition-all hover:scale-105"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Sign In →
              </a>
            </div>
          </F>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-white/5 py-10 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div
            className="text-2xl font-black"
            style={{
              background: `linear-gradient(90deg,${G},${B})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Melarist
          </div>
          <p className="text-white/20 text-xs tracking-widest" style={{ fontFamily: "system-ui, sans-serif" }}>
            © {new Date().getFullYear()} Melarist Inc. · Hà Nội, Việt Nam
          </p>
          <div className="flex gap-8 text-white/25 text-xs tracking-widest uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>
            {["Privacy", "Terms", "Contact", "Blog"].map((l) => (
              <a key={l} href="#" className="hover:text-white transition">{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ══ Global keyframes ══ */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes scrollPulse {
          0%,100% { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50%      { opacity: 1; transform: scaleY(1); transform-origin: top; }
        }
      `}</style>
    </div>
  );
}
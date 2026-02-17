'use client'

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, Chip } from "@heroui/react";
import {
    ArrowLeftIcon, ArrowRightIcon, Bars3Icon,
    HomeIcon, Cog6ToothIcon, XMarkIcon,
    ListBulletIcon, MagnifyingGlassPlusIcon,
    MagnifyingGlassMinusIcon,
} from "@heroicons/react/24/solid";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

/* ═══════════════════════════
   DATA
═══════════════════════════ */
const MANGA_TITLE    = "One Piece";
const TOTAL_CHAPTERS = 1107;

const IMAGES = [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&h=1150&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1300&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1100&fit=crop",
    "https://images.unsplash.com/photo-1621952832039-6c4e99f75dd0?w=800&h=1250&fit=crop",
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=1150&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1300&fit=crop",
    "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1100&fit=crop",
];
const PAGES = IMAGES.map((src, i) => ({ id: i + 1, src }));
const N     = PAGES.length;

const CHAPTER_LIST = Array.from({ length: 15 }, (_, i) => ({
    id: TOTAL_CHAPTERS - i,
    label: `Chapter ${TOTAL_CHAPTERS - i}`,
}));

type Mode  = "vertical" | "horizontal";
type Theme = "dark" | "black" | "sepia";
const THEMES: Record<Theme, { bg: string; label: string }> = {
    dark:  { bg: "#0d0f14", label: "Tối"   },
    black: { bg: "#000000", label: "Đen"   },
    sepia: { bg: "#1c1308", label: "Sepia" },
};

/* ═══════════════════════════
   HOOK: auto-hide toolbar
═══════════════════════════ */
function useAutoHide(ms = 3500) {
    const [vis, setVis] = useState(true);
    const t = useRef<ReturnType<typeof setTimeout>>();
    const show = useCallback(() => {
        setVis(true);
        clearTimeout(t.current);
        t.current = setTimeout(() => setVis(false), ms);
    }, [ms]);
    useEffect(() => { show(); return () => clearTimeout(t.current); }, [show]);
    return { vis, show, force: () => setVis(true) };
}

/* ═══════════════════════════════════════════════
   VERTICAL READER
   — native scroll, IntersectionObserver for page
═══════════════════════════════════════════════ */
function VerticalReader({
    zoom, bg, onPage, onEnd,
}: {
    zoom: number; bg: string;
    onPage: (p: number) => void;
    onEnd: () => void;
}) {
    const scrollRef   = useRef<HTMLDivElement>(null);
    const endRef      = useRef<HTMLDivElement>(null);
    const didEnd      = useRef(false);

    /* page tracking */
    useEffect(() => {
        const root = scrollRef.current;
        if (!root) return;
        const imgs = root.querySelectorAll<HTMLElement>("[data-page]");
        const obs  = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting)
                    onPage(Number((e.target as HTMLElement).dataset.page));
            });
        }, { root, threshold: 0.4 });
        imgs.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, [onPage]);

    /* end detection */
    useEffect(() => {
        const el = endRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !didEnd.current) {
                didEnd.current = true;
                onEnd();
            }
        }, { threshold: 0.8 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [onEnd]);

    return (
        <div
            ref={scrollRef}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden"
            style={{ background: bg }}
        >
            <div className="h-14" /> {/* toolbar spacer */}
            <div className="mx-auto" style={{ maxWidth: `${Math.round(700 * zoom / 100)}px` }}>
                {PAGES.map(p => (
                    <div key={p.id} data-page={p.id} className="relative w-full">
                        <img
                            src={p.src}
                            alt={`Trang ${p.id}`}
                            className="w-full block"
                            draggable={false}
                            loading="lazy"
                        />
                        <span
                            className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-black"
                            style={{ background: "rgba(0,0,0,0.55)", color: "#ADF709" }}
                        >
                            {p.id} / {N}
                        </span>
                    </div>
                ))}
            </div>
            <div ref={endRef} className="h-4" />
            <div className="h-16" /> {/* bottom bar spacer */}
        </div>
    );
}

/* ═══════════════════════════════════════════════
   HORIZONTAL READER
   — pointer drag, CSS %-based translate, inertia snap
═══════════════════════════════════════════════ */
function HorizontalReader({
    page, setPage, zoom, bg, show,
}: {
    page: number; setPage: (p: number) => void;
    zoom: number; bg: string; show: () => void;
}) {
    /* drag state */
    const dragging  = useRef(false);
    const startX    = useRef(0);
    const lastX     = useRef(0);
    const lastT     = useRef(0);
    const velRef    = useRef(0);   // px/ms

    /* live extra offset in % of container width */
    const [extra, setExtra] = useState(0);   // % of one slot
    const [anim,  setAnim ] = useState(false);

    /* base translate = -(page-1) * 100%  (of the strip = N slots wide)
       but the strip is N*100vw wide, so each slot = 100/N % of strip
       We need to move the strip by -(page-1) * (100/N)% of ITS own width */
    const basePercent = -(page - 1) * (100 / N);   // % of strip width

    /* extra as % of strip width: extra vw / (N vw) * 100 = extra/N percent */
    const extraPercent = extra / N;

    const translateX = `${basePercent + extraPercent}%`;

    /* snap with spring rAF */
    const rafRef = useRef<number>();
    function springTo(targetPage: number, initVel: number) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        /* convert initVel (px/ms) → %strip/frame */
        /* 1 slot = 100vw = 100% of container. strip = N * container.
           1 container% = 1/N strip% */
        const velPercent = initVel * 16 / N;   // approx, 1 frame ≈ 16ms

        /* current extra already in % of container → convert to strip% */
        let pos = extra / N;                    // extra strip%
        let vel = velPercent;

        setPage(targetPage);

        const step = () => {
            const target = 0;   // after snapping page, extra should → 0
            const spring = 0.22;
            const damp   = 0.75;
            vel = vel * damp + (target - pos) * spring;
            pos += vel;
            /* convert back to container% for setExtra */
            setExtra(pos * N);

            if (Math.abs(pos) < 0.05 && Math.abs(vel) < 0.05) {
                setExtra(0);
                return;
            }
            rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
    }

    useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

    /* ── pointer events ── */
    const onDown = (e: React.PointerEvent) => {
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); setExtra(0); }
        e.currentTarget.setPointerCapture(e.pointerId);
        dragging.current = true;
        startX.current   = e.clientX;
        lastX.current    = e.clientX;
        lastT.current    = Date.now();
        velRef.current   = 0;
        setAnim(false);
        show();
    };

    const onMove = (e: React.PointerEvent) => {
        if (!dragging.current) return;
        const now = Date.now();
        const dt  = Math.max(now - lastT.current, 1);
        velRef.current = (e.clientX - lastX.current) / dt;
        lastX.current  = e.clientX;
        lastT.current  = now;

        /* delta in px → convert to container-width% */
        const w     = e.currentTarget.clientWidth || window.innerWidth;
        const delta = e.clientX - startX.current;
        /* rubber-band at edges */
        const atL = page === 1 && delta > 0;
        const atR = page === N && delta < 0;
        const pct = ((atL || atR) ? delta * 0.15 : delta) / w * 100;
        setExtra(pct);
    };

    const onUp = (e: React.PointerEvent) => {
        if (!dragging.current) return;
        dragging.current = false;
        setAnim(true);

        const w     = e.currentTarget.clientWidth || window.innerWidth;
        const delta = e.clientX - startX.current;
        const vel   = velRef.current; // px/ms

        const isBig   = Math.abs(delta) > w * 0.22;
        const isFlick = Math.abs(vel) > 0.5;

        let target = page;
        if ((isBig || isFlick) && delta < 0 && page < N) target = page + 1;
        if ((isBig || isFlick) && delta > 0 && page > 1) target = page - 1;

        springTo(target, vel);
    };

    /* keyboard */
    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") springTo(Math.min(page + 1, N), 0);
            if (e.key === "ArrowLeft" ) springTo(Math.max(page - 1, 1), 0);
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [page]);

    return (
        <div
            className="absolute inset-0 overflow-hidden touch-none"
            style={{ background: bg, cursor: dragging.current ? "grabbing" : "grab" }}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
        >
            {/* ── Page strip ── */}
            <div
                style={{
                    display: "flex",
                    width:   `${N * 100}%`,
                    height:  "100%",
                    transform: `translateX(${translateX})`,
                    /* only CSS transition when NOT dragging (for rubber-band release to look smooth before spring kicks in) */
                    willChange: "transform",
                }}
            >
                {PAGES.map(p => (
                    <div
                        key={p.id}
                        style={{
                            width:    `${100 / N}%`,
                            flexShrink: 0,
                            height:   "100%",
                            display:  "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding:  "56px 8px 56px",
                        }}
                    >
                        <img
                            src={p.src}
                            alt={`Trang ${p.id}`}
                            style={{
                                maxHeight: "100%",
                                maxWidth:  "100%",
                                objectFit: "contain",
                                transform: `scale(${zoom / 100})`,
                                transformOrigin: "center",
                                display: "block",
                                userSelect: "none",
                                pointerEvents: "none",
                            }}
                            draggable={false}
                        />
                    </div>
                ))}
            </div>

            {/* Arrow hints */}
            {page > 1 && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center opacity-25"
                         style={{ background: "#ADF709" }}>
                        <ArrowLeftIcon className="w-4 h-4 text-black" />
                    </div>
                </div>
            )}
            {page < N && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center opacity-25"
                         style={{ background: "#ADF709" }}>
                        <ArrowRightIcon className="w-4 h-4 text-black" />
                    </div>
                </div>
            )}

            {/* Dot indicators */}
            <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                {PAGES.map((_, i) => (
                    <div key={i} className="rounded-full transition-all duration-200"
                         style={{
                             width:      i + 1 === page ? 20 : 5,
                             height:     5,
                             background: i + 1 === page ? "#ADF709" : "rgba(255,255,255,0.2)",
                         }} />
                ))}
            </div>

            {/* Page number */}
            <div
                className="absolute bottom-[88px] left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-black pointer-events-none"
                style={{ background: "rgba(0,0,0,0.6)", color: "#ADF709" }}
            >
                {page} / {N}
            </div>
        </div>
    );
}

/* ═══════════════════════════
   END OVERLAY
═══════════════════════════ */
function EndOverlay({ mangaId, chapterId, dismiss, router }: {
    mangaId: string; chapterId: number;
    dismiss: () => void;
    router: ReturnType<typeof useRouter>;
}) {
    const prev = chapterId > 1              ? chapterId - 1 : null;
    const next = chapterId < TOTAL_CHAPTERS ? chapterId + 1 : null;
    return (
        <div className="absolute inset-0 z-40 flex items-center justify-center"
             style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(18px)" }}>
            <div className="text-center px-8 max-w-sm w-full">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-2xl"
                     style={{ background: "linear-gradient(135deg,#ADF709,#00CCFF)", color: "#000" }}>✓</div>
                <h2 className="text-2xl font-black text-white mb-2">Hết Chapter {chapterId}!</h2>
                <p className="text-white/40 text-sm mb-8">Bạn đã đọc xong chương này.</p>
                <div className="flex flex-col gap-3">
                    {next && (
                        <button className="w-full py-4 rounded-2xl font-black text-black text-base transition-all hover:scale-[1.02]"
                                style={{ background: "linear-gradient(90deg,#ADF709,#00CCFF)", boxShadow: "0 0 40px #ADF70950" }}
                                onClick={() => router.push(`/manga/${mangaId}/${next}`)}>
                            Đọc Chapter {next} →
                        </button>
                    )}
                    <button className="w-full py-3 rounded-2xl font-bold text-white text-sm border border-white/15 hover:border-white/35 transition"
                            onClick={() => router.push(`/manga/${mangaId}`)}>
                        Về trang manga
                    </button>
                    {prev && (
                        <button className="text-white/35 text-sm hover:text-white/60 transition py-1"
                                onClick={() => router.push(`/manga/${mangaId}/${prev}`)}>
                            ← Chapter {prev}
                        </button>
                    )}
                    <button className="text-white/20 text-xs hover:text-white/40 transition mt-1" onClick={dismiss}>
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════
   MAIN PAGE
═══════════════════════════ */
export default function ChapterPage() {
    const router    = useRouter();
    const params    = useParams();
    const mangaId   = (params?.id          as string) ?? "one-piece";
    const chapterId = Number((params?.chapterId as string) ?? TOTAL_CHAPTERS);

    const [mode,    setMode   ] = useState<Mode>("vertical");
    const [theme,   setTheme  ] = useState<Theme>("dark");
    const [zoom,    setZoom   ] = useState(100);
    const [page,    setPage   ] = useState(1);
    const [showCfg, setShowCfg] = useState(false);
    const [showChs, setShowChs] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    const { vis, show, force } = useAutoHide(3500);
    const bg       = THEMES[theme].bg;
    const progress = Math.round((page / N) * 100);

    const goChapter = (id: number) => {
        router.push(`/manga/${mangaId}/${id}`);
        setPage(1); setShowChs(false); setShowEnd(false);
    };

    const onPage = useCallback((p: number) => setPage(p), []);
    const onEnd  = useCallback(() => setShowEnd(true), []);

    /* reset page when mode changes */
    useEffect(() => { setPage(1); }, [mode]);

    return (
        <div className="relative" style={{ width: "100vw", height: "100dvh", background: bg, fontFamily: "system-ui,sans-serif", overflow: "hidden" }}>

            {/* ═══ READER (fills entire screen) ═══ */}
            {mode === "vertical" ? (
                <VerticalReader zoom={zoom} bg={bg} onPage={onPage} onEnd={onEnd} />
            ) : (
                <HorizontalReader page={page} setPage={setPage} zoom={zoom} bg={bg} show={show} />
            )}

            {/* ═══ TOP TOOLBAR ═══ */}
            <div
                className="absolute top-0 left-0 right-0 z-50"
                style={{
                    transition: "opacity .25s, transform .25s",
                    opacity:    vis ? 1 : 0,
                    transform:  vis ? "translateY(0)" : "translateY(-110%)",
                    pointerEvents: vis ? "auto" : "none",
                }}
            >
                <div style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.93),transparent)" }}>

                    {/* ── Main bar ── */}
                    <div className="flex items-center gap-2 px-4 py-3">

                        {/* Back / Home */}
                        <button onClick={() => router.push(`/manga/${mangaId}`)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition hover:bg-white/20"
                            style={{ background: "rgba(255,255,255,0.1)" }}>
                            <ArrowUturnLeftIcon className="w-4 h-4 text-white" />
                        </button>
                        <button onClick={() => router.push("/")}
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition hover:bg-white/20"
                            style={{ background: "rgba(255,255,255,0.1)" }}>
                            <HomeIcon className="w-4 h-4 text-white" />
                        </button>

                        {/* Title */}
                        <div className="flex-1 min-w-0 mx-2">
                            <p className="text-white font-black text-sm truncate leading-tight">{MANGA_TITLE}</p>
                            <p className="text-white/35 text-xs leading-tight">Chapter {chapterId} · {page}/{N}</p>
                        </div>

                        {/* Mode switch */}
                        <div className="flex rounded-xl overflow-hidden flex-shrink-0"
                             style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                            {(["vertical","horizontal"] as Mode[]).map(m => (
                                <button key={m} onClick={() => setMode(m)}
                                    className="px-3 py-1.5 text-xs font-black transition-all"
                                    style={{
                                        background: mode === m ? "linear-gradient(90deg,#ADF709,#00CCFF)" : "rgba(255,255,255,0.06)",
                                        color:      mode === m ? "#000" : "rgba(255,255,255,0.4)",
                                    }}>
                                    {m === "vertical" ? "↕ Dọc" : "↔ Ngang"}
                                </button>
                            ))}
                        </div>

                        {/* Chapter list */}
                        <button onClick={() => { setShowChs(v=>!v); setShowCfg(false); }}
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition"
                            style={{ background: showChs ? "rgba(173,247,9,0.2)" : "rgba(255,255,255,0.1)" }}>
                            <ListBulletIcon className="w-4 h-4" style={{ color: showChs ? "#ADF709" : "white" }} />
                        </button>

                        {/* Settings */}
                        <button onClick={() => { setShowCfg(v=>!v); setShowChs(false); }}
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition"
                            style={{ background: showCfg ? "rgba(173,247,9,0.2)" : "rgba(255,255,255,0.1)" }}>
                            <Cog6ToothIcon className="w-4 h-4" style={{ color: showCfg ? "#ADF709" : "white" }} />
                        </button>

                        {/* Prev / badge / Next chapter */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                            <button disabled={chapterId <= 1} onClick={() => goChapter(chapterId - 1)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center transition disabled:opacity-20 hover:bg-white/20"
                                style={{ background: "rgba(255,255,255,0.1)" }}>
                                <ArrowLeftIcon className="w-3.5 h-3.5 text-white" />
                            </button>
                            <button onClick={() => setShowChs(v=>!v)}
                                className="px-2.5 py-1 rounded-lg text-xs font-black"
                                style={{ background: "linear-gradient(90deg,#ADF709,#00CCFF)", color: "#000" }}>
                                Ch.{chapterId}
                            </button>
                            <button disabled={chapterId >= TOTAL_CHAPTERS} onClick={() => goChapter(chapterId + 1)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center transition disabled:opacity-20 hover:bg-white/20"
                                style={{ background: "rgba(255,255,255,0.1)" }}>
                                <ArrowRightIcon className="w-3.5 h-3.5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* ── Settings panel ── */}
                    {showCfg && (
                        <div className="mx-4 mb-2 rounded-2xl border border-white/10 p-5 space-y-4"
                             style={{ background: "rgba(10,12,17,0.98)", backdropFilter: "blur(24px)" }}>
                            <div className="flex justify-between items-center">
                                <span className="text-white font-black text-sm">Cài đặt đọc</span>
                                <button onClick={() => setShowCfg(false)}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10"
                                    style={{ background: "rgba(255,255,255,0.08)" }}>
                                    <XMarkIcon className="w-4 h-4 text-white" />
                                </button>
                            </div>

                            {/* Theme */}
                            <div>
                                <p className="text-white/30 text-[11px] font-bold tracking-[3px] uppercase mb-2">Màu nền</p>
                                <div className="flex gap-2">
                                    {(Object.entries(THEMES) as [Theme,{bg:string;label:string}][]).map(([k,v]) => (
                                        <button key={k} onClick={() => setTheme(k)}
                                            className="flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all"
                                            style={{
                                                background:  theme===k ? "#00CCFF18" : v.bg,
                                                borderColor: theme===k ? "#00CCFF"   : "rgba(255,255,255,0.1)",
                                                color:       theme===k ? "#00CCFF"   : "rgba(255,255,255,0.4)",
                                            }}>{v.label}</button>
                                    ))}
                                </div>
                            </div>

                            {/* Zoom */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <p className="text-white/30 text-[11px] font-bold tracking-[3px] uppercase">Zoom</p>
                                    <span className="text-[#ADF709] text-xs font-black">{zoom}%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setZoom(z=>Math.max(60,z-10))}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/15 transition"
                                        style={{ background: "rgba(255,255,255,0.08)" }}>
                                        <MagnifyingGlassMinusIcon className="w-4 h-4 text-white" />
                                    </button>
                                    <input type="range" min={60} max={150} value={zoom}
                                        onChange={e=>setZoom(Number(e.target.value))}
                                        className="flex-1 accent-[#ADF709] cursor-pointer h-1" />
                                    <button onClick={() => setZoom(z=>Math.min(150,z+10))}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/15 transition"
                                        style={{ background: "rgba(255,255,255,0.08)" }}>
                                        <MagnifyingGlassPlusIcon className="w-4 h-4 text-white" />
                                    </button>
                                    <button onClick={() => setZoom(100)}
                                        className="text-white/30 text-xs hover:text-white/55 transition px-1">Reset</button>
                                </div>
                            </div>

                            <p className="text-white/20 text-[11px] pt-1 border-t border-white/5">
                                ← → phím tắt lật trang &nbsp;·&nbsp; Kéo / vuốt để lật (chế độ ngang)
                            </p>
                        </div>
                    )}

                    {/* ── Chapter list panel ── */}
                    {showChs && (
                        <div className="mx-4 mb-2 rounded-2xl border border-white/10 overflow-hidden"
                             style={{ background: "rgba(10,12,17,0.98)", backdropFilter: "blur(24px)", maxHeight: 290 }}>
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                                <span className="text-white font-black text-sm">Danh sách chương</span>
                                <button onClick={() => setShowChs(false)}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10"
                                    style={{ background: "rgba(255,255,255,0.08)" }}>
                                    <XMarkIcon className="w-4 h-4 text-white" />
                                </button>
                            </div>
                            <div style={{ overflowY: "auto", maxHeight: 240 }}>
                                {CHAPTER_LIST.map(ch => (
                                    <button key={ch.id} onClick={() => goChapter(ch.id)}
                                        className="w-full flex items-center justify-between px-4 py-3 border-b border-white/5 hover:bg-white/5 transition last:border-0">
                                        <span className="text-sm font-semibold"
                                              style={{ color: ch.id === chapterId ? "#ADF709" : "rgba(255,255,255,0.55)" }}>
                                            {ch.label}
                                        </span>
                                        {ch.id === chapterId && (
                                            <span className="text-[#ADF709] text-[10px] font-black px-2 py-0.5 rounded-full"
                                                  style={{ background: "rgba(173,247,9,0.15)", border: "1px solid rgba(173,247,9,0.3)" }}>
                                                Đang đọc
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ═══ BOTTOM BAR ═══ */}
            <div
                className="absolute bottom-0 left-0 right-0 z-50"
                style={{
                    transition: "opacity .25s, transform .25s",
                    opacity:    vis ? 1 : 0,
                    transform:  vis ? "translateY(0)" : "translateY(110%)",
                    pointerEvents: vis ? "auto" : "none",
                }}
            >
                <div className="px-4 pb-4 pt-8"
                     style={{ background: "linear-gradient(to top,rgba(0,0,0,0.93),transparent)" }}>
                    <div className="flex items-center gap-3">
                        <span className="text-white/30 text-xs font-mono w-5 flex-shrink-0">{page}</span>

                        {/* Progress bar + scrubber */}
                        <div className="flex-1 relative" style={{ height: 6 }}>
                            <div className="absolute inset-0 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
                            <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-150"
                                 style={{ width:`${progress}%`, background:"linear-gradient(90deg,#ADF709,#00CCFF)" }} />
                            {mode === "horizontal" && (
                                <input type="range" min={1} max={N} value={page}
                                    onChange={e => setPage(Number(e.target.value))}
                                    className="absolute inset-0 w-full opacity-0 cursor-pointer" />
                            )}
                        </div>

                        <span className="text-white/30 text-xs font-mono w-5 text-right flex-shrink-0">{N}</span>
                        <span className="text-xs font-black w-9 text-right flex-shrink-0" style={{ color:"#ADF709" }}>{progress}%</span>

                        {chapterId < TOTAL_CHAPTERS && (
                            <button className="px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 flex-shrink-0 transition hover:brightness-110"
                                    style={{ background:"linear-gradient(90deg,#00CCFF,#ADF709)", color:"#000" }}
                                    onClick={() => goChapter(chapterId+1)}>
                                Ch.{chapterId+1} <ArrowRightIcon className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ═══ Peek button ═══ */}
            {!vis && (
                <button className="absolute top-3 right-3 z-50 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background:"rgba(0,0,0,0.55)", backdropFilter:"blur(8px)" }}
                        onClick={force}>
                    <Bars3Icon className="w-4 h-4 text-white/45" />
                </button>
            )}

            {/* ═══ Tap reader to show toolbar ═══ */}
            {mode === "vertical" && (
                <div className="absolute inset-0 z-10 pointer-events-none"
                     onClick={show} style={{ pointerEvents: "none" }} />
            )}

            {/* ═══ End overlay ═══ */}
            {showEnd && (
                <EndOverlay mangaId={mangaId} chapterId={chapterId} dismiss={() => setShowEnd(false)} router={router} />
            )}
        </div>
    );
}
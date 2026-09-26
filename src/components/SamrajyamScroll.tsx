"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";
import {
  FRAME_COUNT,
  getFrameUrl,
  CINEMATIC_SCROLL_HEIGHT,
  LERP_FACTOR,
  MAX_DPR,
  DEBUG_MODE,
  PRIORITY_PRELOAD_COUNT,
} from "@/config/sequence";

interface SamrajyamScrollProps {
  onReady?: () => void;
  onProgress?: (progress: number) => void;
}

interface Chapter {
  start: number;
  end: number;
  title: string;
  subtitle: string;
}

const CHAPTERS: Chapter[] = [
  {
    start: 0.18,
    end: 0.38,
    title: "GRAND ENTRANCE",
    subtitle: "A royal gateway into South Indian heritage",
  },
  {
    start: 0.42,
    end: 0.62,
    title: "WARM HOSPITALITY",
    subtitle: "Every guest welcomed with the reverence of home",
  },
  {
    start: 0.66,
    end: 0.86,
    title: "THE DINING SANCTUM",
    subtitle: "Where authentic Chettinad aromas meet timeless elegance",
  },
  {
    start: 0.90,
    end: 0.99,
    title: "TIMELESS HERITAGE",
    subtitle: "Scroll to explore our signature dishes & celebrations",
  },
];

export default function SamrajyamScroll({
  onReady,
  onProgress,
}: SamrajyamScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const chaptersOverlayRef = useRef<HTMLDivElement>(null);
  const chapterTitleRef = useRef<HTMLHeadingElement>(null);
  const chapterSubtitleRef = useRef<HTMLParagraphElement>(null);
  const progressBadgeRef = useRef<HTMLDivElement>(null);

  // Store callbacks in refs to avoid recreating effects
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  // Cached frame images array: index 1 to FRAME_COUNT
  const framesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(FRAME_COUNT + 1).fill(null)
  );

  // Animation and scroll state
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const progressRef = useRef<number>(0);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [loadedCount, setLoadedCount] = useState<number>(0);

  // ──────────────────────────────────────────────────────────────────────────
  // Safe Loaded Frame Lookup
  // ──────────────────────────────────────────────────────────────────────────
  const getLoadedFrame = useCallback((idealIndex: number): HTMLImageElement | null => {
    const frames = framesRef.current;
    const clamped = Math.max(1, Math.min(FRAME_COUNT, Math.round(idealIndex)));

    // 1. Check target frame
    const direct = frames[clamped];
    if (direct && direct.complete && direct.naturalWidth > 0) {
      return direct;
    }

    // 2. Search backward for most recently passed valid frame
    for (let i = clamped - 1; i >= 1; i--) {
      const candidate = frames[i];
      if (candidate && candidate.complete && candidate.naturalWidth > 0) {
        return candidate;
      }
    }

    // 3. Search forward for earliest available future frame
    for (let i = clamped + 1; i <= FRAME_COUNT; i++) {
      const candidate = frames[i];
      if (candidate && candidate.complete && candidate.naturalWidth > 0) {
        return candidate;
      }
    }

    return null;
  }, []);

  // ──────────────────────────────────────────────────────────────────────────
  // Canvas Rendering with Object-Fit Cover
  // ──────────────────────────────────────────────────────────────────────────
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Verify image is genuinely decoded
    if (!img.complete || img.naturalWidth <= 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
      MAX_DPR
    );

    const displayW = canvas.clientWidth;
    const displayH = canvas.clientHeight;
    if (displayW <= 0 || displayH <= 0) return;

    const targetW = Math.round(displayW * dpr);
    const targetH = Math.round(displayH * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const canvasAspect = targetW / targetH;
    const imgAspect = imgW / imgH;

    let sWidth = imgW;
    let sHeight = imgH;
    let sx = 0;
    let sy = 0;

    if (canvasAspect > imgAspect) {
      // Canvas is wider than image (crop top and bottom)
      sHeight = imgW / canvasAspect;
      sy = (imgH - sHeight) / 2;
    } else {
      // Canvas is taller than image (crop left and right)
      sWidth = imgH * canvasAspect;
      sx = (imgW - sWidth) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetW, targetH);
  }, []);

  // ──────────────────────────────────────────────────────────────────────────
  // Preloading Pipeline (Runs Once on Mount)
  // ──────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    let isCancelled = false;

    const loadSingleImage = (index: number): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (!isCancelled) {
            framesRef.current[index] = img;
            setLoadedCount((prev) => prev + 1);
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
        img.src = getFrameUrl(index);
      });
    };

    // Priority Batch: First 10 frames
    const priorityIndices = Array.from(
      { length: Math.min(PRIORITY_PRELOAD_COUNT, FRAME_COUNT) },
      (_, i) => i + 1
    );

    Promise.all(priorityIndices.map(loadSingleImage)).then(() => {
      if (isCancelled) return;

      setIsReady(true);
      if (onReadyRef.current) {
        onReadyRef.current();
      }

      // Draw first frame immediately
      const initialFrame = getLoadedFrame(1);
      if (initialFrame) {
        drawFrame(initialFrame);
        lastDrawnFrameRef.current = 1;
      }

      // Secondary Batch: Load remaining frames in batches of 5
      const remainingIndices: number[] = [];
      for (let i = PRIORITY_PRELOAD_COUNT + 1; i <= FRAME_COUNT; i++) {
        remainingIndices.push(i);
      }

      const loadRemaining = async () => {
        const batchSize = 5;
        for (let i = 0; i < remainingIndices.length; i += batchSize) {
          if (isCancelled) break;
          const chunk = remainingIndices.slice(i, i + batchSize);
          await Promise.all(chunk.map(loadSingleImage));
        }
      };

      loadRemaining();
    });

    return () => {
      isCancelled = true;
    };
  }, [drawFrame, getLoadedFrame]);

  // ──────────────────────────────────────────────────────────────────────────
  // Scroll Listener
  // ──────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollTop =
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const containerTop = container.offsetTop;
      const scrollableDist = container.offsetHeight - window.innerHeight;

      if (scrollableDist <= 0) return;

      const currentDist = scrollTop - containerTop;
      const rawProgress = currentDist / scrollableDist;
      const clamped = Math.max(0, Math.min(1, rawProgress));

      progressRef.current = clamped;
      targetFrameRef.current = 1 + clamped * (FRAME_COUNT - 1);

      if (onProgressRef.current) {
        onProgressRef.current(clamped);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ──────────────────────────────────────────────────────────────────────────
  // Window Resize Listener
  // ──────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const currentIdx = Math.round(currentFrameRef.current);
      const img = getLoadedFrame(currentIdx);
      if (img) {
        drawFrame(img);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [drawFrame, getLoadedFrame]);

  // ──────────────────────────────────────────────────────────────────────────
  // High Performance 60FPS+ RAF Loop with LERP Interpolation
  // ──────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    isRunningRef.current = true;

    const tick = () => {
      if (!isRunningRef.current) return;

      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const progress = progressRef.current;

      // LERP Frame calculation
      const delta = target - current;
      if (Math.abs(delta) > 0.005) {
        currentFrameRef.current = current + delta * LERP_FACTOR;
      } else {
        currentFrameRef.current = target;
      }

      const frameToDraw = Math.max(
        1,
        Math.min(FRAME_COUNT, Math.round(currentFrameRef.current))
      );

      // Draw frame to canvas
      const img = getLoadedFrame(frameToDraw);
      if (img) {
        drawFrame(img);
        lastDrawnFrameRef.current = frameToDraw;
      }

      // ──────────────────────────────────────────────────────────────────────
      // Direct DOM Updates (Zero React Re-renders during Scroll)
      // ──────────────────────────────────────────────────────────────────────

      // 1. Hero Overlay: Visible at top, smoothly lifts and fades out as user scrolls
      if (heroOverlayRef.current) {
        const heroOpacity = Math.max(0, Math.min(1, 1 - progress * 7.5));
        const heroTranslateY = progress * 60;
        heroOverlayRef.current.style.opacity = heroOpacity.toFixed(3);
        heroOverlayRef.current.style.transform = `translate3d(0, -${heroTranslateY.toFixed(1)}px, 0)`;
        heroOverlayRef.current.style.pointerEvents = heroOpacity < 0.05 ? "none" : "auto";
      }

      // 2. Chapter Subtitles: Fade in and out at key journey milestones
      if (chaptersOverlayRef.current && chapterTitleRef.current && chapterSubtitleRef.current) {
        let activeChap: Chapter | null = null;
        let chapOpacity = 0;

        for (const chap of CHAPTERS) {
          if (progress >= chap.start && progress <= chap.end) {
            activeChap = chap;
            const mid = (chap.start + chap.end) / 2;
            const halfSpan = (chap.end - chap.start) / 2;
            const dist = Math.abs(progress - mid);
            chapOpacity = Math.max(0, 1 - (dist / halfSpan) ** 2);
            break;
          }
        }

        if (activeChap && chapOpacity > 0.04) {
          chapterTitleRef.current.textContent = activeChap.title;
          chapterSubtitleRef.current.textContent = activeChap.subtitle;
          chaptersOverlayRef.current.style.opacity = chapOpacity.toFixed(3);
          chaptersOverlayRef.current.style.transform = `translate3d(0, ${(1 - chapOpacity) * 10}px, 0)`;
        } else {
          chaptersOverlayRef.current.style.opacity = "0";
        }
      }

      // 3. Journey Progress Badge
      if (progressBadgeRef.current) {
        const pct = Math.round(progress * 100);
        progressBadgeRef.current.textContent = `${pct}% JOURNEY`;
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      isRunningRef.current = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame, getLoadedFrame]);

  // CTA Click: Smooth scroll into the sequence journey
  const handleExploreClick = () => {
    const container = containerRef.current;
    if (!container) return;
    const targetScroll = container.offsetTop + window.innerHeight * 1.5;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full select-none"
      style={{
        height: CINEMATIC_SCROLL_HEIGHT,
        // CRUCIAL: Do NOT put overflow:hidden here!
      }}
    >
      {/* ────────────────────────────────────────────────────────────────────
          Sticky Viewport Container: Stays fixed for the entire 500vh
      ──────────────────────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#141210]"
        style={{ position: "sticky", top: 0 }}
      >
        {/* HTML5 Canvas Background */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Ambient Dark Vignette & Edge Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-[#141210]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,rgba(0,0,0,0.1),rgba(20,18,16,0.85)_85%)] pointer-events-none" />

        {/* Decorative Heritage Pillar Lines */}
        <div className="absolute left-6 sm:left-10 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent hidden md:block pointer-events-none" />
        <div className="absolute right-6 sm:right-10 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent hidden md:block pointer-events-none" />

        {/* ──────────────────────────────────────────────────────────────────
            1. Hero Overlay: Present at top of page, gracefully fades on scroll
        ────────────────────────────────────────────────────────────────── */}
        <div
          ref={heroOverlayRef}
          className="absolute inset-0 z-20 flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pt-28 pb-10 transition-transform will-change-transform"
        >
          {/* Top Location Badge */}
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-wood-900/60 px-4 py-1.5 backdrop-blur-md shadow-lg shadow-black/40">
              <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" />
              <span className="text-[11px] font-sans font-medium uppercase tracking-widest2 text-gold-300">
                Horamavu, Bengaluru
              </span>
            </div>
          </div>

          {/* Center Cinematic Hero Typography */}
          <div className="max-w-4xl mx-auto text-center my-auto py-6">
            <h2 className="font-sans text-xs sm:text-sm md:text-base uppercase tracking-widest3 text-gold-400 font-semibold mb-3 drop-shadow-md">
              SAMRAJYAM • THE FAMILY RESTAURANT
            </h2>

            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight text-cream-50 leading-[0.92] uppercase drop-shadow-2xl">
              TASTE
              <span className="block font-display italic font-normal text-gold-300/95 text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-1 sm:mt-2">
                TRADITION.
              </span>
            </h1>

            <p className="mt-6 sm:mt-8 max-w-xl mx-auto text-sm sm:text-base md:text-lg text-cream-100 font-sans font-light leading-relaxed tracking-wide drop-shadow-md">
              Authentic Tamil flavours, served with the warmth of home.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={handleExploreClick}
                className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-sans font-semibold tracking-widest uppercase text-charcoal bg-gradient-to-r from-gold-400 via-gold to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-sm shadow-xl hover:shadow-gold/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore the Experience</span>
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </button>

              <Link
                href="#menu"
                className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-sans font-medium tracking-widest uppercase text-cream-100 hover:text-gold border border-gold/30 hover:border-gold/60 bg-wood-900/60 backdrop-blur-md rounded-sm transition-all duration-300 text-center"
              >
                View Menu
              </Link>
            </div>
          </div>

          {/* Bottom Scroll Prompt */}
          <div className="flex flex-col items-center gap-2 text-cream-300/80">
            <span className="text-[11px] uppercase tracking-widest2 font-sans text-gold-400/90 font-medium">
              Scroll to step inside
            </span>
            <button
              type="button"
              onClick={handleExploreClick}
              className="p-1.5 text-gold-400 hover:text-gold transition-colors cursor-pointer"
              aria-label="Scroll to enter restaurant"
            >
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </button>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            2. Scrollytelling Chapter Overlays (Appears during middle scroll)
        ────────────────────────────────────────────────────────────────── */}
        <div
          ref={chaptersOverlayRef}
          className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center px-6 text-center opacity-0 transition-opacity duration-300"
        >
          <div className="max-w-2xl mx-auto p-8 rounded-lg bg-charcoal/50 backdrop-blur-md border border-gold/25 shadow-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-gold/60" />
              <span className="text-[10px] sm:text-xs font-sans font-semibold uppercase tracking-widest3 text-gold-400">
                THE SAMRAJYAM JOURNEY
              </span>
              <span className="h-px w-6 bg-gold/60" />
            </div>

            <h2
              ref={chapterTitleRef}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide text-cream-50 uppercase"
            >
              GRAND ENTRANCE
            </h2>

            <p
              ref={chapterSubtitleRef}
              className="mt-3 text-sm sm:text-base font-sans font-light text-cream-200 tracking-wide"
            >
              A royal gateway into South Indian heritage
            </p>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            3. Journey Progress Badge (Bottom Right)
        ────────────────────────────────────────────────────────────────── */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-20 pointer-events-none">
          <div
            ref={progressBadgeRef}
            className="text-[10px] font-sans uppercase tracking-widest2 px-3.5 py-1.5 rounded-full border border-gold/20 bg-charcoal/70 backdrop-blur-md text-gold-300/90 shadow-lg"
          >
            0% JOURNEY
          </div>
        </div>

        {/* Debug Overlay */}
        {DEBUG_MODE && (
          <div className="absolute top-24 right-4 z-30 bg-black/80 text-gold-400 p-3 text-xs font-mono rounded border border-gold/40 pointer-events-none">
            <div>FRAME: {Math.round(currentFrameRef.current)} / {FRAME_COUNT}</div>
            <div>LOADED: {loadedCount} / {FRAME_COUNT}</div>
            <div>READY: {isReady ? "YES" : "NO"}</div>
          </div>
        )}
      </div>
    </section>
  );
}

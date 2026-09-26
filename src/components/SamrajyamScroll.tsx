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
} from "@/config/sequence";

interface SamrajyamScrollProps {
  onReady?: () => void;
  onLoadProgress?: (progress: number) => void;
  onProgress?: (progress: number) => void;
}

interface Chapter {
  id: number;
  start: number;
  end: number;
  title: string;
  subtitle: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    start: 0.18,
    end: 0.38,
    title: "GRAND ENTRANCE",
    subtitle: "A royal gateway into South Indian heritage",
  },
  {
    id: 2,
    start: 0.42,
    end: 0.62,
    title: "WARM HOSPITALITY",
    subtitle: "Every guest welcomed with the reverence of home",
  },
  {
    id: 3,
    start: 0.66,
    end: 0.86,
    title: "THE DINING SANCTUM",
    subtitle: "Where authentic Chettinad aromas meet timeless elegance",
  },
  {
    id: 4,
    start: 0.90,
    end: 0.99,
    title: "TIMELESS HERITAGE",
    subtitle: "Scroll to explore our signature dishes & celebrations",
  },
];

interface LayoutMetrics {
  containerTop: number;
  scrollableDist: number;
  displayWidth: number;
  displayHeight: number;
  targetW: number;
  targetH: number;
  dpr: number;
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
}

export default function SamrajyamScroll({
  onReady,
  onLoadProgress,
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

  const onLoadProgressRef = useRef(onLoadProgress);
  onLoadProgressRef.current = onLoadProgress;

  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  // Cached frame images array: index 1 to FRAME_COUNT
  const framesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(FRAME_COUNT + 1).fill(null)
  );

  // Cached 2D Canvas Context (Retrieved once with alpha: false to eliminate blending overhead)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Animation and scroll state
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const isLoopRunningRef = useRef<boolean>(false);
  const progressRef = useRef<number>(0);
  const isLenisRef = useRef<boolean>(false);

  // Layout metrics cached to eliminate forced synchronous reflows
  const layoutMetricsRef = useRef<LayoutMetrics>({
    containerTop: 0,
    scrollableDist: 1,
    displayWidth: 1920,
    displayHeight: 1080,
    targetW: 1920,
    targetH: 1080,
    dpr: 1,
    sx: 0,
    sy: 0,
    sWidth: 1280,
    sHeight: 720,
  });

  // DOM mutation caching to avoid writing unchanged text/styles
  const lastHeroOpacityRef = useRef<number>(1);
  const lastActiveChapterIdRef = useRef<number | null>(null);
  const lastPctRef = useRef<number>(-1);

  // Performance Safeguard: Frame time tracking for automated quality scaling
  const lastTimestampRef = useRef<number>(0);
  const frameTimesRef = useRef<number[]>([]);
  const isLowPerfRef = useRef<boolean>(false);

  // React state only for high-level lifecycle (Zero re-renders during active scrolling)
  const [isReady, setIsReady] = useState<boolean>(false);

  // ──────────────────────────────────────────────────────────────────────────
  // Fast Canvas Draw: ZERO layout reads, ZERO context property overhead
  // ──────────────────────────────────────────────────────────────────────────
  const drawFrameFast = useCallback((img: HTMLImageElement) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (!img.complete || img.naturalWidth <= 0) return;

    const { targetW, targetH, sx, sy, sWidth, sHeight } = layoutMetricsRef.current;
    if (targetW <= 0 || targetH <= 0) return;

    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetW, targetH);
  }, []);

  // ──────────────────────────────────────────────────────────────────────────
  // Measure Layout: Batched DOM Reads executed ONLY on mount & debounced resize
  // ──────────────────────────────────────────────────────────────────────────
  const measureLayout = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // Batched layout reads
    const rect = container.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const scrollableDist = Math.max(1, container.offsetHeight - winH);

    const clientWidth = canvas.clientWidth || winW;
    const clientHeight = canvas.clientHeight || winH;

    const currentMaxDpr = isLowPerfRef.current ? 1.0 : MAX_DPR;
    const dpr = Math.min(window.devicePixelRatio || 1, currentMaxDpr);

    // Target buffer size: capped to 1920x1080 to conserve GPU memory and rasterization time
    const targetW = Math.min(1920, Math.round(clientWidth * dpr));
    const targetH = Math.min(1080, Math.round(clientHeight * dpr));

    // Precompute aspect ratio crop bounds for 1280x720 frames (eliminates arithmetic in tick)
    const imgW = 1280;
    const imgH = 720;
    const canvasAspect = targetW / targetH;
    const imgAspect = imgW / imgH;

    let sWidth = imgW;
    let sHeight = imgH;
    let sx = 0;
    let sy = 0;

    if (canvasAspect > imgAspect) {
      sHeight = imgW / canvasAspect;
      sy = (imgH - sHeight) * 0.5;
    } else {
      sWidth = imgH * canvasAspect;
      sx = (imgW - sWidth) * 0.5;
    }

    layoutMetricsRef.current = {
      containerTop,
      scrollableDist,
      displayWidth: clientWidth,
      displayHeight: clientHeight,
      targetW,
      targetH,
      dpr,
      sx,
      sy,
      sWidth,
      sHeight,
    };

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const ctx = ctxRef.current;
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = isLowPerfRef.current ? "low" : "medium";
    }

    // Redraw current frame with updated dimensions
    const currentFrame = Math.max(1, Math.min(FRAME_COUNT, Math.round(currentFrameRef.current)));
    const img = framesRef.current[currentFrame];
    if (img && img.complete) {
      drawFrameFast(img);
      lastDrawnFrameRef.current = currentFrame;
    }
  }, [drawFrameFast]);

  // ──────────────────────────────────────────────────────────────────────────
  // Preloading Pipeline: Asynchronously decode all 50 frames upfront
  // ──────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    let isCancelled = false;

    // Acquire 2D context once with alpha: false for direct GPU blitting
    if (canvasRef.current && !ctxRef.current) {
      ctxRef.current =
        canvasRef.current.getContext("2d", { alpha: false, desynchronized: true }) ||
        canvasRef.current.getContext("2d");
    }

    const totalFrames = FRAME_COUNT;
    let loadedCount = 0;

    const loadSingleImage = async (index: number): Promise<HTMLImageElement | null> => {
      if (isCancelled) return null;
      try {
        const img = new Image();
        img.src = getFrameUrl(index);

        // Hardware-accelerated image decompression into GPU memory before display
        await img.decode();

        if (!isCancelled) {
          framesRef.current[index] = img;
          loadedCount++;
          if (onLoadProgressRef.current) {
            onLoadProgressRef.current((loadedCount / totalFrames) * 100);
          }
        }
        return img;
      } catch {
        loadedCount++;
        return null;
      }
    };

    // Load in concurrent batches of 6 to prevent HTTP connection starvation
    const loadAllFrames = async () => {
      const allIndices = Array.from({ length: totalFrames }, (_, i) => i + 1);
      const batchSize = 6;

      for (let i = 0; i < allIndices.length; i += batchSize) {
        if (isCancelled) return;
        const chunk = allIndices.slice(i, i + batchSize);
        await Promise.all(chunk.map(loadSingleImage));
      }

      if (isCancelled) return;

      measureLayout();
      setIsReady(true);

      if (onReadyRef.current) {
        onReadyRef.current();
      }

      // Draw initial frame immediately
      const initialFrame = framesRef.current[1];
      if (initialFrame) {
        drawFrameFast(initialFrame);
        lastDrawnFrameRef.current = 1;
      }
    };

    loadAllFrames();

    return () => {
      isCancelled = true;
    };
  }, [drawFrameFast, measureLayout]);

  // ──────────────────────────────────────────────────────────────────────────
  // High-Performance 60FPS RAF Loop: LERP, Frame Check, and Idle Sleep
  // ──────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    isRunningRef.current = true;

    const tick = (timestamp: number) => {
      if (!isRunningRef.current) return;

      // Performance Monitor & Adaptive Quality Safeguard (Zero Layout Reads)
      if (lastTimestampRef.current > 0) {
        const dt = timestamp - lastTimestampRef.current;
        if (dt > 0 && dt < 200) {
          const history = frameTimesRef.current;
          history.push(dt);
          if (history.length > 30) {
            history.shift();
            const avgDt = history.reduce((sum, v) => sum + v, 0) / history.length;

            // If sustained frame time > 28ms (< 35fps), downgrade context quality without reflow
            if (avgDt > 28 && !isLowPerfRef.current) {
              isLowPerfRef.current = true;
              if (ctxRef.current) {
                ctxRef.current.imageSmoothingQuality = "low";
              }
            } else if (avgDt < 18 && isLowPerfRef.current) {
              isLowPerfRef.current = false;
              if (ctxRef.current) {
                ctxRef.current.imageSmoothingQuality = "medium";
              }
            }
          }
        }
      }
      lastTimestampRef.current = timestamp;

      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const progress = progressRef.current;

      // Frame interpolation
      const delta = target - current;
      let isMoving = false;

      // When Lenis smooth-scroll is active, scroll position is already eased.
      // Use responsive factor (0.50) to track without dragging or rubber-banding lag.
      // When native scroll is active, use calibrated LERP_FACTOR (0.25).
      const factor = isLenisRef.current ? 0.5 : LERP_FACTOR;

      if (Math.abs(delta) > 0.005) {
        currentFrameRef.current = current + delta * factor;
        isMoving = true;
      } else {
        currentFrameRef.current = target;
      }

      const frameToDraw = Math.max(
        1,
        Math.min(FRAME_COUNT, Math.round(currentFrameRef.current))
      );

      // Draw frame to canvas ONLY when the integer frame changes (avoids redundant GPU blits)
      if (frameToDraw !== lastDrawnFrameRef.current) {
        const img = framesRef.current[frameToDraw];
        if (img && img.complete) {
          drawFrameFast(img);
          lastDrawnFrameRef.current = frameToDraw;
        }
      }

      // Direct Batched DOM Style Updates (Zero layout reads)

      // 1. Hero Overlay: Dissolves cleanly within first 12% of scroll
      if (heroOverlayRef.current) {
        const heroOpacity = Math.max(0, Math.min(1, 1 - progress * 8.5));
        if (
          Math.abs(heroOpacity - lastHeroOpacityRef.current) > 0.003 ||
          (heroOpacity === 0 && lastHeroOpacityRef.current !== 0)
        ) {
          const heroTranslateY = progress * 40;
          heroOverlayRef.current.style.opacity = heroOpacity.toFixed(3);
          heroOverlayRef.current.style.transform = `translate3d(0, -${heroTranslateY.toFixed(1)}px, 0)`;
          heroOverlayRef.current.style.pointerEvents = heroOpacity < 0.04 ? "none" : "auto";
          lastHeroOpacityRef.current = heroOpacity;
        }
      }

      // 2. Chapter Subtitles: Fade in/out at key milestones
      if (chaptersOverlayRef.current && chapterTitleRef.current && chapterSubtitleRef.current) {
        let activeChap: Chapter | null = null;
        let chapOpacity = 0;

        for (const chap of CHAPTERS) {
          if (progress >= chap.start && progress <= chap.end) {
            activeChap = chap;
            const mid = (chap.start + chap.end) * 0.5;
            const halfSpan = (chap.end - chap.start) * 0.5;
            const dist = Math.abs(progress - mid);
            chapOpacity = Math.max(0, 1 - (dist / halfSpan) ** 2);
            break;
          }
        }

        if (activeChap && chapOpacity > 0.04) {
          if (lastActiveChapterIdRef.current !== activeChap.id) {
            chapterTitleRef.current.textContent = activeChap.title;
            chapterSubtitleRef.current.textContent = activeChap.subtitle;
            lastActiveChapterIdRef.current = activeChap.id;
          }
          chaptersOverlayRef.current.style.opacity = chapOpacity.toFixed(3);
          chaptersOverlayRef.current.style.transform = `translate3d(0, ${((1 - chapOpacity) * 8).toFixed(1)}px, 0)`;
        } else {
          if (lastActiveChapterIdRef.current !== null) {
            chaptersOverlayRef.current.style.opacity = "0";
            lastActiveChapterIdRef.current = null;
          }
        }
      }

      // 3. Journey Progress Badge
      if (progressBadgeRef.current) {
        const pct = Math.round(progress * 100);
        if (pct !== lastPctRef.current) {
          progressBadgeRef.current.textContent = `${pct}% JOURNEY`;
          lastPctRef.current = pct;
        }
      }

      // Idle the loop when stationary to save 100% idle GPU/CPU cycles
      if (isMoving) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        isLoopRunningRef.current = false;
      }
    };

    // Helper to start/wake the animation loop
    const wakeLoop = () => {
      if (!isLoopRunningRef.current && isRunningRef.current) {
        isLoopRunningRef.current = true;
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    // ────────────────────────────────────────────────────────────────────────
    // Coordinated Scroll Listener (Zero layout reads inside handler)
    // ────────────────────────────────────────────────────────────────────────
    const updateScrollProgress = (scrollTop: number) => {
      const { containerTop, scrollableDist } = layoutMetricsRef.current;
      if (scrollableDist <= 0) return;

      const currentDist = scrollTop - containerTop;
      const rawProgress = currentDist / scrollableDist;
      const clamped = Math.max(0, Math.min(1, rawProgress));

      progressRef.current = clamped;
      targetFrameRef.current = 1 + clamped * (FRAME_COUNT - 1);

      if (onProgressRef.current) {
        onProgressRef.current(clamped);
      }

      wakeLoop();
    };

    // Sync with Lenis smooth-scroll instance
    let cleanupLenis: (() => void) | null = null;
    const hookLenis = (lenisInstance: {
      on: (event: string, cb: (e: { scroll: number }) => void) => void;
      off?: (event: string, cb: (e: { scroll: number }) => void) => void;
    }) => {
      isLenisRef.current = true;
      const onLenisScroll = (e: { scroll: number }) => {
        updateScrollProgress(e.scroll);
      };
      lenisInstance.on("scroll", onLenisScroll);
      cleanupLenis = () => {
        if (lenisInstance.off) {
          lenisInstance.off("scroll", onLenisScroll);
        }
      };
    };

    const winWithLenis =
      typeof window !== "undefined"
        ? (window as unknown as {
            __lenis?: {
              on: (event: string, cb: (e: { scroll: number }) => void) => void;
              off?: (event: string, cb: (e: { scroll: number }) => void) => void;
            };
          })
        : null;

    if (winWithLenis?.__lenis) {
      hookLenis(winWithLenis.__lenis);
    } else if (typeof window !== "undefined") {
      const onLenisReady = (e: Event) => {
        const customEvt = e as CustomEvent;
        if (customEvt.detail) {
          hookLenis(customEvt.detail);
        }
      };
      window.addEventListener("lenis-ready", onLenisReady, { once: true });
    }

    // Passive native scroll listener: active as fallback, ignored if Lenis is driving
    const handleNativeScroll = () => {
      if (isLenisRef.current) return;
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      updateScrollProgress(scrollTop);
    };

    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    handleNativeScroll();

    // ────────────────────────────────────────────────────────────────────────
    // Debounced Resize & Orientation Change
    // ────────────────────────────────────────────────────────────────────────
    let resizeTimer: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        measureLayout();
        wakeLoop();
      }, 100);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    return () => {
      isRunningRef.current = false;
      isLoopRunningRef.current = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (cleanupLenis) {
        cleanupLenis();
      }
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      window.removeEventListener("scroll", handleNativeScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [drawFrameFast, measureLayout]);

  // CTA Click: Smooth scroll into the sequence journey
  const handleExploreClick = () => {
    const container = containerRef.current;
    if (!container) return;
    const targetScroll = container.offsetTop + window.innerHeight * 1.2;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Samrajyam Restaurant Walkthrough"
      className="relative w-full bg-[#141210]"
      style={{
        height: CINEMATIC_SCROLL_HEIGHT,
        contain: "layout paint",
      }}
    >
      {/* Sticky Viewport Container */}
      <div
        className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#141210]"
        style={{ position: "sticky", top: 0, transform: "translate3d(0, 0, 0)" }}
      >
        {/* HTML5 Canvas Background with GPU Isolation */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
        />

        {/* Ambient Subtle Luxury Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-transparent to-[#141210]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_75%_at_50%_50%,transparent_50%,rgba(20,18,16,0.6)_100%)] pointer-events-none" />

        {/* Decorative Heritage Pillar Lines */}
        <div className="absolute left-6 sm:left-10 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden md:block pointer-events-none" />
        <div className="absolute right-6 sm:right-10 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden md:block pointer-events-none" />

        {/* ──────────────────────────────────────────────────────────────────
            1. Hero Overlay: Luxury editorial layout, fades gracefully on scroll
            (No CSS transition-transform so JS styles interpolate at true 60fps)
        ────────────────────────────────────────────────────────────────── */}
        <div
          ref={heroOverlayRef}
          className="absolute inset-0 z-20 flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 will-change-[transform,opacity]"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          {/* Top Location Pill */}
          <div className="text-center animate-fade-in pt-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-charcoal/70 px-4 py-1.5 backdrop-blur-md shadow-lg shadow-black/40">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="text-[11px] font-sans font-medium uppercase tracking-widest2 text-gold-300">
                Horamavu, Bengaluru
              </span>
            </div>
          </div>

          {/* Center Cinematic Hero Typography */}
          <div className="max-w-3xl mx-auto text-center my-auto py-2">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide text-cream-50 leading-tight uppercase drop-shadow-2xl">
              TASTE
              <span className="font-display italic font-normal text-gold-300 ml-2.5 sm:ml-4">
                TRADITION.
              </span>
            </h1>

            <p className="mt-3 sm:mt-4 max-w-lg mx-auto text-xs sm:text-sm md:text-base text-cream-100 font-sans font-light leading-relaxed tracking-wide drop-shadow-md">
              Authentic Tamil flavours, served with the warmth of home.
            </p>

            {/* Refined Action Buttons */}
            <div className="mt-6 sm:mt-7 flex flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleExploreClick}
                className="px-6 py-3 text-xs font-sans font-semibold tracking-widest uppercase text-charcoal bg-gold hover:bg-gold-300 rounded-sm shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Step Inside</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              <Link
                href="#menu"
                className="px-6 py-3 text-xs font-sans font-medium tracking-widest uppercase text-cream-100 hover:text-gold border border-gold/30 hover:border-gold/60 bg-charcoal/70 backdrop-blur-md rounded-sm transition-all duration-300 text-center"
              >
                View Menu
              </Link>
            </div>
          </div>

          {/* Bottom Elegant Scroll Prompt */}
          <div
            onClick={handleExploreClick}
            className="flex flex-col items-center gap-2 text-gold-400/90 hover:text-gold transition-colors cursor-pointer pb-2"
          >
            <span className="text-[10px] uppercase tracking-widest3 font-sans font-medium">
              Scroll to step inside
            </span>
            <div className="w-5 h-8 rounded-full border border-gold/40 flex justify-center p-1">
              <span className="w-1 h-2 rounded-full bg-gold animate-bounce" />
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            2. Scrollytelling Chapter Overlays (Positioned cleanly at bottom)
            (No CSS transition-opacity so JS opacity changes without delay)
        ────────────────────────────────────────────────────────────────── */}
        <div
          ref={chaptersOverlayRef}
          className="absolute inset-x-0 bottom-12 sm:bottom-16 z-20 pointer-events-none flex flex-col items-center justify-end px-6 text-center opacity-0 will-change-[transform,opacity]"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <div className="max-w-lg mx-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-charcoal/85 backdrop-blur-md border border-gold/30 shadow-2xl">
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="h-px w-5 bg-gold/50" />
              <span className="text-[10px] font-sans font-semibold uppercase tracking-widest3 text-gold-400">
                HOTEL WALKTHROUGH
              </span>
              <span className="h-px w-5 bg-gold/50" />
            </div>

            <h2
              ref={chapterTitleRef}
              className="font-serif text-lg sm:text-2xl font-bold tracking-wide text-cream-50 uppercase"
            >
              GRAND ENTRANCE
            </h2>

            <p
              ref={chapterSubtitleRef}
              className="mt-0.5 text-xs sm:text-sm font-sans font-light text-cream-200/90 tracking-wide"
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
            className="text-[10px] font-sans uppercase tracking-widest2 px-3.5 py-1.5 rounded-full border border-gold/25 bg-charcoal/80 backdrop-blur-md text-gold-300/90 shadow-lg"
          >
            0% JOURNEY
          </div>
        </div>

        {/* Debug Overlay */}
        {DEBUG_MODE && (
          <div className="absolute top-24 right-4 z-30 bg-black/80 text-gold-400 p-3 text-xs font-mono rounded border border-gold/40 pointer-events-none">
            <div>FRAME: {Math.round(currentFrameRef.current)} / {FRAME_COUNT}</div>
            <div>READY: {isReady ? "YES" : "NO"}</div>
            <div>PERF: {isLowPerfRef.current ? "ECO" : "HIGH"}</div>
          </div>
        )}
      </div>
    </section>
  );
}

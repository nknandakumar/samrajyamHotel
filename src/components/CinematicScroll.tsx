"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SITE_CONFIG } from "@/config/site";
import { Volume2, VolumeX, Eye } from "lucide-react";

interface CinematicScrollProps {
  onVideoReady?: () => void;
}

export default function CinematicScroll({ onVideoReady }: CinematicScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Overlay text elements
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const text5Ref = useRef<HTMLDivElement>(null);

  // Check reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pause video to ensure scroll controls playback
    video.pause();
    setIsVideoLoaded(true);
    if (onVideoReady) onVideoReady();
  }, [onVideoReady]);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // In case metadata is already loaded before effect runs
    if (video.readyState >= 1 && video.duration && !isVideoLoaded) {
      handleLoadedMetadata();
    }
  }, [handleLoadedMetadata, isVideoLoaded]);

  // Main GSAP ScrollTrigger timeline controller
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container || !isVideoLoaded || reducedMotion) return;

    const ctx = gsap.context(() => {
      const scrollDistance = SITE_CONFIG.video.scrollDistance || 5000;
      const duration = video.duration || 10;

      // Video scrubbing proxy object
      const videoProxy = { currentTime: 0 };

      // Helper to update video frame smoothly
      let isSeeking = false;
      const updateVideoTime = (targetTime: number) => {
        if (!video || isNaN(targetTime)) return;
        if (!isSeeking) {
          isSeeking = true;
          video.currentTime = targetTime;
        }
      };

      const handleSeeked = () => {
        isSeeking = false;
      };
      video.addEventListener("seeked", handleSeeked);

      // Main pinning timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1.0, // 1s smoothing scrub for silky smooth deceleration
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(progress);
            const targetTime = progress * duration;
            updateVideoTime(targetTime);
          },
        },
      });

      // Animate video proxy from 0 to video.duration
      mainTl.to(videoProxy, {
        currentTime: duration,
        ease: "none",
        duration: 1,
      });

      // Editorial Text Timings:
      // Text 1: 15% - 30% -> "COME IN."
      if (text1Ref.current) {
        gsap.set(text1Ref.current, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${scrollDistance}`,
          onUpdate: (self) => {
            const p = self.progress;
            if (p >= 0.12 && p <= 0.32) {
              const localP = (p - 0.12) / 0.2;
              const opacity = localP < 0.3 ? localP / 0.3 : localP > 0.7 ? (1 - localP) / 0.3 : 1;
              gsap.to(text1Ref.current, { opacity, y: (1 - opacity) * 20, duration: 0.2, overwrite: "auto" });
            } else {
              gsap.to(text1Ref.current, { opacity: 0, y: 30, duration: 0.2, overwrite: "auto" });
            }
          },
        });
      }

      // Text 2: 30% - 50% -> "THE TABLE IS READY."
      if (text2Ref.current) {
        gsap.set(text2Ref.current, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${scrollDistance}`,
          onUpdate: (self) => {
            const p = self.progress;
            if (p >= 0.33 && p <= 0.52) {
              const localP = (p - 0.33) / 0.19;
              const opacity = localP < 0.3 ? localP / 0.3 : localP > 0.7 ? (1 - localP) / 0.3 : 1;
              gsap.to(text2Ref.current, { opacity, y: (1 - opacity) * 20, duration: 0.2, overwrite: "auto" });
            } else {
              gsap.to(text2Ref.current, { opacity: 0, y: 30, duration: 0.2, overwrite: "auto" });
            }
          },
        });
      }

      // Text 3: 50% - 70% -> "NOTHING RUSHED."
      if (text3Ref.current) {
        gsap.set(text3Ref.current, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${scrollDistance}`,
          onUpdate: (self) => {
            const p = self.progress;
            if (p >= 0.53 && p <= 0.72) {
              const localP = (p - 0.53) / 0.19;
              const opacity = localP < 0.3 ? localP / 0.3 : localP > 0.7 ? (1 - localP) / 0.3 : 1;
              gsap.to(text3Ref.current, { opacity, y: (1 - opacity) * 20, duration: 0.2, overwrite: "auto" });
            } else {
              gsap.to(text3Ref.current, { opacity: 0, y: 30, duration: 0.2, overwrite: "auto" });
            }
          },
        });
      }

      // Text 4: 70% - 88% -> "MADE WITH MEMORY."
      if (text4Ref.current) {
        gsap.set(text4Ref.current, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${scrollDistance}`,
          onUpdate: (self) => {
            const p = self.progress;
            if (p >= 0.73 && p <= 0.88) {
              const localP = (p - 0.73) / 0.15;
              const opacity = localP < 0.3 ? localP / 0.3 : localP > 0.7 ? (1 - localP) / 0.3 : 1;
              gsap.to(text4Ref.current, { opacity, y: (1 - opacity) * 20, duration: 0.2, overwrite: "auto" });
            } else {
              gsap.to(text4Ref.current, { opacity: 0, y: 30, duration: 0.2, overwrite: "auto" });
            }
          },
        });
      }

      // Text 5: 89% - 100% -> "TASTE TRADITION."
      if (text5Ref.current) {
        gsap.set(text5Ref.current, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${scrollDistance}`,
          onUpdate: (self) => {
            const p = self.progress;
            if (p >= 0.89) {
              const localP = (p - 0.89) / 0.11;
              const opacity = Math.min(localP / 0.5, 1);
              gsap.to(text5Ref.current, { opacity, y: (1 - opacity) * 20, duration: 0.2, overwrite: "auto" });
            } else {
              gsap.to(text5Ref.current, { opacity: 0, y: 30, duration: 0.2, overwrite: "auto" });
            }
          },
        });
      }

      return () => {
        video.removeEventListener("seeked", handleSeeked);
      };
    }, container);

    return () => {
      ctx.revert();
    };
  }, [isVideoLoaded, reducedMotion]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      id="cinematic-experience"
      ref={containerRef}
      className="relative w-full h-screen bg-charcoal-900 overflow-hidden select-none z-10"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={SITE_CONFIG.video.primaryUrl}
        preload="auto"
        muted={isMuted}
        playsInline
        webkit-playsinline="true"
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleLoadedMetadata}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.88] contrast-[1.05]"
      />

      {/* Subtle cinematic gradient vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,18,16,0.1)_0%,rgba(20,18,16,0.65)_85%,rgba(14,13,12,0.95)_100%)] pointer-events-none z-10" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-charcoal via-charcoal/40 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent pointer-events-none z-10" />

      {/* Narrative Editorial Overlays */}
      <div
        ref={textContainerRef}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-6 text-center"
      >
        {/* Step 1: COME IN. */}
        <div
          ref={text1Ref}
          className="absolute max-w-2xl mx-auto flex flex-col items-center opacity-0"
        >
          <span className="text-xs uppercase tracking-widest3 text-gold-400 font-sans font-semibold mb-3">
            The Entrance
          </span>
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-cream-50 text-shadow-cinematic uppercase">
            COME IN.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream-200/90 font-sans tracking-wide">
            Step through the threshold of authentic heritage.
          </p>
        </div>

        {/* Step 2: THE TABLE IS READY. */}
        <div
          ref={text2Ref}
          className="absolute max-w-2xl mx-auto flex flex-col items-center opacity-0"
        >
          <span className="text-xs uppercase tracking-widest3 text-gold-400 font-sans font-semibold mb-3">
            The Atmosphere
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-cream-50 text-shadow-cinematic uppercase leading-tight">
            THE TABLE
            <span className="block font-display italic font-normal text-gold-300">
              IS READY.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream-200/90 font-sans tracking-wide">
            Carved pillars, warm lighting, and the space for family.
          </p>
        </div>

        {/* Step 3: NOTHING RUSHED. */}
        <div
          ref={text3Ref}
          className="absolute max-w-2xl mx-auto flex flex-col items-center opacity-0"
        >
          <span className="text-xs uppercase tracking-widest3 text-gold-400 font-sans font-semibold mb-3">
            The Philosophy
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-cream-50 text-shadow-cinematic uppercase">
            NOTHING RUSHED.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream-200/90 font-sans tracking-wide">
            Slow-cooked recipes simmered the way our ancestors intended.
          </p>
        </div>

        {/* Step 4: MADE WITH MEMORY. */}
        <div
          ref={text4Ref}
          className="absolute max-w-2xl mx-auto flex flex-col items-center opacity-0"
        >
          <span className="text-xs uppercase tracking-widest3 text-gold-400 font-sans font-semibold mb-3">
            The Kitchen
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-cream-50 text-shadow-cinematic uppercase">
            MADE WITH
            <span className="block font-display italic font-normal text-gold-300">
              MEMORY.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream-200/90 font-sans tracking-wide">
            Spices ground by hand, memories served on a fresh banana leaf.
          </p>
        </div>

        {/* Step 5: TASTE TRADITION. */}
        <div
          ref={text5Ref}
          className="absolute max-w-2xl mx-auto flex flex-col items-center opacity-0"
        >
          <span className="text-xs uppercase tracking-widest3 text-gold-400 font-sans font-semibold mb-3">
            Samrajyam
          </span>
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-cream-50 text-shadow-cinematic uppercase">
            TASTE
            <span className="block font-display italic font-normal text-gold-300">
              TRADITION.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream-200/90 font-sans tracking-wide">
            Your table awaits.
          </p>
        </div>
      </div>

      {/* Cinematic HUD Controls & Progress Indicator */}
      <div className="absolute bottom-8 left-8 right-8 z-30 flex items-center justify-between pointer-events-auto">
        {/* Left: Progress percentage & marker */}
        <div className="flex items-center gap-3 bg-charcoal/70 backdrop-blur-md px-4 py-2 rounded-full border border-gold/20">
          <Eye className="h-3.5 w-3.5 text-gold" />
          <span className="text-[11px] font-sans font-medium uppercase tracking-widest text-cream-200">
            Journey: {Math.round(scrollProgress * 100)}%
          </span>
          <div className="w-16 h-1 bg-wood-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-75"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* Right: Sound toggle / Motion notice */}
        <div className="flex items-center gap-2">
          {reducedMotion && (
            <span className="text-[10px] uppercase tracking-wider text-cream-400 bg-charcoal/60 px-3 py-1.5 rounded-full border border-wood-600">
              Reduced Motion Active
            </span>
          )}
          <button
            type="button"
            onClick={toggleMute}
            className="flex items-center gap-1.5 bg-charcoal/70 hover:bg-wood-800/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-gold/20 text-cream-200 hover:text-gold transition-colors text-xs"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-cream-400" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-gold" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Audio On</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Fallback loading indicator if video takes time to buffer */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-charcoal text-cream gap-4">
          <div className="h-8 w-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
          <p className="text-xs uppercase tracking-widest2 font-sans text-gold-300">
            Buffering cinematic journey...
          </p>
        </div>
      )}
    </section>
  );
}

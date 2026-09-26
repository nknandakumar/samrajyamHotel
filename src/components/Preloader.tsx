"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
  videoLoaded?: boolean;
}

export default function Preloader({ onComplete, videoLoaded = false }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Smooth progress simulation with minimum duration for premium feel
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate if video is already loaded or reaching end
        const increment = videoLoaded ? Math.random() * 20 + 10 : Math.random() * 8 + 4;
        const next = Math.min(prev + increment, 100);
        return Math.floor(next);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [videoLoaded]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
        if (onComplete) onComplete();
        const removeTimer = setTimeout(() => {
          setShouldRender(false);
        }, 900);
        return () => clearTimeout(removeTimer);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-charcoal text-cream transition-all duration-700 ease-in-out ${
        isLoaded ? "opacity-0 pointer-events-none scale-[1.02]" : "opacity-100"
      }`}
    >
      {/* Subtle traditional carved corner ornaments */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-gold/30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-gold/30" />
      <div className="absolute bottom-8 left-8 w-12 h-8 border-b border-l border-gold/30" />
      <div className="absolute bottom-8 right-8 w-12 h-8 border-b border-r border-gold/30" />

      <div className="text-center px-6 max-w-md">
        {/* Decorative Kolam / Traditional Motif Dot */}
        <div className="mx-auto mb-6 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
          <span className="h-px w-8 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <span className="h-2 w-2 rotate-45 border border-gold bg-gold/30" />
          <span className="h-px w-8 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
        </div>

        {/* Brand Name */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-widest2 font-semibold text-cream-50 uppercase">
          SAMRAJYAM
        </h1>
        <p className="mt-2 text-xs sm:text-sm uppercase tracking-widest3 text-gold-400 font-sans font-medium">
          The Family Restaurant
        </p>

        {/* Status Line */}
        <p className="mt-8 font-serif italic text-cream-300 text-sm tracking-wide">
          Preparing your table...
        </p>

        {/* Subtle Progress Bar */}
        <div className="mt-6 w-48 mx-auto h-[2px] bg-wood-600/50 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="mt-3 block text-[11px] font-sans tracking-widest text-cream-500/80">
          {progress}%
        </span>
      </div>
    </div>
  );
}

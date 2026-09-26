"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";

export default function Hero() {
  const scrollToCinematic = () => {
    const cinematicElement = document.getElementById("cinematic-experience");
    if (cinematicElement) {
      cinematicElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pt-28 pb-12 bg-charcoal overflow-hidden select-none"
    >
      {/* Background Architectural Ambient Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(115,34,43,0.35),rgba(20,18,16,0.95)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-wood-grain opacity-40 pointer-events-none" />

      {/* Decorative Traditional Pillar Border Accents */}
      <div className="absolute left-6 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden md:block pointer-events-none" />
      <div className="absolute right-6 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden md:block pointer-events-none" />

     

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-cream-400/70 pt-4">
        <span className="text-[10px] uppercase tracking-widest2 font-sans text-gold-400/80">
          Scroll to enter the restaurant
        </span>
        <button
          type="button"
          onClick={scrollToCinematic}
          className="p-2 text-gold-400 hover:text-gold transition-colors"
          aria-label="Scroll to restaurant experience"
        >
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}

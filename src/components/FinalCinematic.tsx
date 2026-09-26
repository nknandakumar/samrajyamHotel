"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, UtensilsCrossed } from "lucide-react";

export default function FinalCinematic() {
  return (
    <section className="relative w-full py-28 sm:py-40 px-4 sm:px-6 lg:px-8 bg-charcoal text-cream overflow-hidden text-center select-none">
      {/* Background Architectural Glow & Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(115,34,43,0.4)_0%,rgba(20,18,16,0.98)_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-wood-grain opacity-35 pointer-events-none" />

      {/* Decorative Traditional Border Box */}
      <div className="max-w-4xl mx-auto relative z-10 border border-gold/25 bg-wood-900/40 backdrop-blur-sm p-8 sm:p-16 rounded-2xl shadow-2xl">
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/40" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/40" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/40" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/40" />

        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-wood-700/50 px-4 py-1.5 mb-8">
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          <span className="text-[11px] font-sans uppercase tracking-widest2 text-gold-300 font-medium">
            At Samrajyam
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-50 uppercase leading-tight">
          Food brings us together.
          <span className="block font-display italic font-normal text-gold-300 text-2xl sm:text-4xl md:text-5xl mt-2">
            Samrajyam makes it memorable.
          </span>
        </h2>

        <p className="mt-6 font-serif italic text-lg sm:text-xl text-cream-200 tracking-wide max-w-lg mx-auto">
          See you at the table.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="#reservation"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-sans font-semibold tracking-widest uppercase text-charcoal bg-gradient-to-r from-gold-400 via-gold to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <UtensilsCrossed className="h-4 w-4" />
            <span>Reserve a Table</span>
          </Link>

          <Link
            href="#menu"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-sans font-medium tracking-widest uppercase text-cream-100 hover:text-gold border border-gold/30 hover:border-gold/60 bg-wood-800/60 rounded-sm transition-all duration-300 text-center"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

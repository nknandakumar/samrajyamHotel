"use client";

import React from "react";
import Link from "next/link";
import { Utensils, Sparkles, ArrowRight, PartyPopper } from "lucide-react";

export default function ExperienceSelector() {
  return (
    <section
      id="experience-selector"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal text-cream overflow-hidden"
    >
      {/* Background traditional wood ambiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(115,34,43,0.25)_0%,rgba(20,18,16,0.98)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-wood-grain opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-widest3 text-gold-400 font-sans font-semibold mb-3 inline-block">
            Your Journey Continues
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream-50 uppercase">
            WHAT ARE YOU HERE FOR?
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-gold/40" />
            <span className="h-1.5 w-1.5 rotate-45 border border-gold bg-gold/30" />
            <span className="h-px w-10 bg-gold/40" />
          </div>
        </div>

        {/* Two Grand Visual Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Card 1: Dine With Us */}
          <div className="group relative rounded-xl border border-gold/25 bg-gradient-to-b from-wood-800/80 to-wood-900/90 p-8 sm:p-12 overflow-hidden shadow-2xl transition-all duration-500 hover:border-gold/60 hover:shadow-gold/10 hover:-translate-y-1 flex flex-col justify-between min-h-[420px]">
            {/* Background Image Texture */}
            <div
              className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1000&auto=format&fit=crop')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-wood-900/80 to-transparent" />

            <div className="relative z-10">
              <div className="h-12 w-12 rounded-lg border border-gold/30 bg-wood-700/60 flex items-center justify-center text-gold mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Utensils className="h-6 w-6" />
              </div>
              <span className="text-[11px] uppercase tracking-widest2 text-gold-400 font-sans font-medium">
                In-Restaurant Dining
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50 mt-2 mb-4">
                Dine With Us
              </h3>
              <p className="text-cream-300/90 text-sm sm:text-base font-sans leading-relaxed">
                Explore the Samrajyam table. Slow-cooked biryanis, traditional banana leaf meals, and the signature flavours of Tamil Nadu served hot.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-gold/15">
              <Link
                href="#menu"
                className="inline-flex items-center gap-3 px-6 py-3.5 text-xs sm:text-sm font-sans font-semibold tracking-widest uppercase text-charcoal bg-gold hover:bg-gold-300 rounded-sm shadow-lg transition-all duration-300 group-hover:gap-4"
              >
                <span>Explore Restaurant Menu</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Bring Samrajyam To You */}
          <div className="group relative rounded-xl border border-gold/25 bg-gradient-to-b from-temple-800/80 to-temple-900/90 p-8 sm:p-12 overflow-hidden shadow-2xl transition-all duration-500 hover:border-gold/60 hover:shadow-gold/10 hover:-translate-y-1 flex flex-col justify-between min-h-[420px]">
            {/* Background Image Texture */}
            <div
              className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-temple-900/80 to-transparent" />

            <div className="relative z-10">
              <div className="h-12 w-12 rounded-lg border border-gold/30 bg-temple-700/60 flex items-center justify-center text-gold mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <PartyPopper className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-widest2 text-gold-400 font-sans font-medium">
                  Catering & Events
                </span>
                <span className="text-[9px] uppercase tracking-wider text-gold-300 bg-gold/20 px-2 py-0.5 rounded-full border border-gold/30">
                  Feasts & Banquets
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50 mt-2 mb-4">
                Bring Samrajyam To You
              </h3>
              <p className="text-cream-300/90 text-sm sm:text-base font-sans leading-relaxed">
                Build your perfect catering spread. Authentic Tamil wedding feasts, corporate gatherings, and family celebrations brought directly to your venue.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-gold/15">
              <Link
                href="#catering"
                className="inline-flex items-center gap-3 px-6 py-3.5 text-xs sm:text-sm font-sans font-semibold tracking-widest uppercase text-cream-50 bg-wood-700/90 hover:bg-wood-600 border border-gold/40 rounded-sm shadow-lg transition-all duration-300 group-hover:gap-4"
              >
                <span>Explore Catering</span>
                <ArrowRight className="h-4 w-4 text-gold" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

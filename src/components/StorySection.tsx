"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Heart, Users, Utensils } from "lucide-react";

export default function StorySection() {
  const pillars = [
    {
      icon: Utensils,
      statement: "Our food carries a story.",
      description: "Generations of spice alchemy and slow-cooking heritage.",
    },
    {
      icon: Users,
      statement: "Our table brings people together.",
      description: "A sanctuary where families gather, laugh, and share feasts.",
    },
    {
      icon: Heart,
      statement: "Our hospitality makes them stay.",
      description: "Warmth that welcomes every guest like a member of our own home.",
    },
  ];

  return (
    <section
      id="story"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-wood-900 text-cream overflow-hidden"
    >
      {/* Background Architectural Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(115,34,43,0.3)_0%,rgba(20,18,16,0.98)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-wood-grain opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Collage with Carved Wood Accent */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-gold/30 shadow-2xl bg-wood-800">
              <div className="relative h-[440px] sm:h-[520px] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1000&auto=format&fit=crop"
                  alt="Samrajyam Traditional Feast Spread"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-70" />
              </div>

              {/* Floating Architectural Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-charcoal/90 backdrop-blur-md border border-gold/30 shadow-xl">
                <p className="font-serif italic text-base sm:text-lg text-cream-100 leading-snug">
                  &ldquo;Hospitality that feels like home, flavours that remember tradition.&rdquo;
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest2 text-gold-400 font-sans font-semibold">
                  Samrajyam — Bengaluru
                </p>
              </div>
            </div>

            {/* Corner traditional ornament */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-gold/40 pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-gold/40 pointer-events-none" />
          </div>

          {/* Right Column: Editorial Story Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest3 font-semibold mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>OUR STORY</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
              More than a meal.
            </h2>

            <p className="mt-6 font-sans text-base sm:text-lg md:text-xl text-cream-200/90 leading-relaxed font-light">
              Samrajyam brings the flavours of Tamil Nadu to the table with food made the traditional way—and hospitality that feels like home.
            </p>

            {/* Three Visual Pillars */}
            <div className="mt-10 space-y-6">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-5 p-4 rounded-xl border border-gold/15 bg-wood-800/40 backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:bg-wood-800/60"
                  >
                    <div className="h-11 w-11 rounded-lg border border-gold/30 bg-wood-700/60 flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-semibold text-cream-50">
                        {pillar.statement}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-cream-300/80 font-sans">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

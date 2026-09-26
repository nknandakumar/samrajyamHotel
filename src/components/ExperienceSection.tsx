"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, HeartHandshake, UtensilsCrossed, Users } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      title: "Warm Hospitality",
      subtitle: "Welcomed like family from the moment you step in.",
      icon: HeartHandshake,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Authentic Food",
      subtitle: "Uncompromising traditional recipes with heirloom ingredients.",
      icon: UtensilsCrossed,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "A Table For Everyone",
      subtitle: "Spacious family seating made for shared laughs and memories.",
      icon: Users,
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section
      id="experience"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal text-cream overflow-hidden"
    >
      {/* Ambient Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(24,49,36,0.3)_0%,rgba(20,18,16,0.98)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-wood-grain opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest3 font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>THE SAMRAJYAM EXPERIENCE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            Come hungry.
            <span className="block font-display italic font-normal text-gold-300">
              Leave happy.
            </span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-gold/40" />
            <span className="h-1.5 w-1.5 rotate-45 border border-gold bg-gold/30" />
            <span className="h-px w-10 bg-gold/40" />
          </div>
        </div>

        {/* 3 Pillars Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => {
            const IconComponent = exp.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-gold/20 bg-gradient-to-b from-wood-800/70 to-charcoal/95 p-8 overflow-hidden shadow-2xl transition-all duration-500 hover:border-gold/60 hover:-translate-y-2 flex flex-col justify-between min-h-[400px]"
              >
                {/* Background Atmosphere Image */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 bg-wood-950">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-85 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />

                  <div className="absolute top-3 left-3 h-10 w-10 rounded-lg border border-gold/30 bg-charcoal/80 flex items-center justify-center text-gold backdrop-blur-sm">
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>

                {/* Details */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest2 text-gold-400 font-sans font-semibold">
                    Pillar 0{idx + 1}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50 mt-1 mb-2 group-hover:text-gold transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-300/85 font-sans leading-relaxed">
                    {exp.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between text-xs text-gold-400">
                  <span className="uppercase tracking-widest text-[10px]">The Samrajyam Way</span>
                  <span className="font-serif italic text-cream-400/60">Every Day</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

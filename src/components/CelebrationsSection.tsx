"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Cake, Briefcase, Users2, ArrowRight } from "lucide-react";

export default function CelebrationsSection() {
  const celebrations = [
    {
      id: "weddings",
      title: "Weddings",
      copy: "Begin your next chapter around our table.",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "birthdays",
      title: "Birthdays",
      copy: "Good food. Great people. One more reason to celebrate.",
      icon: Cake,
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "corporate",
      title: "Corporate",
      copy: "Bring your team together over something memorable.",
      icon: Briefcase,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "family",
      title: "Family Gatherings",
      copy: "More people. More stories. More food.",
      icon: Users2,
      image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section
      id="celebrations"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal-900 text-cream overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,24,31,0.25)_0%,rgba(20,18,16,0.98)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-wood-grain opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest3 font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>MAKE IT A MEMORY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            Some moments
            <span className="block font-display italic font-normal text-gold-300">
              deserve a table.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-cream-200/90 font-sans tracking-wide max-w-xl mx-auto">
            Celebrate the moments that bring everyone together.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-gold/40" />
            <span className="h-1.5 w-1.5 rotate-45 border border-gold bg-gold/30" />
            <span className="h-px w-10 bg-gold/40" />
          </div>
        </div>

        {/* 4 Celebrations Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {celebrations.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                className="group relative rounded-xl border border-gold/20 bg-gradient-to-b from-wood-800/60 to-charcoal/95 p-6 overflow-hidden shadow-xl transition-all duration-500 hover:border-gold/60 hover:-translate-y-1.5 flex flex-col justify-between min-h-[360px]"
              >
                {/* Background Image */}
                <div className="relative w-full h-44 rounded-lg overflow-hidden mb-5 bg-wood-950">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />

                  <div className="absolute bottom-3 left-3 h-8 w-8 rounded-md bg-charcoal/80 border border-gold/30 flex items-center justify-center text-gold backdrop-blur-sm">
                    <IconComp className="h-4 w-4" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-serif text-2xl font-bold text-cream-50 group-hover:text-gold transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-300/85 font-sans leading-relaxed">
                    {item.copy}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-gold/15 flex items-center justify-between text-xs text-gold-400">
                  <span className="tracking-widest uppercase text-[10px]">Tailored Dining</span>
                  <span className="text-cream-400/60 font-serif italic">Dedicated Care</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Plan Your Celebration CTA */}
        <div className="text-center">
          <Link
            href="#reservation"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm font-sans font-semibold tracking-widest uppercase text-charcoal bg-gradient-to-r from-gold-400 via-gold to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-sm shadow-xl transition-all duration-300 hover:gap-4"
          >
            <span>Plan Your Celebration</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

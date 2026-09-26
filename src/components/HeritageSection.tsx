"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Wheat, Leaf, Flame, History } from "lucide-react";

export default function HeritageSection() {
  const heritageItems = [
    {
      id: "seeraga-samba",
      title: "Seeraga Samba",
      tamil: "சீரக சம்பா",
      description: "Small-grain, highly aromatic heritage rice that absorbs every nuance of our slow-simmered spices.",
      icon: Wheat,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "curry-leaves",
      title: "Curry Leaves",
      tamil: "கறிவேப்பிலை",
      description: "Crisp, fragrant kariveppilai tempered in smoking hot sesame oil and ghee for that unmistakable aroma.",
      icon: Leaf,
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "freshly-ground-masala",
      title: "Freshly Ground Masala",
      tamil: "அரைத்த மசாலா",
      description: "Whole coriander seeds, kalpasi (stone flower), star anise, and Guntur chillies roasted fresh every single morning.",
      icon: Flame,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "time-honoured-recipes",
      title: "Time-Honoured Recipes",
      tamil: "பாரம்பரிய சமையல்",
      description: "Generational village cooking styles preserved without shortcuts, MSG, or artificial essences.",
      icon: History,
      image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section
      id="heritage"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal-900 text-cream overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(24,49,36,0.35)_0%,rgba(20,18,16,0.98)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-wood-grain opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest3 font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ROOTED IN TAMIL NADU</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            From our
            <span className="block font-display italic font-normal text-gold-300">
              land to your plate.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-cream-200/90 font-sans tracking-wide max-w-xl mx-auto">
            A cuisine shaped by spice, time, family and tradition.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-gold/40" />
            <span className="h-1.5 w-1.5 rotate-45 border border-gold bg-gold/30" />
            <span className="h-px w-10 bg-gold/40" />
          </div>
        </div>

        {/* 4 Feature Heritage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {heritageItems.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                className="group relative rounded-xl border border-gold/20 bg-gradient-to-b from-wood-800/60 to-charcoal/95 p-6 overflow-hidden shadow-xl transition-all duration-500 hover:border-gold/60 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Visual Image */}
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

                {/* Text Content */}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-xl font-bold text-cream-50 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gold-400/80 font-sans tracking-wide mt-0.5 mb-2">
                    {item.tamil}
                  </p>
                  <p className="text-xs sm:text-sm text-cream-300/85 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gold/15 flex items-center justify-between text-[11px] text-gold-400/80">
                  <span className="uppercase tracking-widest text-[10px]">Pure Essence</span>
                  <span className="font-serif italic text-cream-400/60">Tamil Heritage</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

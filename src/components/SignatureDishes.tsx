"use client";

import React from "react";
import Image from "next/image";
import { SIGNATURE_DISHES } from "@/config/menu";
import { Sparkles, Star } from "lucide-react";

export default function SignatureDishes() {
  return (
    <section
      id="signature-dishes"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal text-cream overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,24,31,0.2)_0%,rgba(20,18,16,0.95)_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-wood-grain opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest3 font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>FROM OUR KITCHEN</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            The ones
            <span className="block font-display italic font-normal text-gold-300">
              everyone comes back for.
            </span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-gold/40" />
            <span className="h-1.5 w-1.5 rotate-45 border border-gold bg-gold/30" />
            <span className="h-px w-12 bg-gold/40" />
          </div>
        </div>

        {/* Featured Signature Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SIGNATURE_DISHES.map((dish, index) => (
            <div
              key={dish.id}
              className="group relative rounded-xl border border-gold/20 bg-gradient-to-b from-wood-800/60 to-charcoal/90 p-6 overflow-hidden shadow-2xl transition-all duration-500 hover:border-gold/60 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Image Container with Framing */}
              <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6 bg-wood-950">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />

                {/* Badge */}
                {dish.badge && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-gold/90 text-charcoal px-3 py-1 rounded-sm text-[10px] uppercase font-sans font-bold tracking-wider shadow-md backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-charcoal" />
                    <span>{dish.badge}</span>
                  </div>
                )}
              </div>

              {/* Dish Content */}
              <div>
                <span className="text-[10px] uppercase tracking-widest2 text-gold-400/80 font-sans font-medium">
                  Signature 0{index + 1}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50 mt-1 mb-2 group-hover:text-gold transition-colors">
                  {dish.name}
                </h3>
                {dish.tamilName && (
                  <p className="text-xs font-sans text-gold-300/80 mb-3 tracking-wide">
                    {dish.tamilName}
                  </p>
                )}
                <p className="font-serif italic text-base sm:text-lg text-cream-200/90 leading-snug">
                  &ldquo;{dish.description}&rdquo;
                </p>
              </div>

              {/* Bottom Subtle Accent Line */}
              <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between text-xs text-gold-400 font-sans">
                <span className="tracking-widest uppercase text-[10px]">Authentic Recipe</span>
                <span className="text-cream-400/60 font-serif italic">Fresh Daily</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

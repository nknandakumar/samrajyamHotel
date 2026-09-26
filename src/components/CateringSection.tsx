"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, UtensilsCrossed, CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { CateringBuilderPreview } from "./3d/CateringBuilderPlaceholder";
import { SITE_CONFIG } from "@/config/site";

export default function CateringSection() {
  const [selectedSpread, setSelectedSpread] = useState<string>("banana-leaf");

  const spreads = [
    {
      id: "banana-leaf",
      name: "Traditional Banana Leaf Feast",
      description: "Authentic multi-course wedding & festival feast served traditionally.",
      items: ["Seeraga Samba Biryani", "Mutton Sukka & Chicken Gravy", "12+ Veg Accompaniments", "Elaneer Payasam"],
      guestCapacity: "50 to 2000+ guests",
    },
    {
      id: "live-counter",
      name: "Live Parotta & Kothu Station",
      description: "Tossing, beating and live griddle craft made fresh on-site for your guests.",
      items: ["Madurai Bun Parotta", "Egg & Chicken Kothu", "Hot Salna Varieties", "Kal Dosa & Chutneys"],
      guestCapacity: "30 to 1000+ guests",
    },
    {
      id: "biryani-handi",
      name: "Grand Biryani Uruli Spread",
      description: "Slow-dum cooked in sealed brass urulis, served steaming hot at your venue.",
      items: ["Dum Chicken Biryani", "Dum Mutton Biryani", "Ennai Kathirikai", "Onion & Cucumber Raitha"],
      guestCapacity: "25 to 5000+ guests",
    },
  ];

  return (
    <section
      id="catering"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal text-cream overflow-hidden"
    >
      {/* Background Decorative Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(115,34,43,0.3)_0%,rgba(20,18,16,0.98)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-wood-grain opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest3 font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>SAMRAJYAM CATERING</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            Your occasion.
            <span className="block font-display italic font-normal text-gold-300">
              Our table.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-cream-200/90 font-sans tracking-wide max-w-xl mx-auto">
            Build a feast around your people, your occasion and your taste.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-gold/40" />
            <span className="h-1.5 w-1.5 rotate-45 border border-gold bg-gold/30" />
            <span className="h-px w-10 bg-gold/40" />
          </div>
        </div>

        {/* Catering Spreads Selection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {spreads.map((spread) => (
            <div
              key={spread.id}
              onClick={() => setSelectedSpread(spread.id)}
              className={`cursor-pointer rounded-xl border p-8 transition-all duration-300 flex flex-col justify-between ${
                selectedSpread === spread.id
                  ? "border-gold bg-wood-800/80 shadow-2xl shadow-gold/10 scale-[1.02]"
                  : "border-gold/20 bg-charcoal/80 hover:border-gold/50 hover:bg-wood-900/60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg border border-gold/30 bg-wood-700/60 flex items-center justify-center text-gold">
                    <UtensilsCrossed className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-sans uppercase tracking-widest text-gold-400 font-semibold">
                    {spread.guestCapacity}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-cream-50 mb-2">
                  {spread.name}
                </h3>
                <p className="text-xs sm:text-sm text-cream-300/85 font-sans mb-6">
                  {spread.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-gold/15">
                  {spread.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-cream-200">
                      <CheckCircle2 className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <span
                  className={`block text-center py-2.5 rounded-sm text-xs font-sans font-semibold tracking-wider uppercase transition-colors ${
                    selectedSpread === spread.id
                      ? "bg-gold text-charcoal"
                      : "border border-gold/30 text-cream-300 hover:text-gold"
                  }`}
                >
                  {selectedSpread === spread.id ? "Selected Spread" : "Select Spread"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Version 2 3D Catering Builder Architectural Teaser */}
        <div className="mb-12">
          <CateringBuilderPreview />
        </div>

        {/* CTA Callout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="#reservation"
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-sans font-semibold tracking-widest uppercase text-charcoal bg-gradient-to-r from-gold-400 via-gold to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-sm shadow-xl transition-all duration-300 text-center flex items-center justify-center gap-2"
          >
            <span>Build Your Feast</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={`tel:${SITE_CONFIG.phoneClean}`}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-sans font-medium tracking-widest uppercase text-cream-100 hover:text-gold border border-gold/30 hover:border-gold/60 bg-wood-800/40 rounded-sm transition-all duration-300 text-center flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4 text-gold" />
            <span>Speak with Catering Team</span>
          </a>
        </div>
      </div>
    </section>
  );
}

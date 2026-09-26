"use client";

import React from "react";
import { Sparkles, Box } from "lucide-react";

/**
 * Version 2 3D Catering & Food Customizer Architecture
 * In V1: Provides visual teaser and data binding for future Three.js Canvas.
 * In V2: Will mount <Canvas><FoodScene spread={spread} /></Canvas>
 */
export function CateringBuilderPreview() {
  return (
    <div className="relative w-full rounded-2xl border border-gold/30 bg-wood-700/60 p-8 backdrop-blur-md text-cream overflow-hidden">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-2xl" />
      <div className="flex items-center gap-3 text-gold text-xs uppercase tracking-widest2 font-semibold">
        <Sparkles className="h-4 w-4" />
        <span>Version 2 Interactive Feature</span>
      </div>
      <h3 className="mt-3 font-serif text-2xl text-cream-100">
        3D Interactive Banquet & Feast Builder
      </h3>
      <p className="mt-2 text-cream-300/80 text-sm max-w-xl font-sans">
        Soon you will be able to customize your catering spread in full 3D—drag and arrange traditional brass urulis, banana leaf settings, and curated menu items directly onto a virtual banquet table.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-gold/20 bg-charcoal/40 px-4 py-2 text-xs text-gold-300">
          <Box className="h-3.5 w-3.5" />
          <span>Three.js Ready Architecture</span>
        </div>
      </div>
    </div>
  );
}

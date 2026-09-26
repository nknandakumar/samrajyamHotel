"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MENU_CATEGORIES, ALL_MENU_ITEMS, MenuItem } from "@/config/menu";
import { Sparkles, Utensils, Flame } from "lucide-react";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredItems =
    activeCategory === "all"
      ? ALL_MENU_ITEMS
      : ALL_MENU_ITEMS.filter((item) => item.category === activeCategory);

  const currentCategoryMeta = MENU_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <section
      id="menu"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal-900 text-cream overflow-hidden"
    >
      {/* Background Subtle Wood & Texture */}
      <div className="absolute inset-0 bg-wood-grain opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-maroon-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-temple-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest3 text-gold-400 font-sans font-semibold mb-3 inline-block">
            Taste & Tradition
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-50 uppercase">
            THE MENU
          </h2>
          <p className="mt-3 font-serif italic text-xl sm:text-2xl text-gold-300">
            Take your time.
          </p>
          <p className="mt-3 text-sm sm:text-base text-cream-300/80 font-sans tracking-wide">
            There&apos;s something waiting for every appetite.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 sm:gap-3 scrollbar-none no-scrollbar">
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 border ${
                  isActive
                    ? "bg-gold text-charcoal border-gold shadow-lg shadow-gold/20 scale-105"
                    : "bg-wood-800/40 text-cream-300 border-gold/15 hover:border-gold/40 hover:text-cream-50"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        {currentCategoryMeta && activeCategory !== "all" && (
          <div className="mb-10 text-center animate-fade-in">
            <p className="font-serif italic text-lg text-gold-400 tracking-wide">
              — {currentCategoryMeta.description} —
            </p>
          </div>
        )}

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((dish) => (
            <div
              key={dish.id}
              className="group relative rounded-xl border border-gold/15 bg-gradient-to-b from-wood-800/50 to-charcoal/90 p-5 overflow-hidden transition-all duration-300 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Dish Image */}
              <div className="relative w-full h-52 rounded-lg overflow-hidden mb-4 bg-wood-900">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />

                {/* Badges & Indicators */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {/* Veg / Non-Veg Indicator */}
                  <div
                    className={`h-5 w-5 rounded-sm border flex items-center justify-center bg-charcoal/80 backdrop-blur-sm ${
                      dish.isVeg ? "border-green-500" : "border-red-500"
                    }`}
                    title={dish.isVeg ? "Vegetarian" : "Non-Vegetarian"}
                  >
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        dish.isVeg ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                  </div>

                  {dish.badge && (
                    <span className="text-[10px] uppercase font-sans font-semibold tracking-wider bg-gold text-charcoal px-2.5 py-0.5 rounded-sm shadow-sm">
                      {dish.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Dish Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-xl font-bold text-cream-50 group-hover:text-gold transition-colors">
                      {dish.name}
                    </h3>
                  </div>

                  {dish.tamilName && (
                    <p className="text-xs text-gold-400/80 font-sans tracking-wide mt-0.5">
                      {dish.tamilName}
                    </p>
                  )}

                  <p className="mt-2 text-xs sm:text-sm text-cream-300/85 font-sans leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

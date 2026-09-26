"use client";

import React from "react";
import { Sparkles, Star, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      id: "1",
      quote: "The biryani tasted like home.",
      author: "Karthik R.",
      occasion: "Family Sunday Lunch",
      location: "Horamavu, Bengaluru",
      rating: 5,
    },
    {
      id: "2",
      quote: "Beautiful food. Warm service. We'll be back.",
      author: "Priya & Venkatesh",
      occasion: "Anniversary Celebration",
      location: "Kalyan Nagar, Bengaluru",
      rating: 5,
    },
    {
      id: "3",
      quote: "A proper family dining experience.",
      author: "Sundaresan M.",
      occasion: "Grandparents' Gathering",
      location: "Ramamurthy Nagar, Bengaluru",
      rating: 5,
    },
    {
      id: "4",
      quote: "The Seeraga Samba Biryani and Mutton Meals were cooked to absolute perfection. Flaky parottas and rich salna.",
      author: "Anand Kumar",
      occasion: "Weekend Feast",
      location: "Hennur, Bengaluru",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal-900 text-cream overflow-hidden"
    >
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(115,34,43,0.2)_0%,rgba(20,18,16,0.98)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-wood-grain opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest3 font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>FROM OUR GUESTS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            Loved at
            <span className="block font-display italic font-normal text-gold-300">
              the table.
            </span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-gold/40" />
            <span className="h-1.5 w-1.5 rotate-45 border border-gold bg-gold/30" />
            <span className="h-px w-10 bg-gold/40" />
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="relative rounded-xl border border-gold/20 bg-gradient-to-b from-wood-800/60 to-charcoal/95 p-7 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-gold/50 hover:-translate-y-1"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-gold/30" />
                </div>

                <p className="font-serif italic text-base sm:text-lg text-cream-100 leading-relaxed mb-6">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Author & Occasion */}
              <div className="pt-4 border-t border-gold/15">
                <p className="font-sans font-semibold text-sm text-cream-50">
                  {rev.author}
                </p>
                <div className="flex items-center justify-between text-xs text-gold-400/80 mt-1 font-sans">
                  <span>{rev.occasion}</span>
                  <span className="text-[10px] text-cream-400/60">{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

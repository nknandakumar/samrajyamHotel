"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Maximize2, X } from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  category: "all" | "interior" | "food" | "dining" | "details" | "celebrations";
  title: string;
  subtitle: string;
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const galleryImages: GalleryImage[] = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
      category: "interior",
      title: "Main Dining Hall",
      subtitle: "Warm natural wood and traditional South Indian architecture",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop",
      category: "food",
      title: "Seeraga Samba Biryani",
      subtitle: "Steaming dum handi with authentic aroma",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1200&auto=format&fit=crop",
      category: "dining",
      title: "Banana Leaf Feast",
      subtitle: "Full traditional service with complete accompaniments",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop",
      category: "food",
      title: "Flaky Parotta & Salna",
      subtitle: "Layered to golden crisp perfection",
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
      category: "celebrations",
      title: "Family Celebrations",
      subtitle: "Private dining and celebratory banquet table",
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop",
      category: "details",
      title: "Heritage Spices & Decoction",
      subtitle: "Whole roasted spices ground in stone mills",
    },
  ];

  const filteredImages =
    activeFilter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  const categories = [
    { id: "all", label: "All" },
    { id: "interior", label: "Ambiance" },
    { id: "food", label: "Food" },
    { id: "dining", label: "Dining" },
    { id: "celebrations", label: "Celebrations" },
    { id: "details", label: "Details" },
  ];

  return (
    <section
      id="gallery"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal text-cream overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute inset-0 bg-wood-grain opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest3 font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>A GLIMPSE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            See what&apos;s
            <span className="block font-display italic font-normal text-gold-300">
              waiting for you.
            </span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-gold/40" />
            <span className="h-1.5 w-1.5 rotate-45 border border-gold bg-gold/30" />
            <span className="h-px w-10 bg-gold/40" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 scrollbar-none no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all duration-200 border ${
                activeFilter === cat.id
                  ? "bg-gold text-charcoal border-gold font-semibold shadow-md"
                  : "bg-wood-800/40 text-cream-300 border-gold/15 hover:border-gold/40 hover:text-cream-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="group relative h-80 rounded-xl overflow-hidden border border-gold/20 cursor-pointer shadow-lg transition-all duration-500 hover:border-gold/60 hover:shadow-2xl hover:-translate-y-1"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover overlay details */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="self-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-8 w-8 rounded-full bg-charcoal/80 border border-gold/40 flex items-center justify-center text-gold">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-cream-50">
                    {img.title}
                  </h3>
                  <p className="text-xs text-cream-300/80 font-sans mt-1">
                    {img.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 p-3 text-cream-200 hover:text-gold rounded-full bg-wood-800/80 border border-gold/30 transition-colors"
            aria-label="Close image modal"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh] rounded-xl overflow-hidden border border-gold/40 shadow-2xl">
              <Image
                src={activeImage.src}
                alt={activeImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-serif text-2xl font-bold text-cream-50">
                {activeImage.title}
              </h3>
              <p className="text-sm text-gold-300/90 font-sans mt-1">
                {activeImage.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

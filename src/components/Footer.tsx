"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, Clock, MapPin, ChevronUp } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { NAV_ITEMS } from "@/config/navigation";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-charcoal border-t border-gold/20 text-cream pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Subtle Grain */}
      <div className="absolute inset-0 bg-wood-grain opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-gold/15">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="#hero" className="inline-block">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest2 text-cream-50 uppercase">
                {SITE_CONFIG.name}
              </span>
              <span className="block text-[10px] uppercase tracking-widest3 text-gold-400 font-sans font-medium">
                {SITE_CONFIG.tagline}
              </span>
            </Link>

            <p className="text-sm text-cream-300 font-sans leading-relaxed max-w-sm">
              Authentic Tamil flavours.
              <br />
              Warm hospitality.
            </p>

            <p className="font-serif italic text-base text-gold-300 pt-2">
              &ldquo;Come for the food. Stay for the feeling.&rdquo;
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs uppercase font-sans font-semibold tracking-widest text-gold-400">
              Navigation
            </h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs text-cream-300 hover:text-gold transition-colors font-sans"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs uppercase font-sans font-semibold tracking-widest text-gold-400">
              Contact & Hours
            </h3>
            <div className="space-y-2.5 text-xs text-cream-300 font-sans">
              <p className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold flex-shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address.full}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                <a href={`tel:${SITE_CONFIG.phoneClean}`} className="hover:text-gold transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-gold transition-colors break-all">
                  {SITE_CONFIG.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                <span>{SITE_CONFIG.hours}</span>
              </p>
            </div>
          </div>

          {/* Back to top */}
          <div className="lg:col-span-1 flex lg:justify-end items-start">
            <button
              type="button"
              onClick={scrollToTop}
              className="h-10 w-10 rounded-full border border-gold/30 bg-wood-800/80 hover:bg-gold hover:text-charcoal text-gold flex items-center justify-center transition-[background-color,color] duration-300 shadow-md"
              aria-label="Back to top"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400/60 font-sans gap-4">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name} — {SITE_CONFIG.tagline}. All rights reserved.</p>
          <p className="text-[11px] tracking-wide text-gold-500/80">
            Authentic Tamil Family Dining in Horamavu, Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}

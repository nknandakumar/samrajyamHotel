"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { NAV_ITEMS, NAV_CTA } from "@/config/navigation";

export default function Navbar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (hero) {
        // Transparent until the sticky cinematic scroll track completes
        const heroScrollEnd =
          hero.offsetTop + hero.offsetHeight - window.innerHeight - 60;
        setIsPastHero(window.scrollY >= heroScrollEnd);
      } else {
        setIsPastHero(window.scrollY > window.innerHeight * 4);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isPastHero
            ? "bg-charcoal/90 backdrop-blur-md border-b border-gold/20 py-3.5 shadow-2xl"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* 1. Brand Logo (Emblem Only - No Text) */}
            <Link
              href="#hero"
              className="flex items-center focus:outline-none shrink-0 group"
              aria-label="Samrajyam Home"
            >
              <Image
                src="/logo.webp"
                alt="Samrajyam Logo"
                width={56}
                height={66}
                className="h-11 sm:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
                priority
              />
            </Link>

            {/* 2. Desktop Navigation Links (Strictly Single Line) */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 whitespace-nowrap">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs uppercase tracking-widest font-sans font-medium text-cream-200 hover:text-gold-300 transition-colors duration-200 relative group py-1 whitespace-nowrap shrink-0 drop-shadow-md"
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* 3. Action CTA (Clean & Premium Button - Phone Number Removed) */}
            <div className="hidden lg:flex items-center shrink-0">
              <Link
                href={NAV_CTA.href}
                className="relative inline-flex items-center justify-center px-6 py-2.5 text-xs font-sans font-semibold tracking-widest uppercase text-charcoal bg-gradient-to-r from-gold-400 via-gold to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-sm shadow-lg hover:shadow-gold/25 border border-gold-300/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span className="whitespace-nowrap">{NAV_CTA.label}</span>
              </Link>
            </div>

            {/* 4. Mobile Controls */}
            <div className="flex items-center gap-3 lg:hidden shrink-0">
              <Link
                href={NAV_CTA.href}
                className="inline-flex items-center px-3.5 py-1.5 text-[11px] font-sans font-semibold tracking-wider uppercase text-charcoal bg-gold rounded-sm whitespace-nowrap"
              >
                Reserve
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-cream-100 hover:text-gold focus:outline-none rounded-md"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-30 bg-charcoal/95 backdrop-blur-lg lg:hidden transition-all duration-300 ease-in-out flex flex-col justify-between pt-24 pb-8 px-6 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-serif tracking-widest text-cream hover:text-gold transition-colors py-1 border-b border-wood-600/30 flex items-center justify-between whitespace-nowrap"
            >
              <span className="whitespace-nowrap">{item.label}</span>
              <span className="text-gold-500/60 text-xs">→</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gold/20">
          <Link
            href={NAV_CTA.href}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-semibold tracking-widest uppercase text-charcoal bg-gold rounded-sm whitespace-nowrap"
          >
            <UtensilsCrossed className="h-4 w-4" />
            <span className="whitespace-nowrap">{NAV_CTA.label}</span>
          </Link>
        </div>
      </div>
    </>
  );
}

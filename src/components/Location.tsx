"use client";

import React from "react";
import { Sparkles, MapPin, Phone, Mail, Clock, Navigation, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function Location() {
  return (
    <section
      id="location"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal-900 text-cream overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(88,24,31,0.3)_0%,rgba(20,18,16,0.98)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-wood-grain opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest3 font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>FIND YOUR WAY HERE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            Your table
            <span className="block font-display italic font-normal text-gold-300">
              is waiting.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream-200/90 font-sans tracking-wide max-w-xl mx-auto">
            Experience the warmth of traditional Tamil hospitality in Horamavu, Bengaluru.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-gold/40" />
            <span className="h-1.5 w-1.5 rotate-45 border border-gold bg-gold/30" />
            <span className="h-px w-10 bg-gold/40" />
          </div>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="rounded-2xl border border-gold/25 bg-gradient-to-b from-wood-800/80 to-charcoal/95 p-8 shadow-2xl space-y-6">
              <div>
                <span className="text-[10px] uppercase font-sans font-semibold tracking-widest2 text-gold-400">
                  Restaurant Address
                </span>
                <h3 className="font-serif text-2xl font-bold text-cream-50 mt-1">
                  {SITE_CONFIG.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-gold-300 font-sans mt-0.5">
                  {SITE_CONFIG.tagline}
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 pt-2">
                <div className="h-9 w-9 rounded-lg border border-gold/30 bg-wood-700/60 flex items-center justify-center text-gold flex-shrink-0 mt-1">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="text-sm text-cream-200 font-sans leading-relaxed">
                  <p>{SITE_CONFIG.address.line1},</p>
                  <p>{SITE_CONFIG.address.line2},</p>
                  <p>{SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-lg border border-gold/30 bg-wood-700/60 flex items-center justify-center text-gold flex-shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <a
                    href={`tel:${SITE_CONFIG.phoneClean}`}
                    className="text-sm font-sans font-medium text-cream-100 hover:text-gold transition-colors"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-lg border border-gold/30 bg-wood-700/60 flex items-center justify-center text-gold flex-shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-xs sm:text-sm font-sans text-cream-300 hover:text-gold transition-colors break-all"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-lg border border-gold/30 bg-wood-700/60 flex items-center justify-center text-gold flex-shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="text-sm text-cream-200 font-sans">
                  <p className="text-xs text-gold-400/90 uppercase tracking-wider">Open Daily</p>
                  <p className="font-semibold text-cream-100">{SITE_CONFIG.hours}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gold/15 flex flex-col sm:flex-row gap-3">
                <a
                  href={SITE_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-sans font-semibold tracking-widest uppercase text-charcoal bg-gold hover:bg-gold-300 rounded-sm shadow-md transition-colors"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phoneClean}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-sans font-semibold tracking-widest uppercase text-cream-100 hover:text-gold border border-gold/30 hover:border-gold rounded-sm transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-gold" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Visual Embed Frame */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-gold/30 shadow-2xl bg-wood-950 relative min-h-[420px] flex flex-col">
            <iframe
              title="Samrajyam Restaurant Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.054366635293!2d77.663186!3d13.032221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1757e7eb1569%3A0x673909df0b691062!2sHoramavu%20Agara%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px", filter: "invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="flex-1 w-full h-full"
            />
            <div className="absolute bottom-4 right-4 z-10">
              <a
                href={SITE_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-charcoal/90 text-gold hover:text-gold-300 text-xs px-3.5 py-2 rounded-md border border-gold/30 backdrop-blur-md shadow-lg"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

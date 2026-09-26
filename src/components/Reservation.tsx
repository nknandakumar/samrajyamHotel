"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, Clock, Users, Phone, User, CheckCircle2, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "19:30",
    guests: "4",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.date) {
      setErrorMessage("Please select a reservation date.");
      return;
    }

    setIsSubmitting(true);

    // Simulate reservation processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <section
      id="reservation"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-wood-900 text-cream overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(115,34,43,0.35)_0%,rgba(20,18,16,0.98)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-wood-grain opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-widest3 font-semibold mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>RESERVE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            We&apos;ll save
            <span className="block font-display italic font-normal text-gold-300">
              you a seat.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-cream-200/90 font-sans tracking-wide">
            For larger groups and celebrations, enquire directly with our team.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-gold/40" />
            <span className="h-1.5 w-1.5 rotate-45 border border-gold bg-gold/30" />
            <span className="h-px w-10 bg-gold/40" />
          </div>
        </div>

        {/* Reservation Card Form */}
        <div className="relative rounded-2xl border border-gold/30 bg-charcoal/90 backdrop-blur-md p-8 sm:p-12 shadow-2xl overflow-hidden">
          {/* Decorative Corners */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/40 pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/40 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/40 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/40 pointer-events-none" />

          {isSuccess ? (
            <div className="py-12 text-center animate-fade-in">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-gold/20 text-gold">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-cream-50">
                Table Reserved For {formData.name}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-cream-200/90 font-sans max-w-md mx-auto">
                We have received your reservation request for{" "}
                <strong className="text-gold font-semibold">{formData.guests} guests</strong> on{" "}
                <strong className="text-gold font-semibold">{formData.date}</strong> at{" "}
                <strong className="text-gold font-semibold">{formData.time}</strong>.
              </p>
              <p className="mt-2 text-xs text-cream-400 font-sans">
                Our team will confirm with you at {formData.phone} shortly.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({ name: "", phone: "", date: "", time: "19:30", guests: "4", notes: "" });
                  }}
                  className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-charcoal bg-gold hover:bg-gold-300 rounded-sm transition-colors"
                >
                  Book Another Table
                </button>
                <a
                  href={`tel:${SITE_CONFIG.phoneClean}`}
                  className="px-6 py-2.5 text-xs uppercase tracking-wider text-cream-200 border border-gold/30 hover:border-gold rounded-sm transition-colors"
                >
                  Call Restaurant Directly
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-sm bg-red-900/40 border border-red-500/50 text-red-200 text-xs font-sans">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="res-name"
                    className="block text-xs uppercase font-sans font-semibold tracking-wider text-gold-300 mb-2"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gold/60">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      id="res-name"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sundaram"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-wood-800/60 border border-gold/20 rounded-sm text-cream text-sm placeholder-cream-400/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-[border-color,box-shadow]"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="res-phone"
                    className="block text-xs uppercase font-sans font-semibold tracking-wider text-gold-300 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gold/60">
                      <Phone className="h-4 w-4" />
                    </div>
                    <input
                      id="res-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-wood-800/60 border border-gold/20 rounded-sm text-cream text-sm placeholder-cream-400/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-[border-color,box-shadow]"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label
                    htmlFor="res-date"
                    className="block text-xs uppercase font-sans font-semibold tracking-wider text-gold-300 mb-2"
                  >
                    Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gold/60">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <input
                      id="res-date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-wood-800/60 border border-gold/20 rounded-sm text-cream text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-[border-color,box-shadow] [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label
                    htmlFor="res-time"
                    className="block text-xs uppercase font-sans font-semibold tracking-wider text-gold-300 mb-2"
                  >
                    Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gold/60">
                      <Clock className="h-4 w-4" />
                    </div>
                    <select
                      id="res-time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-wood-800/90 border border-gold/20 rounded-sm text-cream text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-[border-color,box-shadow] [color-scheme:dark]"
                    >
                      <option value="11:30">11:30 AM (Lunch)</option>
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="13:30">01:30 PM (Lunch)</option>
                      <option value="14:30">02:30 PM (Lunch)</option>
                      <option value="19:00">07:00 PM (Dinner)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner)</option>
                      <option value="21:30">09:30 PM (Dinner)</option>
                      <option value="22:30">10:30 PM (Late Dinner)</option>
                    </select>
                  </div>
                </div>

                {/* Guests */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="res-guests"
                    className="block text-xs uppercase font-sans font-semibold tracking-wider text-gold-300 mb-2"
                  >
                    Number of Guests
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gold/60">
                      <Users className="h-4 w-4" />
                    </div>
                    <select
                      id="res-guests"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-wood-800/90 border border-gold/20 rounded-sm text-cream text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-[border-color,box-shadow] [color-scheme:dark]"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="4">4 People (Family Table)</option>
                      <option value="6">6 People</option>
                      <option value="8">8 People (Large Family)</option>
                      <option value="10">10 People</option>
                      <option value="15">15+ Group Feast</option>
                      <option value="25+">25+ Grand Celebration</option>
                    </select>
                  </div>
                </div>

                {/* Special Notes / Requests */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="res-notes"
                    className="block text-xs uppercase font-sans font-semibold tracking-wider text-gold-300 mb-2"
                  >
                    Special Requests / Celebration Note (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3.5 pointer-events-none text-gold/60">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <textarea
                      id="res-notes"
                      rows={3}
                      placeholder="e.g. Birthday anniversary, high chair needed, dietary preference..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-wood-800/60 border border-gold/20 rounded-sm text-cream text-sm placeholder-cream-400/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-[border-color,box-shadow] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 text-xs sm:text-sm font-sans font-semibold tracking-widest uppercase text-charcoal bg-gradient-to-r from-gold-400 via-gold to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-sm shadow-xl transition-[opacity,transform] duration-300 disabled:opacity-60"
                >
                  {isSubmitting ? "Reserving..." : "Reserve a Table"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

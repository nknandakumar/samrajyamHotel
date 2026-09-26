"use client";

import React, { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SamrajyamScroll from "@/components/SamrajyamScroll";
import ExperienceSelector from "@/components/ExperienceSelector";
import MenuSection from "@/components/MenuSection";
import SignatureDishes from "@/components/SignatureDishes";
import StorySection from "@/components/StorySection";
import HeritageSection from "@/components/HeritageSection";
import CateringSection from "@/components/CateringSection";
import CelebrationsSection from "@/components/CelebrationsSection";
import ExperienceSection from "@/components/ExperienceSection";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Reservation from "@/components/Reservation";
import Location from "@/components/Location";
import FinalCinematic from "@/components/FinalCinematic";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [sequenceReady, setSequenceReady] = useState(false);

  return (
    <main
      className="relative min-h-screen bg-charcoal text-cream selection:bg-maroon-500 selection:text-cream-50"
      style={{ overflowX: "clip" }}
    >
      {/* 1. Preloader */}
      <Preloader videoLoaded={sequenceReady} />

      {/* 2. Navigation */}
      <Navbar />

      {/* 3. Cinematic Hero & Scrollytelling Journey */}
      <SamrajyamScroll onReady={() => setSequenceReady(true)} />

      {/* 5. Experience Selector ("Dine With Us" vs "Bring Samrajyam To You") */}
      <ExperienceSelector />

      {/* 6. Restaurant Menu */}
      <MenuSection />

      {/* 7. Signature Dishes */}
      <SignatureDishes />

      {/* 8. Restaurant Story */}
      <StorySection />

      {/* 9. Tamil Nadu Heritage */}
      <HeritageSection />

      {/* 10. Catering Spread & V2 3D Architecture */}
      <CateringSection />

      {/* 11. Celebrations (Weddings, Birthdays, Corporate, Gatherings) */}
      <CelebrationsSection />

      {/* 12. The Samrajyam Experience */}
      <ExperienceSection />

      {/* 13. Guest Testimonials */}
      <Testimonials />

      {/* 14. Visual Gallery with Lightbox */}
      <Gallery />

      {/* 15. Reservation */}
      <Reservation />

      {/* 16. Location & Contact Details */}
      <Location />

      {/* 17. Final Emotional Cinematic Callout */}
      <FinalCinematic />

      {/* 18. Footer */}
      <Footer />
    </main>
  );
}

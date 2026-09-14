"use client";
import React, { useState, useEffect, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader } from "@/components/loader";
import { GravityCanvas } from "@/components/gravity-canvas";
import { SmoothBackground } from "@/components/smooth-background";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ServicesSection } from "@/components/services-section";
import { ProductsSection } from "@/components/products-section";
import {
  TestimonialsSection,
  defaultTestimonials,
  englishTestimonials,
} from "@/components/ui/testimonial-v2";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { StudioControls, THEMES, ThemeOption } from "@/components/studio-controls";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const { lang } = useLanguage();
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(THEMES[0]!);
  const [ballColor, setBallColor] = useState(THEMES[0]!.ballColor);

  // High-performance Smooth Scroll (Lenis) integrated with GSAP ScrollTrigger & Ticker
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
    });

    // Expose lenis globally for smooth navigation scrolling
    (window as any).lenis = lenis;

    // Link Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateGsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateGsapTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateGsapTicker);
      lenis.destroy();
    };
  }, []);

  const handleReady = useCallback(() => {
    setReady(true);
  }, []);

  const handleDone = useCallback(() => {
    setStarted(true);
  }, []);

  const handleSelectTheme = (theme: ThemeOption) => {
    setSelectedTheme(theme);
    setBallColor(theme.ballColor);
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Pre-roll Loader */}
      <Loader ready={ready} onDone={handleDone} />

      {/* Modern GPU-Composited Continuous Smooth Background */}
      <SmoothBackground />

      {/* WebGL 3D Gravity Canvas */}
      <GravityCanvas
        started={started}
        ballColor={ballColor}
        onReady={handleReady}
      />

      {/* Glassmorphic Navbar */}
      <Navbar onOpenControls={() => setControlsOpen(true)} />

      {/* Page Sections */}
      <Hero started={started} />
      <ServicesSection />
      <ProductsSection />
      <TestimonialsSection
        title={content[lang].testimonials.title}
        subtitle={content[lang].testimonials.subtitle}
        badge={content[lang].testimonials.eyebrow}
        data={lang === "vi" ? defaultTestimonials : englishTestimonials}
      />
      <AboutSection />
      <Footer />

      {/* Studio Controls Drawer */}
      <StudioControls
        open={controlsOpen}
        onClose={() => setControlsOpen(false)}
        selectedThemeId={selectedTheme.id}
        onSelectTheme={handleSelectTheme}
      />
    </main>
  );
}

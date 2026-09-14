"use client";
import React, { useState, useEffect, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Loader } from "@/components/loader";
import { GravityCanvas } from "@/components/gravity-canvas";
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
  const [bgStage, setBgStage] = useState(0);
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

    // Only update bgStage when threshold is crossed to prevent full-page re-renders
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      const vh = window.innerHeight || 1;
      const progress = scroll / vh;
      const stage =
        progress >= 2.65
          ? 3
          : progress >= 1.65
          ? 2
          : progress >= 0.75
          ? 1
          : 0;
      setBgStage((prev) => (prev === stage ? prev : stage));
    });

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

  // Background gradient based on scroll stage:
  // Stage 0: Hero (Soft Tech Blue)
  // Stage 1: Services (Fresh Lime)
  // Stage 2: Products (Soft Blush Pink with 3D Heart Stack)
  // Stage 3: Testimonials & About onwards (Apple White - clean, crisp, minimalist)
  const bgGradients = [
    "radial-gradient(120% 120% at 50% 10%, #ffffff 0%, #f0f4ff 40%, #dbe4ff 100%)", // Hero
    "radial-gradient(120% 120% at 50% 50%, #ffffff 0%, #f4ffed 40%, #e0fbc5 100%)", // Drop / Lime
    "radial-gradient(120% 120% at 50% 90%, #ffffff 0%, #fff0f5 40%, #ffd6e6 100%)", // Shape / Pink
    "radial-gradient(140% 140% at 50% 15%, #ffffff 0%, #ffffff 65%, #f5f5f7 100%)", // Apple White
  ];

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Pre-roll Loader */}
      <Loader ready={ready} onDone={handleDone} />

      {/* Dynamic Background Gradient Layer */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none transition-all duration-[1400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          background: bgGradients[bgStage] || bgGradients[0],
        }}
      />

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

"use client";
import React, { useState, useEffect, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { Loader } from "@/components/loader";
import { GravityCanvas, GravityControl } from "@/components/gravity-canvas";
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

export default function Home() {
  const { lang } = useLanguage();
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [control, setControl] = useState<GravityControl>({ progress: 0, started: false });
  const [bgStage, setBgStage] = useState(0);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(THEMES[0]!);
  const [ballColor, setBallColor] = useState(THEMES[0]!.ballColor);

  // High-performance Smooth Scroll (Lenis) integrated with GSAP Ticker & Three.js
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
    });

    // Expose lenis globally for smooth navigation scrolling
    (window as any).lenis = lenis;

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      const vh = window.innerHeight || 1;
      const progress = scroll / vh;
      setControl((prev) =>
        Math.abs(prev.progress - progress) < 0.002 ? prev : { ...prev, progress }
      );

      const stage = progress > 1.55 ? 2 : progress > 0.7 ? 1 : 0;
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
    setControl((prev) => ({ ...prev, started: true }));
  }, []);

  const handleSelectTheme = (theme: ThemeOption) => {
    setSelectedTheme(theme);
    setBallColor(theme.ballColor);
  };

  // Background gradient based on scroll stage
  const bgGradients = [
    "radial-gradient(circle at center, #ffffff 0%, #ecefff 35%, #c2d1ff 100%)", // Hero
    "radial-gradient(circle at center, #ffffff 0%, #fbffe5 38%, #e8ff9c 100%)", // Drop / Lime
    "radial-gradient(circle at center, #ffffff 0%, #fff0f1 38%, #ffd1d5 100%)", // Shape / Pink
  ];

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Pre-roll Loader */}
      <Loader ready={ready} onDone={handleDone} />

      {/* Dynamic Background Gradient Layer */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{
          background: bgGradients[bgStage] || bgGradients[0],
        }}
      />

      {/* WebGL 3D Gravity Canvas */}
      <GravityCanvas
        control={control}
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

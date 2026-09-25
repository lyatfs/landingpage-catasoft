"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const [showLoader, setShowLoader] = useState(true);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(THEMES[0]!);
  const [ballColor, setBallColor] = useState(THEMES[0]!.ballColor);

  const controlsOpenRef = useRef(controlsOpen);
  useEffect(() => {
    controlsOpenRef.current = controlsOpen;
  }, [controlsOpen]);

  // Check sessionStorage: If user has already visited in this session, skip welcome completely on reload
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeen = sessionStorage.getItem("catasoft_welcome_shown") === "true";
      if (hasSeen) {
        setShowLoader(false);
        setStarted(true);
      }
    }
  }, []);

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

  // Automated Section Snapping on Mouse Wheel
  useEffect(() => {
    if (typeof window === "undefined") return;

    let isSnapping = false;
    let snapCooldownTimer: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      // Filter out micro vibrations
      if (Math.abs(e.deltaY) < 18) return;

      // Do not snap if drawer or modal is open
      if (controlsOpenRef.current || document.body.classList.contains("modal-open")) {
        return;
      }

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("#hero, #services, #products, #testimonials, #about, footer")
      );
      if (sections.length < 2) return;

      // Intercept continuous granular wheel stepping for cinematic section pushing
      e.preventDefault();

      if (isSnapping) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const dir = e.deltaY > 0 ? 1 : -1;

      // Find current active section
      let activeIdx = 0;
      for (let i = 0; i < sections.length; i++) {
        const top = sections[i].offsetTop;
        const height = sections[i].offsetHeight;
        if (scrollY >= top - 140 && scrollY < top + height - 140) {
          activeIdx = i;
          break;
        }
        if (scrollY >= top - 140) {
          activeIdx = i;
        }
      }

      const curSec = sections[activeIdx];
      const secTop = curSec.offsetTop;
      const secHeight = curSec.offsetHeight;
      const secBottom = secTop + secHeight;

      let targetY: number | null = null;

      if (dir === 1) {
        // Scrolling DOWN
        // If current section is significantly taller than screen (> 1.25x viewport)
        // and user has not reached bottom yet, step down within section
        if (secHeight > vh * 1.25 && scrollY < secBottom - vh - 60) {
          targetY = Math.min(secBottom - vh, scrollY + Math.round(vh * 0.82));
        } else if (activeIdx < sections.length - 1) {
          targetY = sections[activeIdx + 1].offsetTop;
        } else {
          targetY = document.documentElement.scrollHeight - vh;
        }
      } else {
        // Scrolling UP
        if (secHeight > vh * 1.25 && scrollY > secTop + 60) {
          targetY = Math.max(secTop, scrollY - Math.round(vh * 0.82));
        } else if (activeIdx > 0) {
          targetY = sections[activeIdx - 1].offsetTop;
        } else {
          targetY = 0;
        }
      }

      if (targetY !== null && Math.abs(targetY - scrollY) > 8) {
        isSnapping = true;
        const lenisInstance = (window as any).lenis;
        if (lenisInstance) {
          lenisInstance.scrollTo(targetY, {
            duration: 1.15,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            onComplete: () => {
              setTimeout(() => {
                isSnapping = false;
              }, 80);
            },
          });
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
          setTimeout(() => {
            isSnapping = false;
          }, 800);
        }

        if (snapCooldownTimer) clearTimeout(snapCooldownTimer);
        snapCooldownTimer = setTimeout(() => {
          isSnapping = false;
        }, 1050);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (snapCooldownTimer) clearTimeout(snapCooldownTimer);
    };
  }, []);

  const handleReady = useCallback(() => {
    setReady(true);
  }, []);

  const handleDone = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("catasoft_welcome_shown", "true");
    }
    setStarted(true);
    setShowLoader(false);
    // Refresh ScrollTrigger calculations after loader is removed
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  }, []);

  const handleSelectTheme = (theme: ThemeOption) => {
    setSelectedTheme(theme);
    setBallColor(theme.ballColor);
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Pre-roll Loader: shown on first visit, skipped on page reload */}
      {showLoader && <Loader ready={ready} onDone={handleDone} />}

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

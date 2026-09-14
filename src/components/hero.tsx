"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  started: boolean;
}

export function Hero({ started }: HeroProps) {
  const { lang } = useLanguage();
  const t = content[lang].hero;

  const containerRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animation
  useEffect(() => {
    if (!started) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        companyRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1 }
      )
        .fromTo(
          sloganRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.95 },
          "-=0.75"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.85 },
          "-=0.65"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.2)" },
          "-=0.55"
        );
    });

    return () => ctx.revert();
  }, [started]);

  // GSAP Hardware-Accelerated ScrollTrigger Parallax Transition
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        y: -130,
        opacity: 0,
        ease: "power1.out",
        force3D: true,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom 40%",
          scrub: 0.4,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(`#${id}`, { offset: -40, duration: 1.2 });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center items-center text-center px-6 md:px-12 pt-24 pb-12 z-50 pointer-events-none select-none"
    >
      {/* Strictly NO card container - Pure free-floating text on top foreground layer (z-50) */}
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto flex flex-col items-center pointer-events-auto relative z-50 will-change-transform"
      >
        {/* 1. Tên công ty to - Gradient & Aura */}
        <div
          ref={companyRef}
          style={{ opacity: 0 }}
          className="relative flex items-center justify-center gap-3 sm:gap-4 mb-2 group"
        >
          {/* Glowing Aura behind the logo & text */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 blur-[80px] -z-10 rounded-full group-hover:blur-[100px] transition-all duration-700" />
          
          <img
            src="/images/catasoft-logo.png"
            alt="CataSoft"
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          />
          <h1 className="font-montserrat font-black text-5xl sm:text-7xl md:text-8xl lg:text-[90px] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400 uppercase leading-none drop-shadow-sm">
            CATASOFT
          </h1>
        </div>

        {/* 2. Slogan - Subtle gradient highlight */}
        <h2
          ref={sloganRef}
          style={{ opacity: 0 }}
          className="mt-3 sm:mt-4 font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[38px] text-neutral-800 dark:text-neutral-100 tracking-tight leading-snug max-w-3xl drop-shadow-sm"
        >
          {t.headline}{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0e2ac5] to-blue-400 dark:from-blue-400 dark:to-cyan-300">
            {t.headlineHighlight}
          </span>
        </h2>

        {/* 3. Mô tả */}
        <p
          ref={descRef}
          style={{ opacity: 0 }}
          className="mt-5 max-w-2xl text-sm sm:text-base md:text-lg font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed drop-shadow-[0_1px_14px_rgba(255,255,255,0.95)]"
        >
          {t.description}
        </p>

        {/* 4. Nút hành động (CTA) */}
        <div
          ref={ctaRef}
          style={{ opacity: 0 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-5"
        >
          <button
            onClick={() => scrollTo("products")}
            className="relative group px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0e2ac5] to-[#2a4bed] text-white font-semibold text-sm md:text-base transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center gap-2 overflow-hidden"
          >
            {/* Button Glow / Hover layer */}
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <span className="relative z-10">{t.ctaPrimary}</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            
            {/* Outer Drop shadow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0e2ac5] to-[#2a4bed] opacity-30 group-hover:opacity-60 blur-md transition-opacity duration-300 -z-10 rounded-full" />
          </button>

          <button
            onClick={() => scrollTo("about")}
            className="group px-7 py-3.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-black/40 backdrop-blur-md text-neutral-900 dark:text-white font-semibold text-sm md:text-base transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:bg-white dark:hover:bg-neutral-900 shadow-sm hover:shadow-lg"
          >
            {t.ctaSecondary}
          </button>
        </div>
      </div>
    </section>
  );
}

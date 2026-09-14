"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

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

  // GSAP Smooth Scroll Parallax Transition
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY || 0;
      const vh = window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, scrollY / (vh * 0.8)));

      gsap.set(containerRef.current, {
        y: -progress * 120,
        opacity: Math.max(0, 1 - progress * 1.6),
        force3D: true,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        {/* 1. Tên công ty to - Solid color, no gradient */}
        <div
          ref={companyRef}
          style={{ opacity: 0 }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-2"
        >
          <img
            src="/images/catasoft-logo.png"
            alt="CataSoft"
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)]"
          />
          <h1 className="font-montserrat font-black text-5xl sm:text-7xl md:text-8xl lg:text-[90px] tracking-tight text-neutral-950 dark:text-white uppercase leading-none drop-shadow-[0_2px_18px_rgba(255,255,255,0.95)]">
            CATASOFT
          </h1>
        </div>

        {/* 2. Slogan - Solid color, no gradient */}
        <h2
          ref={sloganRef}
          style={{ opacity: 0 }}
          className="mt-3 sm:mt-4 font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[38px] text-neutral-900 dark:text-neutral-100 tracking-tight leading-snug max-w-3xl drop-shadow-[0_2px_14px_rgba(255,255,255,0.9)]"
        >
          {t.headline}{" "}
          <span className="text-[#0e2ac5] dark:text-blue-400">
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
          className="mt-7 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("products")}
            className="group px-8 py-3.5 rounded-full bg-[#0e2ac5] hover:bg-[#1a3ee8] text-white font-semibold text-sm md:text-base shadow-[0_10px_30px_rgba(14,42,197,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>{t.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => scrollTo("about")}
            className="px-7 py-3.5 rounded-full border-2 border-neutral-800/20 dark:border-white/20 bg-white/80 dark:bg-black/60 backdrop-blur-sm text-neutral-900 dark:text-white hover:bg-white dark:hover:bg-black font-semibold text-sm md:text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
          >
            {t.ctaSecondary}
          </button>
        </div>
      </div>
    </section>
  );
}

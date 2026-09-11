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
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animation
  useEffect(() => {
    if (!started) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 1.15 }
      )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 1.0 },
          "-=0.75"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "back.out(1.2)" },
          "-=0.6"
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
      className="relative min-h-[100svh] flex flex-col justify-center items-center text-center px-6 md:px-12 pt-20 pb-12 z-30 pointer-events-none select-none"
    >
      {/* Content strictly elevated to foreground layer without card box or blur */}
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto flex flex-col items-center pointer-events-auto relative z-30 will-change-transform"
      >
        {/* Main Headline with GSAP */}
        <h1
          ref={headlineRef}
          style={{ opacity: 0 }}
          className="font-montserrat font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[66px] leading-[1.1] tracking-tight text-neutral-950 dark:text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.85)]"
        >
          {t.headline}{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-accent via-brand-blue to-purple-600 block mt-1 drop-shadow-sm">
            {t.headlineHighlight}
          </span>
        </h1>

        {/* Subtitle / Description with GSAP */}
        <p
          ref={descRef}
          style={{ opacity: 0 }}
          className="mt-5 max-w-2xl text-sm sm:text-base md:text-lg font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed drop-shadow-[0_1px_10px_rgba(255,255,255,0.9)]"
        >
          {t.description}
        </p>

        {/* CTA Buttons with GSAP */}
        <div
          ref={ctaRef}
          style={{ opacity: 0 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("products")}
            className="group px-7 py-3.5 rounded-full bg-brand-blue hover:bg-brand-accent text-white font-semibold text-sm md:text-base shadow-[0_10px_30px_rgba(47,105,255,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>{t.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => scrollTo("about")}
            className="px-6 py-3.5 rounded-full border-2 border-neutral-800/20 dark:border-white/20 bg-white/60 dark:bg-black/50 backdrop-blur-sm text-neutral-900 dark:text-white hover:bg-white dark:hover:bg-black font-semibold text-sm md:text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
          >
            {t.ctaSecondary}
          </button>
        </div>
      </div>
    </section>
  );
}

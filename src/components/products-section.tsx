"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardStack } from "@/components/ui/card-stack";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductsSection() {
  const { lang } = useLanguage();
  const t = content[lang].products;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      if (showcaseRef.current) {
        gsap.fromTo(
          showcaseRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: showcaseRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative min-h-[100svh] py-24 md:py-32 px-6 md:px-12 flex flex-col justify-center items-center text-center z-20 pointer-events-auto"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-3xl mx-auto mb-10 md:mb-14 pointer-events-auto">
        <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-purple-500 to-pink-500 drop-shadow-sm pb-1">
          {t.title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          {t.description}
        </p>
      </div>

      {/* CardStack Showcase */}
      <div ref={showcaseRef} className="w-full max-w-6xl mx-auto relative pointer-events-auto">
        <CardStack
          items={t.items}
          initialIndex={0}
          autoAdvance={true}
          intervalMs={4500}
          pauseOnHover={true}
          showDots={true}
          cardWidth={660}
          cardHeight={390}
          overlap={0.44}
          spreadDeg={8}
          tiltXDeg={0}
          depthPx={95}
          perspectivePx={1200}
          activeLiftPx={28}
          activeScale={1.14}
          inactiveScale={0.76}
        />
      </div>
    </section>
  );
}

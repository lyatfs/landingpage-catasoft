"use client";
import React from "react";
import { CardStack } from "@/components/ui/card-stack";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

export function ProductsSection() {
  const { lang } = useLanguage();
  const t = content[lang].products;

  return (
    <section
      id="products"
      className="relative min-h-[100svh] py-24 md:py-32 px-6 md:px-12 flex flex-col justify-center items-center text-center z-20 pointer-events-auto"
    >
      {/* Section Header */}
      <div className="max-w-3xl mx-auto mb-10 md:mb-14 pointer-events-auto">
        <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-950 dark:text-white tracking-tight leading-tight">
          {t.title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          {t.description}
        </p>
      </div>

      {/* CardStack Showcase */}
      <div className="w-full max-w-6xl mx-auto relative pointer-events-auto">
        <CardStack
          items={t.items}
          initialIndex={0}
          autoAdvance={false}
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

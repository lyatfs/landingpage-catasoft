"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Bot,
  ShoppingBag,
  Workflow,
  Code2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { content, ServiceItem } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const blockThemeStyles = {
  blue: {
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25",
    dot: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]",
    cardBorder: "hover:border-blue-400/60 hover:ring-1 hover:ring-blue-400/30",
    glow: "hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)]",
    ambientGradient: "from-blue-500/20 via-blue-500/[0.05] to-transparent",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    textHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    check: "text-blue-600 dark:text-blue-400",
    metricValue: "from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300",
    cta: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] scale-100 active:scale-95 transition-all border border-blue-400/50 hover:border-transparent",
  },
  emerald: {
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
    dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
    cardBorder: "hover:border-emerald-400/60 hover:ring-1 hover:ring-emerald-400/30",
    glow: "hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)]",
    ambientGradient: "from-emerald-500/20 via-emerald-500/[0.05] to-transparent",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    textHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    check: "text-emerald-600 dark:text-emerald-400",
    metricValue: "from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300",
    cta: "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] scale-100 active:scale-95 transition-all border border-emerald-400/50 hover:border-transparent",
  },
  purple: {
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25",
    dot: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]",
    cardBorder: "hover:border-purple-400/60 hover:ring-1 hover:ring-purple-400/30",
    glow: "hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)]",
    ambientGradient: "from-purple-500/20 via-purple-500/[0.05] to-transparent",
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20",
    textHover: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
    check: "text-purple-600 dark:text-purple-400",
    metricValue: "from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300",
    cta: "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] scale-100 active:scale-95 transition-all border border-purple-400/50 hover:border-transparent",
  },
  amber: {
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
    dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
    cardBorder: "hover:border-amber-400/60 hover:ring-1 hover:ring-amber-400/30",
    glow: "hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.3)]",
    ambientGradient: "from-amber-500/20 via-amber-500/[0.05] to-transparent",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    textHover: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    check: "text-amber-600 dark:text-amber-400",
    metricValue: "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400",
    cta: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] scale-100 active:scale-95 transition-all border border-amber-400/50 hover:border-transparent",
  },
};

const pillarIcons = {
  "ai-products": Bot,
  ecommerce: ShoppingBag,
  "digital-transformation": Workflow,
  "custom-software": Code2,
};

const pillarLogos: Record<string, string> = {
  "ai-products": "/images/pillar-ai-real.jpg",
  ecommerce: "/images/pillar-ecom-real.jpg",
  "digital-transformation": "/images/pillar-rpa-real.jpg",
  "custom-software": "/images/pillar-code-real.jpg",
};

export function ServicesSection() {
  const { lang } = useLanguage();
  const t = content[lang].services;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance animation
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

      // Staggered bento cards entrance animation
      if (cardsGridRef.current) {
        const cards = cardsGridRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 84%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (id: string) => {
    if (id === "ai-products" || id === "ecommerce") {
      const el = document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      const el = document.getElementById("about");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-[100svh] py-28 md:py-36 px-6 md:px-12 flex flex-col justify-center items-center text-center z-10 pointer-events-none font-montserrat"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-3xl mx-auto mb-12 md:mb-16 pointer-events-auto">
        <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 drop-shadow-sm pb-1">
          {t.title}
        </h2>
        <p className="mt-4 text-base sm:text-lg font-montserrat font-normal text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 4 Strategic Orientation Balanced 2x2 Grid Cards */}
      <div
        ref={cardsGridRef}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch pointer-events-auto"
      >
        {t.items.map((item: ServiceItem) => {
          const theme = blockThemeStyles[item.accentColor] || blockThemeStyles.blue;
          const Icon = pillarIcons[item.id as keyof typeof pillarIcons] || Bot;
          const logoSrc = pillarLogos[item.id];

          return (
            <div
              key={item.id}
              className={`group relative rounded-2xl sm:rounded-[32px] p-5 sm:p-8 md:p-10 text-left transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-2 transform-gpu will-change-transform backdrop-blur-md bg-gradient-to-br from-white/85 to-white/60 dark:from-neutral-900/85 dark:to-neutral-950/75 border border-white/70 dark:border-white/15 ${theme.cardBorder} ${theme.glow} flex flex-col justify-between overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] ring-1 ring-black/5 dark:ring-white/5`}
            >
              {/* Top ambient radial gradient */}
              <div
                className={`absolute inset-x-0 top-0 h-44 bg-gradient-to-b ${theme.ambientGradient} pointer-events-none rounded-t-[32px]`}
              />

              {/* Main Card Content */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Upper Half: Header & Text */}
                <div>
                  {/* Card Header: 3D Tech Logo right beside Title Header */}
                  <div className="flex items-center gap-4 sm:gap-5 mb-4">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-neutral-200/60 dark:border-neutral-700/60 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl bg-neutral-950/10 dark:bg-neutral-950/40">
                      {logoSrc ? (
                        <img
                          src={logoSrc}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${theme.iconBg}`}>
                          <Icon className="w-7 h-7" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                          {item.number}
                        </span>
                        <span className="text-neutral-300 dark:text-neutral-700">·</span>
                        <span className="font-montserrat text-xs font-semibold text-neutral-500 dark:text-neutral-400 truncate">
                          {item.category}
                        </span>
                      </div>
                      <h3
                        className={`font-montserrat font-extrabold text-xl sm:text-2xl lg:text-[25px] text-neutral-950 dark:text-white tracking-tight leading-tight transition-colors ${theme.textHover}`}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Value Proposition Tagline */}
                  <p className="font-montserrat font-bold text-[15px] sm:text-base text-neutral-900 dark:text-neutral-100 leading-snug mb-2.5">
                    {item.tagline}
                  </p>

                  {/* Strategic Description */}
                  <p className="font-montserrat font-normal text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Structured Strategic Capabilities List */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-neutral-200/70 dark:border-neutral-800/80">
                    {item.features.map((feat, fIdx) => {
                      const hasColon = feat.includes(":");
                      const [featureTitle, featureDesc] = hasColon
                        ? feat.split(/:\s*(.+)/)
                        : [feat, ""];

                      return (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2.5 p-2 rounded-xl transition-colors hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50"
                        >
                          <div
                            className={`mt-0.5 w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${theme.iconBg}`}
                          >
                            <CheckCircle2 className={`w-3 h-3 ${theme.check}`} />
                          </div>
                          <div className="text-xs sm:text-[13px] leading-snug">
                            {hasColon ? (
                              <>
                                <span className="font-montserrat font-bold text-neutral-950 dark:text-neutral-100 mr-1.5">
                                  {featureTitle}:
                                </span>
                                <span className="font-montserrat font-normal text-neutral-600 dark:text-neutral-400">
                                  {featureDesc}
                                </span>
                              </>
                            ) : (
                              <span className="font-montserrat font-medium text-neutral-800 dark:text-neutral-200">
                                {feat}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Lower Half: Action CTA */}
                <div className="pt-2 mt-auto">
                  <button
                    onClick={() => handleCtaClick(item.id)}
                    className={`w-full py-3 px-5 rounded-xl font-montserrat font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 group/btn cursor-pointer ${theme.cta}`}
                  >
                    <span>{item.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


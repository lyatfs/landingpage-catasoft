"use client";
import React from "react";
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

const blockThemeStyles = {
  blue: {
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25",
    dot: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]",
    cardBorder: "border-neutral-200/80 dark:border-neutral-800/80 hover:border-blue-500/40",
    glow: "hover:shadow-[0_24px_64px_-12px_rgba(59,130,246,0.18)]",
    ambientGradient: "from-blue-500/12 via-blue-500/[0.02] to-transparent",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    textHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    check: "text-blue-600 dark:text-blue-400",
    metricValue: "from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300",
    cta: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40",
  },
  emerald: {
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
    dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
    cardBorder: "border-neutral-200/80 dark:border-neutral-800/80 hover:border-emerald-500/40",
    glow: "hover:shadow-[0_24px_64px_-12px_rgba(16,185,129,0.18)]",
    ambientGradient: "from-emerald-500/12 via-emerald-500/[0.02] to-transparent",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    textHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    check: "text-emerald-600 dark:text-emerald-400",
    metricValue: "from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300",
    cta: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40",
  },
  purple: {
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25",
    dot: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]",
    cardBorder: "border-neutral-200/80 dark:border-neutral-800/80 hover:border-purple-500/40",
    glow: "hover:shadow-[0_24px_64px_-12px_rgba(168,85,247,0.18)]",
    ambientGradient: "from-purple-500/12 via-purple-500/[0.02] to-transparent",
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20",
    textHover: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
    check: "text-purple-600 dark:text-purple-400",
    metricValue: "from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300",
    cta: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40",
  },
  amber: {
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
    dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
    cardBorder: "border-neutral-200/80 dark:border-neutral-800/80 hover:border-amber-500/40",
    glow: "hover:shadow-[0_24px_64px_-12px_rgba(245,158,11,0.18)]",
    ambientGradient: "from-amber-500/12 via-amber-500/[0.02] to-transparent",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    textHover: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    check: "text-amber-600 dark:text-amber-400",
    metricValue: "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400",
    cta: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40",
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
      id="services"
      className="relative min-h-[100svh] py-28 md:py-36 px-6 md:px-12 flex flex-col justify-center items-center text-center z-10 pointer-events-none font-montserrat"
    >
      {/* Section Header */}
      <div className="max-w-3xl mx-auto mb-12 md:mb-16 pointer-events-auto">
        <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-950 dark:text-white tracking-tight leading-tight">
          {t.title}
        </h2>
        <p className="mt-4 text-base sm:text-lg font-montserrat font-normal text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 4 Strategic Orientation Balanced 2x2 Grid Cards */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch pointer-events-auto">
        {t.items.map((item: ServiceItem) => {
          const theme = blockThemeStyles[item.accentColor] || blockThemeStyles.blue;
          const Icon = pillarIcons[item.id as keyof typeof pillarIcons] || Bot;
          const logoSrc = pillarLogos[item.id];

          return (
            <div
              key={item.id}
              className={`group relative rounded-[32px] p-8 sm:p-10 text-left transition-all duration-500 hover:-translate-y-2 backdrop-blur-2xl bg-white/80 dark:bg-neutral-900/80 border ${theme.cardBorder} ${theme.glow} flex flex-col justify-between overflow-hidden shadow-xl`}
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


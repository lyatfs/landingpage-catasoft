"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { content, TestimonialItem } from "@/lib/content";

interface ColumnProps {
  className?: string;
  items: TestimonialItem[];
  duration?: number;
}

const TestimonialsColumn: React.FC<ColumnProps> = ({
  className = "",
  items,
  duration = 18,
}) => {
  return (
    <div className={className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {[...new Array(2).fill(0)].map((_, loopIdx) => (
          <React.Fragment key={loopIdx}>
            {items.map((item, itemIdx) => (
              <motion.li
                key={`${loopIdx}-${itemIdx}`}
                aria-hidden={loopIdx === 1 ? "true" : "false"}
                tabIndex={loopIdx === 1 ? -1 : 0}
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  boxShadow:
                    "0 24px 48px -12px rgba(14, 42, 197, 0.16), 0 8px 24px -4px rgba(0, 0, 0, 0.06)",
                  transition: { type: "spring", stiffness: 380, damping: 20 },
                }}
                className="p-7 sm:p-8 rounded-3xl border border-white/70 dark:border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.04)] max-w-sm w-full bg-white/85 dark:bg-neutral-900/85 backdrop-blur-xl transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              >
                {/* Header Tag & Stars */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
                    <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    {item.tag}
                  </span>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote Body */}
                <blockquote className="m-0 p-0">
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal text-sm sm:text-[15px] m-0 transition-colors duration-300">
                    "{item.text}"
                  </p>

                  {/* Author Info */}
                  <footer className="flex items-center gap-3.5 mt-6 pt-5 border-t border-slate-100 dark:border-neutral-800">
                    <img
                      width={44}
                      height={44}
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-500/20 group-hover:ring-blue-500/50 transition-all duration-300 shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <cite className="font-bold not-italic tracking-tight text-sm text-neutral-900 dark:text-white truncate">
                        {item.name}
                      </cite>
                      <span className="text-xs text-blue-700 dark:text-blue-400 font-medium truncate">
                        {item.role}
                      </span>
                      <span className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                        {item.company}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
};

export function TestimonialsSection() {
  const { lang } = useLanguage();
  const t = content[lang].testimonials;

  const col1 = t.items.slice(0, 3);
  const col2 = t.items.slice(3, 6);
  const col3 = t.items.slice(6, 9);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-28 sm:py-36 px-4 sm:px-8 overflow-hidden scroll-mt-24 w-full flex flex-col items-center pointer-events-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl mx-auto flex flex-col items-center"
      >
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/40 mb-4 shadow-sm">
            <Quote className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="uppercase">{t.eyebrow}</span>
          </div>

          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight"
          >
            {t.title}
          </h2>

          <p className="text-base sm:text-lg font-medium text-slate-600 dark:text-slate-300 mt-4 leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* 3-Column Infinite Continuous Carousel */}
        <div
          className="flex justify-center gap-6 w-full max-w-6xl mt-4 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[720px] overflow-hidden select-none"
          role="region"
          aria-label="Scrolling Client Feedback"
        >
          {/* Column 1: Mobile + Tablet + Desktop */}
          <TestimonialsColumn items={col1} duration={16} />

          {/* Column 2: Tablet + Desktop */}
          <TestimonialsColumn items={col2} className="hidden md:block" duration={20} />

          {/* Column 3: Desktop only */}
          <TestimonialsColumn items={col3} className="hidden lg:block" duration={18} />
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-12 px-6 py-4 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-lg border border-white/50 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-400 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>99.4% ĐỘ HÀI LÒNG</span>
          </div>
          <div className="hidden sm:block text-slate-300 dark:text-neutral-700">•</div>
          <div className="flex items-center gap-2">
            <span>&gt; 50 DOANH NGHIỆP TRIỂN KHAI</span>
          </div>
          <div className="hidden sm:block text-slate-300 dark:text-neutral-700">•</div>
          <div className="flex items-center gap-2">
            <span>HỖ TRỢ KỸ THUẬT 24/7</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

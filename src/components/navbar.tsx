"use client";
import React, { useState, useEffect } from "react";
import { SlidersHorizontal, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

interface NavbarProps {
  onOpenControls: () => void;
}

export function Navbar({ onOpenControls }: NavbarProps) {
  const { lang, setLang } = useLanguage();
  const t = content[lang].nav;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(`#${id}`, { offset: -60, duration: 1.2 });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 pointer-events-none ${scrolled
          ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-white/40 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-3 md:py-4"
          : "bg-transparent py-4 md:py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Logo & Wordmark */}
        <div
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-3 pointer-events-auto cursor-pointer group"
        >
          <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-105">
            <img
              src="/images/catasoft-logo.png"
              alt="CataSoft Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-montserrat font-black text-xl md:text-2xl tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400 group-hover:opacity-85 transition-opacity leading-none">
            CATASOFT
          </span>
        </div>

        {/* Center: Nav links (md+) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 pointer-events-auto px-6 py-2.5 rounded-full bg-white/40 dark:bg-black/30 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-sm">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-brand-blue dark:hover:text-brand-blue transition-colors"
          >
            {t.home}
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-brand-blue dark:hover:text-brand-blue transition-colors"
          >
            {t.services}
          </button>
          <button
            onClick={() => scrollToSection("products")}
            className="text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-brand-blue dark:hover:text-brand-blue transition-colors"
          >
            {t.projects}
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-brand-blue dark:hover:text-brand-blue transition-colors"
          >
            {t.testimonials}
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-brand-blue dark:hover:text-brand-blue transition-colors"
          >
            {t.about}
          </button>
        </nav>

        {/* Right: Controls & Flags */}
        <div className="flex items-center gap-2.5 md:gap-3 pointer-events-auto">
          {/* Sliders Studio Controls Button */}
          <button
            onClick={onOpenControls}
            aria-label="Studio Controls"
            className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center border border-white/60 dark:border-white/20 bg-white/30 dark:bg-black/30 backdrop-blur-xl text-neutral-800 dark:text-white hover:bg-white/50 dark:hover:bg-white/10 transition shadow-sm hover:scale-105 active:scale-95"
            style={{
              boxShadow:
                "inset 0 1.5px 2px rgba(255,255,255,0.7), 0 4px 15px rgba(0,0,0,0.04)",
            }}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Bilingual Flag Switcher (Vietnam / UK) */}
          <div
            className="flex items-center gap-1.5 p-1 rounded-full border border-white/60 dark:border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-xl shadow-sm"
            style={{
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.6)",
            }}
            title="Chuyển đổi ngôn ngữ / Switch Language"
          >
            {/* Vietnam Flag Button */}
            <button
              onClick={() => setLang("vi")}
              className={`flex items-center justify-center p-1 rounded-full transition-all duration-200 ${lang === "vi"
                  ? "bg-white/90 dark:bg-white/20 shadow-sm ring-1.5 ring-brand-blue scale-105"
                  : "opacity-45 hover:opacity-85 grayscale hover:grayscale-0"
                }`}
              aria-label="Tiếng Việt"
            >
              {/* Vietnam Flag SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 20"
                className="w-5 h-3.5 rounded-sm object-cover shadow-xs"
              >
                <rect width="30" height="20" fill="#da251d" />
                <polygon
                  points="15,4 16.5,8.8 21.5,8.8 17.5,11.8 19,16.5 15,13.5 11,16.5 12.5,11.8 8.5,8.8 13.5,8.8"
                  fill="#ffff00"
                />
              </svg>
            </button>

            {/* UK Flag Button */}
            <button
              onClick={() => setLang("en")}
              className={`flex items-center justify-center p-1 rounded-full transition-all duration-200 ${lang === "en"
                  ? "bg-white/90 dark:bg-white/20 shadow-sm ring-1.5 ring-brand-blue scale-105"
                  : "opacity-45 hover:opacity-85 grayscale hover:grayscale-0"
                }`}
              aria-label="English"
            >
              {/* UK Flag SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 30"
                className="w-5 h-3.5 rounded-sm object-cover shadow-xs"
              >
                <clipPath id="s">
                  <path d="M0,0 v30 h60 v-30 z" />
                </clipPath>
                <clipPath id="t">
                  <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
                </clipPath>
                <g clipPath="url(#s)">
                  <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                  <path
                    d="M0,0 L60,30 M60,0 L0,30"
                    clipPath="url(#t)"
                    stroke="#C8102E"
                    strokeWidth="4"
                  />
                  <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
                  <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
                </g>
              </svg>
            </button>
          </div>

          {/* Contact Pill */}
          <button
            onClick={() => scrollToSection("about")}
            className="group flex items-center pl-4 md:pl-5 pr-1.5 py-1.5 rounded-full border border-white/60 dark:border-white/20 bg-white/30 dark:bg-black/30 backdrop-blur-xl text-neutral-900 dark:text-white hover:bg-white/50 dark:hover:bg-white/15 transition shadow-sm hover:scale-[1.02] active:scale-95"
            style={{
              boxShadow:
                "inset 0 1.5px 2px rgba(255,255,255,0.7), 0 8px 30px rgba(0,0,0,0.04)",
            }}
          >
            <span className="text-xs md:text-sm font-medium mr-2">
              {t.contactUs}
            </span>
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full hero-glow-orb flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105 shadow-md">
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

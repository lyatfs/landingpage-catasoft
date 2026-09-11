"use client";
import React from "react";
import { ArrowUpRight, Github, Twitter, Linkedin, Facebook, Globe } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

export function Footer() {
  const { lang } = useLanguage();
  const t = content[lang].footer;

  const scrollTo = (id: string) => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(`#${id}`, { offset: -40, duration: 1.2 });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const marqueeWords =
    lang === "vi"
      ? [
          "Trí tuệ Nhân tạo",
          "Thương mại Điện tử",
          "Chuyển đổi số Doanh nghiệp",
          "Tự động hóa Quy trình",
          "Phát triển Phần mềm",
        ]
      : [
          "Artificial Intelligence",
          "E-Commerce Solutions",
          "Digital Transformation",
          "Process Automation",
          "Enterprise Software",
        ];

  return (
    <footer className="relative bg-neutral-950 text-white overflow-hidden z-20 border-t border-white/10">
      {/* Background Soft Glows */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, #2f69ff 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, #7928ca 0%, transparent 70%)",
        }}
      />

      {/* Marquee Ticker - Safely contained inside black section without corner bleed */}
      <div className="border-b border-white/10 py-3 bg-neutral-950 overflow-hidden select-none">
        <div className="flex w-max animate-marquee">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, idx) => (
            <div key={idx} className="flex items-center gap-5 px-6 md:px-8">
              <span className="font-montserrat font-medium text-sm sm:text-base md:text-lg text-white/85 whitespace-nowrap">
                {word}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 shadow-[0_0_8px_#2F69FF]" />
            </div>
          ))}
        </div>
      </div>

      {/* Compact Main Footer Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Tagline */}
          <div className="md:col-span-6 flex flex-col items-start gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg overflow-hidden">
                <img
                  src="/images/catasoft-logo.png"
                  alt="CataSoft"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-display font-black text-xl tracking-widest text-white uppercase">
                catasoft
              </span>
            </div>

            <p className="text-xs md:text-sm text-neutral-400 max-w-md leading-relaxed font-normal">
              {t.tagline}. {t.description}
            </p>

            <div className="flex items-center gap-2.5 mt-1">
              <a
                href="https://catasoft.net"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white hover:border-brand-blue hover:bg-brand-blue/10 transition"
                aria-label="Website"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white hover:border-brand-blue hover:bg-brand-blue/10 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white hover:border-brand-blue hover:bg-brand-blue/10 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">
              {t.linksTitle}
            </h4>
            <ul className="space-y-1.5 text-xs md:text-sm">
              <li>
                <button
                  onClick={() => scrollTo("hero")}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  {lang === "vi" ? "Trang chủ" : "Home"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("services")}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  {lang === "vi" ? "Dịch vụ" : "Services"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("products")}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  {lang === "vi" ? "Sản phẩm & Dự án" : "Products & Projects"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("about")}
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  {lang === "vi" ? "Về chúng tôi" : "About Us"}
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">
              {t.contactTitle}
            </h4>
            <div className="space-y-1.5 text-xs text-neutral-300">
              <p className="text-neutral-400 leading-snug">
                NO6C-LK21 Khu Dịch vụ Vạn Phúc, Hà Đông, TP. Hà Nội
              </p>
              <p>
                <span className="text-neutral-400">Email: </span>
                <a
                  href="mailto:contact@catasoft.net"
                  className="text-blue-400 hover:underline"
                >
                  contact@catasoft.net
                </a>
              </p>
              <p>
                <span className="text-neutral-400">Hotline: </span>
                <a href="tel:0932322202" className="text-white hover:underline">
                  0932 322 202
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-neutral-400">
          <span>{t.rights}</span>
          <span className="text-neutral-500">CataSoft Digital Ecosystem</span>
        </div>
      </div>
    </footer>
  );
}

"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, RotateCcw, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { content } from "@/lib/content";

export interface ThemeOption {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  ballColor: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: "roseGold",
    name: "Royal Blue & Pearl (Default)",
    description: "Khối cầu cobalt sắc nét chuyển động trong gradient trắng bạc sang trọng.",
    primaryColor: "#2F69FF",
    ballColor: "#2F69FF",
  },
  {
    id: "voltLime",
    name: "Volt Lime & Slate",
    description: "Sắc xanh neon electric volt-lime hiện đại, đại diện cho năng lượng bứt phá.",
    primaryColor: "#E1FC03",
    ballColor: "#E1FC03",
  },
  {
    id: "pinkBlush",
    name: "Rose Blush & Crème",
    description: "Sắc hồng kẹo ngọt và dâu tây mềm mại trên nền ngọc trai tinh tế.",
    primaryColor: "#FFA6B3",
    ballColor: "#FFC5C2",
  },
  {
    id: "arcticBlue",
    name: "Arctic Sky & Crystal",
    description: "Sắc xanh băng giá trong trẻo với bề mặt phản chiếu thủy tinh lấp lánh.",
    primaryColor: "#96E5FF",
    ballColor: "#96E5FF",
  },
];

interface StudioControlsProps {
  open: boolean;
  onClose: () => void;
  selectedThemeId: string;
  onSelectTheme: (theme: ThemeOption) => void;
}

export function StudioControls({
  open,
  onClose,
  selectedThemeId,
  onSelectTheme,
}: StudioControlsProps) {
  const { lang } = useLanguage();
  const t = content[lang].studioControls;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-neutral-950/25 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl border-l border-neutral-200 dark:border-neutral-800 p-8 flex flex-col justify-between overflow-y-auto shadow-2xl select-none"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
                    <SlidersHorizontal className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-black text-sm tracking-[0.2em] uppercase text-neutral-900 dark:text-white">
                      {t.title}
                    </h2>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      WebGL Studio Controls
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Note */}
              <p className="mt-5 text-xs font-mono italic text-neutral-500 leading-relaxed">
                {t.note}
              </p>

              {/* Theme Options */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                  <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-700 dark:text-neutral-300">
                    {t.themeTitle}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {THEMES.map((th) => {
                    const isSelected = selectedThemeId === th.id;
                    return (
                      <button
                        key={th.id}
                        onClick={() => onSelectTheme(th)}
                        className={`text-left rounded-xl border p-4 transition-all duration-200 ${
                          isSelected
                            ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 scale-[1.02] shadow-lg border-neutral-900 dark:border-white"
                            : "bg-white/60 dark:bg-neutral-900/60 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-xs tracking-tight">
                            {th.name}
                          </span>
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
                            style={{ backgroundColor: th.primaryColor }}
                          />
                        </div>
                        <p
                          className={`text-[11px] leading-relaxed ${
                            isSelected
                              ? "text-neutral-300 dark:text-neutral-700"
                              : "text-neutral-500 dark:text-neutral-400"
                          }`}
                        >
                          {th.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-3">
              <div className="flex justify-between text-[9px] font-mono text-neutral-400">
                <span>RENDER ENGINE</span>
                <span>THREE.JS WEBGL R0.160</span>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-neutral-400">
                <span>DYNAMICS SOLVER</span>
                <span>3D COLLISION VERLET</span>
              </div>

              <button
                onClick={() => {
                  const def = THEMES[0];
                  if (def) onSelectTheme(def);
                }}
                className="mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.reset}</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

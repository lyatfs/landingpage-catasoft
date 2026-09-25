"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";

interface LoaderProps {
  ready: boolean;
  onDone: () => void;
}

const WELCOME_CHARS = ["W", "E", "L", "C", "O", "M", "E"];

export function Loader({ ready, onDone }: LoaderProps) {
  const { lang } = useLanguage();
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [animFinished, setAnimFinished] = useState(false);
  const onDoneTriggered = useRef(false);

  // Instantly skip if user has already seen welcome in this session
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("catasoft_welcome_shown") === "true") {
        setRemoved(true);
        onDone();
      }
    }
  }, [onDone]);

  // Safety fallback timer so loader never gets stuck if event doesn't fire
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimFinished(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Trigger smooth transition once text animation finishes and 3D scene is ready
  useEffect(() => {
    if (ready && animFinished && !onDoneTriggered.current) {
      onDoneTriggered.current = true;
      const t1 = setTimeout(() => {
        setLeaving(true);
        const t2 = setTimeout(() => {
          setRemoved(true);
          onDone();
        }, 650);
        return () => clearTimeout(t2);
      }, 350);
      return () => clearTimeout(t1);
    }
  }, [ready, animFinished, onDone]);

  const handleAnimComplete = () => {
    setAnimFinished(true);
  };

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center select-none transition-all duration-700 ease-out ${
        leaving ? "opacity-0 scale-98 pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 45%, #ffffff 0%, #f0f4ff 45%, #dce6ff 100%)",
      }}
    >
      {/* Ambient soft glow */}
      <div className="absolute w-[600px] h-[350px] bg-blue-400/15 rounded-full blur-3xl pointer-events-none -top-10" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-4">
        {/* Company Mini Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-2.5 mb-5 px-4 py-1.5 rounded-full border border-blue-500/15 bg-white/80 backdrop-blur-md shadow-sm"
        >
          <img
            src="/images/catasoft-logo.png"
            alt="CataSoft"
            className="w-5 h-5 object-contain"
          />
          <span className="font-montserrat font-bold text-xs tracking-widest text-[#0e2ac5] uppercase">
            CATASOFT ENTERPRISE
          </span>
        </motion.div>

        {/* Large Centered Welcome Text - Exact Montserrat Black Font & Gradient */}
        <div className="relative flex flex-col items-center justify-center py-4">
          {/* Subtle Backlight Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-blue-500/20 blur-[70px] -z-10 rounded-full" />

          <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 py-2">
            {WELCOME_CHARS.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 35, scale: 0.88, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.75,
                  delay: 0.15 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-montserrat font-black text-6xl sm:text-7xl md:text-8xl lg:text-[105px] tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400 select-none inline-block drop-shadow-sm leading-none"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Elegant Expanding Accent Progress Bar */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="h-[3px] w-40 sm:w-56 md:w-72 rounded-full bg-gradient-to-r from-transparent via-[#2F69FF] to-transparent shadow-[0_0_12px_#2F69FF] mt-4"
            onAnimationComplete={handleAnimComplete}
          />
        </div>
      </div>
    </div>
  );
}

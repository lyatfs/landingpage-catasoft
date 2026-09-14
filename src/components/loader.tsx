"use client";
import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/language-context";
import {
  SamsungWelcomeEffect,
  SamsungHelloVietnameseEffect,
  SamsungHelloEnglishEffect,
} from "@/components/ui/text-effect";

interface LoaderProps {
  ready: boolean;
  onDone: () => void;
}

export function Loader({ ready, onDone }: LoaderProps) {
  const { lang } = useLanguage();
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [animFinished, setAnimFinished] = useState(false);
  const onDoneTriggered = useRef(false);

  // Safety fallback timer so loader never gets stuck if event doesn't fire
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimFinished(true);
    }, 4200);
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
      }, 500);
      return () => clearTimeout(t1);
    }
  }, [ready, animFinished, onDone]);

  const handleAnimComplete = () => {
    setAnimFinished(true);
  };

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center select-none transition-all duration-700 ease-out ${leaving ? "opacity-0 scale-98 pointer-events-none" : "opacity-100 scale-100"
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
        <div className="flex items-center gap-2.5 mb-4 px-4 py-1.5 rounded-full border border-blue-500/15 bg-white/80 backdrop-blur-md shadow-sm">
          <img
            src="/images/catasoft-logo.png"
            alt="CataSoft"
            className="w-5 h-5 object-contain"
          />
          <span className="font-display font-bold text-xs tracking-widest text-[#0e2ac5] uppercase">
            CATASOFT ENTERPRISE
          </span>
        </div>

        {/* Large Centered Text Effect */}
        <div className="w-full flex items-center justify-center py-4">
          <SamsungWelcomeEffect
            speed={0.58}
            scale={1.0}
            rotateY={-8}
            className="w-full h-44 sm:h-56 md:h-72 lg:h-80 text-[#0d1e4c] drop-shadow-[0_8px_30px_rgba(14,42,197,0.22)]"
            onAnimationComplete={handleAnimComplete}
          />
        </div>
      </div>
    </div>
  );
}

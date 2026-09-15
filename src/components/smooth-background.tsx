"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export function SmoothBackground() {
  const layerHeroRef = useRef<HTMLDivElement>(null);
  const layerLimeRef = useRef<HTMLDivElement>(null);
  const layerPinkRef = useRef<HTMLDivElement>(null);
  const layerWhiteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let smoothedP = 0;
    let lastHeroOp = -1;
    let lastLimeOp = -1;
    let lastPinkOp = -1;

    const onTick = (_time: number, deltaTime: number) => {
      const scrollY = (window as any).lenis
        ? (window as any).lenis.scroll
        : window.scrollY || 0;
      const vh = window.innerHeight || 1;
      const targetP = scrollY / vh;

      // Frame-rate independent liquid smoothing
      const timeScale = Math.min(Math.max((deltaTime || 16.6) / 16.666, 0.2), 2.0);
      smoothedP += (targetP - smoothedP) * Math.min(1, 0.1 * timeScale);
      const p = smoothedP;

      // Continuous waterfall transitions:
      // 1. Hero Blue -> Services Lime: between 0.35 and 1.15
      const t01 = smoothstep(0.35, 1.15, p);
      // 2. Services Lime -> Products Pink: between 1.35 and 2.15
      const t12 = smoothstep(1.35, 2.15, p);
      // 3. Products Pink -> Apple White: between 2.25 and 2.95
      const t23 = smoothstep(2.25, 2.95, p);

      const heroOp = Math.max(0, 1 - t01);
      if (Math.abs(heroOp - lastHeroOp) > 0.004 && layerHeroRef.current) {
        layerHeroRef.current.style.opacity = heroOp.toFixed(3);
        lastHeroOp = heroOp;
      }

      const limeOp = Math.max(0, 1 - t12);
      if (Math.abs(limeOp - lastLimeOp) > 0.004 && layerLimeRef.current) {
        layerLimeRef.current.style.opacity = limeOp.toFixed(3);
        lastLimeOp = limeOp;
      }

      const pinkOp = Math.max(0, 1 - t23);
      if (Math.abs(pinkOp - lastPinkOp) > 0.004 && layerPinkRef.current) {
        layerPinkRef.current.style.opacity = pinkOp.toFixed(3);
        lastPinkOp = pinkOp;
      }
    };

    gsap.ticker.add(onTick);
    return () => {
      gsap.ticker.remove(onTick);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Layer 3 (Bottom): Apple White - pristine, luminous studio canvas */}
      <div
        ref={layerWhiteRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            "radial-gradient(140% 140% at 50% 15%, #ffffff 0%, #ffffff 65%, #f5f5f7 100%)",
        }}
      />

      {/* Layer 2: Products - Subtle soft blush & rose pearl */}
      <div
        ref={layerPinkRef}
        className="absolute inset-0 will-change-[opacity]"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 90%, #ffffff 0%, #fff0f5 40%, #ffd6e6 100%)",
          opacity: 1,
        }}
      />

      {/* Layer 1: Services - Fresh neon eco lime */}
      <div
        ref={layerLimeRef}
        className="absolute inset-0 will-change-[opacity]"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 50%, #ffffff 0%, #f4ffed 40%, #e0fbc5 100%)",
          opacity: 1,
        }}
      />

      {/* Layer 0 (Top): Hero - Crisp tech cobalt & pearl */}
      <div
        ref={layerHeroRef}
        className="absolute inset-0 will-change-[opacity]"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 10%, #ffffff 0%, #f0f4ff 40%, #dbe4ff 100%)",
          opacity: 1,
        }}
      />
    </div>
  );
}

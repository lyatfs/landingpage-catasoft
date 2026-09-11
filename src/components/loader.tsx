"use client";
import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/language-context";

interface LoaderProps {
  ready: boolean;
  onDone: () => void;
}

export function Loader({ ready, onDone }: LoaderProps) {
  const { lang } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);
  const progressRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let animId: number;
    const update = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      let val = progressRef.current;
      if (!ready) {
        val += (92 - val) * 1.7 * dt;
      } else {
        val += (100 - val) * 6.0 * dt;
        if (val >= 99.4) val = 100;
      }

      progressRef.current = val;
      setProgress(Math.floor(val));

      if (val >= 99.9 && ready) {
        // Trigger completion exit sequence
        setTimeout(() => {
          setLeaving(true);
          setTimeout(() => {
            setRemoved(true);
            onDone();
          }, 520);
        }, 140);
        return;
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [ready, onDone]);

  if (removed) return null;

  const statusText =
    progress >= 100
      ? lang === "vi"
        ? "Khởi tạo thành công"
        : "Entering orbit"
      : lang === "vi"
      ? "Đang khởi tạo không gian 3D CataSoft"
      : "Calibrating gravity field";

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center select-none transition-opacity duration-500 ease-out ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(circle at 50% 42%, #ffffff 0%, #eef2ff 45%, #dbe4ff 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-[26px]">
        {/* Company Mini Badge */}
        <div className="flex items-center gap-2 mb-2 animate-pulse">
          <img
            src="/images/catasoft-logo.png"
            alt="CataSoft"
            className="w-7 h-7 object-contain"
          />
          <span className="font-display font-bold text-neutral-900 tracking-wider text-sm">
            CATASOFT
          </span>
        </div>

        {/* Status line */}
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#6b7bb5]">
          {statusText}
        </span>

        {/* Progress bar */}
        <div
          className="h-[2px] bg-[#0e2ac5]/15 rounded-full overflow-hidden relative"
          style={{ width: "clamp(180px, 32vw, 280px)" }}
        >
          <div
            className="h-full bg-gradient-to-r from-[#5175ff] to-[#0e2ac5] rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 14px rgba(47,105,255,0.55)",
            }}
          />
        </div>

        {/* Counter */}
        <span className="font-mono text-[11px] font-bold tracking-[0.1em] text-[#0e2ac5] tabular-nums">
          {String(progress).padStart(3, "0")}%
        </span>
      </div>
    </div>
  );
}

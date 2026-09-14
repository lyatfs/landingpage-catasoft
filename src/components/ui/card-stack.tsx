"use client";
import * as React from "react";
import gsap from "gsap";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];
  /** Selected index on mount */
  initialIndex?: number;
  /** How many cards are visible around the active (odd recommended) */
  maxVisible?: number;
  /** Card sizing */
  cardWidth?: number;
  cardHeight?: number;
  /** How much cards overlap each other (0..0.8). Higher = more overlap */
  overlap?: number;
  /** Total fan angle (deg). Higher = wider arc */
  spreadDeg?: number;
  /** 3D / depth feel */
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  /** Active emphasis: center scale ≈ 1.0, adjacent scale ≈ 0.75-0.85 */
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  /** Behavior */
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  /** UI */
  showDots?: boolean;
  className?: string;
  /** Hooks */
  onChangeIndex?: (index: number, item: T) => void;
  /** Custom renderer (optional) */
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

/** Minimal signed offset from active index to i, with wrapping (for loop behavior). */
function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 5,
  cardWidth = 660,
  cardHeight = 390,
  overlap = 0.44,
  spreadDeg = 8,
  perspectivePx = 1200,
  depthPx = 95,
  activeLiftPx = 28,
  activeScale = 1.14,
  inactiveScale = 0.76,
  loop = true,
  autoAdvance = true,
  intervalMs = 3000,
  pauseOnHover = false,
  showDots = true,
  className,
  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const len = items.length;
  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len));
  const [hovering, setHovering] = React.useState(false);

  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const prevOffsetsRef = React.useRef<(number | undefined)[]>([]);
  const isInitialRef = React.useRef(true);
  const hoverCooldownRef = React.useRef(false);
  const dragStartXRef = React.useRef<number | null>(null);

  // Keep active in bounds if items change
  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
  }, [active, len, items, onChangeIndex]);

  const [windowWidth, setWindowWidth] = React.useState(1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  const effectiveCardWidth = Math.min(cardWidth, windowWidth * 0.88);
  const cardSpacing = Math.max(10, Math.round(effectiveCardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len || !canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len || !canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // Hover to bring card to center with cooldown to prevent oscillation
  const handleCardHover = React.useCallback(
    (index: number) => {
      if (active === index) return;
      if (hoverCooldownRef.current) return;
      hoverCooldownRef.current = true;
      setActive(index);
      setTimeout(() => {
        hoverCooldownRef.current = false;
      }, 100);
    },
    [active]
  );

  // Autoplay
  React.useEffect(() => {
    if (!autoAdvance || !len) return;
    if (pauseOnHover && hovering) return;

    const id = window.setInterval(() => {
      if (loop || active < len - 1) next();
    }, Math.max(1000, intervalMs));

    return () => window.clearInterval(id);
  }, [autoAdvance, intervalMs, hovering, pauseOnHover, len, loop, active, next]);

  // GSAP 3D Transform Animation for Active & Side Cards
  React.useEffect(() => {
    if (!len) return;

    const isInitial = isInitialRef.current;
    if (isInitial) {
      isInitialRef.current = false;
    }

    items.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return;

      const off = signedOffset(i, active, len, loop);
      const abs = Math.abs(off);
      const visible = abs <= maxOffset;
      const isActive = off === 0;

      // 3D positioning
      const targetX = off * cardSpacing;
      const targetY = isActive ? -activeLiftPx : Math.pow(abs, 1.25) * 14;
      const targetZ = isActive ? 15 : -abs * depthPx;
      const targetRotateY = -off * 5.5; // Slight amphitheater curve towards viewer
      const targetRotateZ = off * stepDeg;
      const targetRotateX = 0; // Completely upright, never tilting backward

      // Scale hierarchy: Active center = 1.0, adjacent = 0.80, outer = 0.65
      const targetScale = isActive
        ? activeScale
        : abs === 1
          ? inactiveScale
          : Math.max(0.60, inactiveScale - (abs - 1) * 0.15);

      // Visual hierarchy: Opacity and brightness
      const targetOpacity = !visible ? 0 : isActive ? 1.0 : abs === 1 ? 0.70 : 0.40;
      const targetBrightness = isActive ? 1.0 : abs === 1 ? 0.72 : 0.55;
      const targetZIndex = isActive ? 60 : Math.max(1, 40 - abs * 5);

      // When becoming active, elevate zIndex immediately so it glides above neighbors
      if (isActive) {
        el.style.zIndex = "60";
        el.style.pointerEvents = "auto";
      } else {
        el.style.pointerEvents = visible ? "auto" : "none";
      }

      const prevOff = prevOffsetsRef.current[i];
      prevOffsetsRef.current[i] = off;
      const isWrapping = !isInitial && prevOff !== undefined && Math.abs(off - prevOff) > 2;

      if (isWrapping) {
        const entryX = off > 0 ? targetX + 50 : targetX - 50;
        gsap.set(el, {
          x: entryX,
          y: targetY,
          z: targetZ,
          scale: targetScale,
          rotationY: targetRotateY,
          rotationZ: targetRotateZ,
          rotationX: targetRotateX,
          opacity: 0,
        });

        gsap.to(el, {
          x: targetX,
          opacity: targetOpacity,
          duration: isInitial ? 0 : 0.55,
          ease: "power2.out",
          force3D: true,
          overwrite: "auto",
          onComplete: () => {
            if (!isActive) {
              el.style.zIndex = `${targetZIndex}`;
            }
          },
        });
      } else {
        gsap.to(el, {
          x: targetX,
          y: targetY,
          z: targetZ,
          scale: targetScale,
          rotationY: targetRotateY,
          rotationZ: targetRotateZ,
          rotationX: targetRotateX,
          opacity: targetOpacity,
          duration: isInitial ? 0 : 0.55,
          ease: "power2.out",
          force3D: true,
          overwrite: "auto",
          onComplete: () => {
            if (!isActive) {
              el.style.zIndex = `${targetZIndex}`;
            }
          },
        });
      }
    });
  }, [active, len, items, loop, maxOffset, cardSpacing, depthPx, activeLiftPx, activeScale, inactiveScale, stepDeg]);

  // Pointer drag gestures on active card
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartXRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartXRef.current === null) return;
    const diff = e.clientX - dragStartXRef.current;
    dragStartXRef.current = null;
    if (diff > 50) {
      prev();
    } else if (diff < -50) {
      next();
    }
  };

  if (!len) return null;
  const activeItem = items[active]!;

  return (
    <div
      className={cn("w-full relative z-30 pointer-events-auto select-none", className)}
      onMouseEnter={() => {
        setHovering(true);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("cardstack-hover", { detail: true }));
        }
      }}
      onMouseLeave={() => {
        setHovering(false);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("cardstack-hover", { detail: false }));
        }
      }}
      onPointerMove={(e) => {
        e.stopPropagation();
      }}
    >
      {/* Stage */}
      <div
        className="relative w-full focus:outline-none"
        style={{ height: Math.max(500, Math.round(cardHeight * activeScale + activeLiftPx + 55)) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {/* Ambient spotlight behind center card */}
        <div
          className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[75%] rounded-full bg-brand-blue/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[80%] rounded-full bg-brand-purple/10 blur-3xl"
          aria-hidden="true"
        />

        {/* 3D Perspective Stage */}
        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{
            perspective: `${perspectivePx}px`,
            perspectiveOrigin: "50% 50%",
          }}
        >
          {items.map((item, i) => {
            const off = signedOffset(i, active, len, loop);
            const isActive = off === 0;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={cn(
                  "absolute bottom-0 rounded-2xl border transition-all duration-500 overflow-hidden",
                  "will-change-transform select-none backdrop-blur-3xl bg-gradient-to-br from-white/30 to-white/5 dark:from-neutral-900/60 dark:to-neutral-950/20",
                  isActive
                    ? "cursor-grab active:cursor-grabbing border-white/60 ring-1 ring-white/40 shadow-[0_30px_80px_rgba(47,105,255,0.25)]"
                    : "cursor-pointer border-white/20 hover:border-white/50 shadow-2xl hover:shadow-[0_20px_60px_rgba(47,105,255,0.15)]"
                )}
                style={{
                  width: `min(${cardWidth}px, 88vw)`,
                  height: `min(${cardHeight}px, 62vh)`,
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                }}
                onMouseEnter={() => {
                  if (!autoAdvance) {
                    handleCardHover(i);
                  }
                }}
                onClick={() => setActive(i)}
              >
                <div
                  className="h-full w-full"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {renderCard ? (
                    renderCard(item, { active: isActive })
                  ) : (
                    <DefaultFanCard item={item} active={isActive} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots navigation centered at bottom */}
      {showDots ? (
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2.5 bg-white/50 dark:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-sm">
            {items.map((it, idx) => {
              const on = idx === active;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(idx)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                    on
                      ? "w-7 bg-brand-blue shadow-[0_0_10px_#2F69FF]"
                      : "w-2.5 bg-neutral-400/50 hover:bg-neutral-600/70"
                  )}
                  aria-label={`Go to ${it.title}`}
                />
              );
            })}
          </div>
          {activeItem.href ? (
            <Link
              href={activeItem.href}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/50 hover:bg-white/90 dark:bg-black/40 dark:hover:bg-black/70 backdrop-blur-md border border-white/40 text-neutral-700 dark:text-neutral-200 hover:text-brand-blue transition shadow-sm cursor-pointer"
              aria-label="Open product link"
            >
              <SquareArrowOutUpRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function DefaultFanCard({ item, active }: { item: CardStackItem; active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden group">
      {/* Background Image - Hologram Glass Effect */}
      <div className="absolute inset-0 overflow-hidden mix-blend-overlay opacity-60 dark:opacity-40">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className={cn(
              "h-full w-full object-cover transition-transform duration-700 ease-out",
              active ? "group-hover:scale-105" : ""
            )}
            draggable={false}
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/50 text-sm text-white/50">
            CataSoft Product
          </div>
        )}
      </div>

      {/* Top Glass highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

      {/* Gradient overlay for contrast */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-700",
          active
            ? "bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-black/5"
            : "bg-gradient-to-t from-neutral-950/95 via-neutral-950/50 to-black/20"
        )}
      />

      {/* Top Tag & Status */}
      {item.tag && (
        <div className="absolute top-4 left-5 z-20">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide backdrop-blur-md shadow-md transition-colors duration-300",
              active
                ? "bg-brand-blue/80 text-white shadow-[0_0_15px_rgba(47,105,255,0.5)] border border-white/40"
                : "bg-white/10 text-white/80 border border-white/20"
            )}
          >
            {active && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
            {item.tag}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
        <div className="flex items-baseline justify-between gap-2">
          <h3
            className={cn(
              "font-montserrat font-bold tracking-tight drop-shadow-sm transition-all duration-300",
              active
                ? "text-2xl sm:text-3xl text-white"
                : "text-lg sm:text-xl text-neutral-200"
            )}
          >
            {item.title}
          </h3>
          {item.ctaLabel && (
            <span
              className={cn(
                "hidden sm:inline-flex text-xs font-medium border px-2.5 py-1 rounded-full backdrop-blur-sm transition-colors duration-300",
                active
                  ? "text-blue-100 border-white/30 bg-white/20"
                  : "text-white/60 border-white/10 bg-white/5"
              )}
            >
              {item.ctaLabel}
            </span>
          )}
        </div>

        {item.description && (
          <p
            className={cn(
              "mt-2 line-clamp-2 text-sm md:text-base font-normal leading-relaxed transition-colors duration-300",
              active ? "text-white/90" : "text-neutral-300/80"
            )}
          >
            {item.description}
          </p>
        )}

        {item.href && (
          <div className="mt-4">
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                if (!active) {
                  e.preventDefault();
                } else {
                  e.stopPropagation();
                }
              }}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md backdrop-blur-md",
                active
                  ? "bg-brand-blue/80 text-white hover:bg-brand-blue border border-white/30 hover:scale-105 shadow-[0_0_20px_rgba(47,105,255,0.4)] cursor-pointer pointer-events-auto"
                  : "bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 cursor-pointer pointer-events-auto"
              )}
            >
              <span>{item.ctaLabel || "Khám phá giải pháp"}</span>
              <SquareArrowOutUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

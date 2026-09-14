"use client";

import type { TargetAndTransition } from "motion/react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof motion.svg> & {
  speed?: number;
  rotateY?: number;
  scale?: number;
  opacity?: number;
  onAnimationComplete?: () => void;
};

function SamsungHelloVietnameseEffect({
  className,
  speed = 1,
  rotateY = -15,
  scale = 0.7,
  opacity = 0,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  const initialProps: TargetAndTransition = {
    pathLength: 0,
    opacity,
    scale,
    rotateY,
  };

  const animateProps: TargetAndTransition = {
    pathLength: 1,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  };

  return (
    <motion.svg
      className={cn("h-32", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 860 220"
      fill="none"
      stroke="currentColor"
      strokeWidth="20"
      initial={{ opacity: 1, scale: 0.8, rotateX: 10 }}
      exit={{ opacity: 0, scale: 0.6, rotateX: -10 }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 120,
        damping: 15,
      }}
      {...props}
    >
      <title>xin chào - Samsung Bold Tech Style</title>

      {/* x - Angular geometric X shape */}
      <motion.g>
        <motion.path
          d="M40 80L90 130L140 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.6),
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 300,
            damping: 20,
            opacity: { duration: 0.3 },
            scale: { duration: 0.5, type: "spring", stiffness: 200 },
          }}
        />
        <motion.path
          d="M140 80L90 130L40 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.6),
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: calc(0.2),
            type: "spring",
            stiffness: 300,
            damping: 20,
            opacity: { duration: 0.3, delay: calc(0.2) },
            scale: {
              duration: 0.5,
              delay: calc(0.2),
              type: "spring",
              stiffness: 200,
            },
          }}
        />
      </motion.g>

      {/* i - Tech vertical line with geometric dot */}
      <motion.g>
        <motion.path
          d="M200 90L200 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(0.8),
            type: "spring",
            stiffness: 250,
            damping: 18,
            opacity: { duration: 0.3, delay: calc(0.8) },
            scale: { duration: 0.4, delay: calc(0.8) },
          }}
        />
        <motion.rect
          x="192"
          y="60"
          width="16"
          height="16"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ ...initialProps, pathLength: 1 }}
          animate={{ ...animateProps, pathLength: 1 }}
          transition={{
            duration: calc(0.3),
            delay: calc(1.2),
            type: "spring",
            stiffness: 400,
            opacity: { duration: 0.2, delay: calc(1.2) },
            scale: { duration: 0.3, delay: calc(1.2) },
          }}
        />
      </motion.g>

      {/* n - Angular tech style with sharp turns */}
      <motion.path
        d="M250 180L250 90L290 90L330 130L330 180"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(1.5),
          type: "spring",
          stiffness: 180,
          damping: 15,
          opacity: { duration: 0.4, delay: calc(1.5) },
          scale: { duration: 0.6, delay: calc(1.5) },
        }}
      />

      {/* c - Geometric C shape with sharp corners */}
      <motion.path
        d="M430 120L390 90L390 180L430 150"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.7),
          ease: "easeOut",
          delay: calc(2.3),
          type: "spring",
          stiffness: 220,
          damping: 16,
          opacity: { duration: 0.35, delay: calc(2.3) },
          scale: { duration: 0.5, delay: calc(2.3) },
        }}
      />

      {/* h - Bold Samsung tech H with angular connection */}
      <motion.g>
        <motion.path
          d="M520 60L520 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(3.0),
            type: "spring",
            stiffness: 280,
            damping: 18,
            opacity: { duration: 0.3, delay: calc(3.0) },
            scale: { duration: 0.4, delay: calc(3.0) },
          }}
        />
        <motion.path
          d="M520 125L580 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(3.3),
            type: "spring",
            stiffness: 320,
            damping: 20,
            opacity: { duration: 0.25, delay: calc(3.3) },
            scale: { duration: 0.35, delay: calc(3.3) },
          }}
        />
        <motion.path
          d="M580 60L580 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(3.6),
            type: "spring",
            stiffness: 280,
            damping: 18,
            opacity: { duration: 0.3, delay: calc(3.6) },
            scale: { duration: 0.4, delay: calc(3.6) },
          }}
        />
      </motion.g>

      {/* à - Geometric A with angular accent */}
      <motion.g>
        <motion.path
          d="M650 180L680 90L710 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.7),
            ease: "easeInOut",
            delay: calc(4.2),
            type: "spring",
            stiffness: 200,
            damping: 16,
            opacity: { duration: 0.35, delay: calc(4.2) },
            scale: { duration: 0.5, delay: calc(4.2) },
          }}
        />
        <motion.path
          d="M665 140L695 140"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeOut",
            delay: calc(4.6),
            type: "spring",
            stiffness: 250,
            damping: 18,
            opacity: { duration: 0.25, delay: calc(4.6) },
            scale: { duration: 0.35, delay: calc(4.6) },
          }}
        />
        {/* Angular accent mark */}
        <motion.path
          className="stroke-blue-400"
          d="M700 50L720 30"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ ...initialProps, filter: "blur(3px)" }}
          animate={{ ...animateProps, filter: "blur(0px)" }}
          transition={{
            duration: calc(0.4),
            delay: calc(4.9),
            type: "spring",
            stiffness: 350,
            opacity: { duration: 0.3, delay: calc(4.9) },
            scale: { duration: 0.3, delay: calc(4.9) },
            filter: { duration: 0.6, delay: calc(4.9) },
          }}
        />
      </motion.g>

      {/* o - Geometric diamond-like O */}
      <motion.path
        d="M780 90L820 110L820 160L780 180L760 160L760 110L780 90"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.9),
          ease: "easeInOut",
          delay: calc(5.3),
          type: "spring",
          stiffness: 160,
          damping: 14,
          opacity: { duration: 0.45, delay: calc(5.3) },
          scale: { duration: 0.65, delay: calc(5.3) },
        }}
        onAnimationComplete={onAnimationComplete}
      />

      {/* Futuristic accent lines */}
      <motion.g className="stroke-cyan-400 opacity-60">
        <motion.path
          d="M30 25L830 25"
          strokeWidth="2"
          style={{ strokeLinecap: "square" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{
            duration: calc(1.6),
            delay: calc(4.8),
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M30 195L830 195"
          strokeWidth="2.5"
          style={{ strokeLinecap: "square" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            duration: calc(1.6),
            delay: calc(5.0),
            ease: "easeOut",
          }}
          onAnimationComplete={onAnimationComplete}
        />
      </motion.g>
    </motion.svg>
  );
}

function SamsungHelloEnglishEffect({
  className,
  speed = 1,
  rotateY = -15,
  scale = 0.7,
  opacity = 0,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  const initialProps: TargetAndTransition = {
    pathLength: 0,
    opacity,
    scale,
    rotateY,
  };

  const animateProps: TargetAndTransition = {
    pathLength: 1,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  };

  return (
    <motion.svg
      className={cn("h-28", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 540 250"
      fill="none"
      stroke="currentColor"
      strokeWidth="18"
      initial={{ opacity: 1, scale: 0.8, rotateX: 8 }}
      exit={{ opacity: 0, scale: 0.6, rotateX: -8 }}
      transition={{
        duration: 0.7,
        type: "spring",
        stiffness: 140,
        damping: 18,
      }}
      {...props}
    >
      <title>hello - Samsung Bold Tech Style</title>

      {/* h - Bold angular H with tech styling */}
      <motion.g>
        <motion.path
          d="M40 60L40 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            type: "spring",
            stiffness: 280,
            damping: 20,
            opacity: { duration: 0.3 },
            scale: { duration: 0.4 },
          }}
        />
        <motion.path
          d="M40 125L100 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(0.3),
            type: "spring",
            stiffness: 320,
            damping: 22,
            opacity: { duration: 0.25, delay: calc(0.3) },
            scale: { duration: 0.35, delay: calc(0.3) },
          }}
        />
        <motion.path
          d="M100 60L100 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(0.6),
            type: "spring",
            stiffness: 280,
            damping: 20,
            opacity: { duration: 0.3, delay: calc(0.6) },
            scale: { duration: 0.4, delay: calc(0.6) },
          }}
        />
      </motion.g>

      {/* e - Geometric E with sharp edges */}
      <motion.g>
        <motion.path
          d="M150 60L150 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(1.0),
            type: "spring",
            stiffness: 260,
            damping: 19,
            opacity: { duration: 0.3, delay: calc(1.0) },
            scale: { duration: 0.4, delay: calc(1.0) },
          }}
        />
        <motion.path
          d="M150 60L210 60"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(1.3),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(1.3) },
            scale: { duration: 0.35, delay: calc(1.3) },
          }}
        />
        <motion.path
          d="M150 125L190 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(1.6),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(1.6) },
            scale: { duration: 0.35, delay: calc(1.6) },
          }}
        />
        <motion.path
          d="M150 190L210 190"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(1.9),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(1.9) },
            scale: { duration: 0.35, delay: calc(1.9) },
          }}
        />
      </motion.g>

      {/* l - Tech vertical line */}
      <motion.path
        d="M260 60L260 190L300 190"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeOut",
          delay: calc(2.3),
          type: "spring",
          stiffness: 240,
          damping: 18,
          opacity: { duration: 0.35, delay: calc(2.3) },
          scale: { duration: 0.45, delay: calc(2.3) },
        }}
      />

      {/* l - Second tech vertical line */}
      <motion.path
        d="M340 60L340 190L380 190"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeOut",
          delay: calc(2.8),
          type: "spring",
          stiffness: 240,
          damping: 18,
          opacity: { duration: 0.35, delay: calc(2.8) },
          scale: { duration: 0.45, delay: calc(2.8) },
        }}
      />

      {/* o - Geometric diamond-style O */}
      <motion.path
        d="M450 90L490 110L490 170L450 190L420 170L420 110L450 90"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(3.3),
          type: "spring",
          stiffness: 180,
          damping: 16,
          opacity: { duration: 0.4, delay: calc(3.3) },
          scale: { duration: 0.6, delay: calc(3.3) },
        }}
      />

      {/* Tech accent elements */}
      <motion.g className="stroke-blue-500 opacity-70">
        {/* Corner brackets for tech aesthetic */}
        <motion.path
          d="M20 40L20 20L40 20"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            duration: calc(0.5),
            delay: calc(4.0),
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M500 40L520 20L520 40"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            duration: calc(0.5),
            delay: calc(4.2),
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M20 210L20 230L40 230"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            duration: calc(0.5),
            delay: calc(4.4),
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M500 210L520 230L520 210"
          strokeWidth="3"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            duration: calc(0.5),
            delay: calc(4.6),
            ease: "easeOut",
          }}
          onAnimationComplete={onAnimationComplete}
        />
      </motion.g>
    </motion.svg>
  );
}

function SamsungWelcomeEffect({
  className,
  speed = 1,
  rotateY = -15,
  scale = 0.7,
  opacity = 0,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  const initialProps: TargetAndTransition = {
    pathLength: 0,
    opacity,
    scale,
    rotateY,
  };

  const animateProps: TargetAndTransition = {
    pathLength: 1,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  };

  return (
    <motion.svg
      className={cn("h-32", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 780 250"
      fill="none"
      stroke="currentColor"
      strokeWidth="20"
      initial={{ opacity: 1, scale: 0.8, rotateX: 10 }}
      exit={{ opacity: 0, scale: 0.6, rotateX: -10 }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 120,
        damping: 15,
      }}
      {...props}
    >
      <title>WELCOME - Samsung Bold Tech Style</title>

      {/* W - Angular geometric W with dual peaks */}
      <motion.g>
        <motion.path
          d="M52 70L76 180L100 115"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.6),
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 280,
            damping: 20,
            opacity: { duration: 0.3 },
            scale: { duration: 0.5, type: "spring", stiffness: 200 },
          }}
        />
        <motion.path
          d="M100 115L124 180L148 70"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.6),
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: calc(0.2),
            type: "spring",
            stiffness: 280,
            damping: 20,
            opacity: { duration: 0.3, delay: calc(0.2) },
            scale: { duration: 0.5, delay: calc(0.2), type: "spring", stiffness: 200 },
          }}
        />
      </motion.g>

      {/* E (first) - Geometric E with sharp edges */}
      <motion.g>
        <motion.path
          d="M180 70L180 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(0.5),
            type: "spring",
            stiffness: 270,
            damping: 19,
            opacity: { duration: 0.3, delay: calc(0.5) },
            scale: { duration: 0.4, delay: calc(0.5) },
          }}
        />
        <motion.path
          d="M180 70L234 70"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(0.7),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(0.7) },
            scale: { duration: 0.35, delay: calc(0.7) },
          }}
        />
        <motion.path
          d="M180 125L222 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(0.9),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(0.9) },
            scale: { duration: 0.35, delay: calc(0.9) },
          }}
        />
        <motion.path
          d="M180 180L234 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(1.1),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(1.1) },
            scale: { duration: 0.35, delay: calc(1.1) },
          }}
        />
      </motion.g>

      {/* L - Tech vertical line and bottom bar */}
      <motion.path
        d="M265 70L265 180L319 180"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeOut",
          delay: calc(1.4),
          type: "spring",
          stiffness: 240,
          damping: 18,
          opacity: { duration: 0.35, delay: calc(1.4) },
          scale: { duration: 0.45, delay: calc(1.4) },
        }}
      />

      {/* C - Geometric chamfered tech C */}
      <motion.path
        d="M415 70L385 70L365 90L365 160L385 180L415 180"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.7),
          ease: "easeOut",
          delay: calc(1.9),
          type: "spring",
          stiffness: 220,
          damping: 16,
          opacity: { duration: 0.35, delay: calc(1.9) },
          scale: { duration: 0.5, delay: calc(1.9) },
        }}
      />

      {/* O - Geometric faceted diamond O */}
      <motion.path
        d="M475 70L505 95L505 155L475 180L445 155L445 95L475 70"
        style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          delay: calc(2.4),
          type: "spring",
          stiffness: 170,
          damping: 15,
          opacity: { duration: 0.4, delay: calc(2.4) },
          scale: { duration: 0.6, delay: calc(2.4) },
        }}
      />

      {/* M - Bold geometric tech M */}
      <motion.g>
        <motion.path
          d="M540 180L540 70L588 135"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.6),
            ease: "easeInOut",
            delay: calc(2.9),
            type: "spring",
            stiffness: 250,
            damping: 18,
            opacity: { duration: 0.3, delay: calc(2.9) },
            scale: { duration: 0.45, delay: calc(2.9) },
          }}
        />
        <motion.path
          d="M636 180L636 70L588 135"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.6),
            ease: "easeInOut",
            delay: calc(3.2),
            type: "spring",
            stiffness: 250,
            damping: 18,
            opacity: { duration: 0.3, delay: calc(3.2) },
            scale: { duration: 0.45, delay: calc(3.2) },
          }}
        />
      </motion.g>

      {/* E (second) - Geometric E with sharp edges */}
      <motion.g>
        <motion.path
          d="M670 70L670 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.5),
            ease: "easeOut",
            delay: calc(3.6),
            type: "spring",
            stiffness: 270,
            damping: 19,
            opacity: { duration: 0.3, delay: calc(3.6) },
            scale: { duration: 0.4, delay: calc(3.6) },
          }}
        />
        <motion.path
          d="M670 70L724 70"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(3.8),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(3.8) },
            scale: { duration: 0.35, delay: calc(3.8) },
          }}
        />
        <motion.path
          d="M670 125L712 125"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(4.0),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(4.0) },
            scale: { duration: 0.35, delay: calc(4.0) },
          }}
        />
        <motion.path
          d="M670 180L724 180"
          style={{ strokeLinecap: "square", strokeLinejoin: "miter" }}
          initial={initialProps}
          animate={animateProps}
          transition={{
            duration: calc(0.4),
            ease: "easeInOut",
            delay: calc(4.2),
            type: "spring",
            stiffness: 300,
            damping: 21,
            opacity: { duration: 0.25, delay: calc(4.2) },
            scale: { duration: 0.35, delay: calc(4.2) },
          }}
        />
      </motion.g>

      {/* Futuristic horizontal guide lines */}
      <motion.g className="stroke-cyan-400 opacity-60">
        <motion.path
          d="M25 35L755 35"
          strokeWidth="2"
          style={{ strokeLinecap: "square" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{
            duration: calc(1.4),
            delay: calc(4.2),
            ease: "easeOut",
          }}
        />
        <motion.path
          d="M25 215L755 215"
          strokeWidth="2.5"
          style={{ strokeLinecap: "square" }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            duration: calc(1.4),
            delay: calc(4.4),
            ease: "easeOut",
          }}
          onAnimationComplete={onAnimationComplete}
        />
      </motion.g>
    </motion.svg>
  );
}

export { SamsungHelloEnglishEffect, SamsungHelloVietnameseEffect, SamsungWelcomeEffect };

export default SamsungWelcomeEffect;

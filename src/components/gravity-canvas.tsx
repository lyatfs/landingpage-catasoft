"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface GravityControl {
  progress: number;
  started: boolean;
}

interface GravityCanvasProps {
  control?: GravityControl;
  started?: boolean;
  ballColor: string;
  onReady: () => void;
}

export function GravityCanvas({ started = true, ballColor, onReady }: GravityCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardHoverRef = useRef(false);

  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  const startedRef = useRef(started);
  useEffect(() => {
    startedRef.current = started;
  }, [started]);

  useEffect(() => {
    const handleCardHover = (e: any) => {
      cardHoverRef.current = !!e.detail;
    };
    window.addEventListener("cardstack-hover", handleCardHover, { passive: true });
    return () => window.removeEventListener("cardstack-hover", handleCardHover);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId = 0;
    let reportedReady = false;
    let localStarted = false;
    let entranceStart = 0;
    let smoothedProgress = 0;

    // Mouse Tracking (normalized -1 to 1)
    const mousePos = { x: 99, y: 99, isDown: false };
    const onPointerMove = (e: PointerEvent) => {
      mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onMouseDown = () => (mousePos.isDown = true);
    const onMouseUp = () => (mousePos.isDown = false);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      60
    );
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    // Optimized pixel ratio capped at 1.5 for buttery 60-120fps on all displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, new THREE.Color(ballColor), 1.5);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
    keyLight.position.set(-6, 9, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -7;
    keyLight.shadow.camera.right = 7;
    keyLight.shadow.camera.top = 7;
    keyLight.shadow.camera.bottom = -7;
    keyLight.shadow.bias = -0.0003;
    keyLight.shadow.radius = 4.0;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.1);
    rimLight.position.set(7, 6, -7);
    scene.add(rimLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.4);
    frontLight.position.set(0, 0, 10);
    scene.add(frontLight);

    // Viewport Frustum Bounds
    let viewportWidth = 10;
    let viewportHeight = 6;
    const updateFrustumBounds = () => {
      const fovRad = THREE.MathUtils.degToRad(camera.fov);
      viewportHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      viewportWidth = viewportHeight * (container.clientWidth / container.clientHeight);
    };
    updateFrustumBounds();

    const isMobile = window.innerWidth < 768;
    const ballCount = isMobile ? 32 : 58;

    // Palette Function
    const getDynamicColors = (baseColor: string) => {
      const hex = baseColor.toLowerCase();
      if (hex === "#e1fc03") {
        return {
          pastel: new THREE.Color("#FBFFE2"),
          light: new THREE.Color("#EFFE69"),
          medium: new THREE.Color("#E1FC03"),
          deep: new THREE.Color("#B1E200"),
          glass: new THREE.Color("#DCFF32"),
        };
      } else if (hex === "#ffc5c2" || hex === "#ffa19e" || hex === "#ffa6b3") {
        return {
          pastel: new THREE.Color("#FFF5F4"),
          light: new THREE.Color("#FFECEB"),
          medium: new THREE.Color("#FFA6B3"),
          deep: new THREE.Color("#FF4D6D"),
          glass: new THREE.Color("#FFA6B3"),
        };
      } else if (hex === "#96e5ff") {
        return {
          pastel: new THREE.Color("#F0F9FF"),
          light: new THREE.Color("#C9F1FF"),
          medium: new THREE.Color("#96E5FF"),
          deep: new THREE.Color("#2BA5FF"),
          glass: new THREE.Color("#98E4FF"),
        };
      } else if (hex === "#2f69ff" || hex === "#0e2ac5") {
        return {
          pastel: new THREE.Color("#ECEFFF"),
          light: new THREE.Color("#A8C1FF"),
          medium: new THREE.Color("#2F69FF"),
          deep: new THREE.Color("#0A33BF"),
          glass: new THREE.Color("#4D80FF"),
        };
      } else if (hex === "#141414" || hex === "#000000") {
        return {
          pastel: new THREE.Color("#D8D8D8"),
          light: new THREE.Color("#555555"),
          medium: new THREE.Color("#242424"),
          deep: new THREE.Color("#0A0A0A"),
          glass: new THREE.Color("#1F1F1F"),
        };
      }
      const c = new THREE.Color(baseColor);
      return {
        pastel: c.clone().offsetHSL(0, -0.15, 0.25),
        light: c.clone().offsetHSL(0, -0.05, 0.12),
        medium: c.clone(),
        deep: c.clone().offsetHSL(0.01, 0.1, -0.12),
        glass: c.clone(),
      };
    };

    const palette = getDynamicColors(ballColor);
    const isBlack = ["#141414", "#18181b", "#000000"].includes(ballColor.toLowerCase());

    const palHero = palette;
    const palLime = getDynamicColors("#E1FC03");
    const palPink = getDynamicColors("#FFC5C2");
    type Role = "pastel" | "light" | "medium" | "deep" | "glass";
    const ROLES: Role[] = ["pastel", "light", "medium", "deep", "glass"];
    const curPal: Record<Role, THREE.Color> = {
      pastel: new THREE.Color(),
      light: new THREE.Color(),
      medium: new THREE.Color(),
      deep: new THREE.Color(),
      glass: new THREE.Color(),
    };

    // Spheres Creation - Geometry shared across all spheres
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    interface Ball {
      id: number;
      radius: number;
      mass: number;
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      sphere: THREE.Mesh;
      material: THREE.MeshPhysicalMaterial;
      role: Role;
      isGlass: boolean;
      visualScale: number;
      color: THREE.Color;
      shapeTarget: THREE.Vector3;
    }
    const balls: Ball[] = [];

    for (let i = 0; i < ballCount; i++) {
      let radius = 0.35;
      const rand = Math.random();
      if (rand < 0.35) radius = 0.30 + Math.random() * 0.12;
      else if (rand < 0.8) radius = 0.44 + Math.random() * 0.18;
      else radius = 0.68 + Math.random() * 0.20;
      const mass = Math.pow(radius, 3);

      let chosenColor = palette.medium;
      let color = palette.medium;
      let sphereMat: THREE.MeshPhysicalMaterial;
      let role: Role = "medium";
      const isGlass = Math.random() < 0.18 && !isBlack;

      if (isGlass) {
        sphereMat = new THREE.MeshPhysicalMaterial({
          color: palette.glass,
          roughness: 0.1,
          metalness: 0.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.04,
          transmission: 0.90,
          ior: 1.46,
          thickness: 1.8,
          transparent: true,
          opacity: 0.92,
        });
        color = palette.glass;
        role = "glass";
      } else {
        const colorRand = Math.random();
        if (colorRand < 0.25) {
          chosenColor = palette.pastel;
          role = "pastel";
        } else if (colorRand < 0.55) {
          chosenColor = palette.light;
          role = "light";
        } else if (colorRand < 0.85) {
          chosenColor = palette.medium;
          role = "medium";
        } else {
          chosenColor = palette.deep;
          role = "deep";
        }
        sphereMat = new THREE.MeshPhysicalMaterial({
          color: chosenColor,
          roughness: 0.38,
          metalness: 0.02,
          clearcoat: 0.3,
          clearcoatRoughness: 0.25,
          emissive: isBlack ? new THREE.Color("#000000") : chosenColor,
          emissiveIntensity: isBlack ? 0.0 : 0.07,
          transparent: true,
        });
        color = chosenColor;
      }

      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMat);
      sphereMesh.scale.setScalar(radius);
      // Optimize shadow casting: only ~35% of larger balls cast shadows to save 65% draw calls
      sphereMesh.castShadow = i % 3 === 0;
      sphereMesh.receiveShadow = true;
      scene.add(sphereMesh);

      balls.push({
        id: i,
        radius,
        mass,
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(),
        sphere: sphereMesh,
        material: sphereMat,
        role,
        isGlass,
        visualScale: radius,
        color,
        shapeTarget: new THREE.Vector3(),
      });
    }

    const meanRadius = balls.reduce((sum, b) => sum + b.radius, 0) / balls.length;
    let shapeScale = 1;

    // Heart Shape Rejection Sampling
    const inHeart = (x: number, y: number) => {
      const a = x * x + y * y - 1;
      return a * a * a - x * x * y * y * y <= 0;
    };

    const assignHeartTargets = () => {
      const S = Math.min(viewportWidth * 0.28, viewportHeight * 0.26);
      const baseCY = -viewportHeight * 0.03;
      shapeScale = Math.max(0.35, Math.min(1, (S * 0.45 / 2.3) / meanRadius));
      for (let i = 0; i < balls.length; i++) {
        let x = 0,
          y = 0,
          tries = 0;
        do {
          x = (Math.random() * 2 - 1) * 1.25;
          y = Math.random() * 2.55 - 1.4;
          tries++;
        } while (!inHeart(x, y) && tries < 60);
        balls[i].shapeTarget.set(x * S, (y + 0.12) * S + baseCY, (Math.random() - 0.5) * 0.35);
      }
    };
    assignHeartTargets();

    // Entrance Scatter
    const scatterFar = (withInwardVelocity: boolean) => {
      const R = Math.max(viewportWidth, viewportHeight) * 1.4;
      for (const b of balls) {
        const a = Math.random() * Math.PI * 2;
        const px = Math.cos(a) * R * 1.25;
        const py = Math.sin(a) * R * 0.85;
        const pz = (Math.random() - 0.5) * 3.5;
        b.position.set(px, py, pz);
        b.sphere.position.copy(b.position);
        if (withInwardVelocity) {
          b.velocity.set(-px, -py, -pz).normalize().multiplyScalar(0.08 + Math.random() * 0.04);
        } else {
          b.velocity.set(0, 0, 0);
        }
      }
    };
    scatterFar(false); // Parked offscreen until loader reveals

    const params = {
      rebound: -0.32,
      mouseRepelForce: 0.048,
      mouseRepelRadius: 4.2,
      damping: 0.91,
      centerAttractForce: 0.0035,
      bounciness: 0.02,
    };

    const mouseProjVec = new THREE.Vector3();
    const mouseWorld3D = new THREE.Vector3();
    const updateMouse3D = () => {
      if (!mousePos) return;
      mouseProjVec.set(mousePos.x, mousePos.y, 0.5);
      mouseProjVec.unproject(camera);
      const dir = mouseProjVec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mouseWorld3D.copy(camera.position).add(dir.multiplyScalar(distance));
    };

    // Math Helpers
    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const smoothstep = (a: number, b: number, x: number) => {
      const t = clamp01((x - a) / (b - a));
      return t * t * (3 - 2 * t);
    };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    // Physics Simulation Loop
    const clock = new THREE.Clock();
    const diffVec = new THREE.Vector3();
    const collideDiff = new THREE.Vector3();
    const relVel = new THREE.Vector3();
    const deltaPos = new THREE.Vector3();
    const rotAxis = new THREE.Vector3();
    const prevMouseWorld = new THREE.Vector3();
    let mouseSpeed = 0;

    const simulateAndRender = () => {
      animationFrameId = requestAnimationFrame(simulateAndRender);
      const time = clock.getElapsedTime();
      updateMouse3D();

      const isStarted = startedRef.current;
      if (isStarted && !localStarted) {
        localStarted = true;
        entranceStart = time;
        scatterFar(true);
      }

      if (!localStarted) {
        renderer.render(scene, camera);
        if (!reportedReady) {
          reportedReady = true;
          onReadyRef.current();
        }
        return;
      }

      // Read frame-perfect scroll position directly from Lenis or window scroll
      const scrollY = (window as any).lenis ? (window as any).lenis.scroll : window.scrollY || 0;
      const vh = window.innerHeight || 1;
      const targetProgress = scrollY / vh;
      smoothedProgress += (targetProgress - smoothedProgress) * 0.055;
      const progress = smoothedProgress;

      // Dynamically fade canvas opacity as user scrolls past hero so text stays 100% legible
      const heroF = 1 - smoothstep(0.35, 1.15, progress);
      const dropRaw = smoothstep(0.45, 1.35, progress);
      const flyF = smoothstep(2.65, 3.35, progress);
      const shapeF = smoothstep(1.6, 2.35, progress) * (1 - smoothstep(2.65, 3.15, progress));
      const dropF = dropRaw * (1 - smoothstep(1.45, 2.05, progress));

      // Container opacity auto-adjustment (smoothly fade to 0 when scrolling past Products into Testimonials/About)
      const canvasFade = 1 - smoothstep(2.6, 3.25, progress);
      const baseOpacity = Math.max(0, 0.72 - progress * 0.22);
      const targetOpacity = Math.max(0, baseOpacity * canvasFade);
      container.style.opacity = targetOpacity.toFixed(3);
      if (targetOpacity <= 0.001) {
        container.style.visibility = "hidden";
        return; // Skip rendering passes completely when off-screen to save GPU
      } else {
        container.style.visibility = "visible";
      }

      // Scroll-driven palette morph: Hero Blue -> Lime -> Pink -> Clean Apple White
      const bLime = smoothstep(0.65, 1.25, progress);
      const bPink = smoothstep(1.55, 2.15, progress);
      const bWhite = smoothstep(2.55, 3.15, progress);
      const whiteColor = new THREE.Color(0xffffff);
      for (const role of ROLES) {
        curPal[role]
          .copy(palHero[role])
          .lerp(palLime[role], bLime)
          .lerp(palPink[role], bPink)
          .lerp(whiteColor, bWhite);
      }
      hemiLight.groundColor.copy(curPal.medium);

      const entranceT = easeOutCubic(clamp01((time - entranceStart) / 2.2));
      const attractionBoost = lerp(7.0, 1, entranceT);
      const isMouseInteracting =
        !cardHoverRef.current &&
        !!mousePos &&
        (Math.abs(mousePos.x) < 0.99 || Math.abs(mousePos.y) < 0.99);

      mouseSpeed = isMouseInteracting ? mouseWorld3D.distanceTo(prevMouseWorld) : 0;
      if (mouseSpeed > 3) mouseSpeed = 3;
      prevMouseWorld.copy(mouseWorld3D);

      let damping = 0.91;
      damping = lerp(damping, 0.965, dropF);
      damping = lerp(damping, 0.9, shapeF);
      damping = lerp(damping, 0.985, flyF);

      const camZ = camera.position.z;
      const clusterActive = Math.max(heroF, entranceT < 1 ? 1 : 0);

      // 1. Accelerations
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        if (heroF > 0.01) {
          b.velocity.x += Math.sin(time * 0.4 + b.id * 1.5) * 0.0004 * b.radius * heroF;
          b.velocity.y += Math.cos(time * 0.5 + b.id * 1.2) * 0.0004 * b.radius * heroF;
          b.velocity.z += Math.sin(time * 0.35 + b.id) * 0.0001 * heroF;
        }

        const clusterStrength = params.centerAttractForce * attractionBoost * clusterActive;
        if (clusterStrength > 0.00001) {
          b.velocity.x += (0 - b.position.x) * clusterStrength * 0.38;
          b.velocity.y += (0 - b.position.y) * clusterStrength * 1.85;
          b.velocity.z += (0 - b.position.z) * clusterStrength * 1.8;
        }

        if (dropF > 0.001) {
          b.velocity.y -= 0.0048 * dropF;
        }

        if (shapeF > 0.001) {
          const k = 0.032 * shapeF;
          b.velocity.x += (b.shapeTarget.x - b.position.x) * k;
          b.velocity.y += (b.shapeTarget.y - b.position.y) * k;
          b.velocity.z += (b.shapeTarget.z - b.position.z) * k;
        }

        if (flyF > 0.001) {
          const stagger = (b.id * 0.6180339887) % 1;
          const local = smoothstep(stagger * 0.55, stagger * 0.55 + 0.45, flyF);
          b.velocity.z += 0.024 * local;
          b.velocity.x += b.position.x * 0.003 * local;
          b.velocity.y += b.position.y * 0.003 * local;
        }

        if (mousePos && isMouseInteracting) {
          diffVec.subVectors(b.position, mouseWorld3D);
          const rawDist = diffVec.length();
          const down = mousePos.isDown;
          const activeRepelRadius = down ? params.mouseRepelRadius * 1.35 : params.mouseRepelRadius;
          const activeRepelForce = down ? params.mouseRepelForce * 1.6 : params.mouseRepelForce;
          if (rawDist < activeRepelRadius && rawDist > 0.0001) {
            const ratio = rawDist / activeRepelRadius;
            const smoothFactor = 1.0 - ratio * ratio * (3.0 - 2.0 * ratio);
            const speedBoost = 1 + mouseSpeed * 3.0;
            const push = smoothFactor * activeRepelForce * speedBoost;
            diffVec.normalize();
            diffVec.z *= 0.12;
            diffVec.normalize();
            b.velocity.addScaledVector(diffVec, push);
          }
        }

        b.velocity.multiplyScalar(damping);
        b.position.addScaledVector(b.velocity, 1);

        const c = b.isGlass ? curPal.glass : curPal[b.role];
        b.material.color.copy(c);
        if (!isBlack) b.material.emissive.copy(c);

        b.material.opacity =
          flyF > 0.001 ? 1 - smoothstep(camZ - 2.6, camZ - 0.3, b.position.z) : 1;

        const targetVis = b.radius * (1 - (1 - shapeScale) * shapeF);
        b.visualScale += (targetVis - b.visualScale) * 0.12;
        b.sphere.scale.setScalar(b.visualScale);
      }

      // 2. Pairwise Collisions (Single fast pass with AABB pruning for rock-solid 60+ FPS)
      const collideScale = 0.28 * (1 - 0.93 * shapeF) * (1 - flyF);
      for (let i = 0; i < balls.length; i++) {
        const b1 = balls[i];
        const p1 = b1.position;
        const r1 = b1.visualScale;

        for (let j = i + 1; j < balls.length; j++) {
          const b2 = balls[j];
          const p2 = b2.position;
          const minDist = r1 + b2.visualScale;

          const dx = p2.x - p1.x;
          if (dx > minDist || dx < -minDist) continue;
          const dy = p2.y - p1.y;
          if (dy > minDist || dy < -minDist) continue;
          const dz = p2.z - p1.z;
          if (dz > minDist || dz < -minDist) continue;

          const distSq = dx * dx + dy * dy + dz * dz;
          if (distSq >= minDist * minDist || distSq < 0.000001) continue;

          const dist = Math.sqrt(distSq);
          const overlap = minDist - dist;
          collideDiff.set(dx / dist, dy / dist, dz / dist);

          const totalMass = b1.mass + b2.mass;
          const ratio1 = b2.mass / totalMass;
          const ratio2 = b1.mass / totalMass;
          b1.position.addScaledVector(collideDiff, -overlap * ratio1 * collideScale);
          b2.position.addScaledVector(collideDiff, overlap * ratio2 * collideScale);

          relVel.subVectors(b2.velocity, b1.velocity);
          const velAlongNormal = relVel.dot(collideDiff);
          if (velAlongNormal < -0.0001) {
            const impulse =
              (-(1 + params.bounciness) * velAlongNormal) / (1 / b1.mass + 1 / b2.mass);
            b1.velocity.addScaledVector(collideDiff, -impulse / b1.mass);
            b2.velocity.addScaledVector(collideDiff, impulse / b2.mass);
          }
        }
      }

      // 3. Viewport Walls + Bouncy Floor
      const borderPad = 0.2;
      const xBound = viewportWidth / 2 - borderPad;
      const topY = viewportHeight / 2 - 0.05;
      const floorY = -viewportHeight / 2 + 0.05;
      const zBound = 2.0;
      const restitution = 0.3 + 0.35 * dropF;
      const contain = flyF < 0.5;
      const zContain = flyF < 0.02;

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        const r = b.visualScale;
        if (contain) {
          if (b.position.x < -xBound - r) {
            b.position.x = -xBound - r;
            b.velocity.x *= params.rebound;
          } else if (b.position.x > xBound + r) {
            b.position.x = xBound + r;
            b.velocity.x *= params.rebound;
          }
          if (b.position.y - r < floorY) {
            b.position.y = floorY + r;
            if (b.velocity.y < 0) b.velocity.y = -b.velocity.y * restitution;
            if (dropF > 0.3) {
              b.velocity.x *= 0.88;
              b.velocity.z *= 0.88;
            }
          }
          if (b.position.y + r > topY) {
            b.position.y = topY - r;
            if (b.velocity.y > 0) b.velocity.y *= params.rebound;
          }
        }
        if (zContain) {
          if (b.position.z < -zBound) {
            b.position.z = -zBound;
            b.velocity.z *= params.rebound;
          } else if (b.position.z > zBound) {
            b.position.z = zBound;
            b.velocity.z *= params.rebound;
          }
        }

        deltaPos.copy(b.position).sub(b.sphere.position);
        if (deltaPos.lengthSq() > 0.000001) {
          rotAxis.set(deltaPos.y, -deltaPos.x, 0).normalize();
          const rotAngle = (deltaPos.length() / b.radius) * 0.95;
          b.sphere.rotateOnWorldAxis(rotAxis, rotAngle);
        }
        b.sphere.position.copy(b.position);
      }

      renderer.render(scene, camera);
      if (!reportedReady) {
        reportedReady = true;
        onReadyRef.current();
      }
    };

    simulateAndRender();

    // Resize Handler
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateFrustumBounds();
      assignHeartTargets();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
      sphereGeometry.dispose();
      for (const b of balls) {
        b.material.dispose();
      }
    };
  }, [ballColor]); // ONLY re-run when theme ballColor changes!

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-500 ease-out"
      style={{
        width: "100%",
        height: "100svh",
        opacity: 0.72,
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

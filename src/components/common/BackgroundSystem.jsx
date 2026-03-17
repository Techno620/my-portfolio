import React, { useEffect, useMemo, useRef } from "react";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const BackgroundSystem = () => {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const palette = useMemo(
    () => [
      "rgba(255,255,255,0.85)",
      "rgba(99,102,241,0.75)",
      "rgba(236,72,153,0.65)",
      "rgba(34,197,94,0.65)",
    ],
    []
  );

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const mouse = { x: 0, y: 0 };

    const resize = () => {
      const rect = root.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(root);
    resize();

    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mouse.x = clamp(nx, -0.6, 0.6);
      mouse.y = clamp(ny, -0.6, 0.6);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const makeParticles = () => {
      // Scale particle count with area (kept intentionally low for perf)
      const area = width * height;
      const target = clamp(Math.round(area / 32000), 40, 90);
      const particles = Array.from({ length: target }).map((_, i) => {
        const speed = 0.08 + Math.random() * 0.22;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: 0.6 + Math.random() * 1.8,
          c: palette[i % palette.length],
          tw: Math.random() * Math.PI * 2,
        };
      });
      return particles;
    };

    let particles = makeParticles();
    const relinkDistance = 140;

    const drawOnce = () => {
      ctx.clearRect(0, 0, width, height);
      const ox = mouse.x * 18;
      const oy = mouse.y * 12;

      // Lines
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = (b.x - a.x);
          const dy = (b.y - a.y);
          const dist = Math.hypot(dx, dy);
          if (dist > relinkDistance) continue;
          const alpha = (1 - dist / relinkDistance) * 0.06;
          ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x + ox, a.y + oy);
          ctx.lineTo(b.x + ox, b.y + oy);
          ctx.stroke();
        }
      }

      // Dots
      for (const p of particles) {
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(99,102,241,0.18)";
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    if (prefersReducedMotion()) {
      drawOnce();
      return () => {
        window.removeEventListener("pointermove", onMove);
        ro.disconnect();
      };
    }

    let last = performance.now();
    const step = (t) => {
      const dt = Math.min(0.033, (t - last) / 1000);
      last = t;

      // Update particles
      for (const p of particles) {
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;
        p.tw += 0.6 * dt;
        // wrap
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
        // subtle twinkle
        p.r = clamp(p.r + Math.sin(p.tw) * 0.002, 0.6, 2.4);
      }

      // If resized significantly, rebuild
      if (particles.length === 0) particles = makeParticles();

      drawOnce();
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
    };
  }, [palette]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background:
          "radial-gradient(800px circle at 18% 12%, rgba(99,102,241,0.16), transparent 55%), radial-gradient(700px circle at 86% 62%, rgba(236,72,153,0.12), transparent 60%), radial-gradient(900px circle at 50% 92%, rgba(34,197,94,0.10), transparent 60%), linear-gradient(180deg, #020617 0%, #030712 100%)",
      }}
    >
      {/* Base grid */}
      <div className="absolute inset-0 z-0 bg-grid opacity-[0.10]" />

      {/* Canvas particles + link lines */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Aurora band (CSS-only) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.16] mix-blend-screen animate-[gradientMove_18s_ease-in-out_infinite]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(99,102,241,0.0) 0%, rgba(99,102,241,0.16) 25%, rgba(236,72,153,0.12) 55%, rgba(34,197,94,0.10) 75%, rgba(99,102,241,0.0) 100%)",
          backgroundSize: "220% 100%",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, transparent 0%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </div>
  );
};

export default BackgroundSystem;


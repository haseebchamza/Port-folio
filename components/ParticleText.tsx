"use client";
import React, { useEffect, useRef, useState } from "react";

export default function ParticleText({ text = "© HBC" }: { text?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let particles: any[] = [];
    const mouse = { x: -9000, y: -9000 };
    let animationFrameId: number;

    const W = 1200;
    const H = 400;

    const dpr = window.devicePixelRatio || 1;
    // Scale for high dpi screens to make the canvas crisp
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.scale(dpr, dpr);

    const initParticles = () => {
      particles = [];
      ctx.clearRect(0, 0, W, H);
      
      // Fallback font stack - Increased text size
      ctx.fillStyle = "white";
      ctx.font = "900 240px 'Cabinet Grotesk', sans-serif"; 
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, W / 2, H / 2);

      // Extract image data using true device dimensions
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const gap = 4; // CSS gap
      const scaledGap = Math.floor(gap * dpr); 
      
      for (let y = 0; y < canvas.height; y += scaledGap) {
        for (let x = 0; x < canvas.width; x += scaledGap) {
          const index = (y * canvas.width + x) * 4;
          const alpha = data[index + 3];
          
          if (alpha > 128) {
            particles.push({
              x: (x / dpr) + (Math.random() - 0.5) * 50,
              y: (y / dpr) + (Math.random() - 0.5) * 50,
              originX: x / dpr,
              originY: y / dpr,
              vx: 0,
              vy: 0,
            });
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      
      const r_normal = 2.5; 

      // Physics Calculation & 1st Pass: Normal particles
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)"; 
      ctx.beginPath();
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 100; // Reduced interaction radius
        
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          // Dramatically reduced repulsion force
          p.vx -= (dx / dist) * force * 2; 
          p.vy -= (dy / dist) * force * 2;
        }

        p.vx += (p.originX - p.x) * 0.04;
        p.vy += (p.originY - p.y) * 0.04;

        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;

        // Calculate how distorted it is
        const dx_origin = p.originX - p.x;
        const dy_origin = p.originY - p.y;
        p.distFromOrigin = Math.sqrt(dx_origin * dx_origin + dy_origin * dy_origin);

        // Draw only if it's resting or barely moving
        if (p.distFromOrigin < 2) {
          ctx.moveTo(p.x + r_normal, p.y);
          ctx.arc(p.x, p.y, r_normal, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // 2nd Pass: Only Glowing Distorted Particles
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(255, 255, 255, 0.8)"; 
      ctx.beginPath();
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Only draw the ones that are knocked out of place
        if (p.distFromOrigin >= 2) {
          ctx.moveTo(p.x + r_normal, p.y);
          ctx.arc(p.x, p.y, r_normal, 0, Math.PI * 2);
        }
      }
      ctx.fill();
      
      ctx.shadowBlur = 0; 
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * (W / rect.width);
      mouse.y = (e.clientY - rect.top) * (H / rect.height);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Ensure fonts are loaded before initializing particles
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        initParticles();
        draw();
      });
    } else {
      setTimeout(() => {
        initParticles();
        draw();
      }, 100);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, text]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-[90%] max-w-[1000px] h-auto outline-none drop-shadow-md"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
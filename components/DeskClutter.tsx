"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function DeskClutter() {
  // Track wind direction for steam
  const windRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, velX: 0, velY: 0 });
  const cupRef = useRef<HTMLDivElement>(null);
  const [wind, setWind] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const m = mouseRef.current;
      m.velX = e.clientX - m.lastX;
      m.velY = e.clientY - m.lastY;
      m.lastX = e.clientX;
      m.lastY = e.clientY;
      m.x = e.clientX;
      m.y = e.clientY;

      if (!cupRef.current) return;
      const rect = cupRef.current.getBoundingClientRect();
      const cupCenterX = rect.left + rect.width / 2;
      const cupCenterY = rect.top + rect.height / 2;
      const dx = e.clientX - cupCenterX;
      const dy = e.clientY - cupCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Affect steam when cursor is within 500px of the cup
      if (dist < 500) {
        const proximityStrength = (1 - dist / 500);
        // Combine proximity displacement with velocity-driven "gusts"
        windRef.current = { 
          x: (dx / dist) * proximityStrength * 40 + m.velX * 0.8 * proximityStrength, 
          y: (dy / dist) * proximityStrength * 30 + m.velY * 0.5 * proximityStrength 
        };
      } else {
        windRef.current = { x: 0, y: 0 };
      }
    };

    // Smooth update loop
    const tick = (time: number) => {
      setWind(prev => ({
        x: prev.x + (windRef.current.x - prev.x) * 0.1,
        y: prev.y + (windRef.current.y - prev.y) * 0.1,
      }));
      
      // Decay velocity over time if mouse stops
      mouseRef.current.velX *= 0.95;
      mouseRef.current.velY *= 0.95;

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10" style={{ isolation: 'isolate' }}>
      {/* ... (glasses and pen remain same) */}
      <motion.div 
        initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
        animate={{ opacity: 1, rotate: -15, scale: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-[5%] md:top-[8%] left-[10%] md:left-[25%] w-24 h-24 md:w-72 md:h-72 opacity-80"
      >
        <img 
          src="/designer_glasses_topdown_1775801851005.png" 
          alt="Glasses" 
          className="w-full h-full object-contain brightness-110"
        />
      </motion.div>

      {/* Fountain Pen (Replaced Coffee Cup) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.7, rotate: 15 }}
        animate={{ opacity: 1, scale: 1, rotate: 25 }}
        transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
        className="absolute top-[70%] md:top-[65%] right-[10%] md:right-[20%] w-56 h-56 md:w-[380px] md:h-[380px] z-20 pointer-events-none select-none"
      >
        <img 
          src="/fountain_pen_topdown_1775801960943.png" 
          alt="Fountain pen" 
          className="w-full h-full object-contain filter"
          style={{ filter: "brightness(1.2) contrast(1.5) saturate(0.8)" }}
        />
      </motion.div>
    </div>
  );


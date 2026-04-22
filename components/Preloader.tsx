"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let startTime = Date.now();
    const duration = 1500; // 1.5 seconds preload

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
          gsap.to(".preloader-container", {
             yPercent: -100,
             duration: 1.2,
             ease: "power4.inOut",
             onComplete: () => {
               if (onComplete) {
                 onComplete();
               }
             }
          });
        }, 800);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preloader-container fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black text-white pointer-events-none overflow-hidden">
      
      {/* SCANLINE EFFECT */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10" />

      <div className="flex flex-col items-center text-center scale-75 md:scale-100">
        
        {/* Blinking Cursor */}
        <div className="relative w-12 h-12 md:w-16 md:h-16 mb-12 animate-pulse">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/Cursor.svg" 
              alt="Initializing" 
              className="w-full h-full opacity-80 invert" 
            />
        </div>

        {/* Minimalist Progress */}
        <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-mono tracking-tighter tabular-nums text-white/90">
                {Math.min(Math.round(progress), 100).toString().padStart(3, '0')}%
            </h1>
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
            <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 animate-pulse">
                INITIALIZING SPATIAL CORE
            </p>
        </div>

      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ 
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px"
      }} />

    </div>
  );
}

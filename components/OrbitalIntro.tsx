"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface OrbitalIntroProps {
  onEnterSpace: () => void;
}

const FRAME_COUNT = 50;

export default function OrbitalIntro({ onEnterSpace }: OrbitalIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showText, setShowText] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameIndex = i.toString().padStart(3, "0");
      img.src = `/personal-video/ezgif-frame-${frameIndex}.png`;
      img.onload = () => {
        loadedCount++;
        const progress = Math.round((loadedCount / FRAME_COUNT) * 100);
        window.dispatchEvent(new CustomEvent("orbital-progress", { detail: progress }));
        
        if (loadedCount === FRAME_COUNT) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // GSAP Scrubbing
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current) return;

    ScrollTrigger.refresh();

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = 1920;
    canvas.height = 1080;

    const render = (index: number) => {
      const frameIdx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(index)));
      const reversedIdx = (FRAME_COUNT - 1) - frameIdx;
      
      const img = images[reversedIdx];
      if (img) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    render(0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", 
        scrub: 1.5, // Smoother scrub for fluid reverse effect
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          render(progress * (FRAME_COUNT - 1));
          
          if (progress > 0.6) {
            setShowText(true);
          } else {
            setShowText(false);
          }

          if (progress > 0.98) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isLoaded, images]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
            <div className="text-white font-mono tracking-widest animate-pulse">
                INITIALIZING SEQUENCE...
            </div>
        </div>
      )}

      {/* TEXT OVERLAY */}
      <AnimatePresence>
        {showText && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 pointer-events-none"
          >
            <p className="text-2xl md:text-5xl font-mono tracking-[0.2em] text-white uppercase text-center max-w-4xl leading-tight" style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
              Designer by trade,<br/><span className="text-white/50">engineer by curiosity.</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BUTTON OVERLAY */}
      <AnimatePresence>
        {showButton && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-auto"
          >
            <button
              onClick={onEnterSpace}
              className="group relative px-10 py-4 bg-transparent border border-white/20 overflow-hidden transition-all duration-500 hover:border-white/60 pointer-events-auto backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative text-white font-mono tracking-[0.5em] uppercase text-sm md:text-base cursor-none">
                [ Enter Space ]
              </span>
              
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 border border-white/40 pointer-events-none"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";
import ReactLenis from "@studio-freight/react-lenis";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    // Sync ScrollTrigger with Lenis
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1, // Adjust for "butteriness" (0.1 is standard)
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
    const svgRef = useRef(null);

    useEffect(() => {
        const cursor = svgRef.current;
        
        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: "power2.out",
            });
        };

        const handleHover = (e) => {
            // Check if hovering over a button, link, or element with 'cursor-pointer'
            const target = e.target;
            const isClickable = 
                target.tagName === 'A' || 
                target.tagName === 'BUTTON' || 
                target.closest('a') || 
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer';

            if (isClickable) {
                gsap.to(cursor, {
                    scale: 1.5,
                    duration: 0.3,
                    ease: "power2.out"
                });
                cursor.classList.add("cursor-glow");
            } else {
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                cursor.classList.remove("cursor-glow");
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleHover);
        
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleHover);
        };
    }, []);

    return (
        <div
            ref={svgRef}
            className="custom-cursor fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Cursor.svg" alt="tracker" className="w-full h-full" />
        </div>
    );
}
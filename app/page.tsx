"use client";
// Triggering fresh build with latest dependencies
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useRouter } from "next/navigation";

import FloatingNav from "@/components/FloatingNav";
import WorkSection from "@/components/WorkSection";
import ExperienceJourney from "@/components/ExperienceJourney";
import DeskClutter from "@/components/DeskClutter";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Scene from "@/components/Scene";
import CinematicReveal from "@/components/CinematicReveal";

export default function Home() {
    const panX = useRef<number>(0);
    const panY = useRef<number>(0);
    const panningRef = useRef<HTMLDivElement>(null);
    const worldRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const [showNudge, setShowNudge] = useState(false);
    const nudgeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => { setIsMounted(true); }, []);

    // Establish initial GSAP transform (rotateX tilt) after mount
    useEffect(() => {
        if (!isMounted || !panningRef.current) return;
        gsap.set(panningRef.current, { rotateX: 12, x: 0, y: 0 });
    }, [isMounted]);

    // Detect scroll attempts to nudge the user to DRAG instead
    useEffect(() => {
        const handleScrollAttempt = () => {
            setShowNudge(true);
            if (nudgeTimeoutRef.current) clearTimeout(nudgeTimeoutRef.current);
            nudgeTimeoutRef.current = setTimeout(() => setShowNudge(false), 1200);
        };
        window.addEventListener("wheel", handleScrollAttempt, { passive: true });
        window.addEventListener("touchmove", handleScrollAttempt, { passive: true });
        return () => {
            window.removeEventListener("wheel", handleScrollAttempt);
            window.removeEventListener("touchmove", handleScrollAttempt);
        };
    }, []);

    // Nav camera panning via GSAP (animates the panningRef)
    useEffect(() => {
        const LANDMARKS: Record<string, { x: number; y: number }> = {
            intro: { x: 0, y: 0 },
            projects: { x: 50, y: 0 },
            about: { x: -50, y: 0 },
        };

        const handlePan = (e: Event) => {
            window.dispatchEvent(new CustomEvent('cancelCinematicReveal'));
            const id = (e as CustomEvent).detail.id as string;
            const target = LANDMARKS[id];
            if (!panningRef.current || !target) return;

            panX.current = target.x * (window.innerWidth / 100);
            panY.current = target.y * (window.innerHeight / 100);

            gsap.to(panningRef.current, {
                x: panX.current,
                y: panY.current,
                rotateX: 12,
                duration: 1.8,
                ease: "expo.inOut",
            });
        };

        window.addEventListener("panToLandmark", handlePan);
        return () => window.removeEventListener("panToLandmark", handlePan);
    }, []);

    // Native priority listener for Hero button to bypass global drag
    const heroBtnRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const btn = heroBtnRef.current;
        if (!btn) return;
        const onDown = (e: PointerEvent) => {
            e.stopPropagation();
            window.dispatchEvent(new CustomEvent('triggerCinematicReveal'));
        };
        btn.addEventListener('pointerdown', onDown);
        return () => btn.removeEventListener('pointerdown', onDown);
    }, [isMounted]);

    // Pure pointer-drag with boundary clamping
    useEffect(() => {
        if (!isMounted) return;
        const world = worldRef.current;
        if (!world) return;

        const MAX_X = window.innerWidth * 0.8;
        const MAX_Y = window.innerHeight * 0.4;

        let startX = 0, startY = 0;
        let originX = 0, originY = 0;
        let isDragging = false;

        const onPointerDown = (e: PointerEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a') || target.closest('[data-interactive]')) return;
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            originX = panX.current;
            originY = panY.current;
            world.style.cursor = 'grabbing';
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!isDragging || !panningRef.current) return;
            e.preventDefault();
            const rawX = originX + (e.clientX - startX);
            const rawY = originY + (e.clientY - startY);
            panX.current = Math.max(-MAX_X, Math.min(MAX_X, rawX));
            panY.current = Math.max(-MAX_Y, Math.min(MAX_Y, rawY));
            gsap.set(panningRef.current, { x: panX.current, y: panY.current, rotateX: 12 });
        };

        const onPointerUp = () => {
            if (!isDragging) return;
            isDragging = false;
            world.style.cursor = 'grab';
        };

        world.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('pointermove', onPointerMove, { passive: false });
        document.addEventListener('pointerup', onPointerUp);
        document.addEventListener('pointercancel', onPointerUp);

        return () => {
            world.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);
            document.removeEventListener('pointercancel', onPointerUp);
        };
    }, [isMounted]);

    // Handle Cinematic Reveal Fade & Ascend
    useEffect(() => {
        const handleCinematic = () => {
            gsap.to(worldRef.current, { y: typeof window !== 'undefined' ? window.innerHeight : 1000, opacity: 0, duration: 2, ease: "power3.inOut" });
            gsap.to(".custom-cursor", { opacity: 0, duration: 0.5 });
            if (worldRef.current) worldRef.current.style.pointerEvents = 'none';
        };

        const handleCancelCinematic = () => {
            gsap.to(worldRef.current, { y: 0, opacity: 1, duration: 2, ease: "power3.inOut" });
            gsap.to(".custom-cursor", { opacity: 1, duration: 0.5 });
            if (worldRef.current) worldRef.current.style.pointerEvents = 'auto';
        };

        window.addEventListener('triggerCinematicReveal', handleCinematic);
        window.addEventListener('cancelCinematicReveal', handleCancelCinematic);

        return () => {
            window.removeEventListener('triggerCinematicReveal', handleCinematic);
            window.removeEventListener('cancelCinematicReveal', handleCancelCinematic);
        };
    }, []);

    const handleProjectClick = (projectId: string) => {
        if (!panningRef.current) return;
        const tl = gsap.timeline({ onComplete: () => router.push(`/project/${projectId}`) });
        tl.to(panningRef.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" });
        tl.to(".transition-overlay", { opacity: 1, duration: 0.6, ease: "power2.inOut" }, "-=0.2");
    };

    if (!isMounted) return null;

    return (
        <main className="fixed inset-0 bg-[#e8e8e8] text-black overflow-hidden select-none" style={{ perspective: "2000px" }}>
            <CinematicReveal />
            <AnimatePresence>
                {isLoading && (
                    <div className="fixed inset-0 z-[2000]">
                        <Preloader onComplete={() => setIsLoading(false)} />
                    </div>
                )}
            </AnimatePresence>

            <div className="transition-overlay fixed inset-0 bg-white z-[1500] opacity-0 pointer-events-none" />

            <div className="hud-element">
                <Cursor />
                <FloatingNav />
            </div>

            <div className="fixed inset-[-10vw] z-[100] pointer-events-none" style={{ backdropFilter: 'blur(10px)', maskImage: 'radial-gradient(circle at center, transparent 35%, black 85%)', WebkitMaskImage: 'radial-gradient(circle at center, transparent 35%, black 85%)' }} />

            <div ref={worldRef} className="absolute inset-0 w-full h-full cursor-grab z-[200]" style={{ touchAction: "none" }}>
                <div ref={panningRef} className="absolute inset-0 w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
                    <div className="absolute pointer-events-none" style={{ inset: "-5000px", backgroundImage: `linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
                    <div className="absolute inset-0 pointer-events-none z-[1]">
                        <DeskClutter />
                    </div>

                    {/* ══ HERO SECTION ══ */}
                    <section id="intro" className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                        <motion.div data-interactive initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "circOut" }} className="flex flex-col items-center text-center pointer-events-auto">
                            <span className="text-black/40 font-mono text-[10px] uppercase tracking-[0.6em] mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.05)]">Hi there, I&apos;m</span>
                            <h1 className="text-[12vw] md:text-[8vw] font-black tracking-[-0.05em] uppercase leading-[0.8] flex items-center gap-2 md:gap-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-[#1a1a1a]">
                                H
                                <div className="w-[10vw] h-[10vw] md:w-[7vw] md:h-[7vw] relative mx-[-1vw]">
                                    <Scene scale={0.7} />
                                </div>
                                SEEB
                            </h1>
                            <p className="mt-6 text-black/50 text-[10px] font-mono uppercase tracking-[0.5em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.05)]">SYSTEMS ARCHITECT &amp; PRODUCT DESIGNER</p>

                            <motion.button ref={heroBtnRef} whileHover={{ y: -2, rotate: -2 }} whileTap={{ y: 2 }} animate={{ rotate: -1.5 }} data-interactive="true" className="mt-12 group relative px-8 py-3 bg-black text-white font-mono text-[12px] uppercase tracking-[0.4em] transition-all duration-300 pointer-events-auto shadow-[0_4px_0_0_#333] hover:shadow-[0_6px_0_0_#333] active:shadow-none active:translate-y-[4px]">
                                <span className="relative z-10">CONTACT ME</span>
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </motion.button>

                            {/* DRAG HINT (Nudge on scroll attempt) */}
                            <motion.div className={`mt-12 font-mono text-[8px] uppercase tracking-[0.4em] transition-all duration-500 ${showNudge ? 'text-black scale-110 opacity-100' : 'text-black/30 opacity-60'}`}>
                                [ DRAG TO NAVIGATE ]
                            </motion.div>

                            {/* PLUGIN/WIDGET STICKERS - Positioned above HASEEB */}
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex gap-12 pointer-events-none w-max">
                                <div className="pointer-events-auto">
                                    <a href="https://www.figma.com/community/plugin/1574496757447320798/themeseed?q_id=c43ada91-b6e7-4404-b09d-11d580ee3a44" target="_blank" rel="noopener noreferrer">
                                        <motion.img src="/themeseed.png" alt="Themeseed" className="w-20 h-auto drop-shadow-lg rotate-[-12deg] hover:scale-110 transition-transform" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 }} />
                                    </a>
                                </div>
                                <div className="pointer-events-auto">
                                    <a href="https://www.figma.com/community/widget/1464673927630363022/bingo?q_id=1e6e29c4-195f-451d-9a03-9c541455be54" target="_blank" rel="noopener noreferrer">
                                        <motion.img src="/Bingo.png" alt="Bingo" className="w-20 h-auto drop-shadow-lg rotate-[15deg] hover:scale-110 transition-transform" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.7 }} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    <div id="projects" className="absolute left-[-50vw] w-screen h-screen flex items-center justify-center z-20">
                        <WorkSection onProjectOpen={handleProjectClick} />
                    </div>

                    <section id="about" className="absolute left-[50vw] w-screen h-screen flex items-center justify-center z-20">
                        <ExperienceJourney />
                    </section>

                    <div className="absolute top-[80vh] w-screen flex items-center justify-center z-10">
                        <Footer />
                    </div>
                </div>
            </div>
        </main>
    );
}
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "../../../components/WorkSection";

export default function ProjectDetail() {
    const params = useParams();
    const id = params.id as string;
    const currentIndex = PROJECTS.findIndex(p => p.id === id);
    const project = PROJECTS[currentIndex];
    const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

    // Controls the "folder opening" intro sequence
    const [phase, setPhase] = useState<"opening" | "fading" | "done">("opening");

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.cursor = "auto";

        // Phase 1: "folder open" is shown for 1.2s
        const t1 = setTimeout(() => setPhase("fading"), 1200);
        // Phase 2: crossfade lasts 0.6s, then hide overlay
        const t2 = setTimeout(() => setPhase("done"), 1800);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            document.body.style.cursor = "none";
        };
    }, []);

    if (!project) return <div>Project not found</div>;

    return (
        <div className="relative min-h-screen bg-[#f4f1ea] text-black selection:bg-black selection:text-white overflow-hidden">

            {/* ── FOLDER-OPENING INTRO OVERLAY ──────────────────────────────── */}
            <AnimatePresence>
                {phase !== "done" && (
                    <motion.div
                        key="folder-overlay"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: phase === "fading" ? 0 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-[#f4f1ea] pointer-events-none"
                    >
                        {/* Folder graphic */}
                        <div className="relative flex flex-col items-center select-none">

                            {/* Folder tab */}
                            <motion.div
                                initial={{ y: 0 }}
                                animate={{ y: phase === "fading" ? -8 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-32 h-8 bg-[#e0dbcf] rounded-t-lg border border-black/10 self-start ml-6"
                            />

                            {/* Folder body — the "cover" lifts open */}
                            <div className="relative w-[240px] h-[180px]">
                                {/* Back of folder (always visible) */}
                                <div
                                    className="absolute inset-0 rounded-sm bg-[#d9d3c4] border border-black/10"
                                    style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }}
                                />

                                {/* Front cover — rotates open around the top edge */}
                                <motion.div
                                    initial={{ rotateX: 0, transformOrigin: "top center" }}
                                    animate={{
                                        rotateX: phase === "fading" ? -95 : 0,
                                        transformOrigin: "top center",
                                    }}
                                    transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                                    className="absolute inset-0 rounded-sm bg-[#e8e3d8] border border-black/10 flex items-center justify-center"
                                    style={{ transformOrigin: "top center" }}
                                >
                                    {/* Project name on cover */}
                                    <div className="flex flex-col items-center gap-2 opacity-60">
                                        <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-black/40">
                                            {project.category}
                                        </span>
                                        <span className="text-xl font-black uppercase tracking-tighter text-black/70">
                                            {project.title}
                                        </span>
                                    </div>
                                    {/* Paper lines on folder */}
                                    <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-1.5 opacity-20">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="h-px bg-black" />
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Sheets inside folder — appear as cover opens */}
                                <motion.div
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: phase === "fading" ? 1 : 0, y: phase === "fading" ? 0 : 4 }}
                                    transition={{ duration: 0.3, delay: 0.25 }}
                                    className="absolute inset-x-2 top-2 bottom-0 bg-white/80 rounded-sm border border-black/5"
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: phase === "fading" ? 0.6 : 0, y: phase === "fading" ? 4 : 8 }}
                                    transition={{ duration: 0.3, delay: 0.15 }}
                                    className="absolute inset-x-4 top-4 bottom-0 bg-white/50 rounded-sm border border-black/5"
                                />
                            </div>

                            {/* Caption below */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.2, times: [0, 0.3, 1] }}
                                className="mt-6 text-[9px] uppercase tracking-[0.5em] font-bold text-black/30"
                            >
                                Opening file…
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "done" ? 1 : 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="min-h-screen pb-32"
            >
                {/* ARCHIVAL GRAIN OVERLAY */}
                <div
                    className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
                    style={{ backgroundImage: "url('/Book textures/Paper Texture.jpg')", backgroundSize: "400px" }}
                />

                {/* NAV */}
                <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-multiply">
                    <Link
                        href="/"
                        className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold"
                    >
                        <span className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                            ←
                        </span>
                        <span>Back to Workbench</span>
                    </Link>
                    <div className="hidden md:block">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">
                            Registry Vol. 25-04
                        </span>
                    </div>
                </nav>

                {/* HERO */}
                <header className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden pt-28 px-6 md:px-10">
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src={project.img}
                            alt={project.title}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />

                        <div className="absolute bottom-8 left-8 md:bottom-14 md:left-14">
                            <motion.h1
                                initial={{ x: -16, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.25, duration: 0.7 }}
                                className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-white drop-shadow-xl"
                            >
                                {project.title}
                            </motion.h1>
                            <div className="mt-3 flex gap-3">
                                <span className="px-4 py-1.5 border border-white/30 rounded-full text-[10px] uppercase font-bold text-white/80 backdrop-blur-md">
                                    {project.category}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* CONTENT GRID */}
                <section className="max-w-[1400px] mx-auto mt-20 px-6 md:px-10">
                    <div className="flex flex-col md:flex-row gap-20">

                        {/* LEFT: Sticky Metadata */}
                        <aside className="md:w-1/3 md:sticky md:top-32 h-fit flex flex-col gap-10">
                            <div className="flex flex-col gap-3 border-l-2 border-black/5 pl-8">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-30">Role</span>
                                <p className="text-xl font-bold uppercase leading-none">Design Engineer</p>
                            </div>
                            <div className="flex flex-col gap-3 border-l-2 border-black/5 pl-8">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-30">Stack</span>
                                <div className="flex flex-wrap gap-2">
                                    {(project as any).tech?.map((t: string) => (
                                        <span key={t} className="px-3 py-1 bg-black/5 rounded text-[11px] font-bold uppercase">{t}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 border-l-2 border-black/5 pl-8">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-30">Metrics</span>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries((project as any).stats || {}).map(([key, val]) => (
                                        <div key={key}>
                                            <p className="text-2xl font-black">{val as string}</p>
                                            <p className="text-[9px] uppercase font-bold opacity-40">{key.replace(/_/g, ' ')}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* RIGHT: Narrative */}
                        <div className="md:w-2/3 flex flex-col gap-24">
                            <article>
                                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">
                                    Concept &amp; Execution
                                </h2>
                                <p className="text-xl md:text-3xl leading-snug text-black/80 font-medium">
                                    {(project as any).overview}
                                </p>
                            </article>

                            {/* CHALLENGE */}
                            <div className="flex flex-col md:flex-row gap-10 border-t border-black/10 pt-16">
                                <h3 className="md:w-1/3 text-[10px] uppercase font-black tracking-[0.4em] text-black/30 shrink-0">
                                    The Challenge
                                </h3>
                                <p className="md:w-2/3 text-xl md:text-2xl font-bold leading-snug">
                                    {(project as any).challenge}
                                </p>
                            </div>

                            {/* STRATEGY */}
                            <div className="flex flex-col md:flex-row gap-10 border-t border-black/10 pt-16">
                                <h3 className="md:w-1/3 text-[10px] uppercase font-black tracking-[0.4em] text-[#00c878] shrink-0">
                                    The Strategy
                                </h3>
                                <p className="md:w-2/3 text-xl md:text-2xl font-bold leading-snug">
                                    {(project as any).solution}
                                </p>
                            </div>

                            {/* BEHANCE LINK */}
                            {(project as any).behance && (
                                <div className="mt-8">
                                    <a 
                                        href={(project as any).behance} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm rounded-full hover:scale-105 transition-transform"
                                    >
                                        View Full Case Study on Behance
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* CYBER HUD DECORATION */}
                <div className="fixed bottom-10 right-10 pointer-events-none opacity-20">
                    <p className="text-[10px] font-mono whitespace-pre text-black">
                        {`POS_X: 124.5\nPOS_Y: -80.2\nZOOM_LVL: 1.25\nREND_STAT: OPTIMIZED`}
                    </p>
                </div>

                {/* FOOTER */}
                <footer className="mt-40 border-t border-black/5 py-20 px-10 text-center flex flex-col items-center">
                    <Link
                        href={`/project/${nextProject.id}`}
                        className="text-[10vw] font-black uppercase tracking-tighter text-black/10 hover:text-black transition-colors duration-500"
                    >
                        Next_Project
                    </Link>
                    <p className="mt-4 text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">
                        Continue to {nextProject.title}
                    </p>
                    <Link
                        href="/"
                        className="mt-12 px-6 py-2 border border-black/10 rounded-full text-[9px] uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-colors"
                    >
                        Return to Home
                    </Link>
                </footer>
            </motion.main>
        </div>
    );
}

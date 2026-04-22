"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const PROJECTS = [
    {
        id: "cognicor",
        title: "Cognicor",
        category: "01 / Tech",
        image: "/Project Thumbnails/Cognicor.png",
        img: "/Project Thumbnails/Cognicor.png",
        x: -240, y: -220, rotate: -12, z: 10,
        overview: "A next-generation AI platform for financial services, built with spatial UX principles and real-time data visualisation.",
        challenge: "Translate complex institutional workflows into a frictionless conversational interface accessible to non-technical users.",
        solution: "Designed a modular AI assistant layer with contextual card stacks, inline visualisations, and a drag-based data pipeline builder.",
        tech: ["React", "Three.js", "Python", "WebSockets"],
        stats: { Conversion: "+34%", Load_Time: "0.8s", Users: "12K+", Score: "98" },
        behance: "https://www.behance.net/gallery/215389845/Homepage-Design-Cognicor-Website-Revamp-2024"
    },
    {
        id: "haladin",
        title: "Haladin",
        category: "02 / App",
        image: "/Project Thumbnails/haladin.png",
        img: "/Project Thumbnails/haladin.png",
        x: 260, y: -120, rotate: 8, z: 20,
        overview: "A premium lifestyle app bridging curated local experiences with an elegant, swipe-first mobile interface.",
        challenge: "Make discovery feel effortless - reducing the average time-to-booking from 8 minutes to under 90 seconds.",
        solution: "Introduced a gesture-driven content grid, contextual micro-animations, and a smart geo-personalisation engine.",
        tech: ["React Native", "Expo", "Supabase", "Mapbox"],
        stats: { Retention: "+52%", Booking_Time: "88s", Rating: "4.9★", Downloads: "50K" },
        behance: "https://www.behance.net/gallery/201843891/Haladin-Halal-Shopping-App-UIUX-Case-Study-2020"
    },
    {
        id: "freeze-fusion",
        title: "Freeze Fusion",
        category: "03 / Agency",
        image: "/Project Thumbnails/Freeze fusion food.png",
        img: "/Project Thumbnails/Freeze fusion food.png",
        x: -220, y: 180, rotate: -5, z: 30,
        overview: "Brand identity and digital presence for an artisan ice cream label expanding across Southeast Asia.",
        challenge: "Stand out in a saturated F&B market while communicating craft, quality, and playful energy simultaneously.",
        solution: "Developed a warm-cool duotone brand system, illustrated ingredient iconography, and a scroll-driven product showcase.",
        tech: ["Figma", "Next.js", "GSAP", "Lottie"],
        stats: { Brand_Recall: "+41%", Dwell_Time: "3.2min", Regions: "4", Revenue: "+28%" },
        behance: "https://www.behance.net/gallery/204723251/Freeze-Fusion-Foods-Ecommerce-Project"
    },
    {
        id: "comfort-king",
        title: "Comfort King",
        category: "04 / E-com",
        image: "/Project Thumbnails/Comfortking.png",
        img: "/Project Thumbnails/Comfortking.png",
        x: 320, y: 150, rotate: 15, z: 15,
        overview: "A premium direct-to-consumer furniture brand with an immersive 3D product configurator.",
        challenge: "Reduce return rates caused by customers being unable to visualise how furniture fits their real space.",
        solution: "Built an AR-integrated product viewer with room-scale placement, material swatching and a live price calculator.",
        tech: ["Three.js", "AR.js", "Shopify", "Tailwind"],
        stats: { Return_Rate: "-62%", Avg_Order: "+$180", Conversion: "+19%", Reviews: "4.8★" },
        behance: "https://www.behance.net/gallery/208357177/Comfort-King-Sleep-Craft-Logo-and-Branding"
    },
    {
        id: "qbikes",
        title: "Qbikes",
        category: "05 / Mobility",
        image: "/Project Thumbnails/Qbikes.png",
        img: "/Project Thumbnails/Qbikes.png",
        x: 20, y: 40, rotate: 2, z: 40,
        overview: "A smart urban micro-mobility platform connecting riders with real-time e-bike availability across Dubai.",
        challenge: "Design a zero-friction booking experience that works seamlessly in high-heat, high-glare outdoor conditions.",
        solution: "Created a bold high-contrast UI system, glanceable map layer, and a one-tap reserve-and-ride flow optimised for single-thumb use.",
        tech: ["Flutter", "Firebase", "Google Maps API", "Node.js"],
        stats: { Daily_Rides: "8K+", Booking_Time: "22s", NPS: "72", Fleet_Util: "89%" },
        behance: "https://www.behance.net/gallery/201615287/Q-Bikes"
    }
];

interface WorkSectionProps {
    onProjectOpen?: (projectId: string, cardRef: React.RefObject<HTMLDivElement>) => void;
}

export default function WorkSection({ onProjectOpen }: WorkSectionProps) {
    return (
        <section className="relative w-screen h-screen flex items-center justify-center">
            {/* BACKGROUND TEXT */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden h-screen z-0">
                <h2 className="text-[10vw] font-black text-black/[0.04] uppercase tracking-tighter -rotate-6 whitespace-nowrap leading-[0.8] text-center italic">
                    Selected<br/>Projects
                </h2>
            </div>

            {/* ORGANIC STACK CONTAINER */}
            <div className="relative w-[800px] h-[800px] scale-[0.5] sm:scale-75 md:scale-100">
                {PROJECTS.map((project, i) => (
                    <ProjectFolder 
                        key={project.id} 
                        project={project} 
                        index={i} 
                        onOpen={() => onProjectOpen?.(project.id, { current: null } as any)} 
                    />
                ))}
            </div>
        </section>
    );
}

function ProjectFolder({ project, index, onOpen }: { project: any, index: number, onOpen: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const localX = useRef(project.x);
    const localY = useRef(project.y);

    // Raw pointer drag for each card (avoids Framer vs page-drag conflict)
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;
        let startX = 0, startY = 0, originX = 0, originY = 0;
        let dragged = false;
        let isDown = false;

        const onDown = (e: PointerEvent) => {
            e.stopPropagation();
            isDown = true;
            dragged = false;
            startX = e.clientX; startY = e.clientY;
            originX = localX.current; originY = localY.current;
            card.setPointerCapture(e.pointerId);
            card.style.cursor = 'grabbing';
            card.style.zIndex = '200';
            card.style.transition = 'none';
        };
        const onMove = (e: PointerEvent) => {
            if (!isDown) return;
            const multiplier = e.pointerType === 'touch' ? 1.5 : 1;
            const dx = (e.clientX - startX) * multiplier;
            const dy = (e.clientY - startY) * multiplier;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragged = true;
            localX.current = originX + dx;
            localY.current = originY + dy;
            card.style.transform = `translate(calc(-50% + ${localX.current}px), calc(-50% + ${localY.current}px)) rotate(${project.rotate}deg)`;
        };
        const onUp = () => {
            if (!isDown) return;
            isDown = false;
            card.style.cursor = 'grab';
            card.style.zIndex = String(project.z);
            card.style.transition = 'transform 0.3s ease';
            card.style.transform = `translate(calc(-50% + ${localX.current}px), calc(-50% + ${localY.current}px)) rotate(${project.rotate}deg)`;
            if (!dragged) onOpen();
        };

        card.addEventListener('pointerdown', onDown);
        card.addEventListener('pointermove', onMove);
        card.addEventListener('pointerup', onUp);
        card.addEventListener('pointercancel', onUp);
        return () => {
            card.removeEventListener('pointerdown', onDown);
            card.removeEventListener('pointermove', onMove);
            card.removeEventListener('pointerup', onUp);
            card.removeEventListener('pointercancel', onUp);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            data-interactive
            className="group"
            style={{
                position: 'absolute',
                left: '50%', top: '50%',
                transform: `translate(calc(-50% + ${project.x}px), calc(-50% + ${project.y}px)) rotate(${project.rotate}deg)`,
                zIndex: project.z,
                width: 300, height: 420,
                cursor: 'grab',
            }}
        >
            {/* MANILA FOLDER FRAME */}
            <div className="absolute inset-0 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-black/10" style={{ backgroundColor: ["#e1d3c1", "#cce3de", "#e2ece9", "#f6eee3", "#f2c6de"][index % 5] }}>
                {/* PAPER TEXTURE */}
                <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url('/Book textures/Paper Texture.jpg')", backgroundSize: "cover" }} />

                {/* CONTENT IMAGE */}
                <div className="absolute inset-3 bottom-24 bg-black/90 overflow-hidden rounded-[2px] pointer-events-none">
                    <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill
                        draggable={false} 
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 pointer-events-none" 
                    />
                </div>

                {/* FOOTER INFO */}
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                    <div>
                        <span className="text-[8px] font-mono text-black/30 uppercase tracking-widest block mb-1">{project.category}</span>
                        <h3 className="text-2xl font-black text-black/80 uppercase tracking-tighter italic leading-none">{project.title}</h3>
                    </div>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onOpen(); }}
                        onPointerDown={(e) => { e.stopPropagation(); }}
                        className="px-4 py-2 bg-black text-white font-mono text-[8px] uppercase tracking-widest rounded-full hover:bg-black/80 transition-colors pointer-events-auto"
                    >
                        View
                    </button>
                </div>

                {/* DEPTH SHADOW */}
                <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
            </div>

            {/* FOLDER TAB - Moved outside overflow-hidden to fix shadow clipping */}
            <div className="absolute top-0 left-0 w-48 h-12 -translate-y-[95%] rounded-t-2xl flex items-center px-6 border-t border-l border-r border-black/10" style={{ backgroundColor: ["#d2c4b2", "#bdd4cf", "#d3ddda", "#e7dfd4", "#e3b7cf"][index % 5] }}>
                <span className="text-[11px] font-black text-black/40 uppercase tracking-[0.3em] overflow-hidden whitespace-nowrap text-ellipsis px-2">FILE_{100 + index}</span>
            </div>

            {/* STACKED PAGES DEPTH EFFECT */}
            <div className="absolute inset-0 bg-white/5 -z-10 translate-x-1 translate-y-1 rounded-lg" />
        </div>
    );
}
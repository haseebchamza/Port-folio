"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useVideoTexture, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import ParticleText from "./ParticleText";

function RevealScene({ isRevealed, onVideoEnd }: { isRevealed: boolean, onVideoEnd: () => void }) {
    const videoTex = useVideoTexture("/Myvid.mp4", {
        muted: true,
        loop: false,
        playsInline: true,
        start: false,
    });

    const matRef = useRef<THREE.MeshBasicMaterial>(null);

    // Apply linear filtering and disable toneMapping
    useEffect(() => {
        if (videoTex) {
            videoTex.minFilter = THREE.LinearFilter;
            videoTex.magFilter = THREE.LinearFilter;
            videoTex.format = THREE.RGBAFormat;
            
            if (videoTex.image) {
                videoTex.image.onended = onVideoEnd;
            }
        }
    }, [videoTex, onVideoEnd]);

    useEffect(() => {
        if (isRevealed && videoTex?.image) {
            videoTex.image.currentTime = 0;
            videoTex.image.play();
        } else if (!isRevealed && videoTex?.image) {
            videoTex.image.pause();
        }
    }, [isRevealed, videoTex]);

    // Simple Material Fade-in/out
    useFrame((state, delta) => {
        if (matRef.current) {
            matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, isRevealed ? 1 : 0, 0.02);
        }
    });

    return (
        <>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={2} />

            {/* Vertical Video Plane aligned with camera */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[160, 90]} />
                <meshBasicMaterial ref={matRef} map={videoTex} toneMapped={false} transparent opacity={0} />
            </mesh>

            {/* Particle Swarm Representation (Simulated for depth) */}
            {isRevealed && (
                <group position={[0, 5, 20]}>
                    <points>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                count={100}
                                args={[new Float32Array(300).fill(0).map(() => (Math.random() - 0.5) * 50), 3]}
                            />
                        </bufferGeometry>
                        <pointsMaterial size={0.5} color="white" transparent opacity={0.6} />
                    </points>
                </group>
            )}
        </>
    );
}

export default function CinematicReveal() {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    useEffect(() => {
        const handleTrigger = () => {
            setIsRevealed(true);
            setIsVideoEnded(false);
        };
        const handleCancel = () => setIsRevealed(false);
        
        window.addEventListener('triggerCinematicReveal', handleTrigger);
        window.addEventListener('cancelCinematicReveal', handleCancel);
        return () => {
            window.removeEventListener('triggerCinematicReveal', handleTrigger);
            window.removeEventListener('cancelCinematicReveal', handleCancel);
        };
    }, []);

    return (
        <div className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-[2000ms] ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
            <Canvas
                gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
                camera={{ position: [0, 0, 80], fov: 45 }}
                onCreated={({ camera }) => {
                    camera.lookAt(0, 0, 0);
                }}
            >
                <color attach="background" args={['#e8e8e8']} />
                <RevealScene isRevealed={isRevealed} onVideoEnd={() => setIsVideoEnded(true)} />
            </Canvas>

            {/* POST-REVEAL HUD OVERLAY */}
            <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ${isRevealed ? 'opacity-100 pointer-events-auto delay-[1500ms]' : 'opacity-0 pointer-events-none'}`}>
                
                {/* Close Escape Hatch - Circle with X */}
                <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('cancelCinematicReveal'))}
                    className="absolute top-10 right-10 md:top-16 md:right-16 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-black/10 hover:bg-white/40 hover:scale-110 transition-all group"
                    aria-label="Close"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* HBC Swarm Centered vertically and horizontally */}
                <div className="w-full h-[300px] pointer-events-none mix-blend-difference select-none flex items-center justify-center">
                    <ParticleText text="© HBC" />
                </div>

                {/* Interaction Buttons Layer - Now positioned below swarm */}
                <div className="flex flex-col items-center gap-8 mt-4">
                    {/* Reach Out CTA */}
                    <a 
                        href="mailto:haseebc1999@gmail.com"
                        className="group relative px-12 py-5 bg-black text-white font-mono text-[14px] uppercase tracking-[0.5em] transition-all hover:scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                    >
                        REACH OUT
                        <div className="absolute inset-0 border border-white/20 translate-x-2 translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                    </a>

                    {/* Bottom Social Layer */}
                    <div className="flex gap-8 md:gap-16 pointer-events-auto scale-75 md:scale-100 transition-opacity duration-1000" style={{ opacity: isVideoEnded ? 1 : 0.8 }}>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group text-black font-mono text-[10px] uppercase tracking-[0.4em] transition-colors border border-black/10 hover:border-black/30 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md">
                            <img src="/linkedin.svg" alt="LinkedIn" className="w-4 h-4" />
                            LinkedIn
                        </a>
                        <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group text-black font-mono text-[10px] uppercase tracking-[0.4em] transition-colors border border-black/10 hover:border-black/30 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md">
                            <img src="/behance.svg" alt="Behance" className="w-4 h-4" />
                            Behance
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

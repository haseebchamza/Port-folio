"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import { useMemo, useRef, Component } from "react";
import * as THREE from "three";

// Simple fallback
function CursorFallback() {
    return (
        <div className="w-full h-full flex items-center justify-center opacity-20">
            <div className="w-12 h-12 border-2 border-black rotate-45" />
        </div>
    );
}

class WebGLBoundary extends Component {
    state = { crashed: false };
    static getDerivedStateFromError() { return { crashed: true }; }
    render() { return this.state.crashed ? <CursorFallback /> : this.props.children; }
}

function Model({ url, scale }) {
    const mesh = useRef();
    const { scene } = useGLTF(url);

    const cloned = useMemo(() => {
        const c = scene.clone();
        c.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshPhysicalMaterial({
                    color: 0xffffff,
                    metalness: 0.9,
                    roughness: 0.1,
                    clearcoat: 1.0,
                    clearcoatRoughness: 0.1,
                });
            }
        });
        return c;
    }, [scene]);

    useFrame((state, delta) => {
        if (!mesh.current) return;
        mesh.current.rotation.y += delta * 0.8;
    });

    return (
        <group ref={mesh}>
            <Center><primitive object={cloned} scale={scale} position={[0, -0.15, 0]} /></Center>
        </group>
    );
}

export default function Scene({
    className = "absolute inset-0 z-10 pointer-events-none flex items-center justify-center",
    scale = 0.3
}) {
    return (
        <div className={className} style={{ pointerEvents: 'none' }}>
            <WebGLBoundary>
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 35 }}
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                >
                    <ambientLight intensity={0.8} />
                    <pointLight position={[5, 10, 5]} intensity={20} />
                    <Model url="/models/pointer.glb" scale={scale} />
                </Canvas>
            </WebGLBoundary>
        </div>
    );
}
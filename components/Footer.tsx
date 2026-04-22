"use client";
import React from "react";
import { motion } from "framer-motion";
import { Globe, Link, Mail, ExternalLink, MessageSquare } from "lucide-react";

import ParticleText from "./ParticleText";
import Image from "next/image";

export default function Footer() {
    return (
        <section className="relative min-h-[10vh] flex flex-col items-center justify-center py-10 overflow-hidden bg-transparent">
            
            {/* COPYRIGHT FOOTER */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-7xl px-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.3em]">
                    © 2026 HSBLABS.SITE — All rights reserved
                </p>
                <div className="flex items-center gap-6">
                    <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.3em]">
                        Built with Antigravity
                    </p>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
            </div>

        </section>
    );
}

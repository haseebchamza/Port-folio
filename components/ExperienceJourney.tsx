"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ── CONTENT DATA ──────────────────────────────────────────────────────────────

const ABOUT_BIO =
  "Visual & Product Designer with 6+ years of experience crafting user-centered digital solutions across real estate, fintech, and SaaS. Known for blending data-driven UX with strong visual execution — and increasingly, building my own tools using AI. Comfortable owning design end-to-end, from strategy to shipping.";

const JOBS = [
  {
    company: "Provident Real Estate",
    role: "UI/UX Designer",
    period: "Apr 2025 – Present",
    points: [
      "Data-Driven Landing Page Design: Leveraged Hotjar heatmaps, session recordings, and user behaviour insights alongside real market data to design and optimize high-converting landing pages — achieving ~30% improvement in conversion rates.",
      "Multi-Platform Digital Design: Designed end-to-end web experiences across Provident's ecosystem including off-plan property pages, developer profiles, area guides, and roadshow pages — ensuring brand consistency.",
      "Real Estate Market-Informed UX: Translated real market insights and property data into intuitive, visually compelling layouts that effectively communicate off-plan developments.",
      "AI-Accelerated Design Workflow: Utilized Figma Make and other AI design tools to speed up production and iterate rapidly on campaign assets.",
    ],
  },
  {
    company: "Union Square House",
    role: "Visual Designer",
    period: "Mar 2025 – Present",
    points: [
      "UI/UX Design for Real Estate Campaigns: Directed the creation of responsive landing pages for luxury real estate projects, ensuring high engagement and seamless user experience.",
      "Marketing-Focused Visual Content Creation: Designed a wide range of digital assets including social media posts, reels, and paid ad creatives tailored for performance marketing.",
      "Cross-Functional Collaboration & Execution: Worked closely with marketing, sales, and branding teams to ensure visual consistency and alignment.",
      "Performance-Driven Design Outcomes: Contributed to lead generation success through optimized landing page designs that improved conversion rates.",
      "Creative Support for High-Value Deals: Delivered impactful visuals and marketing collateral for major property deals.",
    ],
  },
  {
    company: "Aqary International Holding",
    role: "Product Designer",
    period: "Dec 2023 – Jan 2025",
    points: [
      "Strategic Digital Product Design & Leadership: Directed the design of key in-house digital products including websites, mobile apps, and the Aqary dashboard.",
      "Collaborative Cross-Functional Design Execution: Partnered effectively with diverse teams to maintain design consistency and achieve project goals.",
      "Complex Design Problem Solving & Innovation: Resolved intricate design challenges related to complex dashboards and websites.",
      "Award-Winning User-Centered Design: Prioritized intuitive designs, earning \u2018Designer of the Month\u2019 recognition for outstanding contributions.",
      "Stakeholder-Driven Design Approval: Managed stakeholder communication, design evaluation, and maintained high-quality standards.",
    ],
  },
  {
    company: "StratAgile",
    role: "Creative Designer",
    period: "Dec 2020 – Nov 2023",
    points: [
      "Multichannel Digital Asset Design: Conceptualized and delivered engaging digital assets (websites, mobile apps, videos) to enhance user experience across diverse platforms.",
      "Strategic Creative Design Leadership: Directed creative design processes for high-profile projects, ensuring alignment with client branding objectives.",
      "Business Development through Design Innovation: Secured major contracts with Codashop (Malaysia, Philippines) demonstrating persuasive presentation capabilities.",
      "Cross-Functional Strategy Implementation: Collaborated with teams to execute design strategies that supported marketing campaigns and business goals.",
      "Efficient Design Execution & Delivery: Delivered high-quality designs within tight deadlines, consistently exceeding client expectations.",
    ],
  },
  {
    company: "Freelance Designer",
    role: "Creative Director",
    period: "Dec 2019 – 2020",
    points: [
      "Website & App Design: Created intuitive and visually appealing website and app designs.",
      "Digital & Print Media: Developed digital assets, company profiles, logos, posters, banners, and design patterns.",
      "Conceptualization & Execution: Conceptualized visually compelling design ideas aligning with client goals and brand identity.",
      "User-Centric Design: Understood product specifications and user psychology to enhance user experience.",
      "Client Communication: Effectively communicated with clients, incorporating feedback for successful project outcomes.",
    ],
  },
];

// ── SHARED STYLE ──────────────────────────────────────────────────────────────
const PAPER_BG = {
  backgroundImage: "url('/Book textures/Paper Texture.jpg')",
  backgroundSize: "cover",
  backgroundColor: "#ede7da",
};

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function RuledLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.05]">
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} className="border-b border-black" style={{ height: 24 }} />
      ))}
    </div>
  );
}

// ── PAGE COMPONENTS ───────────────────────────────────────────────────────────

function PagePhoto() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 overflow-hidden relative">
      <RuledLines />
      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* Photo polaroid */}
        <div className="relative bg-white p-2 md:p-3 shadow-xl -rotate-2 border border-black/5" style={{ width: 180, height: 220 }}>
          <div className="relative w-full bg-black overflow-hidden shadow-inner" style={{ height: "82%" }}>
            <Image src="/Banner image.png" alt="Haseeb Hamza" fill className="object-cover grayscale contrast-110" />
            <div className="absolute inset-0 bg-yellow-400/10 mix-blend-overlay" />
          </div>
          <div className="flex items-center justify-center font-mono text-[10px] md:text-xs italic text-black/40 tracking-widest uppercase font-bold" style={{ height: "18%" }}>
            Haseeb Hamza
          </div>
          {/* Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-amber-100/70 -rotate-3 opacity-80" />
        </div>
      </div>
    </div>
  );
}

function PageBio() {
  return (
    <div className="w-full h-full flex flex-col p-6 md:p-8 overflow-hidden relative justify-center">
      <RuledLines />
      <div className="relative z-10 flex flex-col gap-4 max-w-[260px]">
        <div className="border-b border-black/10 pb-2 mb-1">
          <span className="text-[7px] font-mono uppercase tracking-[0.4em] text-black/25">ABOUT ME</span>
        </div>
        <h3 className="font-caveat text-xl font-black text-black/80 italic leading-tight">
          Hi, I&apos;m Haseeb Hamza.
        </h3>
        <p className="font-caveat text-[13px] md:text-[14px] text-black/60 leading-relaxed italic">{ABOUT_BIO}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {["UI/UX", "Product Design", "Visual Design", "Figma", "AI Tools", "Real Estate"].map(t => (
            <span key={t} className="px-2 py-0.5 bg-black/5 rounded text-[8px] font-mono uppercase text-black/40 tracking-wider border border-black/5">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageJob({ job }: { job: typeof JOBS[0] }) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative">
      <RuledLines />
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="px-6 md:px-8 pt-6 pb-3 border-b border-black/10 shrink-0">
          <span className="text-[7px] font-mono uppercase tracking-[0.4em] text-black/25">{job.period}</span>
          <h3 className="font-caveat text-[clamp(1.2rem,2.2vw,1.6rem)] font-black text-black/85 italic leading-tight mt-0.5">
            {job.company}
          </h3>
          <p className="font-caveat text-[11px] text-black/45 font-bold uppercase tracking-wide">— {job.role}</p>
        </div>
        {/* Bullets */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-4" style={{ scrollbarWidth: "none" }}>
          <ul className="space-y-3">
            {job.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-black/30 mt-[6px] shrink-0" />
                <p className="font-caveat text-[12px] md:text-[13px] text-black/60 italic leading-snug">{pt}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PageCta() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
      <RuledLines />
      <div className="absolute top-0 w-full h-2 bg-black/5" />
      <div className="absolute bottom-0 w-full h-2 bg-black/5" />
      
      <div className="relative z-10 flex flex-col items-center gap-4">
        <span className="text-[7px] font-mono uppercase tracking-[0.5em] text-black/20 block">FINAL PAGE</span>
        <h2 className="font-caveat text-[clamp(1.4rem,3vw,2.2rem)] font-black text-black/80 italic leading-tight uppercase tracking-tight">
          LET’S BUILD THE<br />NEXT CHAPTER
        </h2>
        <p className="font-caveat text-sm text-black/45 italic max-w-[200px] leading-relaxed">
          Great work starts with a conversation. Open to new opportunities.
        </p>
        <a
          href="mailto:haseebc1999@gmail.com"
          onClick={e => e.stopPropagation()}
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white font-mono text-[8px] uppercase tracking-[0.25em] rounded-full hover:bg-black/80 transition-colors pointer-events-auto"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          haseebc1999@gmail.com
        </a>
      </div>
    </div>
  );
}

function BlankPage() {
  return (
    <div className="w-full h-full flex items-center justify-center relative opacity-30">
      <RuledLines />
      <span className="font-caveat text-[8px] uppercase tracking-widest text-black/10">Blank Sheet</span>
    </div>
  );
}

// ── BOOK PAGES DATA ──
// Spread-based model: Every sheet has content on both sides.
const SHEETS = [
  // Sheet 0: Cover flips to show Photo (inside left)
  {
    isCover: true,
    front: (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center shadow-[inset_10px_0_30px_rgba(0,0,0,0.5)] bg-[#1a1a1a]"
        style={{ backgroundImage: "url('/Book textures/cover_texture.jpg')", backgroundSize: "cover" }}
      >
        <div className="w-full h-full border-2 border-black/20 rounded-sm flex flex-col items-center justify-center p-8 bg-black/10 shadow-inner">
          <h2 className="text-3xl md:text-5xl font-black text-black/85 uppercase tracking-tighter italic leading-[0.85]">
            Experience<br />Archive
          </h2>
          <p className="mt-4 text-black/40 text-[8px] md:text-[10px] font-mono tracking-[0.4em] uppercase font-bold">REGISTRY VOL. 01</p>
          <div className="mt-4 w-8 h-0.5 bg-black/30" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
      </div>
    ),
    back: <PagePhoto /> 
  },
  // Sheet 1: Bio flips to show Job 0
  {
    front: <PageBio />,
    back: <PageJob job={JOBS[0]} />
  },
  // Sheet 2: Job 1 flips to show Job 2
  {
    front: <PageJob job={JOBS[1]} />,
    back: <PageJob job={JOBS[2]} />
  },
  // Sheet 3: Job 3 flips to show Job 4
  {
    front: <PageJob job={JOBS[3]} />,
    back: <PageJob job={JOBS[4]} />
  },
  // Sheet 4: Final Content (CTA)
  // We don't flip this one to a blank back; it's the anchor of the right side.
  {
    front: <PageCta />,
    back: <BlankPage />
  }
];

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────

export default function ExperienceJourney() {
  const [currentFlip, setCurrentFlip] = useState(0); 
  // We subtract 1 from maxFlips because the last sheet (CTA) is the terminal page and shouldn't be flipped.
  const maxFlips = SHEETS.length - 1;
  
  const isOpen = currentFlip > 0;

  const nextFlip = () => setCurrentFlip(p => Math.min(p + 1, maxFlips));
  const prevFlip = () => setCurrentFlip(p => Math.max(p - 1, 0));

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none pointer-events-none pt-20">
      
      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="absolute inset-[-3000px] z-0 pointer-events-auto" 
          onPointerDown={() => setCurrentFlip(0)} 
        />
      )}

      <div className="relative z-10 flex items-end gap-10 md:gap-14 pointer-events-none">

        {/* FOUNTAIN PEN moved to AFTER the book */}
        <motion.div
          className="relative pointer-events-auto"
          style={{ perspective: "2500px" }} // Increased perspective for deeper flip
          animate={{ scale: isOpen ? 1.05 : 1, y: isOpen ? 25 : 0, rotateZ: isOpen ? 0 : -8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Book bounding box (Right half of the spread initially, expands to full spread) */}
          <motion.div
            className="relative w-[85vw] md:w-[45vw] max-w-[380px] h-[75vh] md:h-[65vh] max-h-[550px]"
          >

            {/* ── BASE RIGHT COVER (The Back of the Book) ── */}
            <div
              className="absolute inset-0 rounded-r-lg shadow-[8px_8px_40px_rgba(0,0,0,0.25)] border-l border-black/5"
              style={{ ...PAPER_BG, backgroundColor: "#d4c5b2", zIndex: -1 }}
            >
                <div className="absolute left-0 w-4 h-full bg-gradient-to-r from-black/10 to-transparent" />
            </div>

            {/* ── STACK OF SHEETS ── */}
            {/* Rendered back-to-front so lower sheets (higher index) are physically lower in the un-flipped stack */}
            {SHEETS.map((sheet, index) => {
              const isFlipped = currentFlip > index; 
              // If un-flipped: smaller index is on TOP (z = 100 - index). 
              // If flipped: smaller index goes to BOTTOM of left stack (z = index).
              const zIndex = isFlipped ? index : (100 - index);
              
              // Slight physical thickness displacement for realism
              // Removed 3D depth to prevent intersection clipping; using pure zIndex stacking instead.
              const targetZIndex = isFlipped ? index : (100 - index);

              return (
                <motion.div
                  key={index}
                  className="absolute inset-0 cursor-pointer origin-left"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Click the sheet itself to toggle it
                    if (isFlipped) prevFlip(); 
                    else nextFlip();
                  }}
                  initial={false}
                  animate={{ 
                    rotateY: isFlipped ? -179.9 : 0, // Using 179.9 to avoid edge-case rendering issues at exactly 180
                    zIndex: targetZIndex
                  }}
                  transition={{ 
                    duration: 1.0, 
                    ease: [0.645, 0.045, 0.355, 1], // Cubic-bezier for more natural "weight"
                    zIndex: { delay: isFlipped ? 0.35 : 0.6, duration: 0.01 } // Delay z-change until vertical
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  
                  {/* FRONT FACE (Shows when on right) */}
                  <div
                    className="absolute inset-0 rounded-r-md border-l border-black/5"
                    style={{ 
                      backfaceVisibility: "hidden", 
                      WebkitBackfaceVisibility: "hidden",
                      ...(sheet.isCover ? {} : PAPER_BG),
                      boxShadow: isFlipped ? "none" : "-2px 0 10px rgba(0,0,0,0.05)"
                    }}
                  >
                    {sheet.front}
                    {/* Inner Right Shadow (spine bend) */}
                    {!sheet.isCover && <div className="absolute top-0 left-0 bottom-0 w-6 bg-gradient-to-r from-black/15 to-transparent pointer-events-none" />}
                  </div>

                  {/* BACK FACE (Shows when turned to the left) */}
                  <div
                    className="absolute inset-0 rounded-l-md border-r border-black/5"
                    style={{ 
                      backfaceVisibility: "hidden", 
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)", 
                      ...PAPER_BG,
                      boxShadow: isFlipped ? "2px 0 10px rgba(0,0,0,0.05)" : "none"
                    }}
                  >
                    {sheet.back}
                    {/* Inner Left Shadow (spine bend) */}
                    <div className="absolute top-0 right-0 bottom-0 w-6 bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />
                  </div>

                </motion.div>
              );
            })}

          </motion.div>
        </motion.div>
      </div>

      {/* Page indicator below book */}
      <div className="mt-8 flex flex-col items-center gap-2 pointer-events-none">
        <p className="text-black/50 text-[9px] uppercase font-mono tracking-[0.4em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)] font-bold">
          {isOpen ? `Spread ${currentFlip} / ${maxFlips}` : "Click cover to open archive"}
        </p>
        {isOpen && (
          <div className="flex gap-2">
            {Array.from({ length: maxFlips }, (_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i + 1 === currentFlip ? 16 : 4,
                  height: 4,
                  background: i + 1 === currentFlip ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.15)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

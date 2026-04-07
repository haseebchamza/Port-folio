import Scene from "@/components/Scene";
import Cursor from "@/components/Cursor";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      {/* Precision SVG Tracker */}
      <Cursor />

      {/* 3D GLB Asset */}
      <Scene />

      {/* SECTION 1: THE IMAGE JOURNEY */}
      <section className="relative h-[150vh] w-full flex items-center justify-center">
        {/* Vibe: The image stays mostly static while we scroll past it */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Image
            src="/me-center.jpg"
            alt="HSB"
            fill
            className="object-cover opacity-50 grayscale"
            priority
          />
          {/* Subtle vignette to blend into the black of the page */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black" />
        </div>

        {/* Floating Text that moves faster than the scroll */}
        <div className="absolute z-30 text-center mix-blend-difference">
          <h1 className="text-[15vw] font-black tracking-tighter uppercase leading-[0.8] italic">
            HSB_LABS
          </h1>
          <p className="text-[1vw] tracking-[1em] uppercase mt-10 opacity-70">
            Creative Direction / Technical Execution
          </p>
        </div>
      </section>

      {/* SECTION 2: WORK PREVIEW */}
      <section className="relative h-screen flex items-center justify-center bg-black">
        <h2 className="text-4xl font-light tracking-widest uppercase">
          [ Scroll to Explore Projects ]
        </h2>
      </section>
    </main>
  );
}
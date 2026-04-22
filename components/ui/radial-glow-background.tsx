"use client";
import { cn } from "@/lib/utils";

/**
 * RadialGlowBackground
 * A subtle, deep navy background with a centered radial spotlight glow.
 */
const RadialGlowBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#020617] overflow-hidden -z-10">
      {/* Dark Radial Glow Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 40%, #1e1e2e, transparent)`,
        }}
      />
    </div>
  );
};

export default RadialGlowBackground;

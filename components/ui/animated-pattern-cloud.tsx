import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg bg-zinc-900 border border-white/10 text-white")}>
      <h1 className="text-2xl font-bold mb-2 tracking-tighter">Component Example</h1>
      <h2 className="text-xl font-semibold font-mono">{count}</h2>
      <div className="flex gap-2">
        <button 
          onClick={() => setCount((prev) => prev - 1)}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors"
        >
          -
        </button>
        <button 
          onClick={() => setCount((prev) => prev + 1)}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
};

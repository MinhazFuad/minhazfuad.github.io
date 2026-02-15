"use client";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      
      {/* 1. THE TECH GRID (Crucial for Glass Effect) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]"></div>

      {/* 2. COLOR BLOBS */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-500/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>

      {/* 3. MOVING SHAPES (The "Small Elements") */}
      
      {/* Floating Hollow Circle - Left */}
      <div className="absolute top-1/3 left-[10%] w-12 h-12 border-4 border-blue-400/20 dark:border-blue-500/20 rounded-full animate-float"></div>

      {/* Spinning Cross - Right */}
      <div className="absolute top-1/4 right-[15%] text-cyan-500/20 dark:text-cyan-400/20 text-6xl font-thin animate-spin-slow">
        +
      </div>

      {/* Floating Square - Bottom Left */}
      <div className="absolute bottom-1/4 left-[20%] w-8 h-8 border-2 border-indigo-400/20 dark:border-indigo-500/20 rotate-45 animate-float-delayed"></div>

      {/* Solid Dot - Bottom Right */}
      <div className="absolute bottom-1/3 right-[10%] w-4 h-4 bg-sky-500/30 rounded-full animate-float"></div>

      {/* Tiny Grid Dots Group */}
      <div className="absolute top-1/2 left-[5%] grid grid-cols-3 gap-2 opacity-20">
        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
      </div>

    </div>
  );
}
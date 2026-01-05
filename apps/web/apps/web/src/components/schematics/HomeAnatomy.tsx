import React from 'react';

export const HomeAnatomy = () => {
  return (
    <div className="p-8 bg-slate-900 text-cyan-400 font-mono min-h-screen flex flex-col items-center">
      
      {/* HEADER */}
      <div className="w-full max-w-4xl border-b border-cyan-800 pb-4 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-widest">TRUMETRICS<span className="text-cyan-500">_LAB</span></h1>
          <p className="text-sm text-cyan-600 mt-1">UNIT: TWIN-EDGE-042 // CONFIGURATION: ANATOMY</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-orange-400 animate-pulse">STATUS: STATIC ANALYSIS</div>
          <div className="text-xs text-slate-500">SCENE 1: THE PLAYERS</div>
        </div>
      </div>

      {/* THE STAGE */}
      <div className="relative w-full max-w-4xl h-[600px] border border-slate-700 bg-slate-800/50 rounded-lg overflow-hidden shadow-2xl">
        
        {/* ENVELOPE */}
        <div className="absolute top-4 left-4 z-20">
            <div className="text-xs text-slate-400 border border-slate-600 bg-slate-900 px-2 py-1 mb-2">
                <span className="text-yellow-400 font-bold">CFM 50: 4.2</span>
                <span className="block text-[10px] text-slate-500">BLOWER DOOR RATING</span>
            </div>
        </div>

        {/* FORCES */}
        <div className="absolute top-20 left-4 z-10 space-y-2">
            <span className="text-[10px] text-blue-300">WIND LOAD (Pressure)</span>
            <div className="w-24 h-0.5 bg-blue-500/50"></div>
            <div className="w-16 h-0.5 bg-blue-500/50"></div>
            <div className="w-20 h-0.5 bg-blue-500/50"></div>
        </div>
        <div className="absolute top-20 right-4 z-10 flex flex-col items-center">
            <span className="text-[10px] text-orange-300">STACK EFFECT</span>
            <div className="h-24 w-0.5 bg-gradient-to-t from-orange-500 to-transparent mt-1"></div>
        </div>

        {/* STRUCTURE */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] border-4 border-slate-600 rounded-t-[100px] bg-slate-900/90 relative">
            <div className="absolute top-0 w-full h-2 bg-red-500/30 animate-pulse"></div>
            <div className="absolute bottom-0 w-full h-2 bg-red-500/30 animate-pulse"></div>
            <div className="absolute top-24 left-[10%] w-[80%] h-8 bg-slate-700 border border-slate-500 opacity-50"></div>
            
            {/* VENTURI SENSORS */}
            <div className="absolute top-[100px] left-[10%] w-[80%] flex justify-between px-4">
                {[...Array(15)].map((_, i) => (
                    <div key={} className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" title={"Venturi Sensor " + (i+1)}></div>
                ))}
            </div>

            {/* MECHANICALS */}
            <div className="absolute bottom-4 left-16 w-32 h-40 border-2 border-cyan-700 bg-cyan-900/20 flex flex-col items-center justify-center p-2">
                <span className="text-[10px] text-cyan-300 font-bold">HVAC CORE</span>
                <div className="text-[8px] text-cyan-500">Variable Speed HP</div>
                <div className="w-12 h-12 rounded-full border border-cyan-500 mt-2 border-dashed animate-[spin_10s_linear_infinite]"></div>
            </div>
            <div className="absolute top-4 right-16 w-20 h-20 border border-purple-500 bg-purple-900/20 flex flex-col items-center justify-center">
                <span className="text-[10px] text-purple-300 font-bold">ERV</span>
                <span className="text-[8px] text-purple-400">Lung 1</span>
            </div>
            <div className="absolute top-4 right-40 w-16 h-16 border border-blue-500 bg-blue-900/20 flex flex-col items-center justify-center">
                <span className="text-[10px] text-blue-300 font-bold">MAKE-UP</span>
                <span className="text-[8px] text-blue-400">Lung 2</span>
            </div>
            <div className="absolute bottom-4 right-16 w-24 h-32 border border-orange-600 bg-orange-900/20 flex flex-col items-center justify-center">
                <span className="text-[10px] text-orange-300 font-bold">DRYER</span>
                <span className="text-[8px] text-red-400 mt-1">DEPRESSURIZER</span>
                <div className="w-full h-px bg-orange-500/50 my-2"></div>
                <span className="text-[8px] text-slate-400">CENTRAL VAC</span>
            </div>

            {/* HPM */}
            <div className="absolute bottom-48 left-1/2 -translate-x-1/2 w-40 h-16 bg-black border-2 border-cyan-400 rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)] z-30">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping mr-3"></div>
                <div className="text-center">
                    <div className="text-xs font-bold text-white">HPM CORTEX</div>
                    <div className="text-[8px] text-cyan-500">EDGE AGENT</div>
                </div>
            </div>

            {/* LINES */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="300" y1="230" x2="300" y2="110" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                <line x1="250" y1="260" x2="140" y2="300" stroke="#22d3ee" strokeWidth="1" opacity="0.8" />
                <line x1="350" y1="260" x2="460" y2="300" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
            </svg>
        </div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-4 gap-4 mt-8 text-[10px] border-t border-slate-800 pt-4 text-slate-400">
        <div><strong className="text-yellow-400 block mb-1">ENVELOPE PHYSICS</strong>CFM 50 Rating interacting with Wind & Stack Effect.</div>
        <div><strong className="text-green-400 block mb-1">VENTURI GRID</strong>15x Inline Sensors measuring flow distribution.</div>
        <div><strong className="text-cyan-400 block mb-1">HPM CORTEX</strong>Central Nervous System. Aggregates all sensors.</div>
        <div><strong className="text-orange-400 block mb-1">LOADS & EXHAUST</strong>Appliances that generate Heat or Negative Pressure.</div>
      </div>
    </div>
  );
};

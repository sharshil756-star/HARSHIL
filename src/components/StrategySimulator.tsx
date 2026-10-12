import { useState, useId } from 'react';
import { Sliders, Timer, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function StrategySimulator() {
  const [startCompound, setStartCompound] = useState<'soft' | 'medium' | 'hard'>('medium');
  const [secondCompound, setSecondCompound] = useState<'medium' | 'hard'>('hard');
  const [pitLap, setPitLap] = useState<number>(22);
  const [safetyCarScenario, setSafetyCarScenario] = useState<boolean>(false);
  const pitLapId = useId();

  // Degradation rates (sec per lap)
  const degRate = {
    soft: 0.165,
    medium: 0.085,
    hard: 0.045,
  };

  // Base lap times on fresh rubber (s)
  const baseTime = {
    soft: 81.2,
    medium: 82.0,
    hard: 82.8,
  };

  const pitLoss = safetyCarScenario ? 10.4 : 21.4; // Safety car reduces pit loss delta

  // Calculate 53 lap simulated race duration
  let totalTimeSeconds = 0;
  const totalLaps = 53;

  for (let lap = 1; lap <= totalLaps; lap++) {
    if (lap <= pitLap) {
      // Stint 1
      const tyreAge = lap;
      const deg = tyreAge * degRate[startCompound];
      // cliff penalty if soft > 12 laps or medium > 28 laps
      const cliff =
        startCompound === 'soft' && tyreAge > 13
          ? (tyreAge - 13) * 0.4
          : startCompound === 'medium' && tyreAge > 26
          ? (tyreAge - 26) * 0.25
          : 0;
      totalTimeSeconds += baseTime[startCompound] + deg + cliff;
    } else {
      // Stint 2
      const tyreAge = lap - pitLap;
      const deg = tyreAge * degRate[secondCompound];
      totalTimeSeconds += baseTime[secondCompound] + deg;
    }
  }

  // Add pit stop transit time
  totalTimeSeconds += pitLoss;

  const minutes = Math.floor(totalTimeSeconds / 60);
  const seconds = (totalTimeSeconds % 60).toFixed(1);

  // Undercut effectiveness index
  const undercutEffectiveness =
    pitLap <= 20 && startCompound === 'medium'
      ? 'Very High (1.8s Advantage)'
      : pitLap > 26
      ? 'Low (Overcut Window)'
      : 'Moderate (Balanced Track Position)';

  return (
    <div className="bg-[#10141a] border border-[#232936] rounded-xl p-5 my-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#232936]">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#e10600]" />
          <h3 className="font-racing font-bold text-base tracking-wide text-white uppercase">
            Interactive Pit Strategy & Undercut Model (53 Laps)
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Timer className="w-3.5 h-3.5 text-[#f59e0b]" />
          Transit Delta: <span className="text-white font-semibold">{pitLoss.toFixed(1)}s</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
        {/* Starting Tyre Selector */}
        <div>
          <label className="text-xs font-mono text-slate-400 block mb-2 uppercase">
            1. Starting Compound (Stint 1)
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setStartCompound('soft')}
              className={`py-2 px-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                startCompound === 'soft'
                  ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                  : 'bg-[#161a22] border-[#252c3b] text-slate-400 hover:text-white'
              }`}
            >
              C4 Soft
              <span className="block text-[10px] text-rose-400/80 font-normal mt-0.5">High Deg</span>
            </button>

            <button
              onClick={() => setStartCompound('medium')}
              className={`py-2 px-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                startCompound === 'medium'
                  ? 'bg-amber-950/70 border-amber-500 text-amber-300'
                  : 'bg-[#161a22] border-[#252c3b] text-slate-400 hover:text-white'
              }`}
            >
              C3 Medium
              <span className="block text-[10px] text-amber-400/80 font-normal mt-0.5">Balanced</span>
            </button>

            <button
              onClick={() => setStartCompound('hard')}
              className={`py-2 px-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                startCompound === 'hard'
                  ? 'bg-slate-800 border-slate-300 text-slate-100'
                  : 'bg-[#161a22] border-[#252c3b] text-slate-400 hover:text-white'
              }`}
            >
              C2 Hard
              <span className="block text-[10px] text-slate-400 font-normal mt-0.5">Endurance</span>
            </button>
          </div>
        </div>

        {/* Second Tyre Selector */}
        <div>
          <label className="text-xs font-mono text-slate-400 block mb-2 uppercase">
            2. Second Compound (Stint 2)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSecondCompound('medium')}
              className={`py-2 px-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                secondCompound === 'medium'
                  ? 'bg-amber-950/70 border-amber-500 text-amber-300'
                  : 'bg-[#161a22] border-[#252c3b] text-slate-400 hover:text-white'
              }`}
            >
              C3 Medium
              <span className="block text-[10px] text-amber-400/80 font-normal mt-0.5">Aggressive</span>
            </button>

            <button
              onClick={() => setSecondCompound('hard')}
              className={`py-2 px-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                secondCompound === 'hard'
                  ? 'bg-slate-800 border-slate-300 text-slate-100'
                  : 'bg-[#161a22] border-[#252c3b] text-slate-400 hover:text-white'
              }`}
            >
              C2 Hard
              <span className="block text-[10px] text-slate-400 font-normal mt-0.5">Standard</span>
            </button>
          </div>
        </div>

        {/* Safety Car Discount Toggle */}
        <div>
          <label className="text-xs font-mono text-slate-400 block mb-2 uppercase">
            3. Race Conditions
          </label>
          <button
            onClick={() => setSafetyCarScenario(!safetyCarScenario)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-mono flex items-center justify-between border transition-all ${
              safetyCarScenario
                ? 'bg-amber-950/40 border-amber-500 text-amber-300'
                : 'bg-[#161a22] border-[#252c3b] text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              {safetyCarScenario ? (
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              )}
              <span>{safetyCarScenario ? 'Virtual Safety Car Active' : 'Normal Green Flag'}</span>
            </div>
            <span className="font-bold text-[10px]">
              {safetyCarScenario ? '-11.0s DISCOUNT' : 'FULL LOSS'}
            </span>
          </button>
        </div>
      </div>

      {/* Pit Lap Slider */}
      <div className="mt-5 pt-4 border-t border-[#1d232f]">
        <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
          <label htmlFor={pitLapId} className="flex items-center gap-2">
            <span>Box Lap Trigger:</span>
            <span className="text-[#e10600] font-bold text-sm">LAP {pitLap}</span>
            <span className="text-slate-500">
              (Stint 1: {pitLap} laps · Stint 2: {53 - pitLap} laps)
            </span>
          </label>
          <span className="text-slate-400 text-[11px]">Recommended: Lap 19 - 24</span>
        </div>
        <input
          id={pitLapId}
          type="range"
          min="10"
          max="40"
          value={pitLap}
          onChange={(e) => setPitLap(Number(e.target.value))}
          className="w-full accent-[#e10600] cursor-pointer bg-[#1e2533] h-2 rounded-lg"
        />
      </div>

      {/* Strategy Simulation Outcome Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        <div className="bg-[#141820] border border-[#222937] p-3 rounded-lg">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Simulated Race Time</span>
          <div className="text-xl font-bold font-telemetry text-white mt-1">
            {minutes}m {seconds}s
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">53 Laps total race distance</span>
        </div>

        <div className="bg-[#141820] border border-[#222937] p-3 rounded-lg">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Undercut Potential</span>
          <div className="text-sm font-bold font-telemetry text-emerald-400 mt-1.5 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{undercutEffectiveness}</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Relative to rival pitting 1 lap later</span>
        </div>

        <div className="bg-[#141820] border border-[#222937] p-3 rounded-lg">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Pit Window Strategy Verdict</span>
          <div className="text-xs font-mono text-slate-200 mt-1.5 font-semibold">
            {startCompound === 'soft' && pitLap > 15 ? (
              <span className="text-rose-400">⚠️ Severe Thermal Degradation Risk</span>
            ) : safetyCarScenario ? (
              <span className="text-amber-300">⚡ Optimal Cheap Stop Executed</span>
            ) : (
              <span className="text-emerald-300">✓ Target Delta Maintained</span>
            )}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Based on Pirelli C2/C3 thermal wear data</span>
        </div>
      </div>
    </div>
  );
}

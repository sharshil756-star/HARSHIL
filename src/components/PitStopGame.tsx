import { useState, useEffect, useRef } from 'react';
import { Gauge, RotateCcw, Award, AlertCircle } from 'lucide-react';

type GameState = 'idle' | 'waiting' | 'ready' | 'finished' | 'false-start';

export default function PitStopGame() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(() => {
    const saved = localStorage.getItem('apex_f1_best_reaction');
    return saved ? Number(saved) : null;
  });

  const startTimeRef = useRef<number>(0);
  const timerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setReactionTime(null);
    setGameState('waiting');

    // Random delay between 1.5s and 4.2s for lights out / green gantry
    const randomDelay = Math.floor(Math.random() * 2700) + 1500;

    timerTimeoutRef.current = setTimeout(() => {
      startTimeRef.current = performance.now();
      setGameState('ready');
    }, randomDelay);
  };

  const handleAction = () => {
    if (gameState === 'waiting') {
      // Jumped the start / false release!
      if (timerTimeoutRef.current) clearTimeout(timerTimeoutRef.current);
      setGameState('false-start');
      return;
    }

    if (gameState === 'ready') {
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(elapsed);
      setGameState('finished');

      if (!bestTime || elapsed < bestTime) {
        setBestTime(elapsed);
        localStorage.setItem('apex_f1_best_reaction', elapsed.toString());
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerTimeoutRef.current) clearTimeout(timerTimeoutRef.current);
    };
  }, []);

  return (
    <div className="bg-[#10141a] border border-[#232936] rounded-xl p-5 my-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#232936]">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-[#e10600]" />
          <h3 className="font-racing font-bold text-base tracking-wide text-white uppercase">
            Biomechanical Reaction Test: Wheel Gun Release Reflex
          </h3>
        </div>
        {bestTime && (
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
            <Award className="w-4 h-4" />
            Personal Best: <span className="font-bold">{bestTime} ms</span>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-2 mb-4 leading-relaxed">
        F1 wheel gunners operate under intense sensory load. When the pneumatic nut torques to 450 Nm, the gunner triggers the signal button in under 200 ms. Can your human reflexes match a McLaren or Red Bull pit crew?
      </p>

      {/* Main Interactive Stage */}
      <div
        onClick={gameState === 'waiting' || gameState === 'ready' ? handleAction : undefined}
        className={`w-full h-44 rounded-xl flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-150 p-4 text-center border ${
          gameState === 'idle'
            ? 'bg-[#141822] border-[#222a3a] hover:border-slate-500'
            : gameState === 'waiting'
            ? 'bg-rose-950/40 border-rose-600 animate-pulse'
            : gameState === 'ready'
            ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/20'
            : gameState === 'false-start'
            ? 'bg-amber-950/60 border-amber-500 text-amber-200'
            : 'bg-[#141924] border-[#252f42]'
        }`}
      >
        {gameState === 'idle' && (
          <div className="flex flex-col items-center">
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700" />
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startTest();
              }}
              className="py-2.5 px-6 rounded-lg bg-[#e10600] hover:bg-[#c40500] text-white font-racing font-bold text-sm tracking-wider uppercase shadow-md transition-all"
            >
              Initiate Pit Stop Trigger
            </button>
            <span className="text-[11px] text-slate-500 font-mono mt-2">Click button to begin signal sequence</span>
          </div>
        )}

        {gameState === 'waiting' && (
          <div className="flex flex-col items-center">
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_10px_#ef4444]" />
              ))}
            </div>
            <span className="font-racing font-bold text-lg text-rose-300 uppercase tracking-widest">
              STANDBY... WAIT FOR GREEN!
            </span>
            <span className="text-xs text-rose-400/80 font-mono mt-1">Do not click until the screen turns GREEN</span>
          </div>
        )}

        {gameState === 'ready' && (
          <div className="flex flex-col items-center">
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
              ))}
            </div>
            <span className="font-racing font-extrabold text-3xl uppercase tracking-widest drop-shadow-md">
              CLICK NOW! RELEASE JACK!
            </span>
          </div>
        )}

        {gameState === 'false-start' && (
          <div className="flex flex-col items-center">
            <AlertCircle className="w-8 h-8 text-amber-400 mb-1" />
            <span className="font-racing font-bold text-lg text-amber-300 uppercase">
              FALSE START / PREMATURE RELEASE!
            </span>
            <span className="text-xs text-amber-400/80 font-mono mt-1">
              You clicked before the green signal. 5-Second Stop & Go Penalty.
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startTest();
              }}
              className="mt-3 py-1.5 px-4 bg-amber-600 hover:bg-amber-500 text-white rounded font-mono text-xs font-bold"
            >
              Try Again
            </button>
          </div>
        )}

        {gameState === 'finished' && reactionTime && (
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Your Release Reaction</span>
            <div className="text-4xl font-extrabold font-telemetry text-emerald-400 my-1">
              {reactionTime} <span className="text-base font-normal text-slate-400">ms</span>
            </div>
            <span className="text-xs font-mono text-slate-300">
              {reactionTime < 200
                ? '🏆 World Class: Faster than a McLaren Pit Mechanic!'
                : reactionTime < 260
                ? '⚡ Elite F1 Standard: Ready for Monaco Paddock'
                : reactionTime < 320
                ? '⏱️ Solid: Average Human Reflex'
                : '🐢 Stalled: Lost 0.4s to the pit lane pack'}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startTest();
              }}
              className="mt-3 flex items-center gap-1.5 py-1.5 px-4 bg-[#1f2736] hover:bg-[#2b364a] text-white rounded font-mono text-xs font-semibold border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Repeat Test
            </button>
          </div>
        )}
      </div>

      {/* Benchmark comparison bar */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#1d232f] text-center font-mono text-[11px]">
        <div className="bg-[#141822] p-2 rounded">
          <span className="text-slate-500 block">Red Bull Pit Crew</span>
          <span className="text-emerald-400 font-bold">180 - 210 ms</span>
        </div>
        <div className="bg-[#141822] p-2 rounded">
          <span className="text-slate-500 block">Average Human</span>
          <span className="text-amber-400 font-bold">250 - 300 ms</span>
        </div>
        <div className="bg-[#141822] p-2 rounded">
          <span className="text-slate-500 block">Record Pit Stop</span>
          <span className="text-[#e10600] font-bold">1.80s Total</span>
        </div>
      </div>
    </div>
  );
}

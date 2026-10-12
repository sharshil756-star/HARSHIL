import { X, Flag, Gauge, Thermometer, Wind, CheckCircle2 } from 'lucide-react';
import { RACE_WEEKEND_INFO } from '../data/articles';

interface RaceInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RaceInfoModal({ isOpen, onClose }: RaceInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-[#0f131a] border border-[#222a3a] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#202737] flex items-center justify-between bg-[#121620]">
          <div className="flex items-center gap-2.5">
            <Flag className="w-5 h-5 text-[#e10600]" />
            <div>
              <h2 className="font-racing font-bold text-lg text-white uppercase tracking-wider">
                {RACE_WEEKEND_INFO.grandPrixName}
              </h2>
              <span className="text-xs font-mono text-slate-400">
                {RACE_WEEKEND_INFO.circuitName}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#181e2a] hover:bg-[#222a3a] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-[#141822] p-3 rounded-lg border border-[#202838]">
              <span className="text-slate-500 uppercase text-[10px] block">Circuit Length</span>
              <span className="text-base font-bold font-telemetry text-white">{RACE_WEEKEND_INFO.circuitLength}</span>
            </div>
            <div className="bg-[#141822] p-3 rounded-lg border border-[#202838]">
              <span className="text-slate-500 uppercase text-[10px] block">Race Distance</span>
              <span className="text-base font-bold font-telemetry text-white">{RACE_WEEKEND_INFO.raceLaps} Laps (306.7 km)</span>
            </div>
            <div className="bg-[#141822] p-3 rounded-lg border border-[#202838]">
              <span className="text-slate-500 uppercase text-[10px] block">Lap Record</span>
              <span className="text-base font-bold font-telemetry text-emerald-400">{RACE_WEEKEND_INFO.lapRecord}</span>
            </div>
            <div className="bg-[#141822] p-3 rounded-lg border border-[#202838]">
              <span className="text-slate-500 uppercase text-[10px] block">Downforce Profile</span>
              <span className="text-base font-bold font-telemetry text-amber-400">Ultra-Low Drag Spec</span>
            </div>
          </div>

          <div className="bg-[#141822] p-4 rounded-xl border border-[#202838]">
            <span className="text-xs font-racing font-bold text-slate-300 uppercase block mb-2">
              Pirelli Tyre Allocations for this Grand Prix
            </span>
            <div className="space-y-1.5 text-xs font-mono">
              {RACE_WEEKEND_INFO.tyreCompounds.map((comp, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2 bg-[#121620] p-3 rounded-lg border border-[#1d2433]">
              <Thermometer className="w-4 h-4 text-[#e10600]" />
              <div>
                <span className="text-[10px] text-slate-500 block">TRACK TEMP</span>
                <span className="font-bold text-white">{RACE_WEEKEND_INFO.currentTrackTemp}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#121620] p-3 rounded-lg border border-[#1d2433]">
              <Wind className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="text-[10px] text-slate-500 block">ATMOSPHERIC</span>
                <span className="font-bold text-white">{RACE_WEEKEND_INFO.currentAirTemp}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#202737] bg-[#121620] text-right">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-lg bg-[#e10600] text-white font-racing font-bold text-xs uppercase cursor-pointer"
          >
            Close Specs
          </button>
        </div>
      </div>
    </div>
  );
}

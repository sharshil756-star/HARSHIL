import { Flag, ArrowLeft, CheckCircle2, Thermometer, Wind, Gauge, MapPin } from 'lucide-react';
import { RACE_WEEKEND_INFO } from '../data/articles';

interface CircuitSpecsPageProps {
  onNavigate: (to: string) => void;
}

export default function CircuitSpecsPage({ onNavigate }: CircuitSpecsPageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-1.5 text-xs font-racing font-bold text-slate-400 hover:text-white uppercase mb-6 group cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-[#e10600] group-hover:-translate-x-1 transition-transform" />
        <span>Back to Race Weekend Hub</span>
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-600/40 text-[#e10600]">
          <Flag className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-racing font-extrabold text-3xl text-white uppercase tracking-wider">
            {RACE_WEEKEND_INFO.grandPrixName}
          </h1>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#e10600]" />
            <span>{RACE_WEEKEND_INFO.circuitName} · Italy</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#121620] p-4 rounded-xl border border-[#202838]">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">Circuit Length</span>
          <span className="text-xl font-bold font-telemetry text-white mt-1 block">
            {RACE_WEEKEND_INFO.circuitLength}
          </span>
          <span className="text-[10px] font-mono text-slate-400 mt-1 block">11 High-Speed Turns</span>
        </div>

        <div className="bg-[#121620] p-4 rounded-xl border border-[#202838]">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">Race Distance</span>
          <span className="text-xl font-bold font-telemetry text-white mt-1 block">
            {RACE_WEEKEND_INFO.raceLaps} Laps
          </span>
          <span className="text-[10px] font-mono text-slate-400 mt-1 block">306.72 km Grand Prix</span>
        </div>

        <div className="bg-[#121620] p-4 rounded-xl border border-[#202838]">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">All-Time Lap Record</span>
          <span className="text-xl font-bold font-telemetry text-emerald-400 mt-1 block">
            {RACE_WEEKEND_INFO.lapRecord}
          </span>
          <span className="text-[10px] font-mono text-slate-400 mt-1 block">Ferrari F2004 V10</span>
        </div>

        <div className="bg-[#121620] p-4 rounded-xl border border-[#202838]">
          <span className="text-[10px] font-mono text-slate-500 uppercase block">Throttle Full Deploy</span>
          <span className="text-xl font-bold font-telemetry text-[#e10600] mt-1 block">
            78% of Lap
          </span>
          <span className="text-[10px] font-mono text-slate-400 mt-1 block">Temple of Speed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#121620] p-6 rounded-xl border border-[#202838]">
          <h2 className="font-racing font-bold text-lg text-white uppercase mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#e10600] rounded-sm" />
            Pirelli Tyre Allocations
          </h2>
          <div className="space-y-3">
            {RACE_WEEKEND_INFO.tyreCompounds.map((comp, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-[#0c0f15] border border-[#1a2230]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-mono text-slate-200">{comp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#121620] p-6 rounded-xl border border-[#202838]">
          <h2 className="font-racing font-bold text-lg text-white uppercase mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#e10600] rounded-sm" />
            Atmospheric & Track Telemetry
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0c0f15] border border-[#1a2230]">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Thermometer className="w-4 h-4 text-[#e10600]" />
                <span>Track Surface Temperature</span>
              </div>
              <span className="font-mono font-bold text-white text-sm">{RACE_WEEKEND_INFO.currentTrackTemp}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0c0f15] border border-[#1a2230]">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Wind className="w-4 h-4 text-cyan-400" />
                <span>Ambient Air Temperature</span>
              </div>
              <span className="font-mono font-bold text-white text-sm">{RACE_WEEKEND_INFO.currentAirTemp}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#0c0f15] border border-[#1a2230]">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Gauge className="w-4 h-4 text-amber-400" />
                <span>Weather & Track Condition</span>
              </div>
              <span className="font-mono font-bold text-emerald-400 text-xs">{RACE_WEEKEND_INFO.weatherStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

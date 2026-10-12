import { Activity, Sliders, Wrench, ArrowLeft } from 'lucide-react';
import TelemetryWidget from './TelemetryWidget';
import StrategySimulator from './StrategySimulator';
import PitStopGame from './PitStopGame';

interface ToolsPageProps {
  tool: 'telemetry' | 'strategy' | 'pit-stop';
  onNavigate: (to: string) => void;
}

export default function ToolsPage({ tool, onNavigate }: ToolsPageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-1.5 text-xs font-racing font-bold text-slate-400 hover:text-white uppercase mb-6 group cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-[#e10600] group-hover:-translate-x-1 transition-transform" />
        <span>Back to Race Weekend Hub</span>
      </button>

      {/* Navigation tabs between tools */}
      <div className="flex items-center gap-2 mb-8 bg-[#111620] p-1.5 rounded-xl border border-[#202838] overflow-x-auto">
        <button
          onClick={() => onNavigate('/tools/telemetry')}
          className={`flex items-center gap-2 py-2 px-4 rounded-lg text-xs font-racing font-bold uppercase transition-all whitespace-nowrap ${
            tool === 'telemetry'
              ? 'bg-[#e10600] text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-[#181f2c]'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Telemetry Analyzer</span>
        </button>

        <button
          onClick={() => onNavigate('/tools/strategy')}
          className={`flex items-center gap-2 py-2 px-4 rounded-lg text-xs font-racing font-bold uppercase transition-all whitespace-nowrap ${
            tool === 'strategy'
              ? 'bg-[#e10600] text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-[#181f2c]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Undercut Pit Model</span>
        </button>

        <button
          onClick={() => onNavigate('/tools/pit-stop')}
          className={`flex items-center gap-2 py-2 px-4 rounded-lg text-xs font-racing font-bold uppercase transition-all whitespace-nowrap ${
            tool === 'pit-stop'
              ? 'bg-[#e10600] text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-[#181f2c]'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>1.9s Reaction Reflex</span>
        </button>
      </div>

      {tool === 'telemetry' && (
        <div>
          <div className="mb-4">
            <h1 className="font-racing font-extrabold text-3xl text-white uppercase tracking-wider">
              Telemetry Velocity & Pedal Input Analyzer
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Direct telemetry correlation comparing low-downforce setup against balanced trim through the 350 km/h Turn 1 braking zone.
            </p>
          </div>
          <TelemetryWidget />
        </div>
      )}

      {tool === 'strategy' && (
        <div>
          <div className="mb-4">
            <h1 className="font-racing font-extrabold text-3xl text-white uppercase tracking-wider">
              Interactive Undercut & Pit Window Strategy Simulator
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Calculate projected 53-lap race durations, compound degradation crossover points, and Virtual Safety Car time discounts.
            </p>
          </div>
          <StrategySimulator />
        </div>
      )}

      {tool === 'pit-stop' && (
        <div>
          <div className="mb-4">
            <h1 className="font-racing font-extrabold text-3xl text-white uppercase tracking-wider">
              Biomechanical 1.9s Pit Stop Reflex Reaction Test
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Measure your reaction speed in milliseconds against the world-record McLaren and Red Bull pit crew wheel gunners.
            </p>
          </div>
          <PitStopGame />
        </div>
      )}
    </div>
  );
}

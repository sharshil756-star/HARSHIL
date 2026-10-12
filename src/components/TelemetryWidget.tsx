import { useState } from 'react';
import { Activity, Gauge, Zap } from 'lucide-react';

interface TelemetryPoint {
  distance: number;
  speedVerstappen: number;
  speedLeclerc: number;
  throttleVerstappen: number;
  throttleLeclerc: number;
  brakeVerstappen: number;
  brakeLeclerc: number;
  label?: string;
}

const TELEMETRY_DATA: TelemetryPoint[] = [
  { distance: 0, speedVerstappen: 335, speedLeclerc: 331, throttleVerstappen: 100, throttleLeclerc: 100, brakeVerstappen: 0, brakeLeclerc: 0, label: 'Main Straight' },
  { distance: 100, speedVerstappen: 342, speedLeclerc: 338, throttleVerstappen: 100, throttleLeclerc: 100, brakeVerstappen: 0, brakeLeclerc: 0 },
  { distance: 200, speedVerstappen: 348, speedLeclerc: 344, throttleVerstappen: 100, throttleLeclerc: 100, brakeVerstappen: 0, brakeLeclerc: 0, label: '150m Board' },
  { distance: 250, speedVerstappen: 351, speedLeclerc: 347, throttleVerstappen: 100, throttleLeclerc: 100, brakeVerstappen: 0, brakeLeclerc: 0 },
  { distance: 280, speedVerstappen: 310, speedLeclerc: 338, throttleVerstappen: 0, throttleLeclerc: 100, brakeVerstappen: 98, brakeLeclerc: 0, label: 'Braking Zone (Car 1)' },
  { distance: 300, speedVerstappen: 230, speedLeclerc: 290, throttleVerstappen: 0, throttleLeclerc: 0, brakeVerstappen: 95, brakeLeclerc: 100, label: 'Braking Zone (Car 16)' },
  { distance: 350, speedVerstappen: 130, speedLeclerc: 145, throttleVerstappen: 0, throttleLeclerc: 0, brakeVerstappen: 70, brakeLeclerc: 85 },
  { distance: 400, speedVerstappen: 74, speedLeclerc: 78, throttleVerstappen: 12, throttleLeclerc: 5, brakeVerstappen: 10, brakeLeclerc: 15, label: 'Turn 1 Apex' },
  { distance: 450, speedVerstappen: 88, speedLeclerc: 82, throttleVerstappen: 45, throttleLeclerc: 30, brakeVerstappen: 0, brakeLeclerc: 0, label: 'Turn 2 Chicane Exit' },
  { distance: 500, speedVerstappen: 142, speedLeclerc: 132, throttleVerstappen: 85, throttleLeclerc: 72, brakeVerstappen: 0, brakeLeclerc: 0 },
  { distance: 600, speedVerstappen: 228, speedLeclerc: 215, throttleVerstappen: 100, throttleLeclerc: 100, brakeVerstappen: 0, brakeLeclerc: 0, label: 'Curva Grande' },
  { distance: 700, speedVerstappen: 285, speedLeclerc: 280, throttleVerstappen: 100, throttleLeclerc: 100, brakeVerstappen: 0, brakeLeclerc: 0 },
];

export default function TelemetryWidget() {
  const [scrubberIndex, setScrubberIndex] = useState(7); // default Turn 1 Apex
  const [metricView, setMetricView] = useState<'speed' | 'pedals'>('speed');

  const current = TELEMETRY_DATA[scrubberIndex];
  const deltaSpeed = current.speedVerstappen - current.speedLeclerc;

  return (
    <div className="bg-[#10141a] border border-[#232936] rounded-xl p-5 my-6 text-slate-100 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#232936]">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#e10600]" />
          <h3 className="font-racing font-bold text-base tracking-wide text-white uppercase">
            Live Telemetry Comparison: Turn 1 Heavy Braking Zone
          </h3>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-[#181d26] p-1 rounded-lg border border-[#2b3342] text-xs font-mono">
          <button
            onClick={() => setMetricView('speed')}
            className={`px-3 py-1 rounded transition-colors ${
              metricView === 'speed' ? 'bg-[#e10600] text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Velocity (km/h)
          </button>
          <button
            onClick={() => setMetricView('pedals')}
            className={`px-3 py-1 rounded transition-colors ${
              metricView === 'pedals' ? 'bg-[#e10600] text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Throttle & Brake %
          </button>
        </div>
      </div>

      {/* Driver Legend */}
      <div className="flex flex-wrap items-center justify-between text-xs py-3 text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#e10600]" />
            <span className="font-mono text-slate-200 font-semibold">CAR #1 (Verstappen)</span>
            <span className="text-slate-500 font-mono">Setup: Low Downforce</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[#00d2be]" />
            <span className="font-mono text-slate-200 font-semibold">CAR #16 (Leclerc)</span>
            <span className="text-slate-500 font-mono">Setup: Balanced Downforce</span>
          </div>
        </div>

        <div className="font-mono text-slate-300">
          Location: <span className="text-[#e10600] font-semibold">{current.label || `${current.distance}m`}</span>
        </div>
      </div>

      {/* Telemetry Visual Graph (SVG) */}
      <div className="relative w-full h-48 bg-[#0b0e14] rounded-lg border border-[#1d232f] p-2 mt-1">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 700 160" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="40" x2="700" y2="40" stroke="#1c2230" strokeDasharray="3 3" />
          <line x1="0" y1="80" x2="700" y2="80" stroke="#1c2230" strokeDasharray="3 3" />
          <line x1="0" y1="120" x2="700" y2="120" stroke="#1c2230" strokeDasharray="3 3" />

          {metricView === 'speed' ? (
            <>
              {/* Car 1 Speed Polyline (Verstappen) */}
              <polyline
                fill="none"
                stroke="#e10600"
                strokeWidth="2.5"
                points={TELEMETRY_DATA.map((d) => {
                  const x = (d.distance / 700) * 700;
                  // Map speed 50 - 360 km/h to Y 150 - 10
                  const y = 150 - ((d.speedVerstappen - 50) / 310) * 140;
                  return `${x},${y}`;
                }).join(' ')}
              />

              {/* Car 16 Speed Polyline (Leclerc) */}
              <polyline
                fill="none"
                stroke="#00d2be"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                points={TELEMETRY_DATA.map((d) => {
                  const x = (d.distance / 700) * 700;
                  const y = 150 - ((d.speedLeclerc - 50) / 310) * 140;
                  return `${x},${y}`;
                }).join(' ')}
              />
            </>
          ) : (
            <>
              {/* Throttle (Green) & Brake (Red) for Car 1 */}
              <polyline
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                points={TELEMETRY_DATA.map((d) => {
                  const x = (d.distance / 700) * 700;
                  const y = 150 - (d.throttleVerstappen / 100) * 130;
                  return `${x},${y}`;
                }).join(' ')}
              />
              <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                points={TELEMETRY_DATA.map((d) => {
                  const x = (d.distance / 700) * 700;
                  const y = 150 - (d.brakeVerstappen / 100) * 130;
                  return `${x},${y}`;
                }).join(' ')}
              />
            </>
          )}

          {/* Current Scrubber Vertical Marker */}
          {(() => {
            const x = (current.distance / 700) * 700;
            return (
              <g>
                <line x1={x} y1="0" x2={x} y2="160" stroke="#f59e0b" strokeWidth="2" />
                <circle cx={x} cy={16} r="4" fill="#f59e0b" />
              </g>
            );
          })()}
        </svg>

        {/* Graph watermark label */}
        <div className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          {metricView === 'speed' ? 'Scale: 50 - 360 km/h' : 'Green: Throttle % · Red: Brake %'}
        </div>
      </div>

      {/* Scrubber control */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
          <span>0m (Approach)</span>
          <span className="text-[#f59e0b]">Scrubber: Drag to analyze telemetry at each marker</span>
          <span>700m (Curva Grande)</span>
        </div>
        <input
          type="range"
          min="0"
          max={TELEMETRY_DATA.length - 1}
          value={scrubberIndex}
          onChange={(e) => setScrubberIndex(Number(e.target.value))}
          className="w-full accent-[#e10600] cursor-pointer bg-[#1e2533] h-2 rounded-lg"
        />
      </div>

      {/* Real-time telemetry readouts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#232936]">
        <div className="bg-[#161a22] p-3 rounded-lg border border-[#232a38]">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-[#e10600]" /> CAR #1 SPEED
          </div>
          <div className="text-xl font-bold font-telemetry text-white mt-1">
            {current.speedVerstappen} <span className="text-xs text-slate-400">km/h</span>
          </div>
        </div>

        <div className="bg-[#161a22] p-3 rounded-lg border border-[#232a38]">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-[#00d2be]" /> CAR #16 SPEED
          </div>
          <div className="text-xl font-bold font-telemetry text-white mt-1">
            {current.speedLeclerc} <span className="text-xs text-slate-400">km/h</span>
          </div>
        </div>

        <div className="bg-[#161a22] p-3 rounded-lg border border-[#232a38]">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[#f59e0b]" /> DELTA VELOCITY
          </div>
          <div className="text-xl font-bold font-telemetry mt-1">
            <span className={deltaSpeed >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
              {deltaSpeed > 0 ? `+${deltaSpeed}` : deltaSpeed} <span className="text-xs text-slate-400">km/h</span>
            </span>
          </div>
        </div>

        <div className="bg-[#161a22] p-3 rounded-lg border border-[#232a38]">
          <div className="text-[11px] font-mono text-slate-400">PEDAL INPUTS (CAR 1)</div>
          <div className="text-sm font-telemetry mt-1.5 flex items-center justify-between">
            <span className="text-emerald-400">THR: {current.throttleVerstappen}%</span>
            <span className="text-rose-400">BRK: {current.brakeVerstappen}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Flag, Activity, Wrench, Shield, ArrowUp } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (cat: Category) => void;
}

export default function Footer({ onSelectCategory }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080a0e] border-t border-[#1c2331] text-slate-400 mt-20">
      {/* Top Engineering Highlight Ribbon */}
      <div className="border-b border-[#171d29] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
          <div className="flex items-start gap-3 bg-[#0d1016] p-4 rounded-xl border border-[#1b2230]">
            <Activity className="w-5 h-5 text-[#e10600] shrink-0 mt-0.5" />
            <div>
              <span className="font-racing font-bold text-white uppercase text-sm block">
                Telemetry Synchronisation
              </span>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Direct correlation of throttle traces, apex velocity deltas, and tyre surface infrared degradation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#0d1016] p-4 rounded-xl border border-[#1b2230]">
            <Wrench className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-racing font-bold text-white uppercase text-sm block">
                Pit Stop Biomechanics
              </span>
              <p className="text-slate-400 mt-1 leading-relaxed">
                22 crew members executing sub-2.0s wheel changes with pneumatic 10,500 RPM captive-nut guns.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#0d1016] p-4 rounded-xl border border-[#1b2230]">
            <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-racing font-bold text-white uppercase text-sm block">
                FIA Parc Fermé Compliance
              </span>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Forensic checks on 10.0mm titanium skid planks, 798kg minimum mass, and gas chromatography.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#e10600] flex items-center justify-center font-racing font-bold text-white text-base italic">
                APX
              </div>
              <span className="font-racing font-bold text-lg text-white uppercase tracking-wider">
                Apex Grand Prix: F1 Race Weekend Hub
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md font-mono">
              An exhaustive engineering and sporting chronicling of a Formula 1 Grand Prix weekend—from initial aerodynamic rake flow-vis calibration in FP1 to post-race titanium skid block wear verification.
            </p>
            <div className="text-[11px] font-mono text-slate-500">
              Published by Apex Grand Prix Technical Press Syndicate · All Rights Reserved
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-racing font-bold text-white text-xs uppercase tracking-wider mb-3">
              Session Categories
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button
                  onClick={() => onSelectCategory('Race Day')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                  aria-label="Browse Race Day Debriefs and Grand Prix recaps"
                >
                  Race Day Debriefs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Tech')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                  aria-label="Browse Aerodynamics, Telemetry, and Technical articles"
                >
                  Aerodynamics & Telemetry
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Strategy')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                  aria-label="Browse Pit Window and Undercut Strategy models"
                >
                  Pit Window & Undercut Models
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Qualifying')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                  aria-label="Browse Q1 to Q3 Qualifying and Sector Split analyses"
                >
                  Q1 to Q3 Sector Splits
                </button>
              </li>
            </ul>
          </div>

          {/* Technical Glossary Key Terms */}
          <div>
            <h4 className="font-racing font-bold text-white text-xs uppercase tracking-wider mb-3">
              Technical Glossary
            </h4>
            <div className="space-y-1.5 text-[11px] font-mono text-slate-500">
              <div><strong className="text-slate-300">Flow-Vis:</strong> Fluorescent paraffin boundary layer indicator</div>
              <div><strong className="text-slate-300">Undercut:</strong> Pitting early to attack on fresh out-lap rubber</div>
              <div><strong className="text-slate-300">ERS Clipping:</strong> Depletion of 4.0 MJ MGU-K battery energy</div>
              <div><strong className="text-slate-300">Parc Fermé:</strong> Impounded zone under strict FIA lock</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#171d29] flex flex-wrap items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Apex Grand Prix Hub. High-performance motorsport journalism.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll back to top of the page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#e10600]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}

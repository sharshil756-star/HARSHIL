import { Search, Bookmark, Flag, Sparkles, X, ChevronRight } from 'lucide-react';
import { Category } from '../types';
import { CATEGORY_TO_SLUG } from '../router';

interface NavbarProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  savedCount: number;
  onNavigate: (to: string) => void;
}

export default function Navbar({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  savedCount,
  onNavigate
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#0d1015]/95 backdrop-blur-md border-b border-[#1f2635] shadow-lg">
      {/* Top telemetry ticker strip */}
      <div className="bg-[#080a0d] border-b border-[#1a202c] text-[11px] font-mono text-slate-400 py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <strong className="text-white">F1 RACE WEEKEND HUB</strong> · AUTODROMO NAZIONALE MONZA
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">
              TRACK: 34°C · AIR: 24°C · DRY COMPOUND: C2/C3/C4
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/circuit-specs')}
              className="hover:text-white transition-colors flex items-center gap-1 text-slate-400 cursor-pointer"
              aria-label="View Monza Grand Prix Circuit Specifications"
            >
              <Flag className="w-3 h-3 text-[#e10600]" aria-hidden="true" />
              <span>Weekend Specs</span>
              <ChevronRight className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand (Clickable link to /) */}
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-3 text-left group cursor-pointer"
            aria-label="Apex Grand Prix F1 Race Weekend Hub Homepage"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#e10600] to-[#950000] flex items-center justify-center shadow-lg shadow-red-950/40 border border-red-500/30 group-hover:scale-105 transition-transform">
              <span className="font-racing font-extrabold text-xl text-white tracking-tighter italic">APX</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-racing font-bold text-lg md:text-xl text-white tracking-wider uppercase group-hover:text-[#ff3833] transition-colors">
                  Apex Grand Prix
                </span>
                <span className="text-[10px] font-racing uppercase tracking-widest text-[#e10600] font-bold px-1.5 py-0.5 rounded bg-red-950/50 border border-red-700/40">
                  F1 Hub
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Telemetry · Aerodynamics · Pit Lane Strategy
              </p>
            </div>
          </button>

          {/* Search bar */}
          <div className="flex-1 max-w-md hidden sm:block relative">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search telemetry, tyres, aero, qualifying..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#141822] border border-[#232a3a] focus:border-[#e10600] text-slate-200 placeholder-slate-500 text-xs rounded-lg pl-9 pr-8 py-2 font-mono transition-colors focus:outline-none"
                aria-label="Search Formula 1 telemetry, tyres, aero, and qualifying debriefs"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label="Clear search query"
                >
                  <span className="sr-only">Clear search query</span>
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Bookmarks link to /saved */}
            <button
              onClick={() => onNavigate('/saved')}
              className="flex items-center gap-2 py-2 px-3 rounded-lg bg-[#141822] hover:bg-[#1c2230] border border-[#232a3a] text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Saved Articles"
              aria-label={`View Saved Race Debriefs (${savedCount} saved)`}
            >
              <Bookmark className="w-3.5 h-3.5 text-[#e10600]" aria-hidden="true" />
              <span>Saved</span>
              <span className="sr-only">Articles</span>
              {savedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#e10600] text-white text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden mt-3 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search articles & telemetry..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#141822] border border-[#232a3a] text-slate-200 placeholder-slate-500 text-xs rounded-lg pl-9 pr-8 py-2 font-mono focus:outline-none focus:border-[#e10600]"
            aria-label="Search articles and telemetry"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label="Clear search input"
            >
              <span className="sr-only">Clear search input</span>
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Category Filter Bar (Functional buttons mapped to unique category URLs) */}
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#1a202c] overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-racing uppercase tracking-wider text-slate-500 font-bold mr-2 hidden md:inline">
            Filters:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const targetUrl = cat === 'All' ? '/' : `/category/${CATEGORY_TO_SLUG[cat]}`;
            return (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  onNavigate(targetUrl);
                }}
                className={`py-1.5 px-3.5 rounded-lg text-xs font-racing font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#e10600] text-white shadow-md shadow-red-950/40'
                    : 'bg-[#141822] text-slate-400 hover:text-white hover:bg-[#1a202c] border border-[#1f2635]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

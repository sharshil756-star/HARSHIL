import { Bookmark, Clock, ArrowRight, Gauge, Activity, Sliders, Wrench } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string, e: React.MouseEvent) => void;
  href?: string;
}

export default function ArticleCard({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  href
}: ArticleCardProps) {
  // Category specific accent color
  const categoryColor =
    article.category === 'Race Day'
      ? 'text-[#e10600]'
      : article.category === 'Tech'
      ? 'text-cyan-400'
      : article.category === 'Strategy'
      ? 'text-amber-400'
      : 'text-purple-400';

  return (
    <article
      onClick={() => onSelect(article)}
      className="group bg-[#12161f] border border-[#202736] hover:border-[#384359] rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 cursor-pointer relative"
    >
      {/* Top Image Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-[#0a0d12]">
        <img
          src={article.heroImageUrl}
          alt={article.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12161f] via-transparent to-transparent opacity-90" />

        {/* Clean top-left session kicker (unboxed quiet label) */}
        <div className="absolute top-3 left-3 bg-[#0d1015]/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-[11px] font-mono font-bold text-slate-200">
          SESSION {article.sessionCode}
        </div>

        {/* Bookmark quick toggle button */}
        <button
          onClick={(e) => onToggleBookmark(article.id, e)}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all ${
            isBookmarked
              ? 'bg-[#e10600] text-white shadow-md'
              : 'bg-[#0d1015]/80 text-slate-400 hover:text-white hover:bg-[#1a202c] border border-white/10'
          }`}
          title={isBookmarked ? 'Remove from Saved' : 'Save for Later'}
          aria-label={isBookmarked ? 'Remove from Saved' : 'Save for Later'}
        >
          <Bookmark className="w-3.5 h-3.5 fill-current" />
        </button>

        {/* Interactive Tool Banner if present */}
        {article.interactiveType && (
          <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 bg-emerald-950/80 backdrop-blur-sm px-2 py-0.5 rounded border border-emerald-600/40">
            {article.interactiveType === 'telemetry' && <Activity className="w-3 h-3" />}
            {article.interactiveType === 'strategy' && <Sliders className="w-3 h-3" />}
            {article.interactiveType === 'pitstop' && <Wrench className="w-3 h-3" />}
            <span>INTERACTIVE TOOL INCLUDED</span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Clean unboxed text with typographic separators (NO PILLS) */}
          <div className="flex items-center gap-2 text-xs font-mono mb-2">
            <span className={`font-bold tracking-wider uppercase ${categoryColor}`}>
              {article.category}
            </span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-400">{article.readTime}</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-500 truncate">{article.publishedDate}</span>
          </div>

          {/* Title */}
          <h2 className="font-racing font-bold text-lg md:text-xl text-white group-hover:text-[#ff3833] transition-colors line-clamp-2 leading-snug">
            <a
              href={href || `/article/${article.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onSelect(article);
              }}
              className="hover:underline focus:outline-none"
            >
              {article.title}
            </a>
          </h2>

          {/* Excerpt */}
          <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Technical Snapshot Strip */}
        <div className="mt-4 pt-3 border-t border-[#1b2230]">
          {article.specs.length > 0 && (
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 mb-3 bg-[#0c0f14] p-2 rounded border border-[#181f2b]">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase truncate">{article.specs[0].label}</span>
                <span className="text-slate-200 font-semibold truncate block">{article.specs[0].value}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase truncate">{article.specs[1]?.label || 'Status'}</span>
                <span className="text-slate-200 font-semibold truncate block">{article.specs[1]?.value || 'Verified'}</span>
              </div>
            </div>
          )}

          {/* Author & Read Link */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatarUrl}
                alt={article.author.name}
                className="w-5 h-5 rounded-full object-cover border border-slate-700"
              />
              <span className="text-slate-300 font-medium text-[11px] truncate max-w-[130px]">
                {article.author.name}
              </span>
            </div>

            <div className="flex items-center gap-1 font-racing text-xs font-bold text-[#e10600] group-hover:translate-x-0.5 transition-transform">
              <span>Read Full Debrief</span>
              <span className="sr-only">: {article.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

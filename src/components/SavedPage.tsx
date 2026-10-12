import { Bookmark, ArrowLeft, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface SavedPageProps {
  savedArticles: Article[];
  onNavigate: (to: string) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export default function SavedPage({
  savedArticles,
  onNavigate,
  onRemoveBookmark,
  onClearAll
}: SavedPageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#202737] mb-8">
        <div>
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-racing font-bold text-slate-400 hover:text-white uppercase mb-3 group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#e10600] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Race Weekend Hub</span>
          </button>
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-6 h-6 text-[#e10600]" />
            <h1 className="font-racing font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-wider">
              Saved Race Debriefs ({savedArticles.length})
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Permanent bookmark library stored locally on your device for quick offline reference.
          </p>
        </div>

        {savedArticles.length > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 hover:bg-rose-900/60 text-xs font-mono transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Saved Library</span>
          </button>
        )}
      </div>

      {/* Grid of saved articles */}
      {savedArticles.length === 0 ? (
        <div className="bg-[#10141d] border border-[#202737] rounded-2xl p-16 text-center max-w-lg mx-auto">
          <Bookmark className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h2 className="font-racing font-bold text-xl text-white uppercase">
            No Debriefs Saved Yet
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-2 leading-relaxed">
            While exploring the 10 race weekend debriefs, click the bookmark icon on any card or reading page to save it here.
          </p>
          <button
            onClick={() => onNavigate('/')}
            className="mt-6 py-2 px-6 rounded-lg bg-[#e10600] text-white font-racing font-bold text-xs uppercase"
          >
            Browse Race Debriefs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onNavigate(`/article/${article.slug}`)}
              className="group bg-[#12161f] border border-[#202736] hover:border-slate-500 rounded-xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <div className="relative h-44 w-full overflow-hidden bg-[#0a0d12]">
                <img
                  src={article.heroImageUrl}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0d1015]/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono font-bold text-slate-300">
                  SESSION {article.sessionCode}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveBookmark(article.id);
                  }}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#0d1015]/80 text-rose-400 hover:bg-rose-950 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mb-1.5">
                    <span className="text-[#e10600] font-bold uppercase">{article.category}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-racing font-bold text-base text-white group-hover:text-[#ff3833] line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1d2535] flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{article.author.name}</span>
                  <div className="flex items-center gap-1 text-[#e10600] font-racing font-bold group-hover:translate-x-1 transition-transform">
                    <span>READ</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

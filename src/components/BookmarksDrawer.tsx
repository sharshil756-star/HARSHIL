import { X, Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { Article } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export default function BookmarksDrawer({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll
}: BookmarksDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="bg-[#0f131a] border-l border-[#202737] w-full max-w-md h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#202737] flex items-center justify-between bg-[#121620]">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#e10600]" />
            <h2 className="font-racing font-bold text-lg text-white uppercase tracking-wider">
              Saved Race Debriefs ({savedArticles.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#181e2a] hover:bg-[#222a3a] text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close saved race debriefs drawer"
          >
            <span className="sr-only">Close drawer</span>
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* List of saved articles */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Bookmark className="w-12 h-12 text-slate-700 mx-auto mb-3" />
              <div className="font-racing font-bold text-white text-base uppercase">No Articles Saved</div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Click the bookmark icon on any race weekend article to save it for quick offline reading.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="group bg-[#141822] border border-[#222a3a] hover:border-slate-600 rounded-xl p-3.5 flex gap-3 transition-all cursor-pointer relative"
              >
                <img
                  src={article.heroImageUrl}
                  alt={article.imageAlt}
                  className="w-20 h-20 rounded-lg object-cover shrink-0 bg-[#0a0d12]"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-1">
                      <span className="text-[#e10600] font-bold uppercase">{article.category}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-racing font-bold text-xs text-white group-hover:text-[#ff4440] line-clamp-2 leading-tight">
                      {article.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1d2433]">
                    <span className="text-[10px] font-mono text-slate-400 truncate">
                      {article.author.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveBookmark(article.id);
                      }}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                      title="Remove from saved"
                      aria-label={`Remove ${article.title} from saved debriefs`}
                    >
                      <span className="sr-only">Remove from saved</span>
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 border-t border-[#202737] bg-[#121620] flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs font-mono text-rose-400 hover:text-rose-300 transition-colors"
            >
              Clear All ({savedArticles.length})
            </button>
            <button
              onClick={onClose}
              className="py-1.5 px-4 rounded-lg bg-[#e10600] text-white font-racing font-bold text-xs uppercase"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

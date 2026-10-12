import { useState, useMemo, useEffect } from 'react';
import { 
  Compass, RotateCcw, AlertCircle, ArrowRight, Flag, Shield, Activity, 
  Wrench, Sliders, ChevronRight
} from 'lucide-react';
import { Category, Article } from './types';
import { ARTICLES } from './data/articles';
import { useRouter, CATEGORY_TO_SLUG } from './router';
import Navbar from './components/Navbar';
import ArticleCard from './components/ArticleCard';
import ArticlePage from './components/ArticlePage';
import SavedPage from './components/SavedPage';
import ToolsPage from './components/ToolsPage';
import CircuitSpecsPage from './components/CircuitSpecsPage';
import WeekendTimeline from './components/WeekendTimeline';
import TelemetryWidget from './components/TelemetryWidget';
import StrategySimulator from './components/StrategySimulator';
import PitStopGame from './components/PitStopGame';
import Footer from './components/Footer';

const CATEGORIES: Category[] = ['All', 'Race Day', 'Tech', 'Strategy', 'Qualifying'];

export default function App() {
  const { currentPath, route, navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Bookmarks state (persisted to localStorage)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('apex_f1_bookmarks');
      return saved ? JSON.parse(saved) : ['f1-art-01', 'f1-art-04', 'f1-art-06'];
    } catch {
      return ['f1-art-01', 'f1-art-04', 'f1-art-06'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('apex_f1_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (articleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  const clearAllBookmarks = () => {
    setBookmarkedIds([]);
  };

  // Determine active category based on route
  const currentCategory: Category = useMemo(() => {
    if (route.name === 'category') {
      return route.category;
    }
    return 'All';
  }, [route]);

  // Filter articles based on Category and Search Query
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        currentCategory === 'All' || article.category === currentCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        article.title.toLowerCase().includes(query) ||
        article.subtitle.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some((t) => t.toLowerCase().includes(query)) ||
        article.author.name.toLowerCase().includes(query) ||
        article.sessionCode.toLowerCase().includes(query) ||
        article.specs.some(
          (s) =>
            s.label.toLowerCase().includes(query) ||
            s.value.toLowerCase().includes(query)
        );

      return matchesCategory && matchesSearch;
    });
  }, [currentCategory, searchQuery]);

  // Featured Hero Article
  const heroArticle = useMemo(() => {
    return ARTICLES.find((a) => a.order === 1) || ARTICLES[0];
  }, []);

  // Saved articles object list
  const savedArticles = useMemo(() => {
    return ARTICLES.filter((a) => bookmarkedIds.includes(a.id));
  }, [bookmarkedIds]);

  return (
    <div className="min-h-screen bg-[#0b0d10] text-slate-100 flex flex-col font-sans selection:bg-[#e10600] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        categories={CATEGORIES}
        selectedCategory={currentCategory}
        onSelectCategory={(cat) => {
          setSearchQuery('');
          if (cat === 'All') {
            navigate('/');
          } else {
            navigate(`/category/${CATEGORY_TO_SLUG[cat]}`);
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (route.name !== 'home' && route.name !== 'category') {
            navigate('/');
          }
        }}
        savedCount={bookmarkedIds.length}
        onNavigate={navigate}
      />

      {/* Weekend Timeline Session Navigator */}
      <WeekendTimeline
        articles={ARTICLES}
        onSelectArticle={(art) => navigate(`/article/${art.slug}`)}
        activeArticleId={route.name === 'article' ? route.article.id : undefined}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* Route: Single Article Page (/article/:slug) */}
        {route.name === 'article' && (
          <ArticlePage
            article={route.article}
            onNavigate={navigate}
            isBookmarked={bookmarkedIds.includes(route.article.id)}
            onToggleBookmark={(id) => toggleBookmark(id)}
          />
        )}

        {/* Route: Saved Bookmarks Page (/saved) */}
        {route.name === 'saved' && (
          <SavedPage
            savedArticles={savedArticles}
            onNavigate={navigate}
            onRemoveBookmark={(id) => toggleBookmark(id)}
            onClearAll={clearAllBookmarks}
          />
        )}

        {/* Route: Tools Page (/tools/:tool) */}
        {route.name === 'tool' && (
          <ToolsPage
            tool={route.tool}
            onNavigate={navigate}
          />
        )}

        {/* Route: Circuit Specifications Page (/circuit-specs) */}
        {route.name === 'circuit-specs' && (
          <CircuitSpecsPage onNavigate={navigate} />
        )}

        {/* Route: Not Found (404) */}
        {route.name === 'not-found' && (
          <div className="max-w-md mx-auto py-20 px-4 text-center">
            <AlertCircle className="w-16 h-16 text-[#e10600] mx-auto mb-4" />
            <h1 className="font-racing font-extrabold text-3xl text-white uppercase tracking-wider">
              404: Session Not Found
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-2 mb-6">
              The requested race debrief or telemetry telemetry URL does not exist or was flagged by the stewards.
            </p>
            <button
              onClick={() => navigate('/')}
              className="py-2.5 px-6 rounded-lg bg-[#e10600] text-white font-racing font-bold text-xs uppercase"
            >
              Return to Race Weekend Hub
            </button>
          </div>
        )}

        {/* Route: Home (/) or Category (/category/:slug) */}
        {(route.name === 'home' || route.name === 'category') && (
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* If on home and no active search query, display the Hero Article feature banner */}
            {route.name === 'home' && !searchQuery && (
              <section className="mb-12">
                <div
                  onClick={() => navigate(`/article/${heroArticle.slug}`)}
                  className="group relative rounded-2xl overflow-hidden border border-[#222b3b] hover:border-[#e10600]/80 bg-[#10141d] transition-all duration-300 shadow-2xl hover:shadow-[0_0_35px_rgba(225,6,0,0.25)] cursor-pointer"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
                    {/* Left Content Side */}
                    <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between z-10">
                      <div>
                        {/* Clean unboxed metadata */}
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
                          <span className="font-bold text-[#e10600] uppercase tracking-wider">
                            FEATURED DEBRIEF
                          </span>
                          <span className="text-slate-600" aria-hidden="true">·</span>
                          <span className="text-slate-300 font-bold">SESSION {heroArticle.sessionCode}</span>
                          <span className="text-slate-600" aria-hidden="true">·</span>
                          <span>{heroArticle.readTime}</span>
                        </div>

                        <h2 className="font-racing font-extrabold text-2xl sm:text-3xl md:text-4xl text-white group-hover:text-[#ff3833] transition-colors leading-tight">
                          {heroArticle.title}
                        </h2>

                        <p className="text-slate-300 text-sm sm:text-base mt-3 line-clamp-3 leading-relaxed">
                          {heroArticle.excerpt}
                        </p>
                      </div>

                      {/* Technical Specs Strip */}
                      <div className="mt-6 pt-4 border-t border-[#1d2535]">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono mb-4">
                          {heroArticle.specs.slice(0, 4).map((spec, i) => (
                            <div key={i} className="bg-[#0b0e14]/90 p-2.5 rounded-lg border border-[#1c2331]">
                              <span className="text-[10px] text-slate-400 uppercase block truncate">{spec.label}</span>
                              <span className="font-bold text-white font-telemetry block truncate mt-0.5">{spec.value}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={heroArticle.author.avatarUrl}
                              alt={heroArticle.author.name}
                              className="w-8 h-8 rounded-full object-cover border border-[#2b3547]"
                            />
                            <div>
                              <div className="text-xs font-racing font-bold text-white">
                                {heroArticle.author.name}
                              </div>
                              <div className="text-[11px] font-mono text-slate-400">
                                {heroArticle.author.role}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 py-2 px-4 rounded-lg bg-[#e10600] text-white font-racing font-bold text-xs uppercase tracking-wider group-hover:bg-[#c50500] transition-colors shadow-md">
                            <span>Read Full Analysis</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Image Side */}
                    <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden bg-[#0a0d12]">
                      <img
                        src={heroArticle.heroImageUrl}
                        alt={heroArticle.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#10141d] via-transparent to-transparent" />
                      <div className="absolute bottom-3 right-3 text-[10px] font-mono bg-black/70 px-2 py-1 rounded text-slate-400">
                        Aerodynamic Flow Visualization
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Section Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-3 border-b border-[#1c2332]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#e10600] rounded-sm" />
                  <h1 className="font-racing font-bold text-xl md:text-2xl text-white uppercase tracking-wider">
                    {currentCategory === 'All' ? 'Complete Race Weekend Debriefs' : `${currentCategory} Debriefs`}
                  </h1>
                </div>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Showing {filteredArticles.length} technical report{filteredArticles.length === 1 ? '' : 's'}
                  {searchQuery && ` matching "${searchQuery}"`}
                  {currentCategory !== 'All' && ` in ${currentCategory}`}
                </p>
              </div>

              {/* Quick reset if filter or search is active */}
              {(currentCategory !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    navigate('/');
                  }}
                  className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 py-1 px-3 rounded-lg bg-[#141923] border border-[#202838] cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-[#e10600]" />
                  Reset to All Debriefs
                </button>
              )}
            </div>

            {/* Article Grid with Unique URLs */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={(art) => navigate(`/article/${art.slug}`)}
                    isBookmarked={bookmarkedIds.includes(article.id)}
                    onToggleBookmark={toggleBookmark}
                    href={`/article/${article.slug}`}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-[#11151e] border border-[#202737] rounded-2xl p-12 text-center max-w-md mx-auto my-12">
                <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                <h3 className="font-racing font-bold text-lg text-white uppercase">
                  No Matching Debriefs Found
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-2">
                  No articles match your query "{searchQuery}".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    navigate('/');
                  }}
                  className="mt-5 py-2 px-5 rounded-lg bg-[#e10600] text-white font-racing font-bold text-xs uppercase cursor-pointer"
                >
                  View All 10 Debriefs
                </button>
              </div>
            )}

            {/* Interactive Tooling Quick Access Section */}
            {route.name === 'home' && (
              <section className="mt-16 pt-10 border-t border-[#1c2331]">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#e10600]" />
                    <h2 className="font-racing font-bold text-xl md:text-2xl text-white uppercase tracking-wider">
                      Interactive Paddock Tooling Suite
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <button
                      onClick={() => navigate('/tools/telemetry')}
                      className="text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Open Dedicated Labs →
                    </button>
                  </div>
                </div>

                <p className="text-xs font-mono text-slate-400 mb-6 max-w-2xl leading-relaxed">
                  Test the mathematical and biomechanical realities of Formula 1 with individual standalone simulators.
                </p>

                <div className="space-y-8">
                  <TelemetryWidget />
                  <StrategySimulator />
                  <PitStopGame />
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          if (cat === 'All') navigate('/');
          else navigate(`/category/${CATEGORY_TO_SLUG[cat]}`);
        }}
      />
    </div>
  );
}

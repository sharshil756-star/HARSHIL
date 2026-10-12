import { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Bookmark, Share2, Check, Clock, Calendar, 
  Volume2, Play, Pause, ChevronRight, Activity, Wrench, Sliders, Flame, ThumbsUp
} from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/articles';
import { CATEGORY_TO_SLUG } from '../router';
import TelemetryWidget from './TelemetryWidget';
import StrategySimulator from './StrategySimulator';
import PitStopGame from './PitStopGame';

interface ArticlePageProps {
  article: Article;
  onNavigate: (to: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export default function ArticlePage({
  article,
  onNavigate,
  isBookmarked,
  onToggleBookmark
}: ArticlePageProps) {
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<'1.0x' | '1.25x' | '1.5x'>('1.0x');
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [reactions, setReactions] = useState({
    fire: 42,
    tech: 38,
    strategy: 29
  });
  const [userReacted, setUserReacted] = useState<{ [key: string]: boolean }>({});

  const currentIndex = ARTICLES.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  // Window scroll progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    const fullUrl = window.location.origin + `/article/${article.slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleReaction = (type: 'fire' | 'tech' | 'strategy') => {
    if (userReacted[type]) {
      setReactions((prev) => ({ ...prev, [type]: prev[type] - 1 }));
      setUserReacted((prev) => ({ ...prev, [type]: false }));
    } else {
      setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
      setUserReacted((prev) => ({ ...prev, [type]: true }));
    }
  };

  const categorySlug = CATEGORY_TO_SLUG[article.category] || 'tech';

  return (
    <article className="min-h-screen pb-16">
      {/* Sticky Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#161d2a] z-50">
        <div
          className="h-full bg-[#e10600] shadow-[0_0_8px_#e10600] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Breadcrumb Header Bar */}
      <nav className="bg-[#0f131a] border-b border-[#1c2433] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Race Hub</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <button
              onClick={() => onNavigate(`/category/${categorySlug}`)}
              className="hover:text-white text-[#e10600] font-bold uppercase transition-colors cursor-pointer"
            >
              {article.category}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-300 truncate max-w-[200px] sm:max-w-none">
              Session {article.sessionCode}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="py-1 px-2.5 rounded bg-[#161c28] hover:bg-[#202838] text-slate-300 text-xs font-mono transition-colors"
              title="Toggle reading font size"
            >
              <span className={fontSize === 'large' ? 'font-bold text-white' : 'text-slate-400'}>A</span>
              <span className={fontSize === 'large' ? 'text-xs text-[#e10600]' : 'text-[10px] text-slate-400'}>A</span>
            </button>

            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-[#e10600] text-white'
                  : 'bg-[#161c28] hover:bg-[#202838] text-slate-300 hover:text-white'
              }`}
              title={isBookmarked ? 'Saved to Bookmarks' : 'Save Article'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#161c28] hover:bg-[#202838] text-slate-300 hover:text-white transition-colors relative cursor-pointer"
              title="Copy Canonical URL"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="text-[11px] font-mono hidden sm:inline">
                {copiedLink ? 'Copied' : 'Share'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Article Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Back Link */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-racing font-bold text-slate-400 hover:text-white uppercase mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#e10600] group-hover:-translate-x-1 transition-transform" />
          <span>Return to Race Weekend Overview</span>
        </button>

        {/* Quiet unboxed metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-3">
          <span className="text-[#e10600] font-bold uppercase">{article.category} SPECIFICATION</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-300 font-semibold">SESSION {article.sessionCode}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
          <span aria-hidden="true">·</span>
          <span>{article.publishedDate}</span>
        </div>

        {/* Headline */}
        <h1 className="font-racing font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight">
          {article.title}
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed border-l-2 border-[#e10600] pl-4">
          {article.subtitle}
        </p>

        {/* Author Byline */}
        <div className="flex items-center gap-3 my-6 py-4 border-y border-[#1c2433]">
          <img
            src={article.author.avatarUrl}
            alt={article.author.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#2b3547]"
          />
          <div>
            <div className="font-racing font-bold text-base text-white">
              {article.author.name}
            </div>
            <div className="text-xs font-mono text-slate-400">
              {article.author.role}
            </div>
          </div>
        </div>

        {/* Audio Briefing Box */}
        <div className="bg-[#111620] border border-[#202737] rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-[#e10600] text-white shadow-lg shadow-red-950'
                  : 'bg-[#1c2332] text-slate-200 hover:bg-[#e10600] hover:text-white'
              }`}
              title={isPlayingAudio ? 'Pause Audio Brief' : 'Play Audio Brief'}
            >
              {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <div>
              <div className="text-xs font-racing font-bold text-white flex items-center gap-1.5 uppercase">
                <Volume2 className="w-3.5 h-3.5 text-[#e10600]" />
                Paddock Voice Debriefing
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {isPlayingAudio ? 'Broadcasting live radio stream...' : 'Listen to 5-minute technical breakdown'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {isPlayingAudio && (
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <span
                    key={i}
                    className="w-1 bg-[#e10600] rounded-full animate-bounce"
                    style={{
                      height: `${Math.sin(i * 1.5) * 10 + 14}px`,
                      animationDelay: `${i * 120}ms`
                    }}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center bg-[#1b2230] rounded p-0.5 text-[11px] font-mono text-slate-400">
              {(['1.0x', '1.25x', '1.5x'] as const).map((speed) => (
                <button
                  key={speed}
                  onClick={() => setAudioSpeed(speed)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    audioSpeed === speed ? 'bg-[#e10600] text-white font-bold' : 'hover:text-white'
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden border border-[#202838] mb-8 bg-[#0a0d12]">
          <img
            src={article.heroImageUrl}
            alt={article.imageAlt}
            className="w-full h-80 sm:h-96 object-cover"
          />
          <div className="bg-[#0b0e14] px-4 py-2 text-[11px] font-mono text-slate-400 border-t border-[#1a212f]">
            {article.imageAlt}
          </div>
        </div>

        {/* Technical Specs Strip */}
        <div className="bg-[#121620] border border-[#232b3c] rounded-xl p-5 mb-8">
          <h3 className="font-racing font-bold text-sm tracking-wide text-white uppercase mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#e10600] rounded-sm" />
            Telemetry Channels & Engineering Specifications
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {article.specs.map((spec, i) => (
              <div key={i} className="bg-[#0c0f15] p-3 rounded-lg border border-[#1b2230]">
                <span className="text-[10px] font-mono text-slate-400 block uppercase truncate">
                  {spec.label}
                </span>
                <span className="text-base font-bold font-telemetry text-white block mt-0.5">
                  {spec.value}
                </span>
                {spec.delta && (
                  <span className="text-[10px] font-mono text-[#e10600] block mt-0.5 font-semibold">
                    {spec.delta}
                  </span>
                )}
                {spec.note && (
                  <span className="text-[10px] font-mono text-slate-500 block mt-0.5 truncate">
                    {spec.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quote if present */}
        {article.quote && (
          <div className="relative my-8 bg-gradient-to-r from-red-950/20 to-transparent border-l-4 border-[#e10600] p-6 rounded-r-xl">
            <p className="text-slate-200 italic font-serif text-lg leading-relaxed">
              "{article.quote.text}"
            </p>
            <div className="mt-3 text-xs font-mono">
              <span className="text-white font-bold">{article.quote.author}</span>
              <span className="text-slate-500"> — {article.quote.role}</span>
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className={`space-y-8 ${fontSize === 'large' ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'} text-slate-300 font-sans`}>
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-racing font-bold text-2xl text-white tracking-wide pt-4 border-t border-[#1c2331]">
                {section.title}
              </h2>

              <div className="space-y-3">
                {section.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed text-slate-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.keyMetric && (
                <div className="bg-[#121722] border-l-2 border-[#00d2be] p-4 rounded-r-lg my-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#00d2be] uppercase tracking-wider block font-bold">
                      Key Sensor Metric
                    </span>
                    <span className="text-xs font-mono text-slate-400 mt-0.5 block">
                      {section.keyMetric.description}
                    </span>
                  </div>
                  <div className="text-2xl font-bold font-telemetry text-white shrink-0 ml-4">
                    {section.keyMetric.stat}
                  </div>
                </div>
              )}

              {section.highlightBox && (
                <div className="bg-[#141924] border border-[#273247] p-4 rounded-xl my-4">
                  <div className="text-xs font-racing font-bold text-[#f59e0b] uppercase tracking-wider mb-1">
                    {section.highlightBox.title}
                  </div>
                  <p className="text-xs font-mono text-slate-300 leading-relaxed">
                    {section.highlightBox.body}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Integrated Interactive Lab */}
        <div className="my-10 pt-6 border-t border-[#222a3a]">
          <div className="text-xs font-racing font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Engineering Simulation Module
          </div>

          {article.interactiveType === 'telemetry' && <TelemetryWidget />}
          {article.interactiveType === 'strategy' && <StrategySimulator />}
          {article.interactiveType === 'pitstop' && <PitStopGame />}
        </div>

        {/* Reader Reactions */}
        <div className="bg-[#11151e] border border-[#202737] rounded-xl p-5 my-8">
          <span className="text-xs font-racing font-bold text-slate-300 uppercase tracking-wider block mb-3">
            Engineers' Verdict & Reader Reactions
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleReaction('fire')}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                userReacted['fire']
                  ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                  : 'bg-[#161c28] border-[#252f44] text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4 text-rose-500" />
              <span>Masterclass</span>
              <span className="font-bold text-white">{reactions.fire}</span>
            </button>

            <button
              onClick={() => handleReaction('tech')}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                userReacted['tech']
                  ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                  : 'bg-[#161c28] border-[#252f44] text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Technical Gold</span>
              <span className="font-bold text-white">{reactions.tech}</span>
            </button>

            <button
              onClick={() => handleReaction('strategy')}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                userReacted['strategy']
                  ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                  : 'bg-[#161c28] border-[#252f44] text-slate-400 hover:text-white'
              }`}
            >
              <ThumbsUp className="w-4 h-4 text-amber-400" />
              <span>Tactical Genius</span>
              <span className="font-bold text-white">{reactions.strategy}</span>
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-8 pt-4 border-t border-[#1b2230]">
          <span className="text-slate-500 uppercase">Tags:</span>
          {article.tags.map((tag, idx) => (
            <span key={idx} className="bg-[#151a24] px-2.5 py-1 rounded text-slate-300 border border-[#202737]">
              #{tag}
            </span>
          ))}
        </div>

        {/* Next / Previous Article Permalinks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#222a3a]">
          {prevArticle ? (
            <button
              onClick={() => onNavigate(`/article/${prevArticle.slug}`)}
              className="flex items-center gap-3 p-4 rounded-xl bg-[#131722] hover:bg-[#1a202d] border border-[#202839] text-left transition-all group cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-[#e10600] group-hover:-translate-x-1 transition-transform shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">
                  Session {prevArticle.sessionCode}
                </span>
                <span className="text-xs font-racing font-bold text-white truncate block">
                  {prevArticle.title}
                </span>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextArticle && (
            <button
              onClick={() => onNavigate(`/article/${nextArticle.slug}`)}
              className="flex items-center justify-between p-4 rounded-xl bg-[#131722] hover:bg-[#1a202d] border border-[#202839] text-right transition-all group cursor-pointer"
            >
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">
                  Session {nextArticle.sessionCode}
                </span>
                <span className="text-xs font-racing font-bold text-white truncate block">
                  {nextArticle.title}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-[#e10600] group-hover:translate-x-1 transition-transform shrink-0 ml-3" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

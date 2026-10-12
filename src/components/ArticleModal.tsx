import { useState, useEffect, useRef } from 'react';
import { 
  X, Bookmark, Share2, Play, Pause, Volume2, ArrowLeft, ArrowRight, 
  Check, Quote, BookOpen, Sliders, Activity, Wrench, Sparkles, ThumbsUp, Flame
} from 'lucide-react';
import { Article } from '../types';
import TelemetryWidget from './TelemetryWidget';
import StrategySimulator from './StrategySimulator';
import PitStopGame from './PitStopGame';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  hasNext: boolean;
  hasPrev: boolean;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export default function ArticleModal({
  article,
  onClose,
  onNavigate,
  hasNext,
  hasPrev,
  isBookmarked,
  onToggleBookmark
}: ArticleModalProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<'1.0x' | '1.25x' | '1.5x'>('1.0x');
  const [audioProgress, setAudioProgress] = useState(15); // simulated percent
  const [copiedLink, setCopiedLink] = useState(false);
  const [reactions, setReactions] = useState<{ [key: string]: number }>({
    fire: 42,
    tech: 38,
    strategy: 29
  });
  const [userReacted, setUserReacted] = useState<{ [key: string]: boolean }>({});

  const contentRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation & scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNavigate('next');
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onNavigate, hasNext, hasPrev]);

  // Handle scroll progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - clientHeight > 0) {
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    }
  };

  // Copy share link
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleReaction = (type: 'fire' | 'tech' | 'strategy') => {
    if (userReacted[type]) {
      setReactions(prev => ({ ...prev, [type]: prev[type] - 1 }));
      setUserReacted(prev => ({ ...prev, [type]: false }));
    } else {
      setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
      setUserReacted(prev => ({ ...prev, [type]: true }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-0 md:p-4 lg:p-6 animate-in fade-in duration-200">
      {/* Container */}
      <div className="bg-[#0e1218] border border-[#222a3a] md:rounded-2xl w-full max-w-5xl h-full md:h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Sticky Reading Progress Bar */}
        <div className="w-full bg-[#1b2230] h-1 shrink-0 relative">
          <div
            className="h-full bg-[#e10600] transition-all duration-100 shadow-[0_0_8px_#e10600]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#11151d] border-b border-[#202737] shrink-0 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#181e2b] hover:bg-[#222a3a] text-slate-300 hover:text-white text-xs font-racing font-bold tracking-wide uppercase transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Hub</span>
            </button>

            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">|</span>

            {/* Quiet unboxed session and category tags */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-[#e10600] font-bold">SESSION {article.sessionCode}</span>
              <span aria-hidden="true">·</span>
              <span>{article.category}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size toggle */}
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="py-1 px-2.5 rounded bg-[#181e2b] hover:bg-[#222a3a] text-slate-300 text-xs font-mono transition-colors"
              title="Toggle reading font size"
            >
              <span className={fontSize === 'large' ? 'font-bold text-white' : 'text-slate-400'}>A</span>
              <span className={fontSize === 'large' ? 'text-xs text-[#e10600]' : 'text-[10px] text-slate-400'}>A</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-[#e10600] text-white'
                  : 'bg-[#181e2b] hover:bg-[#222a3a] text-slate-300 hover:text-white'
              }`}
              title={isBookmarked ? 'Saved to Bookmarks' : 'Save Article'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-[#181e2b] hover:bg-[#222a3a] text-slate-300 hover:text-white transition-colors relative cursor-pointer"
              title="Copy Article Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 bg-emerald-950 text-emerald-300 border border-emerald-600 text-[10px] font-mono px-2 py-0.5 rounded shadow">
                  Copied!
                </span>
              )}
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#181e2b] hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 transition-colors ml-1 cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-8 scroll-smooth"
        >
          <div className="max-w-3xl mx-auto">
            {/* Metadata Header */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-3">
              <span className="text-[#e10600] font-bold uppercase">{article.category} SPECIFICATION</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{article.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span>Article #{article.order} of 10</span>
            </div>

            {/* Headline */}
            <h1 className="font-racing font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-wide leading-tight">
              {article.title}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed border-l-2 border-[#e10600] pl-3">
              {article.subtitle}
            </p>

            {/* Author Byline */}
            <div className="flex items-center gap-3 my-6 py-3 border-y border-[#1f2637]">
              <img
                src={article.author.avatarUrl}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-[#2b3547]"
              />
              <div>
                <div className="font-racing font-bold text-sm text-white">
                  {article.author.name}
                </div>
                <div className="text-xs font-mono text-slate-400">
                  {article.author.role}
                </div>
              </div>
            </div>

            {/* Audio Reader Simulation Bar */}
            <div className="bg-[#131822] border border-[#212a3a] rounded-xl p-3.5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-[#e10600] text-white shadow-lg shadow-red-950'
                      : 'bg-[#1e2535] text-slate-200 hover:bg-[#e10600] hover:text-white'
                  }`}
                  title={isPlayingAudio ? 'Pause Audio Brief' : 'Play Audio Brief'}
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <div>
                  <div className="text-xs font-racing font-bold text-white flex items-center gap-1.5 uppercase">
                    <Volume2 className="w-3.5 h-3.5 text-[#e10600]" />
                    Paddock Audio Briefing
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    {isPlayingAudio ? 'Playing simulated radio debrief...' : 'Listen to voice debrief (5 min duration)'}
                  </div>
                </div>
              </div>

              {/* Progress & Speed */}
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
            <div className="rounded-xl overflow-hidden border border-[#222a3a] mb-8 bg-[#0a0d12]">
              <img
                src={article.heroImageUrl}
                alt={article.imageAlt}
                className="w-full h-80 object-cover"
              />
              <div className="bg-[#0b0e14] px-4 py-2 text-[11px] font-mono text-slate-400 border-t border-[#1a212f]">
                {article.imageAlt}
              </div>
            </div>

            {/* Technical Specifications Grid */}
            <div className="bg-[#121620] border border-[#232b3c] rounded-xl p-5 mb-8">
              <h3 className="font-racing font-bold text-sm tracking-wide text-white uppercase mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#e10600] rounded-sm" />
                Technical Telemetry & Session Metrics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {article.specs.map((spec, i) => (
                  <div key={i} className="bg-[#0d1016] p-3 rounded-lg border border-[#1b2230]">
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

            {/* Embedded Quote if present */}
            {article.quote && (
              <div className="relative my-8 bg-gradient-to-r from-red-950/20 to-transparent border-l-4 border-[#e10600] p-5 rounded-r-xl">
                <Quote className="w-6 h-6 text-[#e10600]/40 mb-2" />
                <p className="text-slate-200 italic font-serif text-base sm:text-lg leading-relaxed">
                  "{article.quote.text}"
                </p>
                <div className="mt-3 text-xs font-mono">
                  <span className="text-white font-bold">{article.quote.author}</span>
                  <span className="text-slate-500"> — {article.quote.role}</span>
                </div>
              </div>
            )}

            {/* Article Content Sections */}
            <div className={`space-y-8 ${fontSize === 'large' ? 'text-base sm:text-lg leading-relaxed' : 'text-sm sm:text-base leading-relaxed'} text-slate-300 font-sans`}>
              {article.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className="font-racing font-bold text-xl sm:text-2xl text-white tracking-wide pt-2 border-t border-[#1c2331]">
                    {section.title}
                  </h2>

                  {/* Paragraph with whitespace breaks preserved */}
                  <div className="space-y-3">
                    {section.content.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="leading-relaxed text-slate-300">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Key Metric highlight */}
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

                  {/* Highlight callout box */}
                  {section.highlightBox && (
                    <div className="bg-[#141924] border border-[#273247] p-4 rounded-xl my-4">
                      <div className="text-xs font-racing font-bold text-[#f59e0b] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
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

            {/* Embedded Interactive Tools (Integrated directly into reader) */}
            <div className="my-10 pt-6 border-t border-[#222a3a]">
              <div className="text-xs font-racing font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Engineering Analysis Module
              </div>

              {article.interactiveType === 'telemetry' && <TelemetryWidget />}
              {article.interactiveType === 'strategy' && <StrategySimulator />}
              {article.interactiveType === 'pitstop' && <PitStopGame />}
              {!article.interactiveType && (
                <div className="bg-[#111620] border border-[#202737] rounded-xl p-5 text-center">
                  <span className="text-xs font-mono text-slate-400 block mb-2">Want to test pit stop reflexes or examine speed traces?</span>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => onNavigate('prev')}
                      className="text-xs font-racing font-bold uppercase py-2 px-4 rounded bg-[#18202d] hover:bg-[#222c3e] text-slate-200"
                    >
                      ← Previous Session Debrief
                    </button>
                    <button
                      onClick={() => onNavigate('next')}
                      className="text-xs font-racing font-bold uppercase py-2 px-4 rounded bg-[#e10600] text-white"
                    >
                      Next Session Debrief →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Article Feedback & Reactions */}
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

            {/* Tags Strip */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-8 pt-4 border-t border-[#1b2230]">
              <span className="text-slate-500 uppercase">Tags:</span>
              {article.tags.map((tag, idx) => (
                <span key={idx} className="bg-[#151a24] px-2.5 py-1 rounded text-slate-300 border border-[#202737]">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Bottom Next / Prev Article Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#222a3a]">
              {hasPrev ? (
                <button
                  onClick={() => onNavigate('prev')}
                  className="flex items-center gap-3 p-4 rounded-xl bg-[#131722] hover:bg-[#1a202d] border border-[#202839] text-left transition-all group cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 text-[#e10600] group-hover:-translate-x-1 transition-transform shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Previous Session</span>
                    <span className="text-xs font-racing font-bold text-white truncate block">Go to Previous Article</span>
                  </div>
                </button>
              ) : (
                <div />
              )}

              {hasNext && (
                <button
                  onClick={() => onNavigate('next')}
                  className="flex items-center justify-between p-4 rounded-xl bg-[#131722] hover:bg-[#1a202d] border border-[#202839] text-right transition-all group cursor-pointer"
                >
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Next Session</span>
                    <span className="text-xs font-racing font-bold text-white truncate block">Continue to Next Article</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#e10600] group-hover:translate-x-1 transition-transform shrink-0 ml-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Flag, Gauge, Timer, Wrench, Shield, CheckCircle2 } from 'lucide-react';
import { Article } from '../types';

interface WeekendTimelineProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  activeArticleId?: string;
}

export default function WeekendTimeline({ articles, onSelectArticle, activeArticleId }: WeekendTimelineProps) {
  const sessionPhases = [
    {
      code: 'FP1/FP2',
      name: 'Fri Practice',
      desc: 'Aero mapping & tyre deg',
      icon: Wrench,
      articleOrder: 1,
      color: 'border-blue-500/50 text-blue-400'
    },
    {
      code: 'FP3',
      name: 'Sat Practice',
      desc: 'Set-up lock & telemetry',
      icon: Gauge,
      articleOrder: 2,
      color: 'border-cyan-500/50 text-cyan-400'
    },
    {
      code: 'QUALIFYING',
      name: 'Qualifying',
      desc: 'Q1-Q3 Shootout',
      icon: Timer,
      articleOrder: 3,
      color: 'border-purple-500/50 text-purple-400'
    },
    {
      code: 'GRID',
      name: 'Grid & Tyre',
      desc: 'Undercut models',
      icon: Gauge,
      articleOrder: 4,
      color: 'border-amber-500/50 text-amber-400'
    },
    {
      code: 'RACE START',
      name: 'Turn 1 Launch',
      desc: 'Launch physics',
      icon: Flag,
      articleOrder: 5,
      color: 'border-rose-500/50 text-rose-400'
    },
    {
      code: 'PIT STOP',
      name: '1.9s Pit Stop',
      desc: 'Wheel gun choreography',
      icon: Wrench,
      articleOrder: 6,
      color: 'border-orange-500/50 text-orange-400'
    },
    {
      code: 'SAFETY CAR',
      name: 'Safety Car',
      desc: 'VSC cheap pit delta',
      icon: Shield,
      articleOrder: 7,
      color: 'border-yellow-500/50 text-yellow-400'
    },
    {
      code: 'CHEQUERED FLAG',
      name: 'Chequered Flag',
      desc: 'Podium & fastest lap',
      icon: Flag,
      articleOrder: 9,
      color: 'border-emerald-500/50 text-emerald-400'
    },
    {
      code: 'SCRUTINEERING',
      name: 'Parc Fermé',
      desc: 'FIA legality check',
      icon: CheckCircle2,
      articleOrder: 10,
      color: 'border-slate-500/50 text-slate-400'
    }
  ];

  return (
    <div className="w-full bg-[#10141b] border-y border-[#202736] py-3.5 px-4 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
        <div className="text-[11px] font-racing font-bold tracking-wider text-slate-400 uppercase pr-3 border-r border-[#242c3d] flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#e10600] animate-ping" />
          <span>Weekend Flow</span>
        </div>

        <div className="flex items-center gap-2">
          {sessionPhases.map((phase) => {
            const article = articles.find((a) => a.order === phase.articleOrder);
            const isActive = article && activeArticleId === article.id;
            const Icon = phase.icon;

            return (
              <button
                key={phase.code}
                onClick={() => article && onSelectArticle(article)}
                className={`group flex items-center gap-2 py-1.5 px-3 rounded-lg border text-left transition-all ${
                  isActive
                    ? 'bg-[#1b2230] border-[#e10600] text-white shadow-sm'
                    : 'bg-[#131720] border-[#1f2635] text-slate-300 hover:border-slate-500 hover:bg-[#181d28]'
                }`}
                title={article?.title || phase.desc}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#e10600]' : 'text-slate-400 group-hover:text-white'}`} />
                <div>
                  <div className="text-xs font-racing font-bold tracking-wide uppercase leading-tight">
                    {phase.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400 truncate max-w-[120px]">
                    {phase.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

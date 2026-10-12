export type Category = 'All' | 'Race Day' | 'Tech' | 'Strategy' | 'Qualifying';

export interface TelemetryData {
  distance: number; // meters from sector start
  speedCarA: number; // km/h
  speedCarB: number; // km/h
  gearCarA: number;
  throttleCarA: number; // 0-100%
  brakeCarA: number; // 0-100%
}

export interface TechnicalSpec {
  label: string;
  value: string;
  delta?: string;
  note?: string;
}

export interface ArticleSection {
  title: string;
  content: string;
  keyMetric?: {
    stat: string;
    description: string;
  };
  highlightBox?: {
    title: string;
    body: string;
  };
}

export interface Article {
  id: string;
  order: number;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Race Day' | 'Tech' | 'Strategy' | 'Qualifying';
  sessionCode: 'FP1/FP2' | 'FP3' | 'QUALIFYING' | 'GRID' | 'RACE START' | 'PIT STOP' | 'SAFETY CAR' | 'RACE BATTLE' | 'CHEQUERED FLAG' | 'SCRUTINEERING';
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  heroImageUrl: string;
  imageAlt: string;
  featured: boolean;
  excerpt: string;
  tags: string[];
  specs: TechnicalSpec[];
  sections: ArticleSection[];
  audioDurationMinutes?: number;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  interactiveType?: 'telemetry' | 'strategy' | 'pitstop';
}

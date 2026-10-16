export type Category = 
  | 'All' 
  | 'Match Analysis' 
  | 'Longform Essays' 
  | 'Player Profiles' 
  | 'Cricket History' 
  | 'Tactics & Seamcraft';

export interface HawkeyeTrajectoryData {
  distance: number; // meters from bowler release
  ballHeight: number; // meters above ground
  lateralDeviation: number; // centimeters from stumps center line
  velocity: number; // km/h
  seamAngle: number; // degrees tilt
  isPitched: boolean;
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
  category: 'Match Analysis' | 'Longform Essays' | 'Player Profiles' | 'Cricket History' | 'Tactics & Seamcraft';
  sessionCode: 
    | 'TEST TACTICS' 
    | 'ICONIC GROUNDS' 
    | 'DAY 5 DRAMA' 
    | 'FIELD ARCHITECTURE' 
    | 'CRICKET ESSAYS' 
    | 'SEAMCRAFT' 
    | 'BATTING CRAFT' 
    | 'LEGENDARY MATCHES' 
    | 'BOWLING KINEMATICS' 
    | 'PASTORAL HERITAGE';
  readTime: string;
  publishedDate: string;
  edition: string; // e.g. 'Vol. XII · Issue 44'
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  heroImageUrl: string;
  imageAlt: string;
  featured: boolean;
  excerpt: string;
  metaDescription: string;
  tags: string[];
  specs: TechnicalSpec[];
  sections: ArticleSection[];
  audioDurationMinutes?: number;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  interactiveType?: 'seam-simulator' | 'field-placer' | 'pitch-lab';
}

export interface FieldPlacementPosition {
  id: string;
  name: string;
  role: 'Attacking' | 'Defensive' | 'Catching' | 'Boundary';
  x: number; // percentage coordinates on circular ground (0-100)
  y: number; // percentage coordinates on circular ground (0-100)
  description: string;
}

export interface TestMatchCondition {
  ground: string;
  pitchType: string;
  weather: string;
  humidity: string;
  overhead: string;
  dewFactor: string;
  tossAdvantage: string;
}

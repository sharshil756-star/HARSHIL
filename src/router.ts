import { useState, useEffect, useCallback } from 'react';
import { ARTICLES, RACE_WEEKEND_INFO } from './data/articles';
import { Article, Category } from './types';

export type RouteType = 
  | { name: 'home' }
  | { name: 'article'; slug: string; article: Article }
  | { name: 'category'; category: Category; slug: string }
  | { name: 'saved' }
  | { name: 'tool'; tool: 'telemetry' | 'strategy' | 'pit-stop' }
  | { name: 'circuit-specs' }
  | { name: 'not-found' };

export const CATEGORY_SLUGS: Record<string, Category> = {
  'all': 'All',
  'race-day': 'Race Day',
  'tech': 'Tech',
  'strategy': 'Strategy',
  'qualifying': 'Qualifying'
};

export const CATEGORY_TO_SLUG: Record<Category, string> = {
  'All': 'all',
  'Race Day': 'race-day',
  'Tech': 'tech',
  'Strategy': 'strategy',
  'Qualifying': 'qualifying'
};

export function parsePath(pathname: string): RouteType {
  // Normalize pathname: remove trailing slash, lower case for matching
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean === '/' || clean === '') {
    return { name: 'home' };
  }

  // /category/:categorySlug/:slug (Hierarchical directory tree)
  const categoryArticleMatch = clean.match(/^\/category\/[^/]+\/([^/]+)$/);
  if (categoryArticleMatch) {
    const slug = categoryArticleMatch[1];
    const article = ARTICLES.find((a) => a.slug === slug);
    if (article) {
      return { name: 'article', slug, article };
    }
    return { name: 'not-found' };
  }

  // /article/:slug
  const articleMatch = clean.match(/^\/article\/([^/]+)$/);
  if (articleMatch) {
    const slug = articleMatch[1];
    const article = ARTICLES.find((a) => a.slug === slug);
    if (article) {
      return { name: 'article', slug, article };
    }
    return { name: 'not-found' };
  }

  // /category/:slug
  const categoryMatch = clean.match(/^\/category\/([^/]+)$/);
  if (categoryMatch) {
    const catSlug = categoryMatch[1].toLowerCase();
    const category = CATEGORY_SLUGS[catSlug];
    if (category) {
      if (category === 'All') return { name: 'home' };
      return { name: 'category', category, slug: catSlug };
    }
    return { name: 'not-found' };
  }

  // /saved
  if (clean === '/saved') {
    return { name: 'saved' };
  }

  // /circuit-specs
  if (clean === '/circuit-specs') {
    return { name: 'circuit-specs' };
  }

  // /tools/:tool
  const toolMatch = clean.match(/^\/tools\/([^/]+)$/);
  if (toolMatch) {
    const tool = toolMatch[1];
    if (tool === 'telemetry' || tool === 'strategy' || tool === 'pit-stop') {
      return { name: 'tool', tool };
    }
    return { name: 'not-found' };
  }

  return { name: 'not-found' };
}

// Update DOM metadata (title, meta description, OG tags, canonical link, JSON-LD)
export function updatePageSeo(route: RouteType) {
  const origin = window.location.origin;
  const canonicalUrl = origin + window.location.pathname;

  let title = 'Apex Grand Prix: F1 Race Weekend Hub';
  let description = 'Comprehensive Formula 1 race weekend engineering breakdowns, telemetry analyses, strategy debriefs, and Grand Prix paddock coverage.';
  let ogType = 'website';
  let image = origin + '/og-banner.jpg';
  let jsonLd: object = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    'name': RACE_WEEKEND_INFO.grandPrixName,
    'location': {
      '@type': 'Place',
      'name': RACE_WEEKEND_INFO.circuitName
    },
    'description': description
  };

  if (route.name === 'article') {
    const art = route.article;
    title = `${art.title} | Apex Grand Prix F1 Hub`;
    description = art.excerpt.slice(0, 155);
    ogType = 'article';
    image = art.heroImageUrl;
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': art.title,
      'alternativeHeadline': art.subtitle,
      'image': art.heroImageUrl,
      'datePublished': '2026-09-06T15:00:00Z',
      'author': {
        '@type': 'Person',
        'name': art.author.name,
        'jobTitle': art.author.role
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Apex Grand Prix'
      },
      'description': art.excerpt,
      'articleBody': art.sections.map(s => `${s.title}: ${s.content}`).join(' ')
    };
  } else if (route.name === 'category') {
    title = `${route.category} Engineering & Debriefs | Apex Grand Prix`;
    description = `In-depth Formula 1 ${route.category} analysis, telemetry traces, and race weekend data breakdowns.`;
  } else if (route.name === 'saved') {
    title = 'Saved Race Debriefs | Apex Grand Prix F1 Hub';
    description = 'Your personal reading library of Formula 1 technical analyses and Grand Prix race reports.';
  } else if (route.name === 'tool') {
    const toolTitles = {
      'telemetry': 'Telemetry Speed Trace & Pedal Input Analyzer',
      'strategy': 'Interactive Pit Stop Window & Undercut Model',
      'pit-stop': 'Biomechanical 1.9s Pit Stop Reflex Simulator'
    };
    title = `${toolTitles[route.tool]} | Apex Grand Prix`;
    description = `Interactive Formula 1 engineering simulation tool: test data, pit windows, and reaction times.`;
  } else if (route.name === 'circuit-specs') {
    title = `${RACE_WEEKEND_INFO.circuitName} Circuit Specifications | Apex Grand Prix`;
    description = `Track layout, lap records, Pirelli tyre compound allocations, and aero setups for ${RACE_WEEKEND_INFO.grandPrixName}.`;
  }

  // Apply to document
  document.title = title;

  // Meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', description);

  // OG tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', canonicalUrl);
  } else {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:url');
    meta.setAttribute('content', canonicalUrl);
    document.head.appendChild(meta);
  }

  const ogTypeTag = document.querySelector('meta[property="og:type"]');
  if (ogTypeTag) ogTypeTag.setAttribute('content', ogType);

  // Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // JSON-LD Script
  let jsonLdScript = document.querySelector('#seo-jsonld');
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'seo-jsonld';
    jsonLdScript.setAttribute('type', 'application/ld+json');
    document.head.appendChild(jsonLdScript);
  }
  jsonLdScript.textContent = JSON.stringify(jsonLd);
}

export function useRouter() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const route = parsePath(currentPath);

  useEffect(() => {
    updatePageSeo(route);
  }, [route]);

  const navigate = useCallback((to: string) => {
    if (window.location.pathname !== to) {
      window.history.pushState({}, '', to);
      setCurrentPath(to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const replace = useCallback((to: string) => {
    window.history.replaceState({}, '', to);
    setCurrentPath(to);
  }, []);

  return { currentPath, route, navigate, replace };
}

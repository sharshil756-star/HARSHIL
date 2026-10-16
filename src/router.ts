import { useState, useEffect, useCallback } from 'react';
import { ARTICLES, JOURNAL_INFO, CATEGORY_DESCRIPTIONS } from './data/articles';
import { Article, Category } from './types';

export type RouteType = 
  | { name: 'home' }
  | { name: 'article'; slug: string; article: Article }
  | { name: 'category'; category: Category; slug: string }
  | { name: 'saved' }
  | { name: 'tool'; tool: 'seam-simulator' | 'field-placer' | 'pitch-lab' }
  | { name: 'ground-specs' }
  | { name: 'search'; query: string }
  | { name: 'not-found' };

export const CATEGORY_SLUGS: Record<string, Category> = {
  'all': 'All',
  'match-analysis': 'Match Analysis',
  'longform-essays': 'Longform Essays',
  'player-profiles': 'Player Profiles',
  'cricket-history': 'Cricket History',
  'tactics-seamcraft': 'Tactics & Seamcraft'
};

export const CATEGORY_TO_SLUG: Record<Category, string> = {
  'All': 'all',
  'Match Analysis': 'match-analysis',
  'Longform Essays': 'longform-essays',
  'Player Profiles': 'player-profiles',
  'Cricket History': 'cricket-history',
  'Tactics & Seamcraft': 'tactics-seamcraft'
};

export function parsePath(pathname: string, searchStr = ''): RouteType {
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean === '/' || clean === '') {
    const params = new URLSearchParams(searchStr);
    const q = params.get('q');
    if (q) {
      return { name: 'search', query: q.trim() };
    }
    return { name: 'home' };
  }

  // /search
  if (clean === '/search') {
    const params = new URLSearchParams(searchStr);
    const q = params.get('q') || '';
    return { name: 'search', query: q.trim() };
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

  // /ground-specs or /circuit-specs
  if (clean === '/ground-specs' || clean === '/circuit-specs') {
    return { name: 'ground-specs' };
  }

  // /tools/:tool
  const toolMatch = clean.match(/^\/tools\/([^/]+)$/);
  if (toolMatch) {
    const tool = toolMatch[1];
    if (tool === 'seam-simulator' || tool === 'field-placer' || tool === 'pitch-lab' || tool === 'telemetry' || tool === 'strategy' || tool === 'pit-stop') {
      // Map legacy names gracefully
      const mappedTool: 'seam-simulator' | 'field-placer' | 'pitch-lab' = 
        tool === 'telemetry' ? 'seam-simulator' :
        tool === 'strategy' ? 'field-placer' :
        tool === 'pit-stop' ? 'pitch-lab' : (tool as any);
      return { name: 'tool', tool: mappedTool };
    }
    return { name: 'not-found' };
  }

  return { name: 'not-found' };
}

// Update DOM metadata (title, meta description, OG tags, canonical link, JSON-LD)
export function updatePageSeo(route: RouteType) {
  const origin = window.location.origin;
  const canonicalUrl = origin + window.location.pathname;

  let title = 'The Willow & Seam — Cricket Journal & Longform Editorial';
  let description = 'The definitive quarterly journal of Test cricket, longform essays, biomechanical seamcraft analysis, match forensics, and historic tours.';
  let ogType = 'website';
  let image = origin + '/images/cricket/cricket-ball-seam.jpg';
  let jsonLd: object = {
    '@context': 'https://schema.org',
    '@type': 'Periodical',
    'name': JOURNAL_INFO.publicationName,
    'alternateName': JOURNAL_INFO.tagline,
    'description': description,
    'url': origin,
    'publisher': {
      '@type': 'Organization',
      'name': 'The Willow & Seam Editorial Guild',
      'logo': {
        '@type': 'ImageObject',
        'url': origin + '/favicon.svg'
      }
    }
  };

  if (route.name === 'article') {
    const art = route.article;
    title = `${art.title} | The Willow & Seam`;
    description = art.metaDescription;
    ogType = 'article';
    image = origin + art.heroImageUrl;
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'headline': art.title,
      'alternativeHeadline': art.subtitle,
      'image': [origin + art.heroImageUrl],
      'datePublished': '2026-10-15T12:00:00Z',
      'dateModified': '2026-10-15T16:00:00Z',
      'author': {
        '@type': 'Person',
        'name': art.author.name,
        'jobTitle': art.author.role
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'The Willow & Seam',
        'url': origin
      },
      'description': art.metaDescription,
      'articleSection': art.category,
      'keywords': art.tags.join(', '),
      'articleBody': art.sections.map(s => `${s.title}: ${s.content}`).join(' ')
    };
  } else if (route.name === 'category') {
    title = `${route.category} — Dispatches & Analysis | The Willow & Seam`;
    description = CATEGORY_DESCRIPTIONS[route.category] || description;
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': `${route.category} Archive`,
      'description': description,
      'url': canonicalUrl
    };
  } else if (route.name === 'saved') {
    title = 'Reading Archive & Bookmarks | The Willow & Seam';
    description = 'Your personal folio of saved longform cricket essays, tactical debriefs, and seamcraft investigations for offline reading.';
  } else if (route.name === 'tool') {
    const toolTitles = {
      'seam-simulator': 'Wobble Seam & Aerodynamic Deviation Laboratory',
      'field-placer': 'Test Match Field Placement Architect & Slip Cordon Geometry',
      'pitch-lab': 'Pitch Degradation, Lord’s Slope & Hawkeye Trajectory Inspector'
    };
    const toolDescriptions = {
      'seam-simulator': 'Simulate seam scramble rates, boundary layer thermodynamics, air-swing angles, and deck nip-back kinematics at 85 to 92 mph.',
      'field-placer': 'Architect precision Test match field settings: slip cordons, leg gully traps, short leg catchers, and sweeping boundaries.',
      'pitch-lab': 'Analyze Day 1 to Day 5 pitch wear, footmark craters, the 8-foot Lord’s slope gradient, and humidity thresholds.'
    };
    title = `${toolTitles[route.tool]} | The Willow & Seam Tools`;
    description = toolDescriptions[route.tool];
  } else if (route.name === 'ground-specs') {
    title = 'Cathedrals of the Game: Ground Topography & Pitch Soil Lore | The Willow & Seam';
    description = 'Explore architectural blueprints, soil clay compositions, and historic gradients of Lord’s, the MCG, Eden Gardens, Sydney Cricket Ground, and The Oval.';
  } else if (route.name === 'search') {
    title = `Search Folio: "${route.query}" | The Willow & Seam`;
    description = `Search results for "${route.query}" across the archives of The Willow & Seam cricket journal.`;
  } else if (route.name === 'not-found') {
    title = 'Innings Terminated (404) | The Willow & Seam';
    description = 'The requested cricket essay or dispatch could not be found in our archives.';
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

  const ogImg = document.querySelector('meta[property="og:image"]');
  if (ogImg) ogImg.setAttribute('content', image);

  // Twitter cards
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', title);

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', description);

  const twImg = document.querySelector('meta[name="twitter:image"]');
  if (twImg) twImg.setAttribute('content', image);

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
  const [currentSearch, setCurrentSearch] = useState(() => window.location.search);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setCurrentSearch(window.location.search);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const route = parsePath(currentPath, currentSearch);

  useEffect(() => {
    updatePageSeo(route);
  }, [route]);

  const navigate = useCallback((to: string) => {
    const [pathPart, searchPart] = to.split('?');
    const newSearch = searchPart ? `?${searchPart}` : '';
    if (window.location.pathname !== pathPart || window.location.search !== newSearch) {
      window.history.pushState({}, '', to);
      setCurrentPath(pathPart);
      setCurrentSearch(newSearch);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const replace = useCallback((to: string) => {
    const [pathPart, searchPart] = to.split('?');
    const newSearch = searchPart ? `?${searchPart}` : '';
    window.history.replaceState({}, '', to);
    setCurrentPath(pathPart);
    setCurrentSearch(newSearch);
  }, []);

  return { currentPath, route, navigate, replace };
}

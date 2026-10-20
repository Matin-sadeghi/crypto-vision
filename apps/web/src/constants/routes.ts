/**
 * Absolute app paths for navigation and redirects.
 * Keep in sync with `app/routes.ts`.
 */
export const ROUTES = {
  DASHBOARD: {
    OVERVIEW: '/dashboard',
    MARKETS: '/mrkets',
    MY_WATCHLIST: '/wtach-list',
    AI_ANALYSIS: '/ai-analysis',
    NEWS_EVENTS: '/news-events',
    PROFOLIO_TRACKER: '/profolio-tracker',
    PRICE_ALERTS: '/price-alerts',
  },
  SIGNUP: '/login',
} as const;

import { type NextRequest, NextResponse } from 'next/server';
import {
  defineProxy,
  AppRouterMultisiteProxy,
  PersonalizeProxy,
  RedirectsProxy,
  LocaleProxy,
} from '@sitecore-content-sdk/nextjs/proxy';
import sites from '.sitecore/sites.json';
import scConfig from 'sitecore.config';
import { routing } from './i18n/routing';

/**
 * Pool-site bypass.
 *
 * The standalone "pool" site (App Router route group `src/app/(pool)/`) is a
 * documented fallback for pages that have not yet been authored in Sitecore.
 * Routes listed here are rendered directly from the App Router and skip the
 * Sitecore locale/multisite proxy chain entirely.
 *
 * Configure via the `POOL_BYPASS_ROUTES` env var (comma-separated). Each entry
 * is matched as either an exact path or, if it ends with `/`, a path prefix.
 * Set `POOL_BYPASS_ROUTES=` (empty) once every pool URL is served from Sitecore
 * to fully retire the bypass. See `POOL_SITE.md` for the migration playbook.
 */
const DEFAULT_POOL_BYPASS = '';

function parseBypass(raw: string | undefined): { exact: Set<string>; prefixes: string[] } {
  const exact = new Set<string>();
  const prefixes: string[] = [];
  const source = raw ?? DEFAULT_POOL_BYPASS;
  for (const entry of source.split(',')) {
    const v = entry.trim();
    if (!v) continue;
    if (v.endsWith('/') && v.length > 1) prefixes.push(v);
    else exact.add(v);
  }
  return { exact, prefixes };
}

const { exact: POOL_EXACT, prefixes: POOL_PREFIXES } = parseBypass(process.env.POOL_BYPASS_ROUTES);
const POOL_BYPASS_DISABLED = POOL_EXACT.size === 0 && POOL_PREFIXES.length === 0;

function isPoolRoute(pathname: string): boolean {
  if (POOL_BYPASS_DISABLED) return false;
  if (POOL_EXACT.has(pathname)) return true;
  return POOL_PREFIXES.some((p) => pathname.startsWith(p));
}

const locale = new LocaleProxy({
  sites,
  locales: routing.locales.slice(),
  skip: () => false,
});

const multisite = new AppRouterMultisiteProxy({
  sites,
  ...scConfig.api.edge,
  ...scConfig.multisite,
  skip: () => false,
});

const redirects = new RedirectsProxy({
  sites,
  ...scConfig.api.edge,
  ...scConfig.api.local,
  ...scConfig.redirects,
  skip: () => false,
});

const personalize = new PersonalizeProxy({
  sites,
  ...scConfig.api.edge,
  ...scConfig.personalize,
  skip: () => false,
});

export default function proxy(req: NextRequest) {
  if (isPoolRoute(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  return defineProxy(locale, multisite, redirects, personalize).exec(req);
}

export const config = {
  matcher: [
    '/',
    '/((?!api/|\\.well-known/|sitemap|robots|llms|_next/|healthz|sitecore/api/|-/|favicon.ico|sc_logo.svg|ai/).*)',
  ],
};

# Pool site — bypass & migration

The standalone "pool" site (CAELUM) lives in `src/app/(pool)/` and is rendered
directly by the Next.js App Router. It exists as a **documented fallback** for
pages that have not yet been authored in Sitecore.

## How the bypass works

`src/proxy.ts` short-circuits a configurable set of routes so they skip the
Sitecore locale/multisite/redirects/personalize proxy chain and render straight
from `src/app/(pool)/`. Everything else flows through the standard
`/[site]/[locale]/[[...path]]` pipeline.

The bypass list is driven by the `POOL_BYPASS_ROUTES` env var
(comma-separated). Each entry is matched as:

- **Exact path** — e.g. `/contact` matches only `/contact`
- **Prefix** — entries ending with `/` (e.g. `/services/`) match any path
  beginning with that prefix

### Default

If `POOL_BYPASS_ROUTES` is unset, the proxy uses:

```
/,/services,/services/,/pricing,/pricing/,/contact,/contact/,/quote,/quote/
```

These correspond 1:1 to the routes currently shipped under `src/app/(pool)/`.

### Examples

```bash
# Add /about as a pool route
POOL_BYPASS_ROUTES=/,/services,/services/,/pricing,/pricing/,/contact,/contact/,/quote,/quote/,/about

# Bypass /blog and everything underneath it
POOL_BYPASS_ROUTES=/,/blog,/blog/

# Fully disable the bypass — every route flows through Sitecore
POOL_BYPASS_ROUTES=
```

## Migration to Sitecore-driven pages

The long-term plan is to author the pool pages in Sitecore (see the
serialization follow-up task) and retire the bypass. The recommended sequence:

1. Author the equivalent page in Sitecore for the `future` site.
2. Remove the corresponding entry from `POOL_BYPASS_ROUTES` in `.env.local`
   (and production env) so requests flow through the Sitecore proxy chain.
3. Verify the Sitecore-rendered page in preview, then delete the matching file
   from `src/app/(pool)/`.
4. When every entry is migrated, set `POOL_BYPASS_ROUTES=` (empty) and
   eventually delete the `(pool)` route group plus this document.

Until step 4 is done, the `(pool)` route group is intentionally kept as a
fallback and must not be removed.

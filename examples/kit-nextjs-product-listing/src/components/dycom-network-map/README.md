# Dycom Network Map

An interactive Mapbox map of the Dycom "family of companies" — one connected
network. It shows every company, every physical location (clustered), and a
derived "open roles" view, all driven by **Sitecore datasource items**.

It lives in the **product-listing (SYNC)** starter because that is the rendering
host this environment builds and serves; the Dycom site renders through it. The
Sitecore templates/rendering are part of the shared **click-click-launch**
project, so they work for any site in that collection regardless of starter.

This is a net-new component (it does not reuse the Google-Maps based
`location-search`). It was ported from the standalone Next.js + Mapbox app at
`icreon-design-system` and adapted to read its data from Sitecore.

## Files

- `DycomNetworkMap.tsx` — entry component + variants (`Default`); renders
  `NoDataFallback` when there is no datasource.
- `DycomNetworkMapView.dev.tsx` — the experience: themed sidebar (companies /
  open roles / company detail) + the map, with search and filters.
- `DycomMapbox.dev.tsx` — the Mapbox GL client map (clustered base layer +
  focus layer). Degrades to a friendly placeholder when no token is set.
- `dycom-network-map.props.ts` — Sitecore field interfaces and the mapper that
  turns the authored datasource tree into the runtime model.
- `dycom.lib.ts` — brand tokens, state names, the runtime model, GeoJSON
  helpers, and the deterministic open-roles (jobs) generator.

## Mapbox token

The map needs a public Mapbox token, exposed as a build-time public variable:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxxxx
```

Create one at https://account.mapbox.com/access-tokens/. Without it the
component still renders and the sidebar stays fully usable; only the map area
shows a placeholder.

## Sitecore content model

The component is registered as `DycomNetworkMap` (see
`.sitecore/component-map.ts`). Its rendering item lives at
`/sitecore/layout/Renderings/Project/click-click-launch/Dycom Network Map`
and uses a GraphQL `ComponentQuery` that returns the datasource plus its nested
children:

```
Dycom Network Map        (datasource item — title, introduction)
└── Dycom Company        (companyName, logo, website, careersUrl, description, hq*)
    └── Dycom Location   (latitude, longitude, stateCode, isPrimary)
```

Authors add **Dycom Company** items as children of the map datasource, and
**Dycom Location** items as children of each company (insert options are set on
the templates' standard values). The rendering's *Datasource Location* points at
a **Dycom Network Map Folder** under the site's `Data` item.

Templates are serialized under
`authoring/.../ccl.templates/click-click-launch/Components/Dycom Network Map`.

### Sample content & availability

- The rendering's **Datasource Template** points at a branch
  (`/sitecore/templates/Branches/.../Components/Dycom Network Map`), so choosing
  **Create new content** when adding the rendering seeds a ready-to-render map
  (6 real Dycom companies with locations) that authors can then edit.
- The rendering is registered in SYNC's **Add Available Renderings** branch, so
  it appears in the component list for newly created SYNC sites. For an
  **existing** site, add it once via Pages → site settings → available
  components (the live site's content isn't serialized in this repo).

The "open roles" view is derived deterministically from the authored locations
(a stand-in for a single SAP SuccessFactors requisition feed projected across
the whole family), so it needs no extra authoring.

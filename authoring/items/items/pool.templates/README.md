# Pool module — DRAFT serialized items

This directory contains hand-authored Sitecore serialization YAML for the
`Project.pool` module that wraps the standalone Caelum pool site
(`src/app/(pool)/*` + `src/components/pool/*`) as Sitecore-managed
components.

## Status (Task #3, May 2026)

Only the **Hero** component has been scaffolded here so far. The remaining
11 components (Header, Footer, ServicesGrid, StatsBand, ProcessSteps,
Gallery, CostCalculator, Testimonials, FAQ, CtaBanner, Section) are not
yet wrapped — see follow-up tasks.

## ⚠️  These YAML files have not been validated against the live CM

This Replit task agent environment has no `dotnet 8` SDK available in
`/nix/store`, so the Sitecore CLI (`./sitecore/sc`) cannot run here.
Validation steps that are normally mandatory before a `ser push` were
deferred:

- `./sitecore/sc ser validate` — not run
- `./sitecore/sc ser push --dry-run -n steveauthor` — not run
- `./sitecore/sc ser push --include-module pool -n steveauthor` — not run

GUIDs, parent IDs (`/sitecore/templates/Project`, etc.) and well-known
template IDs were copied from the working `Project.click-click-launch`
exemplar in `sitecore/authoring/items/items/templates/items/ccl.*`.

## Before the first push

Run these from a shell that has the .NET 8 SDK on PATH (Replit's
`Sitecore Dev` workflow or a workspace with the nix module available):

```bash
# Re-auth if the token in sitecore/.sitecore/user.json is expired
./sitecore/sc cloud login --client-credentials true \
  --client-id "$SITECORE_AUTH_CLIENT_ID" \
  --client-secret "$SITECORE_AUTH_CLIENT_SECRET" --allow-write true
./sitecore/sc cloud environment connect \
  --environment-id 4dGmKiTZIdkKrINe06pizL --client-credentials true \
  --client-id "$SITECORE_AUTH_CLIENT_ID" \
  --client-secret "$SITECORE_AUTH_CLIENT_SECRET" --allow-write true

# Validate the YAML
./sitecore/sc ser validate

# Dry-run against the live tenant
./sitecore/sc ser push --dry-run --include-module pool -n steveauthor

# Only push if dry-run is clean
./sitecore/sc ser push --include-module pool -n steveauthor

# Publish to Edge so future.sitecorecloud.io picks it up
./sitecore/sc publish -n steveauthor
```

If the dry-run flags any parent-not-found errors, the most likely cause
is a stale GUID for `/sitecore/templates/Project`,
`/sitecore/layout/Renderings/Project`, or `/sitecore/layout/Placeholder
Settings/Project` — pull the live items once with
`./sitecore/sc ser pull --root '/sitecore/templates/Project'` and reuse
the real parent IDs.

## Layout

```
pool.templates/pool/
  Components/
    Hero.yml                 # template root
    Hero/
      Hero.yml               # __Standard section
      Hero/<field>.yml       # one file per editable field
      __Standard Values.yml  # field defaults (currently empty —
                             #   the published default copy still lives
                             #   in src/components/pool/data.ts and will
                             #   be ported here when CostCalculator/etc.
                             #   are wrapped)
    Hero Folder.yml          # datasource folder template
    Hero Folder/__Standard Values.yml
pool.renderings/pool/
  Hero.yml                   # rendering item — componentName = Hero
pool.placeholderSettings/pool/
  Page Structure/
    Body.yml                 # allow-list: includes Hero rendering GUID
```

## React-side counterpart

- `src/components/pool/Hero.props.ts` — `Field<string>` / `ImageField` /
  `LinkField` typed props
- `src/components/pool/HeroSitecore.dev.tsx` — Sitecore-aware variant
  using `<Text>`, `<Image>`, `<Link>` from `@sitecore-content-sdk/nextjs`

These are inactive until `src/components/pool/*` is removed from the
`exclude` list in
`sitecore/examples/kit-nextjs-product-listing/sitecore.cli.config.ts`.
**Do not** remove that exclude until all 12 pool components have a
matching Sitecore rendering — partial removal will break the build's
component-map generation for the missing components.

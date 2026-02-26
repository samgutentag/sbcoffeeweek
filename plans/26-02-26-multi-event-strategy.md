# Multi-Event Strategy: Coffee Week, Sandwich Week, Burrito Week

## Context

The SB Burger Week organizers are planning additional food week events:
- Coffee Week
- Sandwich Week
- Burrito Week

Each event needs its own map. The repo is already designed to be forkable via config.js + apply-theme.py. This plan explores two deployment strategies and domain naming.

---

## Domain Strategy

### Per-Event Domains (Reused Annually)

| Event | Domain |
|-------|--------|
| Burger | `sbburgerweekmap.com` (existing) |
| Coffee | `sbcoffeeweekmap.com` |
| Sandwich | `sbsandwichweekmap.com` |
| Burrito | `sbburritoweekmap.com` |

Alternatives considered: `sb{event}week.com`, `{event}weeksb.com`

### Universal Domain Ideas

A single domain with event paths: `domain.com/burgerweek`, `domain.com/coffeeweek`, etc.

| Domain | Notes |
|--------|-------|
| `sbfoodweeks.com` | Straightforward, plural covers multiple events |
| `sbfoodweek.com` | Cleaner singular |
| `sbfoodmap.com` | Focuses on the map, short |
| `sbfoodmaps.com` | Plural variant |
| `sbfoodguide.com` | Broader, could expand beyond "week" events |
| `eatweeksb.com` | Action-oriented |
| `eatsb.com` | Very short, very brandable (may be taken) |
| `foodweeksb.com` | Reads naturally: "Food Week SB" |
| `sbfoodevents.com` | Future-proof for non-week events |

---

## System 1: Per-Event Domains (Recommended Starting Point)

```
sbburgerweekmap.com     → samgutentag/sbburgerweek
sbcoffeeweekmap.com     → samgutentag/sbcoffeeweek
sbsandwichweekmap.com   → samgutentag/sbsandwichweek
sbburritoweekmap.com    → samgutentag/sbburritoweek
```

### How It Works

Each event is a fork of the root repo. Each fork gets its own config.js, data files, domain, Worker, and GitHub Pages deploy.

### Fork Setup Per Event

1. Fork `sbburgerweek` → `sbcoffeeweek`
2. Edit `config.js` (emoji, labels, tiers, dates, domain)
3. Populate `data-YYYY.js` with restaurants
4. Run `python3 apply-theme.py`
5. Set up GitHub Pages + domain
6. Follow README guide for tracking/hours/etc.

### Syncing Upstream Improvements

```bash
git remote add upstream https://github.com/samgutentag/sbburgerweek.git
git fetch upstream
git merge upstream/main
# Resolve conflicts in config.js / data files (keep yours)
```

Only config.js, data files, and CNAME conflict. Everything else merges cleanly.

### Annual Reuse

Same repo, same domain — just update data and config each year:

```
sbcoffeeweek/
├── data-2026.js          ← this year
├── data-2027.js          ← next year (add when ready)
├── data.js               ← skeleton
├── config.js             ← bump year, dates, source URL
├── snapshots/            ← tracking history accumulates
│   ├── tracking-2026-05-10.json
│   ├── tracking-2027-05-09.json
│   └── ...
└── hours.json            ← regenerated each year
```

**Annual rollover checklist:**
1. Update `config.js`: eventName, eventDates, eventStartDate, eventEndDate, dataLiveDate, sourceUrl
2. Create `data-YYYY.js` with new restaurants
3. Run `python3 apply-theme.py`
4. Re-run `fetch-place-ids.py` + `fetch-hours.py` if restaurants changed
5. Re-enable cron schedules in workflows
6. Re-enable Worker writes, deploy Worker
7. Push — same domain, same repo, fresh data

The `dataLiveDate` gating means you can prep next year's data without it going live early.

### Cost

4 events × ~$12/year = ~$48/year for domains. One-time DNS setup per domain.

---

## System 2: Universal Domain with Subpaths

```
sbfoodweek.com/
├── index.html              ← landing page (links to all events)
├── burgerweek/             ← burger week app
├── coffeeweek/             ← coffee week app
├── sandwichweek/           ← sandwich week app
└── burritoweek/            ← burrito week app
```

### Option A: Monorepo

Everything in one repo. Each event is a subfolder with duplicated app code.

**Problems:**
- Every event duplicates app.js, style.css, embed.js (~200KB × N events)
- Bug fix in app.js needs to be applied in N places manually
- apply-theme.py needs rework to handle subpaths
- Relative paths for data/config break (embed uses `../../config.js`)
- Single GitHub Pages deploy — one broken event blocks all deploys
- Single tracking Worker or awkward multi-tenant setup

**Verdict:** Creates more problems than it solves. The "no build step" architecture can't share code across subfolders without a bundler.

### Option B: Separate Repos + GitHub Pages Project Sites

Keep per-event repos but deploy under one domain using GitHub Pages project site routing.

**Problem:** Project site paths use the repo name (`sbfoodweek.com/sbburgerweek`), not clean paths. Requires repo renaming or a redirect layer.

### Option C: Separate Repos + Cloudflare Redirects (Best Hybrid)

Buy `sbfoodweek.com`, set up Cloudflare redirect rules:

```
sbfoodweek.com                    → landing page (static, hosted on Pages or Workers)
sbfoodweek.com/burgerweek/*       → 301 → sbburgerweekmap.com/$1
sbfoodweek.com/coffeeweek/*       → 301 → sbcoffeeweekmap.com/$1
sbfoodweek.com/sandwichweek/*     → 301 → sbsandwichweekmap.com/$1
sbfoodweek.com/burritoweek/*      → 301 → sbburritoweekmap.com/$1
```

**Pros:** Clean URLs, no repo restructuring, each event stays independent, landing page ties them together.
**Cons:** One extra domain to manage, redirects add a hop.

---

## Comparison

| | Per-Event Domains | Universal Monorepo | Universal + Redirects |
|---|---|---|---|
| **Domains to buy** | 1 per event | 1 total | 1 hub + 1 per event |
| **Repos** | 1 per event | 1 total | 1 hub + 1 per event |
| **Code duplication** | Forks (pull upstream) | Manual copies (worst) | Forks (pull upstream) |
| **Bug fix sync** | `git merge upstream/main` | Edit N copies manually | `git merge upstream/main` |
| **Deploy independence** | Full | None | Full |
| **Shareable URL** | `sbburgerweekmap.com` | `sbfoodweek.com/burgerweek` | Both work |
| **DNS setup** | Per event (one-time) | Once | Once + redirect rules |
| **Tracking Worker** | 1 per event (isolated) | Shared or N separate | 1 per event (isolated) |
| **Annual rollover** | Update config + data | Same but in subfolder | Same as per-event |
| **Complexity** | Low | Medium-high | Medium |
| **Landing page** | None (or separate) | Built in | Built in |

---

## Recommendation

**Start with per-event domains** (System 1). It works today with zero codebase changes, the fork workflow is documented in the README, and annual reuse is just a config bump.

**Later, optionally add a hub** (Option C). Buy a universal domain, build a small landing page repo, add Cloudflare redirect rules. This is purely additive — no restructuring needed.

Avoid the monorepo (Option A). It fights the project's "no build step" architecture.

---

## Next Steps

1. Set up coffee week fork as a test (first additional event)
2. Research and purchase per-event domains
3. Optionally purchase a universal hub domain for later
4. Document the fork + annual rollover workflow for the organizer

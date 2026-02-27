# Event Lifecycle State Management

## Overview

The website is closely tied to a food event with specific dates. Since the "food event week" model will play out for several events throughout the year (Coffee Week, Sandwich Week, Burrito Week, etc.) that never overlap, the site needs well-defined behavior for each lifecycle state.

## States (4)

| # | State | When | Config Signals |
|---|-------|------|----------------|
| 1 | **Off-Season** | Before `dataLiveDate` or after post-event winds down | `trackUrl: null`, `cfAnalyticsToken: null` |
| 2 | **Pre-Event** | `dataLiveDate` reached through `eventStartDate` | `trackUrl` set, full data loaded |
| 3 | **During Event** | `eventStartDate` through `eventEndDate` | Everything active |
| 4 | **Post-Event** | After `eventEndDate` | Concluded banner, tracking still on |

### State Transitions

```
Off-Season --[dataLiveDate reached]--> Pre-Event
Pre-Event  --[eventStartDate reached]--> During Event
During     --[eventEndDate passed]--> Post-Event
Post-Event --[trackUrl set to null, wind-down checklist]--> Off-Season
```

## Feature Matrix

### Map & Core UI

| Feature | Off-Season | Pre-Event | During | Post-Event |
|---------|:---:|:---:|:---:|:---:|
| Map + markers + clustering | Yes | Yes | Yes | Yes |
| Sidebar + search | Yes | Yes | Yes | Yes |
| Area filters | Yes | Yes | Yes | Yes |
| Tag filters (dietary) | Yes | Yes | Yes | Yes |
| Restaurant popups | Yes | Yes | Yes | Yes |
| Deep linking (#slug) | Yes | Yes | Yes | Yes |
| Share button | Yes | Yes | Yes | Yes |
| Checklist + Print | Yes | Yes | Yes | Yes |
| About modal | Yes | Yes | Yes | Yes |
| Data file | Skeleton | Full | Full | Full |

### Event-Gated Features

| Feature | Off-Season | Pre-Event | During | Post-Event |
|---------|:---:|:---:|:---:|:---:|
| Hours filters (Open/Lunch/Dinner) | No | Yes | Yes | No |
| Hours in popups/sidebar | No | Yes | Yes | No |
| Upvote button (castable) | No | Yes | Yes | 5-day grace, then freeze |
| Upvote counts displayed | No | Yes | Yes | Yes (frozen) |
| Concluded banner | No | No | No | Yes |
| Concluded modal (one-time) | No | No | No | Yes |
| "Check back" banner/modal | Yes | No | No | No |
| Next event teaser | Yes | No | No | No |

### Tracking & Analytics

| Feature | Off-Season | Pre-Event | During | Post-Event |
|---------|:---:|:---:|:---:|:---:|
| Click tracking (sendBeacon) | No | Yes | Yes | Yes |
| Cloudflare Web Analytics | No | Yes | Yes | Yes |
| Search tracking | No | Yes | Yes | Yes |

### Stats Dashboard

| Feature | Off-Season | Pre-Event | During | Post-Event |
|---------|:---:|:---:|:---:|:---:|
| Activity tab | Frozen snapshot | Yes | Yes | Yes |
| Insights tab | Frozen snapshot | Yes | Yes | Yes |
| Trends tab | Frozen snapshot | No | Yes | Yes |
| Restaurants tab | Frozen snapshot | Yes | Yes | Yes |
| Post-Event tab | No | No | No | Yes |
| Live Activity section | No | No | Yes | No |
| Hourly charts (live API) | No | No | Yes | No |
| RUM / Platform data | No | Yes | Yes | Yes |
| Leaderboard | Frozen snapshot | Yes | Yes | Yes |

### Infrastructure / Automation

| Feature | Off-Season | Pre-Event | During | Post-Event |
|---------|:---:|:---:|:---:|:---:|
| Worker writes | No | Yes | Yes | Yes |
| Worker reads | No | Yes | Yes | Yes |
| Snapshot workflow | No | No | Yes | Yes (daily) |
| Hours workflow | No | Yes | Yes | No |
| Source change detection | No | Yes | Yes | No |

### Tip Jar

| Feature | Off-Season | Pre-Event | During | Post-Event |
|---------|:---:|:---:|:---:|:---:|
| Tip Jar FAB + modal | Yes | Yes | Yes | Yes |
| Venmo deep links | Yes | Yes | Yes | Yes |

## New Concepts

### 1. `nextEvent` Config Field

New field in `config.js` for cross-event promotion during off-season:

```js
nextEvent: {
  name: "SB Coffee Week",
  dates: "Apr 15-21",
  url: "sbcoffeeweekmap.com"  // or null if same domain
}
```

- When set and in off-season: banner/modal shows "Next up: SB Coffee Week | Apr 15-21" with link
- When null: generic "Check back for the next event!" message
- Each fork is its own event, so `url` may point to a different domain

### 2. Upvote Grace Period

- Upvotes remain castable for 5 days after `eventEndDate`
- After grace period: heart icon becomes read-only, shows frozen count
- Derived from `eventEndDate`, no new config field needed
- Computed as: `new Date(THEME.eventEndDate) + 5 days`

### 3. Frozen Snapshot Mode for Stats

- During off-season, stats page loads but uses last committed `tracking-snapshot.js`
- No live API calls (Worker reads disabled / `trackUrl: null`)
- All tabs render from snapshot data in read-only mode
- Data files kept in repo for year-over-year comparison
- Stats page could show a banner: "Showing final results from SB Burger Week 2026"

### 4. Off-Season Banner

- Replaces the concluded banner during off-season
- If `nextEvent` is set: "Next up: {name} | {dates}" with optional link
- If `nextEvent` is null: "Check back for the next food week event!"
- Could include the tip jar CTA since it's always accessible

## Implementation Notes

### What's Already Config-Driven

- `dataLiveDate` gates skeleton vs full data loading
- `trackUrl: null` disables all tracking and live stats
- `cfAnalyticsToken: null` removes analytics snippet
- `eventEndDate` gates concluded banner/modal
- `venmoUser` gates tip jar visibility

### What Needs to Be Built

1. **Off-season banner/modal** with `nextEvent` config support
2. **Upvote freeze logic** — check `eventEndDate + 5 days` before allowing votes
3. **Hours display gating** — hide hours UI when not in pre-event or during-event states
4. **Frozen stats mode** — stats page detects `trackUrl: null` and renders from snapshot only, with "final results" banner
5. **State detection helper** — utility function that returns current state based on config dates + trackUrl, used across app.js, embed.js, stats.js

### Proposed State Detection

```js
// Could live in config.js or a shared utility
function getEventState() {
  var now = new Date();
  var liveDate = THEME.dataLiveDate ? new Date(THEME.dataLiveDate + "T00:01:00") : null;
  var startDate = THEME.eventStartDate ? new Date(THEME.eventStartDate + "T00:00:00") : null;
  var endDate = THEME.eventEndDate ? new Date(THEME.eventEndDate + "T23:59:59") : null;

  if (!THEME.trackUrl) return "off-season";
  if (endDate && now > endDate) return "post-event";
  if (startDate && now >= startDate) return "during";
  if (liveDate && now >= liveDate) return "pre-event";
  return "off-season";
}
```

## Year-Over-Year Data

- Snapshot files live in `snapshots/tracking-YYYY-MM-DD.json`
- Data files: `data-YYYY.js` (one per year)
- Stats page already supports `?year=YYYY` query param override
- Future: comparison view between years on stats page

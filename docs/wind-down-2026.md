# SB Coffee Week 2026 — Wind-Down Audit

Event dates: Mar 19–28, 2026
Wind-down date: Apr 9, 2026

## Checklist

- [x] Run final snapshot workflow (`gh workflow run "Snapshot Tracking Data"`)
- [x] Snapshot hourly data (`./snapshot-hourly.sh`) — 103 hours, 10 labels
- [x] Commit hourly snapshots (`snapshots/hourly-events.json`, `snapshots/hourly-labels.json`)
- [x] Set `trackUrl: null` and `cfAnalyticsToken: null` in `config.js`
- [x] Run `python3 apply-theme.py`
- [x] Comment out cron schedules in workflow files
- [x] Disable Worker writes (early return on POST, `writeDataPoint` commented out)
- [x] Deploy Worker (`cd workers/track && wrangler deploy`)

## API Call Audit — Confirmed No Active Calls

| Component | File | Guard | Status |
|---|---|---|---|
| Tracking beacon | `track.js:4` | `THEME.trackUrl` null → IIFE returns, `window.track` never defined | No-op |
| Upvote fetch | `app.js:187` | `if (THEME.trackUrl)` | Skipped |
| Upvote fetch (embed) | `embed/map/embed.js:187` | `if (THEME.trackUrl)` | Skipped |
| RUM data fetch | `stats/stats.js:388` | `if (THEME.trackUrl)` | Skipped |
| Live activity poll | `stats/stats.js:399` | `if (!THEME.trackUrl) return` | Skipped |
| Hourly data fetch | `stats/stats.js:444,466` | `if (!THEME.trackUrl)` | Skipped |
| Trends hourly fetch | `stats/trends/trends-tab.js:78` | `if (!THEME.trackUrl)` | Skipped |
| Detail fetch | `stats/stats.js:812` | `if (THEME.trackUrl)` | Skipped |
| Admin search queries | `admin/admin.js:14` | `if (!THEME.trackUrl) return` | Skipped |
| CF Web Analytics beacon | all `*.html` | `apply-theme.py` removed `<script>` tag | Removed |
| Worker POST writes | `workers/track/index.js` | Early return before `writeDataPoint` | No-op |

All client-side and server-side API calls are gated on `THEME.trackUrl` and safely disabled.

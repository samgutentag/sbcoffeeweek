// Theme configuration — edit this file to rebrand for a different food event.
// After editing, run: python3 apply-theme.py
// This updates og-image, CNAME, HTML fallbacks, and README to match.

const THEME = {
  // Event identity
  eventName: "SB Coffee Week 2026",
  eventDates: "Mar 19–28",
  emoji: "☕",

  // OG image text (two lines for the social preview image)
  ogLine1: "Santa Barbara",
  ogLine2: "Coffee Week 2026",

  // Labels (what to call the featured item)
  itemLabel: "coffee",
  itemLabelPlural: "coffees",

  // Site URL (used for OG meta tags, embed snippets, print page)
  siteUrl: "https://sbcoffeeweekmap.com",

  // Description (used for meta tags)
  description:
    "Interactive map of all participating cafes and restaurants. Search, filter by area, and get directions.",

  // Header
  sourceLabel: "Source: The Independent",
  sourceUrl: "https://www.independent.com/2026/03/18/here-comes-santa-barbara-coffee-week/",

  // Venmo tip jar (set venmoUser to null to hide the link)
  venmoUser: "samgutentag",
  venmoNote: "Buy me a coffee?",

  // Tip jar tiers — size: "s" (custom emoji), "m" (half theme emoji), "l" (full theme emoji)
  // The "m" tier is auto-featured (orange border). Tracking: tip-s, tip-m, tip-l
  tipTiers: [
    { size: "s", label: "Side of Biscotti", emoji: "🍪", amount: 1 },
    { size: "m", label: "Coffee", amount: 5 },
    { size: "l", label: "Coffee and a Snack", amount: 10 },
  ],

  // LocalStorage namespace
  storageKey: "sbcoffeeweek-checklist",

  // Print page
  printTitle: "SB Coffee Week 2026 — My Picks",

  // Event timezone — phase changes (pre/during/post) happen on this clock,
  // not the viewer's. IANA name, e.g. "America/Los_Angeles".
  timeZone: "America/Los_Angeles",

  // Event start date — used for analytics/stats time filters (ISO date)
  eventStartDate: "2026-03-19",

  // Event end date — concluded banner/modal auto-shows after this date (ISO date, null to never show)
  eventEndDate: "2026-03-28",

  // Archived — event is wound down; drives the off-season state while
  // trackUrl stays set so stats/admin keep reading historical data.
  archived: true,

  // Map center and zoom level
  mapCenter: [34.42, -119.7],
  mapZoom: 13,

  // GitHub repo URL (used in About modal, footer links)
  githubRepoUrl: "https://github.com/samgutentag/sbcoffeeweek",

  // Data launch date — before this date, data.js (skeleton) is loaded.
  // On or after this date, data-<year>.js (full menu details) is loaded.
  // Format: "YYYY-MM-DD" in local time, activates at 12:01 AM. Set null to always load full data.
  dataLiveDate: "2026-03-18",

  // Event tracking — Cloudflare Worker URL (null to disable)
  trackUrl: "https://sbcoffeeweek-track.developer-95b.workers.dev",

  // Cloudflare Web Analytics (null to disable)
  cfAnalyticsToken: null,

  // Contact email domain — generates sb{itemLabel}week{year}@{domain}
  // Set null to hide the contact link
  contactDomain: "samgutentag.com",

  // Filter definitions — shared by app.js and stats.js
  // Tags: category filters shown in the search menu
  tagFilters: [
    { key: "justCoffee", icon: "icon-coffee.svg", label: "Just Coffee" },
    { key: "coffeeWithFood", icon: "icon-muffin.svg", label: "Coffee + Food" },
    { key: "coffeeAsCocktail", icon: "icon-cocktail.svg", label: "Cocktail" },
  ],
  // Hours: time-of-day filters (hidden until hours.json loads)
  hoursFilters: [
    { key: "open", icon: "🟢", label: "Open Now" },
    { key: "lunch", icon: "☀️", label: "Morning" },
    { key: "dinner", icon: "🌙", label: "Evening" },
  ],

  // Google Places API key for hours fetching (null to disable hours feature)
  // Only used by fetch-hours.py and fetch-place-ids.py, never exposed client-side.
  // The actual API key should be stored as a GitHub repo secret: GOOGLE_PLACES_API_KEY
  googlePlacesApiKey: null,
};

// Next event promo (shown in off-season banner). null for generic "check back" message.
THEME.nextEvent = null;

// Participation history — restaurant name -> first year (returning badge at 2+ years).
THEME.firstYearByName = {};

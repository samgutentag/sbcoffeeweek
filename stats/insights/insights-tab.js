// Insights tab — conversion funnels, area breakdown, distribution, platform split
(function () {
  "use strict";

  var container = document.getElementById("tab-insights");
  if (!container) return;

  var areaByName = StatsUtils.buildAreaByName();

  // Inject HTML skeleton
  container.innerHTML =
    '<div class="section" id="ins-funnelSection">' +
      '<h2>Conversion Funnel</h2>' +
      '<p class="section-hint">Views vs. intent actions (directions, website, phone) per restaurant</p>' +
      '<div class="table-wrap">' +
        '<table id="ins-funnelTable">' +
          '<thead><tr>' +
            '<th class="col-rank">#</th>' +
            '<th class="col-name">Restaurant</th>' +
            '<th class="col-num">Views</th>' +
            '<th class="col-num">Intents</th>' +
            '<th class="col-num">Rate</th>' +
            '<th class="col-tag">Tag</th>' +
          '</tr></thead>' +
          '<tbody id="ins-funnelBody"></tbody>' +
        '</table>' +
      '</div>' +
    '</div>' +
    '<div class="section" id="ins-areaSection">' +
      '<h2>Area Breakdown</h2>' +
      '<p class="section-hint">Engagement aggregated by neighborhood</p>' +
      '<div class="area-cards" id="ins-areaCards"></div>' +
    '</div>' +
    '<div class="section" id="ins-distributionSection">' +
      '<h2>Engagement Distribution</h2>' +
      '<p class="section-hint">How evenly attention is spread across restaurants</p>' +
      '<div class="distribution-summary" id="ins-distributionSummary"></div>' +
    '</div>' +
    '<div class="section charts-row">' +
      '<div class="section chart-half" id="ins-platformSection">' +
        '<h2>Platform Split</h2>' +
        '<p class="section-hint">Apple Maps vs Google Maps directions</p>' +
        '<div class="chart-container"><canvas id="ins-platformChart"></canvas></div>' +
        '<div class="platform-legend" id="ins-platformLegend"></div>' +
      '</div>' +
      '<div class="section chart-half" id="ins-actionSection">' +
        '<h2>Action Breakdown</h2>' +
        '<p class="section-hint">What people do after discovering a restaurant</p>' +
        '<div class="chart-container"><canvas id="ins-actionChart"></canvas></div>' +
      '</div>' +
    '</div>' +
    '<p class="footer-note" id="ins-footerNote">Loading data...</p>';

  function getIntents(d) {
    return (d["directions-apple"] || 0) + (d["directions-google"] || 0) + (d.website || 0) + (d.phone || 0);
  }

  function render(snapshot) {
    var detail = snapshot.detail;
    var rows = [];

    Object.keys(detail).forEach(function (name) {
      var d = detail[name];
      if (!StatsUtils.isRestaurant(name, d)) return;
      var views = d.view || 0;
      var intents = getIntents(d);
      var rate = views > 0 ? (intents / views * 100) : 0;
      rows.push({
        name: name,
        views: views,
        intents: intents,
        rate: rate,
        area: areaByName[name] || "Other SB",
        apple: d["directions-apple"] || 0,
        google: d["directions-google"] || 0,
        website: d.website || 0,
        phone: d.phone || 0,
        instagram: d.instagram || 0,
        shares: d.share || 0,
        deeplinks: d.deeplink || 0,
      });
    });

    // Compute medians
    var viewsSorted = rows.map(function (r) { return r.views; }).sort(function (a, b) { return a - b; });
    var ratesSorted = rows.map(function (r) { return r.rate; }).sort(function (a, b) { return a - b; });
    var medianViews = viewsSorted[Math.floor(viewsSorted.length / 2)] || 0;
    var medianRate = ratesSorted[Math.floor(ratesSorted.length / 2)] || 0;

    // Tag restaurants
    rows.forEach(function (r) {
      if (r.views >= medianViews && r.rate >= medianRate) {
        r.tag = "hot"; r.tagLabel = "Hot";
      } else if (r.views < medianViews && r.rate >= medianRate) {
        r.tag = "gem"; r.tagLabel = "Hidden Gem";
      } else if (r.views >= medianViews && r.rate < medianRate) {
        r.tag = "popular"; r.tagLabel = "Popular";
      } else {
        r.tag = ""; r.tagLabel = "";
      }
    });

    rows.sort(function (a, b) { return b.rate - a.rate || b.views - a.views; });

    renderFunnel(rows);
    renderAreaBreakdown(rows);
    renderDistribution(rows);
    renderPlatformSplit(rows);
    renderActionBreakdown(rows);

    document.getElementById("ins-footerNote").textContent =
      "Generated from snapshot data (" + (snapshot.timestamp || "").slice(0, 10) + "). Updated daily.";
  }

  function renderFunnel(rows) {
    var tbody = document.getElementById("ins-funnelBody");
    tbody.innerHTML = "";
    rows.forEach(function (r, i) {
      var tr = document.createElement("tr");
      var tagHtml = r.tag
        ? '<span class="tag tag-' + r.tag + '">' + r.tagLabel + '</span>'
        : "";
      tr.innerHTML =
        '<td class="rank-cell">' + (i + 1) + "</td>" +
        '<td class="name-cell"><a href="' + THEME.siteUrl + '/#' + StatsUtils.slugify(r.name) + '" target="_blank" rel="noopener">' + StatsUtils.escapeHtml(r.name) + '</a></td>' +
        '<td class="col-num">' + r.views.toLocaleString() + "</td>" +
        '<td class="col-num">' + r.intents.toLocaleString() + "</td>" +
        '<td class="col-num">' + r.rate.toFixed(1) + "%</td>" +
        '<td class="col-tag">' + tagHtml + "</td>";
      tbody.appendChild(tr);
    });
  }

  function renderAreaBreakdown(rows) {
    var areas = {};
    rows.forEach(function (r) {
      if (!areas[r.area]) areas[r.area] = { views: 0, intents: 0, count: 0 };
      areas[r.area].views += r.views;
      areas[r.area].intents += r.intents;
      areas[r.area].count++;
    });

    var el = document.getElementById("ins-areaCards");
    el.innerHTML = "";

    var areaNames = Object.keys(areas).sort(function (a, b) {
      return areas[b].views - areas[a].views;
    });

    areaNames.forEach(function (name) {
      var a = areas[name];
      var rate = a.views > 0 ? (a.intents / a.views * 100).toFixed(1) : "0.0";
      var color = (typeof AREA_COLORS !== "undefined" && AREA_COLORS[name]) || "#666";
      var card = document.createElement("div");
      card.className = "area-card";
      card.style.background = color;
      card.innerHTML =
        '<div class="area-card-name">' + StatsUtils.escapeHtml(name) + '</div>' +
        '<div class="area-card-stat"><strong>' + a.views.toLocaleString() + '</strong> views</div>' +
        '<div class="area-card-stat"><strong>' + a.intents.toLocaleString() + '</strong> intents</div>' +
        '<div class="area-card-stat">' + a.count + ' restaurants</div>' +
        '<div class="area-card-rate">' + rate + '% conversion</div>';
      el.appendChild(card);
    });
  }

  function renderDistribution(rows) {
    var sorted = rows.slice().sort(function (a, b) { return b.views - a.views; });
    var totalViews = sorted.reduce(function (s, r) { return s + r.views; }, 0);

    var top5 = sorted.slice(0, 5);
    var top5Views = top5.reduce(function (s, r) { return s + r.views; }, 0);
    var top5Pct = totalViews > 0 ? (top5Views / totalViews * 100).toFixed(1) : "0";
    var ratio = sorted.length > 1 ? (sorted[0].views / sorted[sorted.length - 1].views).toFixed(1) : "N/A";

    var summary = document.getElementById("ins-distributionSummary");
    summary.innerHTML =
      "<strong>Top 5</strong> restaurants account for <strong>" + top5Pct + "%</strong> of all views. " +
      "The most-viewed restaurant has <strong>" + ratio + "x</strong> the views of the least-viewed.";
  }

  function renderPlatformSplit(rows) {
    var totalApple = rows.reduce(function (s, r) { return s + r.apple; }, 0);
    var totalGoogle = rows.reduce(function (s, r) { return s + r.google; }, 0);
    var total = totalApple + totalGoogle;

    var ctx = document.getElementById("ins-platformChart").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Apple Maps", "Google Maps"],
        datasets: [{
          data: [totalApple, totalGoogle],
          backgroundColor: ["#333", "#4285f4"],
          borderWidth: 2,
          borderColor: "#fff",
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        cutout: "60%",
      },
    });

    var legend = document.getElementById("ins-platformLegend");
    var applePct = total > 0 ? (totalApple / total * 100).toFixed(0) : "0";
    var googlePct = total > 0 ? (totalGoogle / total * 100).toFixed(0) : "0";
    legend.innerHTML =
      '<span style="color:#333">Apple Maps: ' + totalApple + ' (' + applePct + '%)</span> &nbsp; ' +
      '<span style="color:#4285f4">Google Maps: ' + totalGoogle + ' (' + googlePct + '%)</span>';
  }

  function renderActionBreakdown(rows) {
    var totals = { views: 0, directions: 0, website: 0, phone: 0, instagram: 0, shares: 0, deeplinks: 0 };
    rows.forEach(function (r) {
      totals.views += r.views;
      totals.directions += r.apple + r.google;
      totals.website += r.website;
      totals.phone += r.phone;
      totals.instagram += r.instagram;
      totals.shares += r.shares;
      totals.deeplinks += r.deeplinks;
    });

    var labels = ["Views", "Directions", "Website", "Phone", "Instagram", "Shares", "Deep Links"];
    var values = [totals.views, totals.directions, totals.website, totals.phone, totals.instagram, totals.shares, totals.deeplinks];
    var colors = ["#e63946", "#e76f51", "#2d6a4f", "#1d3557", "#7b2cbf", "#f4a261", "#264653"];

    var ctx = document.getElementById("ins-actionChart").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: "#fff",
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: { font: { size: 11 }, padding: 10 },
          },
        },
        cutout: "50%",
      },
    });
  }

  // Fetch latest snapshot
  StatsUtils.fetchAllSnapshots("../snapshots/").then(function (snapshots) {
    if (snapshots.length === 0) {
      document.getElementById("ins-footerNote").textContent =
        "No snapshot data found. Insights will appear once snapshots are collected.";
      return;
    }
    var latest = snapshots[snapshots.length - 1];
    render(latest.data);
  });
})();

// Fetch history only on demand. Cache completed results for this browser session.
const historyCache = new Map();

export function getHistorySeason(now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now).map(({ type, value }) => [type, value]));
  return Number(parts.year) - (`${parts.month}-${parts.day}` < "05-15" ? 1 : 0);
}

export async function fetchForecastHistory(beachUri, year, { signal, fetcher = fetch } = {}) {
  const url = new URL(beachUri);
  const match = url.pathname.match(/^\/id\/bathing-water\/(uk[a-z0-9]+-\d+)$/i);
  if (url.hostname !== "environment.data.gov.uk" || !match || !Number.isInteger(year)) {
    throw new Error("Cannot identify this beach for forecast history.");
  }
  const beachId = match[1];
  const cacheKey = `${beachId}:${year}`;
  if (historyCache.has(cacheKey)) return historyCache.get(cacheKey);
  const dates = new Set();
  const origins = new Set();
  let recordsRead = 0;
  const start = `${year}-05-15`;
  const end = `${year}-09-30`;
  let page = 0;
  // A generous limit also protects against an upstream pagination loop.
  while (page < 100) {
    const params = new URLSearchParams({
      "min-predictedOn": start, "max-predictedOn": end,
      _pageSize: "100", _page: String(page),
    });
    const response = await fetcher(`/ea/forecast-history/${beachId}.json?${params}`, { signal });
    if (!response.ok) throw new Error(`Forecast history request failed (HTTP ${response.status}).`);
    const data = await response.json();
    if (!Array.isArray(data?.result?.items)) throw new Error("Unexpected forecast history response.");
    for (const item of data.result.items) {
      const date = item.predictedOn?._value;
      if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) || date < start || date > end) continue;
      recordsRead += 1;
      const origin = typeof item.prfOriginType === "string"
        ? item.prfOriginType : item.prfOriginType?._value;
      origins.add(origin || "UNKNOWN");
      const risk = typeof item.riskLevel === "string" ? item.riskLevel : item.riskLevel?._about;
      if (risk !== "http://environment.data.gov.uk/def/bwq-stp/increased" &&
          risk !== "https://environment.data.gov.uk/def/bwq-stp/increased") continue;
      if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) && date >= start && date <= end) dates.add(date);
    }
    if (!data.result.next) {
      const hasForecasts = origins.has("PRF_PROVIDED");
      const onlyNonForecast = origins.size === 1 && origins.has("NON_PRF_SITE");
      const forecastingStatus = onlyNonForecast ? "not_provided"
        : hasForecasts && origins.size === 1 ? "provided"
        : hasForecasts ? "mixed" : "unknown";
      const result = { year, dates: [...dates].sort().reverse(), forecastingStatus, recordsRead };
      historyCache.set(cacheKey, result);
      return result;
    }
    // Reconstruct our own relative URL; never follow an arbitrary upstream next URL.
    page += 1;
  }
  throw new Error("The history could not be loaded completely. Please try again later.");
}

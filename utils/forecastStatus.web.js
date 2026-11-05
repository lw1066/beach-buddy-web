// England's published bathing season. Use UK dates, regardless of the viewer's location.
export function getForecastStatus(details = {}, now = new Date()) {
  if (details.forecastOrigin === "NON_PRF_SITE") {
    return {
      current: false,
      effectiveRiskLevel: null,
      message: "No pollution forecasts available at this location.",
      lastIssued: null,
      showHistory: false,
    };
  }
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).formatToParts(now).filter(({ type }) => type !== "literal").map(({ type, value }) => [type, value]));
  const today = `${parts.year}-${parts.month}-${parts.day}`;
  const monthDay = `${parts.month}-${parts.day}`;
  const inSeason = monthDay >= "05-15" && monthDay <= "09-30";
  const expiry = details.riskExpiresAt;
  let unexpired = false;
  if (typeof expiry === "string") {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(expiry)) {
      unexpired = Date.parse(expiry) > now.getTime();
    } else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(expiry)) {
      // The EA response has no offset: compare its local time in the UK.
      const ukNow = `${today}T${parts.hour}:${parts.minute}:${parts.second}`;
      unexpired = Number.isFinite(Date.parse(`${expiry}Z`)) && expiry > ukNow;
    }
  }
  const issued = details.riskDate;
  const issuedValid = /^\d{4}-\d{2}-\d{2}$/.test(issued || "") && issued <= today;
  const recognised = ["normal", "increased"].includes(details.riskLevel);
  const current = inSeason && unexpired && issuedValid && recognised;
  return {
    current,
    showHistory: true,
    effectiveRiskLevel: current ? details.riskLevel : null,
    message: !inSeason
      ? "Outside the bathing season (15 May–30 September). No current pollution-risk forecast."
      : !current
        ? "No current pollution-risk forecast available."
        : details.riskLevel === "increased"
          ? "Current forecast: increased pollution risk."
          : "Current forecast: normal pollution risk (not a guarantee of water quality).",
    lastIssued: issuedValid ? issued : null,
  };
}

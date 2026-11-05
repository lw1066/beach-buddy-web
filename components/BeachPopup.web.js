import React, { useEffect, useId, useRef, useState } from "react";
import { Popup } from "react-leaflet";
import WebActionButton from "./WebActionButton.web";
import {
  fetchForecastHistory,
  getHistorySeason,
} from "../utils/forecastHistory.web";

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export default function BeachPopup({
  beach,
  details,
  forecast,
  backgroundColor,
  onBeachPress,
}) {
  const [expanded, setExpanded] = useState(false);
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const popupRef = useRef(null);
  const requestRef = useRef(null);
  const historyId = useId();
  const year = getHistorySeason();

  useEffect(() => () => requestRef.current?.abort(), []);
  useEffect(() => {
    popupRef.current?.update();
  }, [expanded, history, loading, error]);

  async function loadHistory() {
    if (loading) return;
    const controller = new AbortController();
    requestRef.current = controller;
    setLoading(true);
    setError("");
    try {
      const result = await fetchForecastHistory(details.details, year, {
        signal: controller.signal,
      });
      if (!controller.signal.aborted) setHistory(result);
    } catch (err) {
      if (!controller.signal.aborted)
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load forecast history.",
        );
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  function toggleHistory() {
    setExpanded(!expanded);
    if (!expanded && !history && !loading) loadHistory();
  }

  return (
    <Popup
      ref={popupRef}
      className={`beach-popup-${backgroundColor.slice(1)}`}
      maxWidth={380}
      minWidth={240}
    >
      <div style={{ maxWidth: "min(350px, calc(100vw - 80px))" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: 18 }}>{beach}</h2>
        <p>Water quality: {details.rating || "No rating available"}</p>
        <h3 style={{ margin: "12px 0 4px", fontSize: 15 }}>
          Pollution forecast
        </h3>
        <p role="status">{forecast.message}</p>
        {forecast.current && forecast.lastIssued && (
          <p>Forecast issued: {formatDate(forecast.lastIssued)}</p>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <WebActionButton onPress={() => onBeachPress({ beach, details })}>
            Beach details
          </WebActionButton>
          {forecast.showHistory !== false && (
            <WebActionButton
              aria-expanded={expanded}
              aria-controls={historyId}
              onPress={toggleHistory}
            >
              {expanded ? "Hide history" : "Forecast history"}
            </WebActionButton>
          )}
        </div>
        {expanded && forecast.showHistory !== false && (
          <section
            id={historyId}
            aria-busy={loading}
            style={{
              borderTop: "1px solid currentColor",
              marginTop: 16,
              paddingTop: 8,
            }}
          >
            <h3 style={{ fontSize: 15 }}>
              {year} pollution-risk forecast history
            </h3>
            <p>Does not include water-company sewage-discharge alerts</p>
            {loading && <p role="status">Loading forecast history…</p>}
            {error && (
              <div role="alert">
                <p>{error}</p>
                <WebActionButton onPress={loadHistory}>
                  Try again
                </WebActionButton>
              </div>
            )}
            {history && !loading && !error && (
              <>
                {history.forecastingStatus === "not_provided" && (
                  <p>
                    Daily pollution-risk forecasts were not provided for this
                    site in the returned season records.
                  </p>
                )}
                {history.forecastingStatus === "mixed" && (
                  <p>
                    Forecasting status varied or was missing in some records.
                    This is not a complete season of daily forecasts.
                  </p>
                )}
                {history.forecastingStatus === "unknown" && (
                  <p>
                    {history.recordsRead === 0
                      ? "No records were returned for this season. Forecasting coverage could not be established."
                      : "The records do not establish whether daily forecasts were provided throughout this season."}
                  </p>
                )}
                {(history.forecastingStatus === "provided" ||
                  history.dates.length > 0) && (
                  <p>
                    {history.dates.length}{" "}
                    {history.dates.length === 1 ? "day" : "days"} with
                    Environment Agency increased-risk warnings
                  </p>
                )}
                {history.dates.length === 0 ? (
                  <p>
                    No increased-risk warnings were returned. This does not
                    establish that the water was pollution-free.
                  </p>
                ) : (
                  <ul
                    aria-label="Recorded warning dates"
                    tabIndex={0}
                    style={{
                      maxHeight: 160,
                      overflowY: "auto",
                      listStyle: "none",
                      paddingLeft: 0,
                    }}
                  >
                    {history.dates.map((date) => (
                      <li
                        key={date}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <span aria-hidden="true">💩</span>
                        {formatDate(date)}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </section>
        )}
      </div>
    </Popup>
  );
}

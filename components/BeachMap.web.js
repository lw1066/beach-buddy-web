import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { icon } from "leaflet";
import { Asset } from "expo-asset";
import "leaflet/dist/leaflet.css";
import { beachMarkerSetter } from "../utils/beachMarkerSetter";
import BeachPopup from "./BeachPopup.web";
import { getForecastStatus } from "../utils/forecastStatus.web";
import { getBeachColours } from "../utils/beachColours.web";

// Use the same rating and warning images as the native map.
const markerIcons = new Map();

function getMarkerIcon(rating, riskLevel, scale = 1) {
  const asset = Asset.fromModule(beachMarkerSetter(rating, riskLevel));

  const key = `${asset.uri}:${scale}`;
  if (!markerIcons.has(key)) {
    const width = 40 * scale;
    const height =
      asset.width > 0 && asset.height > 0
        ? (width * asset.height) / asset.width
        : 40 * scale;

    markerIcons.set(
      key,
      icon({
        iconUrl: asset.uri,
        iconSize: [width, height],
        // Match the native map's anchor: { x: 0.5, y: 0.25 }.
        iconAnchor: [width / 2, height / 4],
        popupAnchor: [0, -height / 4],
      }),
    );
  }

  return markerIcons.get(key);
}

const popupStyles = [
  ...["Excellent", "Good", "Sufficient", "Poor", "No rating available"].map(
    (rating) => getBeachColours(rating, "normal"),
  ),
  getBeachColours("Excellent", "increased"),
]
  .map(
    ({ backgroundColor, textColor }) => `
  .beach-popup-${backgroundColor.slice(1)} .leaflet-popup-content-wrapper,
  .beach-popup-${backgroundColor.slice(1)} .leaflet-popup-tip {
    background: ${backgroundColor};
    color: ${textColor};
  }
  .beach-popup-${backgroundColor.slice(1)} a.leaflet-popup-close-button {
    color: ${textColor};
  }
.leaflet-tooltip.beach-tooltip-${backgroundColor.slice(1)} {
    background: ${backgroundColor};
    color: ${textColor};
    border: 0;
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 12px;
    font-weight: 600;
  }

  .beach-tooltip-${backgroundColor.slice(1)}.leaflet-tooltip-top::before {
    border-top-color: ${backgroundColor};
  }
  `,
  )
  .join("\n");

export default function BeachMap({ beachLookup, onBeachPress }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);
  return (
    <MapContainer
      center={[54, -2.2765]}
      zoom={6}
      scrollWheelZoom
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      <style>{popupStyles}</style>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Object.entries(beachLookup).map(([beach, details]) => {
        const latitude = Number(details.lat);
        const longitude = Number(details.long);

        // Invalid coordinates must not prevent every other marker rendering.
        if (
          details.lat == null ||
          details.long == null ||
          details.lat === "" ||
          details.long === "" ||
          !Number.isFinite(latitude) ||
          !Number.isFinite(longitude) ||
          Math.abs(latitude) > 90 ||
          Math.abs(longitude) > 180
        ) {
          return null;
        }

        const forecast = getForecastStatus(details, now);
        const { backgroundColor } = getBeachColours(
          details.rating,
          forecast.effectiveRiskLevel,
        );

        return (
          <Marker
            key={beach}
            position={[latitude, longitude]}
            icon={getMarkerIcon(details.rating, forecast.effectiveRiskLevel)}
            eventHandlers={{
              mouseover: (event) => {
                event.target.setIcon(
                  getMarkerIcon(
                    details.rating,
                    forecast.effectiveRiskLevel,
                    1.15,
                  ),
                );
              },
              mouseout: (event) => {
                event.target.setIcon(
                  getMarkerIcon(details.rating, forecast.effectiveRiskLevel),
                );
              },
            }}
            alt={`${beach} bathing-water location`}
          >
            <Tooltip
              direction="top"
              offset={[0, -12]}
              opacity={1}
              interactive={false}
              className={`beach-tooltip-${backgroundColor.slice(1)}`}
            >
              {beach}
            </Tooltip>
            <BeachPopup
              beach={beach}
              details={details}
              forecast={forecast}
              backgroundColor={backgroundColor}
              onBeachPress={onBeachPress}
            />
          </Marker>
        );
      })}
    </MapContainer>
  );
}

import React, { useState } from "react";
import {
  Image, Modal, View, Text, StyleSheet, ImageBackground, ScrollView,
} from "react-native";
import { weatherCode } from "../utils/weatherCodes";
import { uvLevel } from "../utils/uvLevels";
import { calloutColorSetter } from "../utils/calloutColorSetter";
import WebModalFooter from "./WebModalFooter.web";
import TitleContainer from "./TitleContainer";
import WebModalFrame from "./WebModalFrame.web";

export const WeatherModal = ({ isVisible, weatherClose, weatherData, beachData }) => {
  const [cardWidth, setCardWidth] = useState(320);
  if (!weatherData) return null;

  // Measure the card rather than the screen: it lives inside the shared modal panel.
  const iconSize = Math.round(Math.max(24, Math.min(48, cardWidth * 0.12)));
  const conditionSize = Math.round(Math.max(48, Math.min(88, cardWidth * 0.23)));
  const metricIcon = { width: iconSize, height: iconSize, resizeMode: "contain", flexShrink: 0 };
  const conditionIcon = {
    width: conditionSize, height: conditionSize, resizeMode: "contain", flexShrink: 0,
  };
  const metricWidth = cardWidth < 380 ? "100%" : "48%";
  const windDegrees = Number(weatherData.current.wind_direction_10m);
  const hasWindDirection = weatherData.current.wind_direction_10m != null && Number.isFinite(windDegrees);
  const normalisedWindDegrees = ((windDegrees % 360) + 360) % 360;
  const compassPoints = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const windPoint = compassPoints[Math.round(normalisedWindDegrees / 45) % 8];
  const compassSize = Math.round(Math.max(84, Math.min(112, cardWidth * 0.25)));
  const currentWeather = weatherCode(weatherData.current.weather_code);
  const uv = uvLevel(weatherData.daily.uv_index_max);
  const titleBackgroundColor = calloutColorSetter(beachData?.details?.rating);

  function measureCard(event) {
    const width = Math.round(event.nativeEvent.layout.width);
    if (width > 0) setCardWidth((previous) => previous === width ? previous : width);
  }

  return (
    <Modal animationType="slide" transparent visible={isVisible} onRequestClose={weatherClose}>
      <WebModalFrame>
        <ImageBackground source={require("../assets/sea.jpg")} style={styles.backgroundImage}>
          <TitleContainer
            title={beachData.beach}
            subTitle="Weather"
            backgroundColor={titleBackgroundColor}
            onClose={weatherClose}
          />
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator
          >
            <View style={styles.card} onLayout={measureCard}>
              <Text style={styles.heading}>Now</Text>
              <Image source={currentWeather.iconPath} style={conditionIcon} resizeMode="contain" />
              <Text style={styles.conditions}>{currentWeather.conditions}</Text>
              <View style={styles.row}>
                <View style={styles.currentMetric}>
                  <Image
                    source={require("../assets/weather/icons8-thermometer-48.png")}
                    style={metricIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.value}>{weatherData.current.temperature_2m}C</Text>
                </View>
                <View style={styles.currentMetric}>
                  {hasWindDirection ? (
                    <View style={{ alignItems: "center" }}>
                      <View
                        accessibilityRole="image"
                        accessibilityLabel={`Wind from ${windPoint}, ${Math.round(normalisedWindDegrees)} degrees. Arrow shows where the wind is blowing towards.`}
                        style={{ width: compassSize, height: compassSize }}
                      >
                        <svg width={compassSize} height={compassSize} viewBox="0 0 100 100" aria-hidden="true">
                          <g fill="white" fontFamily="sans-serif" fontSize="13" textAnchor="middle">
                            <text x="50" y="14">N</text>
                            <text x="91" y="55">E</text>
                            <text x="50" y="98">S</text>
                            <text x="9" y="55">W</text>
                          </g>
                          {/* Show travel direction; the label below states where the wind comes from. */}
                          <g transform={`rotate(${(normalisedWindDegrees + 180) % 360} 50 50)`}>
                            <path d="M50 70V29M39 40L50 29L61 40" fill="none" stroke="#FF4D4D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="50" cy="70" r="4" fill="#4ADE80" />
                          </g>
                        </svg>
                      </View>
                      <Text style={[styles.value, { whiteSpace: "nowrap" }]}>
                        From <Text style={{ color: "#4ADE80" }}>{windPoint}</Text> {weatherData.current.wind_speed_10m} mph
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.value}>Direction unavailable · {weatherData.current.wind_speed_10m} mph</Text>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.heading}>Today</Text>
              <Image source={currentWeather.iconPath} style={conditionIcon} resizeMode="contain" />
              <Text style={styles.conditions}>{currentWeather.conditions}</Text>
              <View style={styles.row}>
                <View style={[styles.metric, { width: metricWidth }]}>
                  <Image
                    source={require("../assets/weather/rainy-umbrella.png")}
                    style={metricIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.value}>{weatherData.daily.precipitation_probability_max}%</Text>
                </View>
                <View style={[styles.metric, { width: metricWidth }]}>
                  <Image
                    source={require("../assets/weather/icons8-thermometer-48.png")}
                    style={metricIcon}
                    resizeMode="contain"
                  />
                  <View style={styles.metricValues}>
                    <Text style={styles.value}>{weatherData.daily.temperature_2m_max}C</Text>
                    <Text style={styles.value}>{weatherData.daily.temperature_2m_min}C</Text>
                  </View>
                </View>
                <View style={[styles.metric, { width: metricWidth }]}>
                  <Image
                    source={require("../assets/weather/icons8-windsock-48.png")}
                    style={metricIcon}
                    resizeMode="contain"
                  />
                  <View style={styles.metricValues}>
                    <Text style={styles.value}>{weatherData.daily.wind_speed_10m_max}</Text>
                    <Text style={styles.value}>mph</Text>
                  </View>
                </View>
                <View style={[styles.metric, { width: metricWidth }]}>
                  <Image
                    source={require("../assets/weather/icons8-uv-index-64.png")}
                    style={metricIcon}
                    resizeMode="contain"
                  />
                  <Text style={[styles.value, { color: uv.color }]}>{uv.level}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        <WebModalFooter onBack={weatherClose} backgroundColor={titleBackgroundColor} color={"white"} />
        </ImageBackground>
      </WebModalFrame>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, minHeight: 0, overflow: "hidden" },
  scrollArea: { flex: 1, minHeight: 0, width: "100%" },
  scrollContent: { alignItems: "center", paddingVertical: 20, paddingHorizontal: 8, rowGap: 20 },
  card: {
    width: "94%", maxWidth: 640, minWidth: 0, flexShrink: 0,
    alignItems: "center", padding: 16, borderColor: "black", borderWidth: 2,
    borderRadius: 10, backgroundColor: "rgba(1,1,1,0.80)",
  },
  heading: { color: "white", fontSize: 25, fontWeight: "600", marginBottom: 8 },
  conditions: { color: "white", textAlign: "center", marginTop: 6, marginBottom: 16, flexShrink: 1 },
  row: {
    width: "100%", flexDirection: "row", flexWrap: "wrap",
    alignItems: "center", justifyContent: "center", gap: 12,
  },
  currentMetric: { minWidth: 110, alignItems: "center", justifyContent: "center", padding: 8 },
  metric: {
    flexGrow: 0, flexShrink: 0, minWidth: 0, minHeight: 64,
    padding: 8, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
  },
  metricValues: { minWidth: 0, flexShrink: 1, alignItems: "center" },
  value: { color: "white", textAlign: "center", flexShrink: 1 },
});

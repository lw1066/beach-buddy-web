import React, { useRef, useState } from "react";
import { Modal, View, Text, ScrollView, ImageBackground, StyleSheet } from "react-native";
import WebModalFooter from "./WebModalFooter.web";
import TitleContainer from "./TitleContainer";
import WebModalFrame from "./WebModalFrame.web";
import WebActionButton from "./WebActionButton.web";
import { getBeachColours } from "../utils/beachColours.web";
import { getForecastStatus } from "../utils/forecastStatus.web";

// Unmount the internal navigation when leaving Information, so reopening starts at its overview.
export function InfoModal(props) {
  return props.isVisible ? <InformationViews {...props} /> : null;
}

function InformationViews({ onClose, beachData, infoData }) {
  const [view, setView] = useState("Information");
  const scrollRef = useRef(null);
  const profile = beachData?.beachModalData || {};
  const forecast = getForecastStatus(beachData?.details);
  const colours = getBeachColours(beachData?.details?.rating, forecast.effectiveRiskLevel);
  const titles = {
    Information: "Information", History: "Water treatment history",
    Pollution: "Government pollution statements", Seaweed: "Seaweed", Places: "Nearby places",
  };

  function showView(next) {
    setView(next);
    scrollRef.current?.scrollTo({ x: 0, y: 0, animated: false });
  }

  function goBack() {
    if (view === "Information") onClose();
    else showView("Information");
  }

  const places = (Array.isArray(infoData) ? infoData : []).map((place) => {
    const properties = place?.properties || {};
    const raw = properties.datasource?.raw || {};
    const kind = raw.amenity || properties.categories?.[0] || "Place";
    return {
      name: raw.name || properties.name || String(kind).replaceAll("_", " "),
      address: [properties.street, properties.city].filter(Boolean).join(", "),
      lat: properties.lat, lon: properties.lon,
    };
  });

  function textBlock(text, key) {
    return <Text key={key} style={styles.textCard}>{text || "No data available"}</Text>;
  }

  return (
    <Modal visible transparent={true} animationType="slide" onRequestClose={goBack}>
      <WebModalFrame>
        <ImageBackground source={require("../assets/sea.jpg")} style={styles.frame}>
        <TitleContainer
          title={beachData?.beach}
          subTitle={titles[view]}
          backgroundColor={colours.backgroundColor}
          titleColor={colours.textColor}
          color={colours.textColor}
          onClose={goBack}
        />
        <ScrollView
          ref={scrollRef}
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator
        >
          {view === "Information" && textBlock(profile.description, "description")}
          {view === "History" && textBlock(profile.history, "history")}
          {view === "Pollution" && (
            <>{textBlock(profile.pollution, "pollution")}{textBlock(profile.pollutionRiskStatement, "risk")}</>
          )}
          {view === "Seaweed" && textBlock(profile.seaweed, "seaweed")}
          {view === "Places" && (
            <>
              <Text style={styles.textCard}>Map links open Google Maps in a new tab.</Text>
              {places.length === 0 && textBlock("No nearby places returned for this beach.", "empty")}
              {places.map((place, index) => {
                const lat = Number(place.lat), lon = Number(place.lon);
                const valid = place.lat != null && place.lon != null &&
                  Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180;
                return (
                  <View key={`${place.name}:${index}`} style={styles.placeCard}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    {!!place.address && <Text style={styles.placeText}>{place.address}</Text>}
                    {valid && (
                      <a
                        href={`https://www.google.com/maps?q=${lat},${lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#FFEB3B", marginTop: 8, display: "inline-block" }}
                      ><Text style={[styles.placeText, { color: "#FFEB3B", textDecorationLine: "underline", marginTop: 0 }]}>Open {place.name} in Google Maps (new tab)</Text></a>
                    )}
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>
        <WebModalFooter onBack={goBack} color={colours.textColor} backgroundColor={colours.backgroundColor}>
          {["History", "Pollution", "Seaweed", "Places"].map((name) => (
            <WebActionButton
              key={name}
              selected={view === name}
              aria-pressed={view === name}
              onPress={() => showView(name)}
            >{name}</WebActionButton>
          ))}
        </WebModalFooter>
      </ImageBackground>
      </WebModalFrame>
    </Modal>
  );
}

const styles = StyleSheet.create({
  frame: { flex: 1, minHeight: 0, backgroundColor: "#16425B" },
  scrollArea: { flex: 1, minHeight: 0, width: "100%" },
  scrollContent: { padding: 16, alignItems: "center" },
  textCard: {
    width: "100%", maxWidth: 900, padding: 20, marginBottom: 16,
    borderRadius: 12, backgroundColor: "rgba(0,0,0,0.8)", color: "white", fontSize: 16, lineHeight: 25,
  },
  placeCard: {
    width: "100%", maxWidth: 900, padding: 20, marginBottom: 16,
    borderRadius: 12, backgroundColor: "rgba(0,0,0,0.8)",
  },
  placeName: { color: "white", fontWeight: "bold", fontSize: 18 },
  placeText: { color: "white", marginTop: 6 },
  navigation: {
    flexShrink: 0, flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 8, rowGap: 8,
  },
});

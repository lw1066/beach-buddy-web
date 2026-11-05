import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import BeachInfoButton from "./BeachInfoButton";
import { getForecastStatus } from "../utils/forecastStatus.web";
import { getBeachColours } from "../utils/beachColours.web";
import WebModalFooter from "./WebModalFooter.web";
import TitleContainer from "./TitleContainer";
import WebModalFrame from "./WebModalFrame.web";

const BeachModal = ({
  isVisible,
  onClose,
  beachDetails,
  weatherHandler,
  tideHandler,
  infoHandler,
  setWeatherDetails,
  setWeatherVisible,
  setTideDetails,
  setTideVisible,
  setInfoDetails,
  setInfoVisible,
  setLoading,
}) => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);
  const forecast = getForecastStatus(beachDetails?.details, now);
  const { backgroundColor: titleBackgroundColor, textColor } = getBeachColours(
    beachDetails?.details?.rating,
    forecast.effectiveRiskLevel
  );
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <WebModalFrame>
      <View style={[styles.modalContainer, { backgroundColor: titleBackgroundColor }]}>
        <TitleContainer
          title={beachDetails.beach}
          subTitle={beachDetails?.details?.rating || "no rating"}
          backgroundColor={titleBackgroundColor}
          titleColor={textColor}
          color={textColor}
          onClose={onClose}
        />

        <ScrollView style={{ flex: 1, minHeight: 0 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={{ color: textColor, padding: 12 }} accessibilityLiveRegion="polite">
          {forecast.message}
        </Text>

        {beachDetails?.beachModalData?.image && (
          <View style={styles.imageArea}>
            <Image
              source={{ uri: beachDetails.beachModalData.image }}
              style={styles.image}
            />
          </View>
        )}

        </ScrollView>
        <WebModalFooter onBack={onClose} color={textColor} backgroundColor={titleBackgroundColor}>
          <BeachInfoButton
            onPress={() =>
              weatherHandler(
                beachDetails.details.long,
                beachDetails.details.lat,
                setWeatherDetails,
                setWeatherVisible,
                setLoading
              )
            }
            buttonText="Weather"
          />
          {beachDetails?.details?.isCoastal && (
            <BeachInfoButton
              onPress={() =>
                tideHandler(
                  beachDetails.details.long,
                  beachDetails.details.lat,
                  setTideDetails,
                  setTideVisible,
                  setLoading
                )
              }
              buttonText="Tides"
            />
          )}
          <BeachInfoButton
            onPress={() =>
              infoHandler(
                beachDetails.details.long,
                beachDetails.details.lat,
                setInfoDetails,
                setInfoVisible,
                setLoading
              )
            }
            buttonText="Info"
          />
        </WebModalFooter>
      </View>
      </WebModalFrame>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    minHeight: 0,
    width: "100%",
  },
  imageArea: {
    flex: 1,
    minHeight: 220,
    width: "100%",
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    flexWrap: "wrap",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});

export default BeachModal;

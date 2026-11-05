import React from "react";
import {
  Modal,
  View,
  FlatList,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import WebModalFooter from "./WebModalFooter.web";
import TitleContainer from "./TitleContainer";
import WebModalFrame from "./WebModalFrame.web";
import { calloutColorSetter } from "../utils/calloutColorSetter";
import { convertMillisecondsToTime } from "../utils/convertMillisecondsToTime";

export const TideModal = ({ tideData, isVisible, onClose, beachData }) => {
  const titleBackgroundColor = calloutColorSetter(beachData?.details?.rating);
  if (tideData) {
    const tideDisplay = tideData.map((item) => {
      const dateObj = new Date(item.DateTime);
      dateObj.setHours(dateObj.getHours() + 1);
      const event = item.EventType === "HighWater" ? "High" : "Low";
      const height = item.Height ? item.Height.toFixed(2) : "no data";
      const time =
        `${String(dateObj.getHours()).padStart(2, "0")}:${String(
          dateObj.getMinutes(),
        ).padStart(2, "0")}` || "no data";
      return { dateObj, event, height, time, current: false };
    });

    const now = new Date();
    let timeTillTide = 0;

    let tideDirection = "tomorrow";
    for (let item of tideDisplay) {
      if (item.dateObj > now) {
        item.current = true;
        tideDirection = item.event === "High" ? "Rising" : "Falling";
        timeTillTide = item.dateObj - now;
        break;
      }
    }

    const tideTimeDisplay = convertMillisecondsToTime(timeTillTide);

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <WebModalFrame>
          <ImageBackground
            source={require("../assets/sea.jpg")}
            style={styles.backgroundImage}
          >
            <TitleContainer
              title={beachData.beach}
              subTitle={
                tideDirection === "tomorrow"
                  ? "Come back tomorrow for more tides"
                  : `${tideDirection} tide for next ${tideTimeDisplay}`
              }
              backgroundColor={titleBackgroundColor}
              onClose={onClose}
            />

            <View style={styles.tideModal}>
              <Text
                style={{
                  color: "white",
                  fontSize: 24,
                  marginTop: 30,
                  fontWeight: 600,
                }}
              >
                Today's Tide Times
              </Text>
              <FlatList
                data={tideDisplay}
                keyExtractor={(item, index) => index.toString()}
                style={{ flex: 1, minHeight: 0, width: "100%" }}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => (
                  <View
                    style={[
                      styles.tidesContainer,
                      item.current && styles.nextTide,
                    ]}
                  >
                    {item.current && (
                      <Text style={{ color: "white", fontWeight: 600 }}>
                        NEXT
                      </Text>
                    )}
                    <Text style={{ color: "white" }}>
                      {item.event} at {item.time}
                    </Text>
                    <Text style={{ color: "white" }}>({item.height}m)</Text>
                  </View>
                )}
              />
            </View>
            <WebModalFooter
              onBack={onClose}
              backgroundColor={titleBackgroundColor}
              color={"white"}
            />
          </ImageBackground>
        </WebModalFrame>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  tideModal: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
    width: "100%",
  },
  tidesContainer: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "rgba(1, 1, 1, 0.70)",
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
    width: "50%",
    maxwidth: 100,
  },
  nextTide: {
    backgroundColor: "rgba(2, 212, 9, 0.70)",
    transform: [{ scale: 1.4 }],
    fontWeight: "900",
  },
  flatListContent: {
    width: "100%",
    alignItems: "stretch",
    paddingBottom: 40,
  },
  backgroundImage: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    flex: 1,
  },
});

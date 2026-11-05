import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import {
  Modal,
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import WebModalFooter from "./WebModalFooter.web";
import WebModalFrame from "./WebModalFrame.web";
import styles from "../styles/styles";
import { SignOutButton } from "./SignOutButton";
import { Link } from "./Link";

const userSelector = (context) => [context.user];

const HamburgerInfoModal = ({ visible, onClose }) => {
  const { user } = useAuthenticator(userSelector);
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <WebModalFrame>
        <ImageBackground
          source={require("../assets/sea.jpg")}
          style={[styles.backgroundImage, { flex: 1, minHeight: 0 }]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              padding: 16,
              backgroundColor: "yellow",
            }}
          >
            <Text
              accessibilityRole="header"
              style={{ color: "#005999", fontSize: 24, fontWeight: "600" }}
            >
              Hi {user.username}
            </Text>

            <View style={{ alignSelf: "center", flexGrow: 0, flexShrink: 0 }}>
              <SignOutButton />
            </View>
          </View>
          <ScrollView
            style={{ flex: 1, minHeight: 0 }}
            showsVerticalScrollIndicator={true}
          >
            <View style={[styles.hamburgerModal, { marginBottom: 20 }]}>
              <Text style={[styles.hamburgerText, styles.hamburgerDescription]}>
                Bathing water quality:
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                  marginVertical: 5,
                }}
              >
                <View style={styles.swimMarker}>
                  <Image
                    source={require("../assets/markers/greenMarker.png")}
                    style={{ height: 50, width: 50 }}
                  />
                  <Text style={{ color: "#008A08", fontSize: 16 }}>
                    Excellent
                  </Text>
                </View>
                <View style={styles.swimMarker}>
                  <Image
                    source={require("../assets/markers/blueMarker.png")}
                    style={{ height: 50, width: 50 }}
                  />
                  <Text style={{ color: "#1C7FCB", fontSize: 16 }}>Good</Text>
                </View>
                <View style={styles.swimMarker}>
                  <Image
                    source={require("../assets/markers/orangeMarker.png")}
                    style={{ height: 50, width: 50 }}
                  />
                  <Text style={{ color: "#CB8F1C", fontSize: 16 }}>
                    Sufficient
                  </Text>
                </View>
                <View style={styles.swimMarker}>
                  <Image
                    source={require("../assets/markers/brownMarker.png")}
                    style={{ height: 50, width: 50 }}
                  />
                  <Text style={{ color: "#603101", fontSize: 16 }}>Poor</Text>
                </View>
                <View style={styles.swimMarker}>
                  <Image
                    source={require("../assets/markers/grayMarker.png")}
                    style={{ height: 50, width: 50 }}
                  />
                  <Text style={{ color: "#676767", fontSize: 16 }}>
                    No Rating
                  </Text>
                </View>
              </View>
              <Text style={[styles.hamburgerText, styles.hamburgerDescription]}>
                Ratings are an average of samples taken between May - September
                in each of the previous 4 years. Please use this as a general
                indication of water quality. However, the Environment agency
                also issue short term pollution forecasts for some waters with
                advice against swimming:
              </Text>
              <View style={styles.swimMarker}>
                <Image
                  source={require("../assets/markers/warning.png")}
                  style={{ height: 40, width: 40 }}
                />
                <Text style={{ color: "red", fontSize: 12 }}>
                  CURRENT POLLUTION WARNING
                </Text>
              </View>
              <Text style={[styles.hamburgerText, styles.hamburgerDescription]}>
                Click on any water marker on the map to access weather, tide,
                water quality and facilities information.
              </Text>
              <Text style={[styles.hamburgerText, styles.hamburgerDescription]}>
                All information should only be used as a guide. Data is collated
                from various sources and we cannot guarantee accuracy.
              </Text>
              <Text style={[styles.hamburgerText, styles.hamburgerDescription]}>
                Data sources:
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Link url="https://environment.data.gov.uk/bwq/">
                  Gov Bathing Waters
                </Link>
                <Link url="https://open-meteo.com/">Open-Meteo Weather</Link>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Link url="https://www.admiralty.co.uk/access-data/apis">
                  Admiralty UK (tides)
                </Link>
                <Link url="https://www.geoapify.com/geocoding-api?gad_source=1&gclid=CjwKCAjwkuqvBhAQEiwA65XxQC993TuK-s7c_mA5hNnpB-8Pa3p3xSfGB23rRj_kpFTeIy31gNAssxoCCm8QAvD_BwE">
                  Geoapify (facilites)
                </Link>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.hamburgerText]}>Icons by </Text>
                <Link url="https://icons8.com/">Icons8</Link>
              </View>
            </View>
          </ScrollView>
          <WebModalFooter
            onBack={onClose}
            backgroundColor={"yellow"}
            color={"#005999"}
          />
        </ImageBackground>
      </WebModalFrame>
    </Modal>
  );
};

export default HamburgerInfoModal;

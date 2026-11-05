import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, View } from "react-native";
import { TideModal } from "./components/TideModal";
import { WeatherModal } from "./components/WeatherModal";
import BeachModal from "./components/BeachModal";
import { InfoModal } from "./components/InfoModal";
import getBeachData from "./utils/getBeachData";
import BeachMap from "./components/BeachMap";
import { StatusBar } from "expo-status-bar";
import {
  modalHandler,
  weatherHandler,
  tideHandler,
  infoHandler,
} from "./utils/handlers";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react-native";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
import styles from "./styles/styles";
import Loader from "./components/Loader";
import { InfoHamburgerButton } from "./components/InfoHamburgerButton";
import HamburgerInfoModal from "./components/HamburgerInfoModal";
import CustomSplashScreen from "./components/CustomSplashScreen";
import AuthUIHeader from "./src/layout/AuthUIHeader";
import getTheme from "./theme";

Amplify.configure(amplifyconfig);

function App() {
  const [beachLookup, setBeachLookup] = useState({});
  const [beachVisible, setBeachVisible] = useState(false);
  const [beachDetails, setBeachDetails] = useState({});
  const [weatherVisible, setWeatherVisible] = useState(false);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [tideVisible, setTideVisible] = useState(false);
  const [tideDetails, setTideDetails] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [infoDetails, setInfoDetails] = useState(null);
  const [hamburgerVisible, setHamburgerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const theme = getTheme();

  useEffect(() => {
    async function prepare() {
      try {
        const beaches = await getBeachData();
        setBeachLookup(beaches);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Native keeps its existing modal behaviour; web displays one top-level panel.
  const activeWebPanel = hamburgerVisible
    ? "menu"
    : infoVisible
      ? "info"
      : weatherVisible
        ? "weather"
        : tideVisible
          ? "tides"
          : beachVisible
            ? "beach"
            : null;
  const panelVisible = (name, nativeVisible) =>
    Platform.OS === "web" ? activeWebPanel === name : nativeVisible;

  if (showSplashScreen) {
    return (
      <CustomSplashScreen
        onClose={() => setShowSplashScreen(false)}
        isReady={appIsReady}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Authenticator.Provider>
        <StatusBar style="dark" translucent={true} hidden={false} />
        <Authenticator Header={AuthUIHeader}>
          <SafeAreaView style={styles.container}>
            <View style={styles.mapContainer}>
              <BeachMap
                beachLookup={beachLookup}
                onBeachPress={({ beach, details }) => {
                  modalHandler(
                    { beach, details },
                    setBeachDetails,
                    setBeachVisible,
                    setLoading,
                  );
                }}
              />
              <InfoHamburgerButton
                onPress={() => {
                  setHamburgerVisible(true);
                }}
              />
            </View>

            <WeatherModal
              isVisible={panelVisible("weather", weatherVisible)}
              weatherClose={() => setWeatherVisible(false)}
              weatherData={weatherDetails}
              beachData={beachDetails}
            />

            <TideModal
              isVisible={panelVisible("tides", tideVisible)}
              onClose={() => setTideVisible(false)}
              tideData={tideDetails}
              beachData={beachDetails}
            />

            <InfoModal
              isVisible={panelVisible("info", infoVisible)}
              onClose={() => setInfoVisible(false)}
              beachData={beachDetails}
              infoData={infoDetails}
            />

            <BeachModal
              isVisible={panelVisible("beach", beachVisible)}
              onClose={() => setBeachVisible(false)}
              beachDetails={beachDetails}
              weatherHandler={weatherHandler}
              tideHandler={tideHandler}
              infoHandler={infoHandler}
              setWeatherDetails={setWeatherDetails}
              setWeatherVisible={setWeatherVisible}
              setTideDetails={setTideDetails}
              setTideVisible={setTideVisible}
              setInfoDetails={setInfoDetails}
              setInfoVisible={setInfoVisible}
              setLoading={setLoading}
            />

            <HamburgerInfoModal
              visible={panelVisible("menu", hamburgerVisible)}
              onClose={() => {
                setHamburgerVisible(false);
              }}
            />

            {<Loader visible={loading} />}
          </SafeAreaView>
        </Authenticator>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}

export default App;

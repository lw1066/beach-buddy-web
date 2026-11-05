import axios from "axios";
import { Platform } from "react-native";
import stationFinder from "./stationFinder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getTidalEvents from "./getTidalEvents";
import getTidesForToday from "./getTidesForToday";
import { getCurrentUserToken } from "./getToken";
import infoDataFresh from "./infoDataFresh";
import { getInfoData } from "./getInfoData";

export const modalHandler = async (
  { beach, details },
  setBeachDetails,
  setBeachVisible,
  setLoading
) => {
  try {
    setLoading(true);
    let profileUrl = details.latestProfile;
    if (Platform.OS === "web") {
      const url = new URL(profileUrl);
      const prefix = "/data/bathing-water-profile/";
      if (
        url.hostname !== "environment.data.gov.uk" ||
        !["http:", "https:"].includes(url.protocol) ||
        !url.pathname.startsWith(prefix)
      ) {
        throw new Error("Unexpected Environment Agency profile URL");
      }
      const profilePath = url.pathname.slice(prefix.length).replace(/\.json$/, "");
      profileUrl = `/ea/profiles/${profilePath}.json`;
    }
    const res = await axios.get(profileUrl);
    const beachData = res.data.result.primaryTopic;
    const beachModalData = {
      image:
        beachData.webResImage || require("../assets/expo-images/splash.png"),
      description: beachData.bathingWaterDescription
        ? beachData.bathingWaterDescription._value
        : "No data available",
      history: beachData.historyStatement
        ? beachData.historyStatement._value
        : "No data available",
      pollution: beachData.visiblePollutionStatement
        ? beachData.visiblePollutionStatement._value
        : "No data available",
      seaweed: beachData.macroAlgaeStatement
        ? beachData.macroAlgaeStatement._value
        : "No data available",
      pollutionRiskStatement: beachData.pollutionRiskForecastStatement
        ? beachData.pollutionRiskForecastStatement._value
        : "No data available",
    };

    setBeachDetails({ beach, details, beachModalData });
    setBeachVisible(true);
  } catch (error) {
    console.error("Error fetching beach details:", error);
  } finally {
    setLoading(false);
  }
};

export const weatherHandler = async (
  long,
  lat,
  setWeatherDetails,
  setWeatherVisible,
  setLoading
) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max,wind_speed_10m_max&forecast_days=1&forecast_hours=24&wind_speed_unit=mph`
    );
    setWeatherDetails(response.data);
    setWeatherVisible(true);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  } finally {
    setLoading(false);
  }
};

export const tideHandler = async (
  long,
  lat,
  setTideDetails,
  setTideVisible,
  setLoading
) => {
  setLoading(true);
  const station = stationFinder(long, lat);
  if (!station) {
    console.error("Invalid station data");
    setLoading(false);
    return;
  }
  try {
    const tides = await AsyncStorage.getItem(station.id);
    const today = new Date().toLocaleDateString();
    let tideData;

    if (!tides) {
      const newTideData = await getTidalEvents(station.id);
      tideData = getTidesForToday(newTideData);
    } else {
      const parsedTides = JSON.parse(tides).data;
      if (
        !parsedTides[parsedTides.length - 1].Date ||
        parsedTides[parsedTides.length - 1].Date < today
      ) {
        console.log("tides are old or somethings wrong");
        const newTideData = await getTidalEvents(station.id);
        tideData = getTidesForToday(newTideData);
      } else {
        console.log("tides are valid");
        tideData = getTidesForToday(parsedTides);
      }
    }

    setTideDetails(tideData);
    setTideVisible(true);
  } catch (error) {
    console.error("Error fetching tidal data:", error);
  } finally {
    setLoading(false);
  }
};

export const infoHandler = async (
  long,
  lat,
  setInfoDetails,
  setInfoVisible,
  setLoading
) => {
  setLoading(true);
  const info = await AsyncStorage.getItem(String(long) + lat);

  if (info) {
    const jsonInfo = JSON.parse(info);
    if (infoDataFresh(jsonInfo.date)) {
      console.log("using still fresh async data");
      setInfoDetails(jsonInfo.features);
      setInfoVisible(true);
      setLoading(false);
      return;
    }
  }

  const token = await getCurrentUserToken();
  if (!token) {
    console.error("no token for geoapify in info handler");
    setLoading(false);
    return;
  }

  console.log("CALLED GEOAPIFY in infoHandler");

  try {
    const features = await getInfoData(long, lat, token);
    setInfoDetails(features);
    setInfoVisible(true);
  } catch (error) {
    console.error("Error fetching info data:", error);
  } finally {
    setLoading(false);
  }
};


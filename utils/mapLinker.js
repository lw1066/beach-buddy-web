import React from "react";
import { View, Button, Linking, Alert } from "react-native";
import { URL } from "react-native-url-polyfill";

const mapLinker = (latitude, longitude) => {
  try {
    if (latitude && longitude) {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(mapsUrl);
    } else {
      Alert.alert(
        "Invalid URL",
        "The provided URL does not contain valid coordinates."
      );
    }
  } catch (error) {
    Alert.alert("Error", "Failed to parse the URL.");
  }
};

export default mapLinker;

import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";

// Shared sizing for all main web panels; map popups do not use this frame.
export default function WebModalFrame({ children }) {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.backdrop}>
      <View style={[styles.panel, { width: width < 768 ? "100%" : "75%" }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1, minHeight: 0, padding: 12,
    alignItems: "center", justifyContent: "center", backgroundColor: "transparent",
  },
  panel: {
    height: "96%", minHeight: 0, maxWidth: 1100,
    borderRadius: 16, overflow: "hidden", backgroundColor: "#16425B",
  },
});

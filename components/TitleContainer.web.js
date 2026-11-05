import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Preserve the existing props so every web panel receives the same Back control.
export default function TitleContainer({
  title, subTitle, backgroundColor, onClose, titleColor = "white", color,
}) {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <View style={styles.heading}>
        <Text accessibilityRole="header" style={[styles.title, { color: titleColor }]}>{title}</Text>
        {React.isValidElement(subTitle) ? subTitle : (
          <Text style={{ color: titleColor, marginTop: 4 }}>{subTitle}</Text>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%", minHeight: 100, padding: 16, flexShrink: 0,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  heading: { flex: 1, minWidth: 0 },
  title: { fontSize: 24, fontWeight: "600" },
});

import React from "react";
import { Pressable, Text, Linking } from "react-native";
import styles from "../styles/styles";

export const Link = ({ url, children }) => {
  const handlePress = () => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <Pressable onPress={handlePress} style={styles.link}>
      <Text style={styles.linkText}>{children}</Text>
    </Pressable>
  );
};

import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import styles from "../styles/styles";

export const InfoHamburgerButton = ({ onPress }) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      style={({ pressed }) => [
        styles.hamburgerButton,
        { backgroundColor: pressed ? "#e3b502" : "yellow" },
      ]}
    >
      <View style={styles.hamburger} />
      <View style={styles.hamburger} />
      <View style={styles.hamburger} />
    </Pressable>
  );
};

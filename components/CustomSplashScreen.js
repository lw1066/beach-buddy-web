import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";

const CustomSplashScreen = ({ onClose, isReady }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent={true} hidden={false} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Beach Buddy</Text>
        <Image
          source={require("../assets/expo-images/sea96.png")}
          style={styles.image}
        />
        <Text style={styles.description}>
          Welcome to your swim friend! A map that plots the Environment Agency
          bathing waters, providing information about water quality, tides and
          weather.
        </Text>
        <Text style={styles.description}>
          Sign-up with an email to access all the info on your swimming spots!
        </Text>
      </View>

      {isReady && (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#004080" : "#005999",
            },
            styles.button,
          ]}
          onPress={onClose}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    paddingBottom: 10,
    textAlign: "center",
    color: "#005999",
  },
  image: {
    height: 100,
    width: 100,
  },
  description: {
    fontSize: 20,
    fontWeight: "500",
    padding: 30,
    textAlign: "center",
    color: "#005999",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default CustomSplashScreen;

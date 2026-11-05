import React, { useEffect, useRef } from "react";
import { View, Modal, StyleSheet, Image, Animated, Text } from "react-native";

const Loader = ({ visible }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    if (visible) {
      pulseAnimation.start();
    } else {
      pulseAnimation.stop();
    }
  }, [scaleValue, visible]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <Animated.View
          style={[
            styles.activityIndicatorWrapper,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <Image
            source={require("../assets/expo-images/sea96.png")}
            style={{ width: 60, height: 60 }}
          />
          <Text
            style={{
              fontWeight: "600",
              fontSize: 8,
              textAlign: "center",
              padding: 0,
              margin: 0,
              color: "#005999",
            }}
          >
            LOADING
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicatorWrapper: {
    backgroundColor: "yellow",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
});

export default Loader;

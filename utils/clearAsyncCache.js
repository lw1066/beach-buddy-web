import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage cleared!");
  } catch (error) {
    console.error("Failed to clear AsyncStorage:", error);
  }
};

export default clearAsyncStorage;

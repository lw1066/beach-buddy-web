import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getInfoData = async (long, lat, token) => {
  const response = await axios.get(
    `https://larrh0ztvd.execute-api.us-east-1.amazonaws.com/dev/info?long=${long}&lat=${lat}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  const dataString = JSON.stringify({
    features: response.data.features,
    date: response.headers.date,
  });
  await AsyncStorage.setItem(String(long) + lat, dataString);
  return response.data.features;
};

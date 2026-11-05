import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUserToken } from "./getToken";

export default async function getTidalEvents(station) {
  const token = await getCurrentUserToken();
  if (!token) {
    console.log("nothing for the admiralty");
    return;
  }
  console.log("CALLED THE ADMIRALTY in getTidalEvents, station: ", station);
  try {
    const res = await axios.get(
      `https://larrh0ztvd.execute-api.us-east-1.amazonaws.com/dev/tides/${station}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const dataString = JSON.stringify(res.data);
    await AsyncStorage.setItem(station, dataString);
    return res.data.data;
  } catch (e) {
    console.error("Error fetching tidal events:", e);
  }
}

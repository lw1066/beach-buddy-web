import tideStationLookup from "./tideStationLookup";
import haversine from "haversine-distance";

const stationFinder = (long, lat) => {
  let nearestStation = null;
  let shortestDistance = Infinity;
  targetCoords = { lat: Number(lat), lon: Number(long) };

  Object.keys(tideStationLookup).forEach((id) => {
    const stationCoords = tideStationLookup[id];

    const distance = haversine(targetCoords, stationCoords);

    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestStation = { id, coordinates: stationCoords };
    }
  });

  return nearestStation;
};

export default stationFinder;

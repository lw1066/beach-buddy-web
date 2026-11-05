export const beachMarkerSetter = (rating, risk) => {
  let markerIcon = require("../assets/markers/greenMarker.png");
  switch (rating) {
    case "Good":
      markerIcon = require("../assets/markers/blueMarker.png");
      break;
    case "Sufficient":
      markerIcon = require("../assets/markers/orangeMarker.png");
      break;
    case "Poor":
      markerIcon = require("../assets/markers/brownMarker.png");
      break;
    case "No rating available":
      markerIcon = require("../assets/markers/grayMarker.png");
      break;
    default:
      break;
  }
  if (risk === "increased") {
    markerIcon = require("../assets/markers/warning.png");
  }
  return markerIcon;
};

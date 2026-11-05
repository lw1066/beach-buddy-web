import { calloutColorSetter } from "./calloutColorSetter";

export function getBeachColours(rating, riskLevel) {
  const backgroundColor = riskLevel === "increased"
    ? "#F20101"
    : calloutColorSetter(rating);
  const channels = backgroundColor.slice(1).match(/../g).map((hex) => {
    const value = parseInt(hex, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  const luminance = channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  const textColor = (luminance + 0.05) / 0.05 >= 1.05 / (luminance + 0.05)
    ? "#000000"
    : "#FFFFFF";
  return { backgroundColor, textColor };
}

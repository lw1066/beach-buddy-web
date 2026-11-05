import React from "react";
import WebActionButton from "./WebActionButton.web";

// Web-only adapter; Android continues to use BeachInfoButton.js.
export default function BeachInfoButton({ onPress, buttonText }) {
  return <WebActionButton onPress={onPress}>{buttonText}</WebActionButton>;
}

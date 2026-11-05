import React, { useState } from "react";
import { Text } from "react-native";

// Shared web button: only its decorative border grows on hover or focus.
export default function WebActionButton({
  onPress,
  children,
  selected = false,
  disabled = false,
  ...buttonProps
}) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const highlighted = !disabled && (hovered || focused);
  return (
    <span
      className="beach-buddy-action"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        flexShrink: 0,
        width: 75,
        height: 75,
        position: "relative",
        boxSizing: "border-box",
        borderRadius: 10,
        padding: 5,
        margin: "0 5px",
        opacity: disabled ? 0.55 : 1,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          boxSizing: "border-box",
          border: `2px solid ${highlighted ? "#9A7300" : "#e3b502"}`,
          borderRadius: 10,
          pointerEvents: "none",
          transform: highlighted ? "scale(1.05)" : "scale(1)",
        }}
      />
      <button
        {...buttonProps}
        type="button"
        disabled={disabled}
        onClick={onPress}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerCancel={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        onKeyDown={(event) => {
          if (event.key === " " || event.key === "Enter") setPressed(true);
        }}
        onKeyUp={() => setPressed(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setPressed(false);
          setFocused(false);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          minWidth: 0,
          border: 0,
          borderRadius: 8,
          padding: 4,
          backgroundColor:
            pressed || selected ? "#e3b502" : "rgba(227, 216, 2, 1)",
          color: "#005999",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "16px",
          textAlign: "center",
          whiteSpace: "normal",
          cursor: disabled ? "default" : "pointer",
        }}
      >
        <Text
          className="beach-buddy-action-label"
          style={{
            color: "#005999",
            fontSize: 13,
            lineHeight: 16,
            textAlign: "center",
            overflowWrap: "anywhere",
          }}
        >
          {children}
        </Text>
      </button>
    </span>
  );
}

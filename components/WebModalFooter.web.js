import React, { useState } from "react";

export default function WebModalFooter({
  children,
  onBack,
  color = "white",
  backgroundColor = "#16425B",
}) {
  const [hovered, setHovered] = useState(false);
  const buttons = React.Children.toArray(children);
  return (
    <div
      style={{ containerType: "inline-size", flexShrink: 0, backgroundColor }}
    >
      <div
        className="beach-buddy-footer"
        style={{ "--nav-count": Math.max(1, buttons.length) }}
      >
        <style>{`
        .beach-buddy-footer { display: grid; grid-template-columns: minmax(44px, 1fr) auto minmax(44px, 1fr); align-items: center; padding: 12px; gap: 8px; }
        .beach-buddy-footer-nav { grid-column: 2; display: flex; justify-content: center; align-items: center; gap: 8px; min-width: 0; }
        .beach-buddy-footer .beach-buddy-back { grid-column: 3; justify-self: end; }
        @container (max-width: 620px) {
          .beach-buddy-footer { grid-template-columns: minmax(0, 1fr) 28px; padding: 6px 10px 6px 6px; gap: 4px; }
          .beach-buddy-footer-nav { grid-column: 1; display: grid; grid-template-columns: repeat(var(--nav-count), minmax(0, 1fr)); gap: 4px; }
          .beach-buddy-footer .beach-buddy-action { width: min(100%, 75px) !important; height: auto !important; aspect-ratio: 1; margin: 0 !important; justify-self: center; }
          .beach-buddy-footer .beach-buddy-back { grid-column: 2; width: 28px !important; height: 28px !important; padding: 2px !important; }
          .beach-buddy-footer .beach-buddy-back-arrow { width: 24px !important; height: 24px !important; }
          .beach-buddy-footer .beach-buddy-back-chevron { width: 8px !important; height: 8px !important; }
          .beach-buddy-footer .beach-buddy-action { padding: 3px !important; }
          .beach-buddy-footer .beach-buddy-action button { padding: 0 !important; }
          .beach-buddy-footer .beach-buddy-action-label { font-size: 12px !important; white-space: nowrap !important; overflow-wrap: normal !important; }
        }
        .beach-buddy-back:focus:not(:focus-visible) { outline: none; }
        .beach-buddy-back:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }`}</style>
        <div className="beach-buddy-footer-nav">{buttons}</div>
        <button
          className="beach-buddy-back"
          type="button"
          onClick={onBack}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          aria-label="Go back to the previous view"
          title="Back"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            width: 44,
            height: 44,
            padding: 6,
            boxSizing: "border-box",
            cursor: "pointer",
            borderRadius: "50%",
            background: "transparent",
            border: 0,
            color: "#b71c1c",
          }}
        >
          <span
            className="beach-buddy-back-arrow"
            aria-hidden="true"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              flexShrink: 0,
              boxSizing: "border-box",
              border: "1px solid currentColor",
              borderRadius: "50%",
            }}
          >
            <span
              className="beach-buddy-back-chevron"
              style={{
                display: "block",
                width: 10,
                height: 10,
                boxSizing: "border-box",
                borderLeft: `${hovered ? 3 : 2}px solid currentColor`,
                borderBottom: `${hovered ? 3 : 2}px solid currentColor`,
                transform: "translateX(2px) rotate(45deg)",
              }}
            />
          </span>
        </button>
      </div>
    </div>
  );
}

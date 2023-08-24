import { OverlayView, OverlayViewF } from "@react-google-maps/api";
import React from "react";

interface CircleMarkerWithTextProps {
  position: google.maps.LatLngLiteral;
  text: string;
}

const CircleMarkerWithText: React.FC<CircleMarkerWithTextProps> = ({
  position,
  text,
}) => {
  return (
    <>
      <OverlayViewF
        position={position}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          style={{
            position: "absolute",
            width: "45px",
            height: "45px",
            textAlign: "center",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              width: "45px",
              height: "45px",
              backgroundColor: "red",
              borderRadius: "100%",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
            }}
          >
            {text}
          </div>
        </div>
      </OverlayViewF>
    </>
  );
};

export default CircleMarkerWithText;

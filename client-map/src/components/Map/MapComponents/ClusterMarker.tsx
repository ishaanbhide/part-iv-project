import { CircleF, OverlayView, OverlayViewF } from "@react-google-maps/api";
import React from "react";

interface CircleMarkerWithTextProps {
  position: google.maps.LatLngLiteral;
  text: string;
  radius: number;
}

const ClusterMarker: React.FC<CircleMarkerWithTextProps> = ({
  position,
  text,
  radius,
}) => {
  return (
    <>
      <CircleF
        center={position}
        radius={radius * 1000}
        options={{
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        }}
      />
    </>
  );
};

export default ClusterMarker;

import { MarkerF } from "@react-google-maps/api";
import { useContext } from "react";
import { CenterContext } from "../../../contexts/CenterContext";

export function UserLocationMarker() {
  const { center, updateCenter } = useContext(CenterContext);

  const userLocationMarkerOptions = {
    icon: {
      url: "../../../public/your-location.png",
      anchor: { x: 60, y: 60 },
      scaledSize: { height: 120, width: 120 },
    },
  };

  return <MarkerF position={center} options={userLocationMarkerOptions} />;
}

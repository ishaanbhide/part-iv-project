import { MarkerF } from "@react-google-maps/api";
import { useContext } from "react";
import { CenterContext } from "../../../contexts/CenterContext";

export function UserLocationMarker() {
  const { center, updateCenter } = useContext(CenterContext);

  const userLocationMarkerOptions = {
    icon: {
      url: "../../../public/your-location.png",
      anchor: new google.maps.Point(60, 60),
      scaledSize: new google.maps.Size(120, 120),
    },
  };

  return <MarkerF position={center} options={userLocationMarkerOptions} />;
}

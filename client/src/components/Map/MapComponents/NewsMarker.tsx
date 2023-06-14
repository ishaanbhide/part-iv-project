import { Coordinates } from "../../../models/Coordinates";
import { MarkerF } from "@react-google-maps/api";

type NewsMarkerProps = {
  key: string;
  location: Coordinates;
};

export function NewsMarker({ location }: NewsMarkerProps) {
  return <MarkerF position={location} />;
}

import { Coordinates } from "./Coordinates";

export interface NewsMarker {
  id: string;
  location: Coordinates;
  title: string;
  description: string;
}

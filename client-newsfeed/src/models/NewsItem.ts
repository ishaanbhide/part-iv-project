import { Coordinates } from "./Coordinates";

export interface NewsItem {
  id: string;
  location: Coordinates;
  title: string;
  description: string;
  source: string;
  image: string;
  createdAt: string;
}

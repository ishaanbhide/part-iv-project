import axios from "axios";
import { MapBounds } from "../models/MapBounds";

export async function getNearbyDisasterNews(
  latitude: any,
  longitude: any,
  proximity: any
) {
  try {
    const response = await axios.get("http://localhost:3001/api/news/near", {
      params: {
        longitude: longitude,
        latitude: latitude,
        proximity: proximity,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMapAreaDisasterNews({
  south,
  west,
  north,
  east,
}: MapBounds) {
  try {
    const response = await axios.get("http://localhost:3001/api/news/map", {
      params: {
        south: south,
        west: west,
        north: north,
        east: east,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

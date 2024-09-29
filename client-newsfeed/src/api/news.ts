import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

export async function getNearbyDisasterNews(
  latitude: any,
  longitude: any,
  proximity: any
) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/news/near`, {
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

export async function get(
  latitude: any,
  longitude: any,
  proximity: any
) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/news/near-news`, {
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

import axios from "axios";

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

import { Coordinates } from "../models/Coordinates";
import { NewsItem } from "../models/NewsItem";

export function calculateDistance(
  loc1: Coordinates,
  loc2: Coordinates
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((loc2.lat - loc1.lat) * Math.PI) / 180;
  const dLon = ((loc2.lng - loc1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((loc1.lat * Math.PI) / 180) *
      Math.cos((loc2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

export function groupObjectsByProximity(
  objects: NewsItem[],
  proximityThreshold: number
): NewsItem[][] {
  const groups: NewsItem[][] = [];

  for (const obj of objects) {
    let grouped = false;

    for (const group of groups) {
      const referenceObj = group[0];
      const distance = calculateDistance(obj.location, referenceObj.location);

      if (distance <= proximityThreshold) {
        group.push(obj);
        grouped = true;
        break;
      }
    }

    if (!grouped) {
      groups.push([obj]);
    }
  }

  return groups;
}

import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { Map } from "./components/Map/Map";
import { Drawer } from "./components/Drawer/Drawer";
import { CenterContext } from "./contexts/CenterContext";
import { useContext, useEffect, useState } from "react";
import { getMapAreaDisasterNews, getNearbyDisasterNews } from "./api/news";
import { NewsItem } from "./models/NewsItem";
import { DrawerContext } from "./contexts/DrawerContext";
import { Coordinates } from "./models/Coordinates";
import { defaultRadius } from "./utils/mapOptions";

export default function App() {
  const { userLocation, mapBounds, zoom } = useContext(CenterContext);
  const { loading, updateLoading, isDrawerOpen } = useContext(DrawerContext);
  const [news, setNews] = useState<NewsItem[][]>([]);

  function calculateDistance(loc1: Coordinates, loc2: Coordinates): number {
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

  function groupObjectsByProximity(
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

  useEffect(() => {
    async function fetchDisasterNews() {
      const disasterNews = await getMapAreaDisasterNews(mapBounds);

      const modifiedNews: NewsItem[] = disasterNews.map((news: any) => {
        return {
          id: news._id,
          title: news.title,
          description: news.body,
          source: news.source,
          image: news.image,
          location: {
            lat: news.location.coordinates[1],
            lng: news.location.coordinates[0],
          },
          createdAt: news.createdAt,
        };
      });

      if (zoom > 14) {
        const newsArr: NewsItem[][] = [];
        modifiedNews.map((mNews) => {
          newsArr.push([mNews]);
        });
        setNews(newsArr);
      } else {
        const groupedNews = groupObjectsByProximity(
          modifiedNews,
          defaultRadius
        );
        setNews(groupedNews);
      }

      updateLoading(false);
    }

    if (userLocation) {
      fetchDisasterNews();
    }
  }, [mapBounds, isDrawerOpen]);

  return (
    <div className="App">
      <NavigationBar news={news} />
      <Map news={news} setNews={setNews} />
      <Drawer news={news} />
    </div>
  );
}

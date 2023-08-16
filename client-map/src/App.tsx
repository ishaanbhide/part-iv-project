import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { Map } from "./components/Map/Map";
import { Drawer } from "./components/Drawer/Drawer";
import { CenterContext } from "./contexts/CenterContext";
import { useContext, useEffect, useState } from "react";
import { getMapAreaDisasterNews, getNearbyDisasterNews } from "./api/news";
import { NewsItem } from "./models/NewsItem";

export default function App() {
  const { userLocation, mapBounds } = useContext(CenterContext);
  const [news, setNews] = useState<NewsItem[]>([]);

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

      setNews(modifiedNews);
    }

    if (userLocation) {
      fetchDisasterNews();
    }
  }, [mapBounds]);

  return (
    <div className="App">
      <NavigationBar news={news} />
      <Map news={news} />
      <Drawer news={news} />
    </div>
  );
}

import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { Map } from "./components/Map/Map";
import { Drawer } from "./components/Drawer/Drawer";
import { CenterContext } from "./contexts/CenterContext";
import { useContext, useEffect, useState } from "react";
import { getNearbyDisasterNews } from "./api/news";
import { NewsItem } from "./models/NewsItem";

export default function App() {
  const { userLocation } = useContext(CenterContext);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function fetchDisasterNews() {
      const disasterNews = await getNearbyDisasterNews(
        userLocation!.lat,
        userLocation!.lng,
        10000
      );

      const modifiedNews = disasterNews.map((news: any) => {
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
        };
      });
      setNews(modifiedNews);
    }

    if (userLocation) {
      fetchDisasterNews();
    }
  }, [userLocation]);

  return (
    <div className="App">
      <NavigationBar />
      <Map news={news} />
      <Drawer news={news} />
    </div>
  );
}

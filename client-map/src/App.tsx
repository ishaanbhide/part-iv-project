import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { Map } from "./components/Map/Map";
import { Drawer } from "./components/Drawer/Drawer";
import { CenterContext } from "./contexts/CenterContext";
import { useContext, useEffect, useState } from "react";
import { getMapAreaDisasterNews, getNearbyDisasterNews } from "./api/news";
import { NewsItem } from "./models/NewsItem";
import { DrawerContext } from "./contexts/DrawerContext";
import { groupObjectsByProximity } from "./utils/groupObjectsByProximity";

export default function App() {
  const { userLocation, mapBounds, zoom, proximity } =
    useContext(CenterContext);
  const { loading, updateLoading, isDrawerOpen } = useContext(DrawerContext);
  const [news, setNews] = useState<NewsItem[][]>([]);

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
        const groupedNews = groupObjectsByProximity(modifiedNews, proximity);
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

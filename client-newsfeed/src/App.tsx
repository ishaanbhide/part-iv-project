import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { CenterContext } from "./contexts/CenterContext";
import { useContext, useEffect, useState } from "react";
import { getNearbyDisasterNews } from "./api/news";
import { NewsItem } from "./models/NewsItem";
import { Box, useMediaQuery } from "@mui/material";
import { NewsCard } from "./components/NewsCard";
import { Coordinates } from "./models/Coordinates";
import { getUserLocation } from "./utils/getUserLocation";
import { NewsPage } from "./components/NewsPage";
import { SelectedNewsContext } from "./contexts/SelectedNewsContext";

export default function App() {
  const { userLocation } = useContext(CenterContext);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [readMoreClicked, setReadMoreClicked] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { updateUserLocation } = useContext(CenterContext);
  const { selectedNews } = useContext(SelectedNewsContext);

  useEffect(() => {
    async function fetchUserLocation() {
      const location: Coordinates | null = await getUserLocation();
      location && updateUserLocation(location);
    }
    fetchUserLocation();
  }, []);

  useEffect(() => {
    async function fetchDisasterNews() {
      const disasterNews = await getNearbyDisasterNews(
        userLocation!.lat,
        userLocation!.lng,
        10000
      );

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
  }, [userLocation]);

  return (
    <Box className="App">
      <NavigationBar
        news={news}
        readMoreClicked={readMoreClicked}
        setReadMoreClicked={setReadMoreClicked}
      />

      <Box
        sx={{
          background: "white",
          width: "100%",
          height: "calc(100vh - 70px)",
          position: "fixed",
          right: readMoreClicked ? "0" : "-100%",
          transition: "right 0.3s ease-in-out",
          zIndex: "10",
          top: "70px",
        }}
      >
        <NewsPage newsMarker={selectedNews} />
      </Box>

      <Box
        sx={{
          display: isMobile ? "flex" : "grid",
          gridTemplateColumns: "auto auto auto",
          flexDirection: "column",
          gap: "8px",
          height: "calc(100vh - 70px)",
          padding: "16px",
          overflow: "auto",
          boxSizing: "border-box",
          position: "fixed",
          top: "70px",
        }}
      >
        {news.map((marker) => {
          return (
            <NewsCard
              key={marker.id}
              newsMarker={marker}
              setReadMoreClicked={setReadMoreClicked}
            />
          );
        })}
      </Box>
    </Box>
  );
}

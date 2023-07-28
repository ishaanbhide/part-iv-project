import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { CenterContext } from "./contexts/CenterContext";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { getNearbyDisasterNews } from "./api/news";
import { NewsItem } from "./models/NewsItem";
import { Box, TextField, useMediaQuery } from "@mui/material";
import { NewsCard } from "./components/NewsCard";
import { Coordinates } from "./models/Coordinates";
import { getUserLocation } from "./utils/getUserLocation";
import { NewsPage } from "./components/NewsPage";
import { SelectedNewsContext } from "./contexts/SelectedNewsContext";
import { TailSpin } from "react-loader-spinner";

export default function App() {
  const { userLocation } = useContext(CenterContext);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [readMoreClicked, setReadMoreClicked] = useState<boolean>(false);
  const [firstArticle, setFirstArticle] = useState<NewsItem | null>(null);
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { updateUserLocation } = useContext(CenterContext);
  const { selectedNews } = useContext(SelectedNewsContext);
  const pageRef = useRef(null);

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
      setSearchResults(modifiedNews);
      setFirstArticle(modifiedNews[0]);
    }

    if (userLocation) {
      fetchDisasterNews();
    }
  }, [userLocation]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tempSearchResults = news.filter(
      (n) =>
        n.title.toLowerCase().includes(e.target.value) ||
        n.description.toLowerCase().includes(e.target.value)
    );
    setSearchResults(tempSearchResults);
  };

  return (
    <Box className="App">
      <NavigationBar
        news={news}
        readMoreClicked={readMoreClicked}
        setReadMoreClicked={setReadMoreClicked}
        pageRef={pageRef}
        firstArticle={firstArticle}
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
          width: "100%",
          padding: "16px",
          overflow: "auto",
          boxSizing: "border-box",
          position: "fixed",
          top: "70px",
          alignItems: !news.length ? "center" : "unset",
        }}
        ref={pageRef}
      >
        <TextField
          id="filled-basic"
          label="Search"
          variant="filled"
          onChange={handleSearchChange}
        />

        {!news.length && (
          <Box>
            <TailSpin
              height="80"
              width="80"
              color="#5182ff"
              ariaLabel="tail-spin-loading"
              radius="1"
            />
          </Box>
        )}
        {searchResults.map((marker) => {
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

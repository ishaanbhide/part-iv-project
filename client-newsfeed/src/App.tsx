import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { CenterContext } from "./contexts/CenterContext";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { getNearbyDisasterNews } from "./api/news";
import { NewsItem } from "./models/NewsItem";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NewsCard } from "./components/NewsCard";
import { Coordinates } from "./models/Coordinates";
import { getUserLocation } from "./utils/getUserLocation";
import { NewsPage } from "./components/NewsPage";
import { SelectedNewsContext } from "./contexts/SelectedNewsContext";
import { TailSpin } from "react-loader-spinner";
import QuizModal from "./components/QuizModal";

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
  const [selectedLocation, setSelectedLocation] = useState<String>("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchUserLocation() {
      const location: Coordinates | null = await getUserLocation();
      location && updateUserLocation(location);
    }
    fetchUserLocation();
  }, []);

  const handleWellingtonClicked = async () => {
    if (selectedLocation !== "Wellington") {
      const wellingtonNews = await getNearbyDisasterNews(
        -41.2924,
        174.7787,
        50000
      );

      const modifiedNews: NewsItem[] = wellingtonNews.map((news: any) => {
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
      setSelectedLocation("Wellington");
    } else {
      setSelectedLocation("");
      setRefresh(!refresh);
    }
  };

  const handleAucklandClicked = async () => {
    if (selectedLocation !== "Auckland") {
      const aucklandNews = await getNearbyDisasterNews(
        -36.8509,
        174.7645,
        50000
      );

      const modifiedNews: NewsItem[] = aucklandNews.map((news: any) => {
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
      setSelectedLocation("Auckland");
    } else {
      setSelectedLocation("");
      setRefresh(!refresh);
    }
  };

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
  }, [userLocation, refresh]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tempSearchResults: NewsItem[] = news.filter(
      (n: NewsItem) =>
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
          // display: isMobile ? "flex" : "grid",
          display: "flex",
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
          onChange={handleSearchChange}
        />

        <Box>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#333333",
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            Northland
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor:
                selectedLocation == "Auckland" ? "#193a8c" : "#333333",
              marginBottom: "5px",
              marginRight: "5px",
            }}
            onClick={handleAucklandClicked}
          >
            Auckland
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#333333",
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            Waikato
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#333333",
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            Bay of Plenty
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#333333",
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            Gisborne
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#333333",
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            Hawke's Bay
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#333333",
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            Taranaki
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor:
                selectedLocation == "Wellington" ? "#193a8c" : "#333333",
              marginBottom: "5px",
              marginRight: "5px",
            }}
            onClick={handleWellingtonClicked}
          >
            Wellington
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#333333",
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            Nelson
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#333333",
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            Canterbury
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#333333",
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            Otago
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#333333",
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            West Coast
          </Button>
        </Box>

        <Typography
          sx={{ color: "gray", fontWeight: "100", textAlign: "center" }}
        >
          NEAR YOU
        </Typography>

          <QuizModal>
            
          </QuizModal>

        {news.length > 0 ? (
  <Box sx={{ 
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
    }}>
    {searchResults.map((marker) => (
      <NewsCard
        key={marker.id}
        newsMarker={marker}
        setReadMoreClicked={setReadMoreClicked}
      />
    ))}
  </Box>
) : (
  <Box>
    <TailSpin
      height="80"
      width="80"
      color="#000000"
      ariaLabel="tail-spin-loading"
      radius="1"
    />
  </Box>
)}
      </Box>
    </Box>
  );
}

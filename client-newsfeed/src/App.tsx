import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { CenterContext } from "./contexts/CenterContext";
import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from "react";
import { allData, get, getNearbyDisasterNews } from "./api/news";
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
// import { SpeakingTextField } from "./components/SpeakingTextField"
import SpeakingTextField from "./components/SpeakingTextField"
import { SelectedNewsContext } from "./contexts/SelectedNewsContext";
import { TailSpin } from "react-loader-spinner";
import { useQuiz } from "./contexts/QuizContext";
import QuizModal from "./components/QuizModal";
import MapIcon from '@mui/icons-material/Map';
import AccessibleSearchBar from "./components/AccessibleSearch";
import { NewNewsItem } from "./models/NewNewsItem";

export default function App() {
  const { userLocation } = useContext(CenterContext);
  const [news, setNews] = useState<NewNewsItem[]>([]);
  const [readMoreClicked, setReadMoreClicked] = useState<boolean>(false);
  const [firstArticle, setFirstArticle] = useState<NewNewsItem | null>(null);
  const [searchResults, setSearchResults] = useState<NewNewsItem[]>([]);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { updateUserLocation } = useContext(CenterContext);
  const { selectedNews } = useContext(SelectedNewsContext);
  const pageRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState<String>("");
  const [refresh, setRefresh] = useState(false);
  const [severity, setSeverity] = useState<string>('All');

  const { answers } = useQuiz();
  const isVoiceAssist = answers[3];
  const isHighContrast = answers[1] === "Yes";
  const isBiggerFont = answers[4] === "Yes";
  console.log(isHighContrast)

  useEffect(() => {
    async function fetchUserLocation() {
      const location: Coordinates | null = await getUserLocation();
      location && updateUserLocation(location);
    }
    fetchUserLocation();
  }, []);

  const filterNewsBySeverity = () => {
    if (severity !== "All") {
      console.log(searchResults)
      const tempSearchResults: NewNewsItem[] = searchResults.filter((n: NewNewsItem) => {
        return n.severity === severity;
      });
      setSearchResults(tempSearchResults);
    } else {
      setSearchResults(searchResults);
    }
  }

  useEffect(() => {
    filterNewsBySeverity();
  }, [severity, searchResults]);

  const handleWellingtonClicked = async () => {
    if (selectedLocation !== "Auckland") {
      const aucklandNews = await get(
        -41.2924,
        174.7787,
        50000
      );

      console.log(aucklandNews);

      const modifiedNews: NewNewsItem[] = aucklandNews.map((news: any) => {
        return {
          id: news._id,
          title: news.headline,
          summary: news.summary.summary_of_event_paragraphs,
          description: news.summary.summary_of_event,
          source: news.articles[0],
          lastUpdated: news.summary.last_updated,
          image: news.images[0],
          severity : news.summary.severity,
          location: news.summary.locations,
          endDate: news.summary.end_date,
          startDate: news.summary.start_date,
          recActions: news.summary.recommended_actions,
        };
      });

      console.log(modifiedNews)
      setNews(modifiedNews);
      setSearchResults(modifiedNews);
      setSelectedLocation("Auckland");
    } else {
      setSelectedLocation("");
      setRefresh(!refresh);
    }
  };

  const testAucklandClicked = async () => {
    if (selectedLocation !== "Auckland") {
      const aucklandNews = await get(
        -36.8509,
        174.7645,
        50000
      );

      console.log(aucklandNews);

      const modifiedNews: NewNewsItem[] = aucklandNews.map((news: any) => {
        return {
          id: news._id,
          title: news.headline,
          summary: news.summary.summary_of_event_paragraphs,
          description: news.summary.summary_of_event,
          source: news.articles[0],
          lastUpdated: news.summary.last_updated,
          image: news.images[0],
          severity : news.summary.severity,
          location: news.summary.locations,
          endDate: news.summary.end_date,
          startDate: news.summary.start_date,
          recActions: news.summary.recommended_actions,
        };
      });

      console.log(modifiedNews)
      setNews(modifiedNews);
      console.log(news)
      console.log("CHANGED HERE")
      setSearchResults(modifiedNews);
      setSelectedLocation("Auckland");
    } else {
      setSelectedLocation("");
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    async function fetchDisasterNews() {
      let disasterNews;
      if(userLocation){
        disasterNews = await get(
          userLocation!.lat,
          userLocation!.lng,
          10000
        );
      }
      else{
        console.log("this is hit")
        disasterNews = await allData()
      }

      const modifiedNews: NewNewsItem[] = disasterNews.map((news: any) => {
        return {
          id: news._id,
          title: news.headline,
          summary: news.summary.summary_of_event_paragraphs,
          description: news.summary.summary_of_event,
          source: news.articles[0],
          lastUpdated: news.summary.last_updated,
          image: news.images[0],
          severity : news.summary.severity,
          location: news.summary.locations,
          endDate: news.summary.end_date,
          startDate: news.summary.start_date,
          recActions: news.summary.recommended_actions,
        };
      });

      console.log(modifiedNews)
      setNews(modifiedNews);
      setSearchResults(modifiedNews);
      setFirstArticle(modifiedNews[0]);
    }
      fetchDisasterNews();

  }, [userLocation, refresh]);

  console.log(userLocation)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
  
    const tempSearchResults: NewNewsItem[] = news.filter((n: NewNewsItem) => {
      const inTitle = n.title.toLowerCase().includes(searchTerm);
      const inLocation = n.location.some((loc: string) => 
        loc.toLowerCase().includes(searchTerm)
      );
      console.log(n)
      // const inCategories = n.severity.some((cat: string) => 
      //   cat.toLowerCase().includes(searchTerm)
      // );
      const inSeverity = n.severity.toLowerCase().includes(searchTerm);
  
      return inTitle || inLocation || inSeverity;
    });

    console.log(tempSearchResults)
  
    setSearchResults(tempSearchResults);
  };

  const [boxStyle, setBoxStyle] = useState({});

  useEffect(() => {
    setBoxStyle({
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      height: "calc(100vh - 70px)",
      width: "100%",
      padding: "16px",
      overflow: "auto",
      boxSizing: "border-box",
      position: "fixed",
      top: "70px",
      backgroundColor: isHighContrast ? "white" : "#FFF8E7",
      alignItems: !news.length ? "center" : "unset",
    });
  }, [isHighContrast, news.length]);

  function handleMapOpen(): void {
    throw new Error("Function not implemented.");
  }

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
        style={boxStyle}
        ref={pageRef}
      >
        <AccessibleSearchBar
          isBiggerFont={isBiggerFont}
          isVoiceAssist={isVoiceAssist}
          isHighContrast={isHighContrast}
          handleSearchChange={handleSearchChange}
          handleMapOpen={handleMapOpen}
          severity={severity}
          setSeverity={setSeverity}
        />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#333333",
              marginBottom: "5px",
              marginRight: "5px",
              fontSize: isBiggerFont ? "20px" : "14px"
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
              fontSize: isBiggerFont ? "20px" : "14px"
            }}
            onClick={testAucklandClicked}
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
              fontSize: isBiggerFont ? "20px" : "14px"
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
              fontSize: isBiggerFont ? "20px" : "14px"
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
              fontSize: isBiggerFont ? "20px" : "14px"
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
              fontSize: isBiggerFont ? "20px" : "14px"
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
              fontSize: isBiggerFont ? "20px" : "14px"
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
              fontSize: isBiggerFont ? "20px" : "14px"
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
              fontSize: isBiggerFont ? "20px" : "14px"
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
              fontSize: isBiggerFont ? "20px" : "14px"
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
              fontSize: isBiggerFont ? "20px" : "14px"
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
              fontSize: isBiggerFont ? "20px" : "14px"
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

        {news.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
              padding: "20px",
            }}
          >
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
            {/* <TailSpin
              height="80"
              width="80"
              color="#00026E"
              ariaLabel="tail-spin-loading"
              radius="1"
            /> */}
            <h1>No disasters reported!</h1>
          </Box>
        )}
      </Box>
    </Box>
  );
}

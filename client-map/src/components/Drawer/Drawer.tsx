import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useContext, useEffect, useRef, useState } from "react";
import { DrawerContext } from "../../contexts/DrawerContext";
import { NewsCard } from "./DrawerComponents/NewsCard";
import { NewsPage } from "../NewsPage";
import { SelectedNewsContext } from "../../contexts/SelectedNewsContext";
import { NewsItem } from "../../models/NewsItem";
import { CenterContext } from "../../contexts/CenterContext";
import { useSwipeable } from "react-swipeable";

type DrawerPropsType = {
  news: NewsItem[][];
};

export function Drawer({ news }: DrawerPropsType) {
  const { isDrawerOpen, toggleDrawer, loading, updateLoading } =
    useContext(DrawerContext);
  const { selectedNews } = useContext(SelectedNewsContext);
  const [readMoreClicked, setReadMoreClicked] = useState<boolean>(false);
  const cardsContainerRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { userLocation, updateCenter } = useContext(CenterContext);
  const [idMap, setIdMap] = useState(new Map<string, string>());
  const [uniqueNews, setUniqueNews] = useState<NewsItem[]>([]);

  const scrollToCard = (cardId: any) => {
    const cardElement = document.getElementById(idMap.get(cardId)!);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
      const uniqueNews: NewsItem[] = [];
      const titleToNewsMap = new Map<string, any>();
      const idMap = new Map<string, string>();

      // Reduce the news array to only unique news items in O(n) time.
      news.forEach(([marker]) => {
          if (!titleToNewsMap.has(marker.title)) {
              uniqueNews.push(marker);
              titleToNewsMap.set(marker.title, marker);
          }
          idMap.set(marker.id, titleToNewsMap.get(marker.title).id);
      });

      setIdMap(idMap);
      setUniqueNews(uniqueNews);

    if (!loading && selectedNews) {
      setTimeout(() => {
        scrollToCard(selectedNews.id);
      }, 300);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && selectedNews) {
      scrollToCard(selectedNews.id);
    }
  }, [selectedNews]);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      toggleDrawer(true);
    },
    onSwipedDown: () => {
      toggleDrawer(false);
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "primary.main",
          opacity: "70%",
          height: "45px",
          boxSizing: "border-box",
          zIndex: "15",
          borderRadius: "100%",
          aspectRatio: "1",
          bottom: isDrawerOpen
            ? "calc(100% - 70px - 70px - 25svh + 90px)"
            : "90px",
          transition: "bottom 0.3s ease-in-out",
          marginRight: "20px",
          position: "fixed",
        }}
      >
        <IconButton
          onClick={() => {
            toggleDrawer(false);
            updateCenter(userLocation!);
          }}
        >
          <HomeIcon fontSize="medium" sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
          backgroundColor: "primary.main",
          height: "70px",
          boxSizing: "border-box",
          zIndex: "10",
        }}
        {...handlers}
      >
        <Typography variant="h1" color="white" sx={{ marginLeft: "6px" }}>
          {readMoreClicked ? "DETAILS" : "LATEST STORIES"}
        </Typography>
        {readMoreClicked ? (
          <IconButton onClick={() => setReadMoreClicked(false)}>
            <ArrowBackIcon fontSize="large" sx={{ color: "white" }} />
          </IconButton>
        ) : isDrawerOpen ? (
          <IconButton onClick={() => toggleDrawer(false)}>
            <KeyboardArrowDownIcon fontSize="large" sx={{ color: "white" }} />
          </IconButton>
        ) : (
          <IconButton onClick={() => toggleDrawer(true)}>
            <KeyboardArrowUpIcon fontSize="large" sx={{ color: "white" }} />
          </IconButton>
        )}
      </Box>

      <Box
        sx={{
          height: isDrawerOpen ? "calc(100svh - 70px - 70px - 25svh)" : "0px",
          overflow: "scroll",
          transition: "height 0.3s ease-in-out",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <Box
          ref={cardsContainerRef}
          sx={{
            display: isMobile ? "flex" : "grid",
            gridTemplateColumns: "auto auto auto",
            flexDirection: "column",
            gap: "8px",
            boxSizing: "border-box",
            padding: "16px",
            height: "100%",
            backgroundColor: "white",
            overflow: "scroll",
          }}
        >
          {news.length == 0 && <Typography>Nothing to see here</Typography>}

          {news.every((markerArray) => markerArray.length > 1) &&
            news.length > 0 && (
              <Typography>Zoom in or click on the clusters</Typography>
            )}

          {uniqueNews.map((news) => {
              return (
                  <NewsCard
                      key={news.id}
                      newsMarker={news}
                      setReadMoreClicked={setReadMoreClicked}
                      idMap={idMap}
                  />)
          })}
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          height: isDrawerOpen ? "calc(100svh - 70px - 25svh)" : "0px",
          width: "100%",
          right: readMoreClicked ? "0" : "-100%",
          transition: "right 0.3s ease-in-out",
          boxSizing: "border-box",
          overflow: "scroll",
          position: "absolute",
        }}
      >
        <div className="placeholder" style={{ height: "70px" }}></div>
        <NewsPage newsMarker={selectedNews} />
      </Box>
    </Box>
  );
}

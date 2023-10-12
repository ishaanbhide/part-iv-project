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

  const scrollToCard = (cardId: any) => {
    const cardElement = document.getElementById(cardId);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!loading && selectedNews) {
      scrollToCard(selectedNews.id);
    }
  }, [loading, selectedNews]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
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
          position: "fixed",
          borderRadius: "100%",
          aspectRatio: "1",
          bottom: isDrawerOpen
            ? "calc(100% - 70px - 70px - 25vh + 90px)"
            : "90px",
          transition: "bottom 0.3s ease-in-out",
          marginRight: "10px",
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
          position: "fixed",
          bottom: isDrawerOpen ? "calc(100% - 70px - 70px - 25vh)" : "0%",
          transition: "bottom 0.3s ease-in-out",
        }}
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
          height: isDrawerOpen ? "calc(100% - 70px - 70px - 25vh)" : "0px",
          bottom: "0%",
          transition: "height 0.3s ease-in-out",
          overflow: "auto",
          position: "fixed",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <Box
          sx={{
            background: "white",
            width: "100%",
            height: "100%",
            position: "fixed",
            right: readMoreClicked ? "0" : "-100%",
            transition: "right 0.3s ease-in-out",
          }}
        >
          <NewsPage newsMarker={selectedNews} />
        </Box>

        <Box
          ref={cardsContainerRef}
          sx={{
            display: isMobile ? "flex" : "grid",
            gridTemplateColumns: "auto auto auto",
            flexDirection: "column",
            gap: "8px",
            padding: "16px",
          }}
        >
          {news.length == 0 && <Typography>Nothing to see here</Typography>}

          {news.every((markerArray) => markerArray.length > 1) &&
            news.length > 0 && (
              <Typography>Zoom in or click on the clusters</Typography>
            )}

          {news.map((markerArray) => {
            if (markerArray.length == 1) {
              return (
                <NewsCard
                  key={markerArray[0].id}
                  newsMarker={markerArray[0]}
                  setReadMoreClicked={setReadMoreClicked}
                />
              );
            }
          })}
        </Box>
      </Box>
    </Box>
  );
}

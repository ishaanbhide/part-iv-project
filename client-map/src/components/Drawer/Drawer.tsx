import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useContext, useEffect, useRef, useState } from "react";
import { DrawerContext } from "../../contexts/DrawerContext";
import { NewsCard } from "./DrawerComponents/NewsCard";
import { NewsPage } from "../NewsPage";
import { SelectedNewsContext } from "../../contexts/SelectedNewsContext";
import { NewsItem } from "../../models/NewsItem";

type DrawerPropsType = {
  news: NewsItem[];
};

export function Drawer({ news }: DrawerPropsType) {
  const { isDrawerOpen, toggleDrawer, loading, updateLoading } =
    useContext(DrawerContext);
  const { selectedNews } = useContext(SelectedNewsContext);
  const [readMoreClicked, setReadMoreClicked] = useState<boolean>(false);
  const cardsContainerRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 600px)");

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
    <Box>
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
          position: "fixed",
          zIndex: "10",
        }}
      >
        <Typography variant="h1" color="white">
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
          bottom: "0",
          height: isDrawerOpen ? "calc(100vh - 70px - 20vh - 70px)" : "0px",
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
    </Box>
  );
}

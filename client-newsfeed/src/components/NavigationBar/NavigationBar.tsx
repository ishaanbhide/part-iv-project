import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Badge, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MapIcon from '@mui/icons-material/Map';
import { useContext } from "react";
import { DrawerContext } from "../../contexts/DrawerContext";
import { NewsItem } from "../../models/NewsItem";
import { NewNewsItem } from '../../models/NewNewsItem';
import { useQuiz } from '../../contexts/QuizContext';

type NavigationBarPropsType = {
  news: NewNewsItem[];
  readMoreClicked: boolean;
  setReadMoreClicked: React.Dispatch<React.SetStateAction<boolean>>;
  pageRef: React.MutableRefObject<null>;
  firstArticle: NewNewsItem | null;
};

export function NavigationBar({
  news,
  readMoreClicked,
  setReadMoreClicked,
  pageRef,
  firstArticle,
}: NavigationBarPropsType) {
  const { toggleDrawer } = useContext(DrawerContext);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const { answers } = useQuiz();
  const isBiggerFont = answers[4] === "Yes";
  const iconSize = isBiggerFont ? 'large' : 'medium';
  const padding = isBiggerFont ? '12px' : '8px';

  const buttonStyle = {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#333333',
    },
    padding: padding,
  };

  const scrollToCard = (cardId: any) => {
    const cardElement = document.getElementById(cardId);
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setNotificationCount(news.length);
  }, [news]);

  const handleHomeClick = async () => {
    setReadMoreClicked(false);
    scrollToCard(firstArticle?.id);
  };

  const handleNotificationClick = () => {
    toggleDrawer(true);
  };

  const handleBackClick = () => {
    setReadMoreClicked(!readMoreClicked);
  };

  function handleMapOpen(event: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#00026E",
        padding: "8px",
        height: "70px",
        boxSizing: "border-box",
        width: "100%",
        position: "fixed",
        top: "0px",
      }}
    >
      {readMoreClicked ? (
        <IconButton onClick={handleBackClick} aria-label="Go back">
          <ArrowBackIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>
      ) : (
        <Box
          sx={{
            height: "100%",
            padding: "8px",
            paddingLeft: "6px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
          onClick={handleHomeClick}
          aria-label="Home"
        >
          <img src="./logo.png" alt="GeoHub Logo" style={{ height: "100%" }} />
          <Typography variant="h1" color="white">
            GEOHUB
          </Typography>
        </Box>
      )}

      {/* <IconButton
        onClick={handleNotificationClick}
        aria-label={`Notifications (${notificationCount} new)`}
      >
        <Badge badgeContent={notificationCount} color="error">
          <NotificationsIcon fontSize="large" sx={{ color: "white" }} />
        </Badge>
      </IconButton> */}

<Button
        onClick={handleMapOpen}
        aria-label="Open map"
        sx={buttonStyle}
      >
        <MapIcon fontSize={iconSize} />
      </Button>
    </Box>
  );
}
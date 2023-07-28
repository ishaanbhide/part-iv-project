import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Badge, Box, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CenterContext } from "../../contexts/CenterContext";
import { DrawerContext } from "../../contexts/DrawerContext";
import { SelectedNewsContext } from "../../contexts/SelectedNewsContext";
import { NewsItem } from "../../models/NewsItem";

type NavigationBarPropsType = {
  news: NewsItem[];
  readMoreClicked: boolean;
  setReadMoreClicked: React.Dispatch<React.SetStateAction<boolean>>;
  pageRef: React.MutableRefObject<null>;
  firstArticle: NewsItem | null;
};

export function NavigationBar({
  news,
  readMoreClicked,
  setReadMoreClicked,
  pageRef,
  firstArticle,
}: NavigationBarPropsType) {
  const { toggleDrawer } = useContext(DrawerContext);
  const { updateSelectedNews } = useContext(SelectedNewsContext);
  const { updateCenter, userLocation, toggleHomeClicked } =
    useContext(CenterContext);
  const [notificationCount, setNotificationCount] = useState<number>(0);

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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "primary.main",
        padding: "8px",
        height: "70px",
        boxSizing: "border-box",
        width: "100%",
        position: "fixed",
        top: "0px",
      }}
    >
      {readMoreClicked ? (
        <IconButton onClick={() => setReadMoreClicked(!readMoreClicked)}>
          <ArrowBackIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            handleHomeClick();
          }}
        >
          <HomeIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>
      )}

      <IconButton onClick={handleNotificationClick}>
        <Badge badgeContent={notificationCount} color="error">
          <NotificationsIcon fontSize="large" sx={{ color: "white" }} />
        </Badge>
      </IconButton>
    </Box>
  );
}

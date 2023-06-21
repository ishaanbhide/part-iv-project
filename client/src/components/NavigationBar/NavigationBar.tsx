import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Box, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CenterContext } from "../../contexts/CenterContext";
import { DrawerContext } from "../../contexts/DrawerContext";
import { SelectedNewsContext } from "../../contexts/SelectedNewsContext";
import { NewsItem } from "../../models/NewsItem";

type NavigationBarPropsType = {
  news: NewsItem[];
};

export function NavigationBar({ news }: NavigationBarPropsType) {
  const { toggleDrawer } = useContext(DrawerContext);
  const { updateSelectedNews } = useContext(SelectedNewsContext);
  const { updateCenter, userLocation, toggleHomeClicked } =
    useContext(CenterContext);
  const [notificationCount, setNotificationCount] = useState<number>(0);

  useEffect(() => {
    setNotificationCount(news.length);
  }, [news]);

  const handleHomeClick = async () => {
    userLocation && updateCenter(userLocation);
    updateSelectedNews(null);
    toggleDrawer(false);
    toggleHomeClicked();
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
      }}
    >
      <IconButton onClick={handleHomeClick}>
        <HomeIcon fontSize="large" sx={{ color: "white" }} />
      </IconButton>
      <IconButton onClick={handleNotificationClick}>
        <Badge badgeContent={notificationCount} color="error">
          <NotificationsIcon fontSize="large" sx={{ color: "white" }} />
        </Badge>
      </IconButton>
    </Box>
  );
}

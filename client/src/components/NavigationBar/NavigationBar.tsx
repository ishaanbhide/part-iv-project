import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, IconButton } from "@mui/material";
import { useContext } from "react";
import { CenterContext } from "../../contexts/CenterContext";
import { DrawerContext } from "../../contexts/DrawerContext";
import { SelectedNewsContext } from "../../contexts/SelectedNewsContext";

export function NavigationBar() {
  const { toggleDrawer } = useContext(DrawerContext);
  const { updateSelectedNews } = useContext(SelectedNewsContext);
  const { updateCenter, userLocation, toggleHomeClicked } =
    useContext(CenterContext);

  const handleHomeClick = async () => {
    updateCenter(userLocation);
    updateSelectedNews(null);
    toggleDrawer(false);
    toggleHomeClicked();
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
      <IconButton>
        <NotificationsIcon fontSize="large" sx={{ color: "white" }} />
      </IconButton>
    </Box>
  );
}

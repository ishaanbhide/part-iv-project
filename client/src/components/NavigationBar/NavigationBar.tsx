import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, IconButton } from "@mui/material";

export function NavigationBar() {
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
      <IconButton>
        <HomeIcon fontSize="large" sx={{ color: "white" }} />
      </IconButton>
      <IconButton>
        <NotificationsIcon fontSize="large" sx={{ color: "white" }} />
      </IconButton>
    </Box>
  );
}

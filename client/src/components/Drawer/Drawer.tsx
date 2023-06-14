import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useContext, useState } from "react";
import { DrawerContext } from "../../contexts/DrawerContext";
import { NewsCard } from "./DrawerComponents/NewsCard";

export function Drawer() {
  const { isDrawerOpen, toggleDrawer } = useContext(DrawerContext);
  const [selectedNewsCard, setSelectedNewsCard] = useState<string | null>(null);

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
          RECENT STORIES
        </Typography>
        {isDrawerOpen ? (
          <IconButton onClick={toggleDrawer}>
            <KeyboardArrowDownIcon fontSize="large" sx={{ color: "white" }} />
          </IconButton>
        ) : (
          <IconButton onClick={toggleDrawer}>
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
          width: "100%",
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <NewsCard
            id="1"
            title="Title"
            selectedNewsCard={selectedNewsCard}
            setSelectedNewsCard={setSelectedNewsCard}
          />
          <NewsCard
            id="2"
            title="Title"
            selectedNewsCard={selectedNewsCard}
            setSelectedNewsCard={setSelectedNewsCard}
          />
          <NewsCard
            id="3"
            title="Title"
            selectedNewsCard={selectedNewsCard}
            setSelectedNewsCard={setSelectedNewsCard}
          />
        </Box>
      </Box>
    </Box>
  );
}

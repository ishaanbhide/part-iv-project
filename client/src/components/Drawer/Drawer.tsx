import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useContext, useState } from "react";
import "./Drawer.css";
import { DrawerContext } from "../../contexts/DrawerContext";

export function Drawer() {
  const { isDrawerOpen, toggleDrawer } = useContext(DrawerContext);

  return (
    <Box
      className={`drawer ${isDrawerOpen && "drawer--active"}`}
      sx={{ backgroundColor: "red" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
          backgroundColor: "primary.main",
          height: "70px",
          boxSizing: "border-box",
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
    </Box>
  );
}

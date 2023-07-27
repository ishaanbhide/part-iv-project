import { Box, Typography } from "@mui/material";
import { NewsItem } from "../models/NewsItem";
import { useContext } from "react";
import { SelectedNewsContext } from "../contexts/SelectedNewsContext";

type NewsCardProps = {
  newsMarker: NewsItem;
  setReadMoreClicked: (clicked: boolean) => void;
};

export function NewsCard({ newsMarker, setReadMoreClicked }: NewsCardProps) {
  const { selectedNews, updateSelectedNews } = useContext(SelectedNewsContext);

  const handleSelectedNewsCard = () => {
    if (newsMarker.id == selectedNews?.id) {
      updateSelectedNews(null);
    } else {
      updateSelectedNews(newsMarker);
      setReadMoreClicked(true);
    }
  };

  return (
    <Box
      onClick={handleSelectedNewsCard}
      id={newsMarker.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        backgroundColor: "secondary.main",
        boxSizing: "border-box",
        width: "100%",
        border: "4px #ffffff solid",
        transition: "border 0.1s ease-in-out",
        cursor: "pointer",
      }}
    >
      <img
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
        src={newsMarker.image}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingTop: "8px",
        }}
      >
        <Typography variant="h2">{newsMarker.title}</Typography>
      </Box>
    </Box>
  );
}

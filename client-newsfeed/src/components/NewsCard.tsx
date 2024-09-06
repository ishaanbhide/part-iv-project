import { Box, Typography } from "@mui/material";
import { NewsItem } from "../models/NewsItem";
import { useContext } from "react";
import { SelectedNewsContext } from "../contexts/SelectedNewsContext";
import { useQuiz } from "../contexts/QuizContext";

type NewsCardProps = {
  newsMarker: NewsItem;
  setReadMoreClicked: (clicked: boolean) => void;
};

export function NewsCard({ newsMarker, setReadMoreClicked }: NewsCardProps) {
  const { selectedNews, updateSelectedNews } = useContext(SelectedNewsContext);
  const { answers } = useQuiz();

  const handleSelectedNewsCard = () => {
    if (newsMarker.id === selectedNews?.id) {
      updateSelectedNews(null);
    } else {
      updateSelectedNews(newsMarker);
      setReadMoreClicked(true);
    }
  };

  const isBiggerFont = answers[4] === "Yes";
  const isHighContrast = answers[1] === "Yes";

  return (
    <Box
      onClick={handleSelectedNewsCard}
      id={newsMarker.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        backgroundColor: isHighContrast ? "black" : undefined,
        boxSizing: "border-box",
        width: {
          s: "85%", // For smaller devices
          md: isBiggerFont ? "65%" : "49%", // For larger devices
        },
        transition: "border 0.1s ease-in-out",
        cursor: "pointer",
        borderRadius: "0.8rem",
        // minHeight: isBiggerFont ? "650px" : "450px",
        justifyContent: "space-evenly",
      }}
    >
      <img
        style={{
          width: "100%",
          maxHeight: isHighContrast ? (isBiggerFont ? "450px" : "300px") : undefined,
          objectFit: "contain",
        }}
        src={newsMarker.image}
        alt={newsMarker.title}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingTop: "8px",
        }}
      >
        <Typography
          variant={isBiggerFont ? "h1" : "h2"}
          sx={{
            padding: "0px 15px",
            fontWeight: "bold",
            color: isHighContrast ? "white" : "black",
            textAlign: "center",
            fontSize: isBiggerFont ? "30px" : "inherit",
          }}
        >
          {newsMarker.title}
        </Typography>
      </Box>
    </Box>
  );
}

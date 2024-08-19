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
  const {answers, setAnswers} = useQuiz() 

  const handleSelectedNewsCard = () => {
    if (newsMarker.id == selectedNews?.id) {
      updateSelectedNews(null);
    } else {
      updateSelectedNews(newsMarker);
      setReadMoreClicked(true);
    }
  };

  const isBiggerFont = answers[4] === "Yes";
  const isHighContrast = answers[1] === "Yes";

  console.log(answers[1])

  return (
    <Box
      onClick={handleSelectedNewsCard}
      id={newsMarker.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        // backgroundColor: "secondary.main",
        backgroundColor: isHighContrast ? "black" : "lightgrey",
        boxSizing: "border-box",
        width: isBiggerFont ? "98%" : "49%",
        // minWidth: "50%",
        // border: "3px #ffffff solid",
        transition: "border 0.1s ease-in-out",
        cursor: "pointer",
        borderRadius: "0.8rem",
        minHeight: isBiggerFont ? "650px" : "450px",
        justifyContent: "space-evenly"
      }}
    >
      <img
        style={{ width: "auto", maxHeight: isBiggerFont ? "450px" : "300px", objectFit: "contain" }}
        src={newsMarker.image}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingTop: "8px",
        }}
      >
        <Typography variant={isBiggerFont ? "h1" : "h2"}
          sx={{
            padding: "0px 15px",
            fontWeight:"bold",
            color: isHighContrast ? "white" : "black",
            textAlign: "center",
            fontSize: isBiggerFont ? "30px" : "inherit"
          }}
        >{newsMarker.title}</Typography>
      </Box>
    </Box>
  );
}

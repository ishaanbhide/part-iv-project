import { Box, Typography } from "@mui/material";
import { NewsItem } from "../models/NewsItem";
import { useQuiz } from "../contexts/QuizContext";
import { NewNewsItem } from "../models/NewNewsItem";

type NewsCardProps = {
  newsMarker: NewNewsItem | null;
};

export function NewsPage({ newsMarker }: NewsCardProps) {
  function parseStringDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  const { answers } = useQuiz();
  const isBiggerFont = answers[4] === "Yes";
  const isHighContrast = answers[1] === "Yes";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "92vh",
        overflow: "auto",
        backgroundColor: isHighContrast ? "black" : "#FFF8E7",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "20px 0",
          flexShrink: 0,
        }}
        aria-label="News image container"
      >
        <img
          style={{ width: "auto", height: isBiggerFont ? "300px" : "400px", objectFit: "contain" }}
          src={newsMarker?.image}
          alt={newsMarker?.title || "News image"}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          padding: "8px 16px 16px 16px",
          boxSizing: "border-box",
          width: "70%",
          margin: "0 auto",
          "@media (max-width: 600px)": {
            width: "90%",
          },
        }}
        aria-label="News content"
      >
        {newsMarker && (
          <>
            <Typography
              variant="h1"
              sx={{ textAlign: "center", paddingBottom: "10px", fontSize: isBiggerFont ? "30px" : "inherit", color: isHighContrast ? "white" : "black" }}
              aria-label={`Title: ${newsMarker.title}`}
            >
              {newsMarker.title}
            </Typography>
            <Typography
              variant="h4"
              paddingTop="3px"
              sx={{ textAlign: "center", paddingBottom: "10px", color: isHighContrast ? "white" : "black" }}
              aria-label={`Source: ${newsMarker.source}`}
            >
              {newsMarker.source}
            </Typography>
            <Typography
              paragraph
              paddingTop="6px"
              paddingBottom="40px"
              sx={{ fontSize: isBiggerFont ? "20px" : "inherit", color: isHighContrast ? "white" : "black" }}
              aria-label="Description"
            >
              {newsMarker.description}
            </Typography>
            <Typography
              variant="h3"
              paddingTop="6px"
              color={"#6b6b6b"}
              aria-label={`Current Status: ${parseStringDate(newsMarker.endDate)}`}
            >
              {parseStringDate(newsMarker.endDate)}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
import { Box, Typography } from "@mui/material";
import { NewsItem } from "../models/NewsItem";
import { useQuiz } from "../contexts/QuizContext";

type NewsCardProps = {
  newsMarker: NewsItem | null;
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "auto",
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
              sx={{ textAlign: "center", paddingBottom: "10px", fontSize: isBiggerFont ? "30px" : "inherit" }}
              aria-label={`Title: ${newsMarker.title}`}
            >
              {newsMarker.title}
            </Typography>
            <Typography
              variant="h4"
              paddingTop="3px"
              sx={{ textAlign: "center", paddingBottom: "10px" }}
              aria-label={`Source: ${newsMarker.source}`}
            >
              {newsMarker.source}
            </Typography>
            <Typography
              paragraph
              paddingTop="6px"
              paddingBottom="20px"
              sx={{ fontSize: isBiggerFont ? "20px" : "inherit" }}
              aria-label="Description"
            >
              {newsMarker.description}
            </Typography>
            <Typography
              variant="h3"
              paddingTop="6px"
              color={"#6b6b6b"}
              aria-label={`Published on: ${parseStringDate(newsMarker.createdAt)}`}
            >
              {parseStringDate(newsMarker.createdAt)}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
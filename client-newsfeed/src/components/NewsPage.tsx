import { Box, Card, CardContent, Typography } from "@mui/material";
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
  const isSteps = answers[2] === "Yes";

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
              variant="h2"
              paddingTop="3px"
              sx={{ textAlign: "center", paddingBottom: "10px", color: isHighContrast ? "white" : "black" }}
              aria-label={`Source: ${newsMarker.source}`}
            >
              Last updated: {newsMarker.lastUpdated}
            </Typography>
            <Typography
              variant="h2"
              paddingTop="3px"
              sx={{ textAlign: "center", paddingBottom: "10px", color: isHighContrast ? "white" : "black" }}
              aria-label={`Current Status: ${newsMarker.endDate}`}
            >
              Current Status: {newsMarker.endDate}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
              {newsMarker.summary.map((item, index) => (
                <Card key={index} sx={{ backgroundColor: isHighContrast ? "#323332": "#f2df79" }}> {/* A more contrasting color */}
                  <CardContent>
                    <Typography sx={{ fontSize: isBiggerFont ? "20px" : "inherit", color: isHighContrast ? "white" : "black" }}
              aria-label="Description">
                      {item}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
            {isSteps &&(
              <div>
              <Typography
              variant="h2"
              sx={{ textAlign: "center", paddingBottom: "10px", fontSize: isBiggerFont ? "30px" : "inherit", color: isHighContrast ? "white" : "black" }}
              aria-label={`Title: ${newsMarker.title}`}
            >
              Recommended steps
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
              {newsMarker.recActions.map((item, index) => (
                <Card key={index} sx={{ backgroundColor: isHighContrast ? "#323332": "#f0e68c" }}> {/* A more contrasting color */}
                  <CardContent>
                    <Typography sx={{ fontSize: isBiggerFont ? "20px" : "inherit", color: isHighContrast ? "white" : "black" }}
              aria-label="Description">
                      {item}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
            </div>
            )}
            <Typography
              variant="h3"
              paddingTop="6px"
              color={"#6b6b6b"}
              aria-label={newsMarker.source}
            >
              {newsMarker.source}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}
import { Box, Typography } from "@mui/material";
import { NewsItem } from "../models/NewsItem";

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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        flexDirection: "column"
      }}
    >
      <Box
        sx={{display: "flex", justifyContent: "center", paddingY: "20px"}}
      >
      <img
        style={{ width: "auto", height: "400px", objectFit: "contain" }}
        src={newsMarker?.image}
      />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "8px 16px 16px 16px",
          boxSizing: "border-box",
          width:"70%",
          justifyContent: "center",
          margin: "0 auto"
        }}
      >
        {newsMarker && (
          <>
            <Typography variant="h2" sx={{textAlign: "center", paddingBottom: "10px"}}>{newsMarker.title}</Typography>
            <Typography variant="h4" paddingTop="3px" sx={{textAlign: "center", paddingBottom: "10px"}}>
              {newsMarker.source}
            </Typography>
            <Typography paragraph paddingTop="6px">
              {newsMarker.description}
            </Typography>
            <Typography variant="h3" paddingTop="6px" color={"#6b6b6b"}>
              {parseStringDate(newsMarker.createdAt)}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

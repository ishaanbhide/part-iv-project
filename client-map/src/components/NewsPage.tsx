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
        <Box>
            <img
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                src={newsMarker?.image}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "8px 16px 16px 16px",
                    boxSizing: "border-box",
                }}
            >
                {newsMarker && (
                    <>
                        <Typography variant="h2">{newsMarker.title}</Typography>
                        <Typography variant="h4" paddingTop="3px">
                            {newsMarker.source}
                        </Typography>
                        <Typography paragraph paddingTop="6px">
                            {newsMarker.description}
                        </Typography>
                        <Typography
                            variant="h3"
                            paddingTop="6px"
                            color={"#6b6b6b"}
                        >
                            {parseStringDate(newsMarker.createdAt)}
                        </Typography>
                    </>
                )}
            </Box>
        </Box>
    );
}

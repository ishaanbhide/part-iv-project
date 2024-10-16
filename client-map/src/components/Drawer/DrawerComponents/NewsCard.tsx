import { Box, Typography } from "@mui/material";
import { NewsItem } from "../../../models/NewsItem";
import { useContext } from "react";
import { SelectedNewsContext } from "../../../contexts/SelectedNewsContext";

type NewsCardProps = {
    newsMarker: NewsItem;
    setReadMoreClicked: (clicked: boolean) => void;
    idMap: Map<string, string>;
};

export function NewsCard({
    newsMarker,
    setReadMoreClicked,
    idMap,
}: NewsCardProps) {
    const { updateSelectedNews } = useContext(SelectedNewsContext);

    const handleCardClick = () => {
        updateSelectedNews(newsMarker); // Select the news
        setReadMoreClicked(true); // Trigger the "read more" action
    };

    return (
        <Box
            onClick={handleCardClick} // Make entire card clickable
            id={newsMarker.id}
            sx={{
                display: "flex",
                flexDirection: "column",
                padding: "16px",
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
                borderRadius: "12px",
                cursor: "pointer",
                "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                },
                marginBottom: "16px",
            }}
        >
            <img
                style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "12px",
                }}
                src={newsMarker.image}
            />
            <Typography
                variant="h6"
                sx={{
                    fontWeight: "bold",
                    lineHeight: "1.2",
                    fontSize: "1.1rem",
                    marginBottom: "8px",
                }}
            >
                {newsMarker.title.substring(0, 80)}... 
            </Typography>
            <Typography variant="body2" sx={{ color: "#6b6b6b" }}>
                {newsMarker.description.substring(0, 80)}...
            </Typography>
        </Box>
    );
}

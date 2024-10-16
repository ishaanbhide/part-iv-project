import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NewsItem } from "../models/NewsItem";

type NewsCardProps = {
    newsMarker: NewsItem | null;
    onBack: () => void;
};

export function NewsPage({ newsMarker, onBack }: NewsCardProps) {
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
                backgroundColor: "#00026E",
                height: "100vh",
                padding: "20px",
                color: "white",
                overflowY: "scroll",  // Allow scrolling
                scrollbarWidth: "none",  // Hide scrollbar for Firefox
                "&::-webkit-scrollbar": {
                display: "none",  // Hide scrollbar for Chrome, Safari, and Edge
                },
                boxSizing: "border-box",
            }}
        >
            {/* Back Button */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                    overflowY: "scroll",  // Allow scrolling
                    scrollbarWidth: "none",  // Hide scrollbar for Firefox
                    "&::-webkit-scrollbar": {
                        display: "none",  // Hide scrollbar for Chrome, Safari, and Edge
                    },
                    
                }}
            >
                <IconButton onClick={onBack} sx={{ color: "white" }}>
                    <ArrowBackIcon sx={{ fontSize: "30px" }} />
                </IconButton>
                <Typography variant="h6" sx={{ marginLeft: "8px", fontSize: "1.2rem", fontWeight: "bold" }}>
                    Back to Articles
                </Typography>
            </Box>

            {/* News Details */}
            <img
                style={{
                    width: "100%",
                    height: "300px",  // Increased size for better visual impact
                    objectFit: "contain",
                    borderRadius: "12px",  // Rounded corners for the image
                    marginBottom: "20px",  // Space below the image
                }}
                src={newsMarker?.image}
            />
            <Box
                sx={{
                    backgroundColor: "#1A237E",  // Darker color for the news box
                    padding: "20px",
                    borderRadius: "12px",  // Rounded corners for content
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",  // Soft shadow for depth
                }}
            >
                {newsMarker && (
                    <>
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: "bold",
                                fontSize: "1.3rem",
                                marginBottom: "10px",
                                alignContent: "center",
                            }}
                        >
                            {newsMarker.title}
                        </Typography>
                        <Typography variant="h6" sx={{ color: "#BBDEFB", marginBottom: "16px" }}>
                            {newsMarker.source}
                        </Typography>
                        <Typography paragraph sx={{ lineHeight: "1.6", marginBottom: "16px", fontSize: "1.1rem" }}>
                            {newsMarker.description}
                        </Typography>
                        <Typography variant="h6" sx={{ color: "#BBDEFB" }}>
                            {parseStringDate(newsMarker.createdAt)}
                        </Typography>
                    </>
                )}
            </Box>
        </Box>
    );
}

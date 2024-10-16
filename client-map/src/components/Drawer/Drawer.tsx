import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { NewsCard } from "./DrawerComponents/NewsCard";
import { NewsPage } from "../NewsPage";
import { SelectedNewsContext } from "../../contexts/SelectedNewsContext";
import { NewsItem } from "../../models/NewsItem";
import { CenterContext } from "../../contexts/CenterContext";

type DrawerPropsType = {
    news: NewsItem[][];
};

export function Drawer({ news }: DrawerPropsType) {
    const { selectedNews } = useContext(SelectedNewsContext);
    const [readMoreClicked, setReadMoreClicked] = useState<boolean>(false);
    const cardsContainerRef = useRef(null);
    const { userLocation, updateCenter } = useContext(CenterContext);
    const [idMap, setIdMap] = useState(new Map<string, string>());
    const [uniqueNews, setUniqueNews] = useState<NewsItem[]>([]);
    const [newsProcessing, setNewsProcessing] = useState(true);

    // Pagination state: current page and articles per page
    const [currentPage, setCurrentPage] = useState(0);
    const articlesPerPage = 2;

    // Calculate total number of pages
    const totalPages = Math.ceil(uniqueNews.length / articlesPerPage);

    const scrollToCard = (cardId: any) => {
        const cardElement = document.getElementById(idMap.get(cardId)!);
        if (cardElement) {
            cardElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        setNewsProcessing(true);
        const uniqueNews: NewsItem[] = [];
        const titleToNewsMap = new Map<string, any>();
        const idMap = new Map<string, string>();

        // Reduce the news array to only unique news items in O(n) time.
        news.forEach(([marker]) => {
            if (!titleToNewsMap.has(marker.title)) {
                uniqueNews.push(marker);
                titleToNewsMap.set(marker.title, marker);
            }
            idMap.set(marker.id, titleToNewsMap.get(marker.title).id);
        });

        setIdMap(idMap);
        setUniqueNews(uniqueNews);
        setNewsProcessing(false);
    }, [news]);

    useEffect(() => {
        if (selectedNews && !newsProcessing) {
            scrollToCard(selectedNews.id);
        }
    }, [selectedNews, newsProcessing]);

    // Paginate the news items, showing two per page
    const paginatedNews = uniqueNews.slice(
        currentPage * articlesPerPage,
        (currentPage + 1) * articlesPerPage
    );

    return (
        <Box
        sx={{
            width: "330px",  // Fixed width for the sidebar
            height: "100vh",  // Full height to cover the screen
            backgroundColor: "#00026E",
            position: "fixed",  // Fix it to the left side of the page
            top: 0,
            left: 0,
            zIndex: 10,
            padding: "16px",
            boxSizing: "border-box",
            display: "flex",  // Use flexbox for layout control
            flexDirection: "column",  // Column layout
            justifyContent: "space-between",  // Space between content and buttons
            overflowY: readMoreClicked ? "hidden" : "scroll",  // Disable scrolling when NewsPage is open
            scrollbarWidth: "none",  // Hide scrollbar for Firefox
            "&::-webkit-scrollbar": {
                display: "none",  // Hide scrollbar for Chrome, Safari, and Edge
            },
        }}
        >
            <Typography variant="h1"
                sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.8rem",
                    textAlign: "center",
                    marginBottom: "30px",
                    marginTop: "10px",
                }}>
                LATEST STORIES
            </Typography>

            <Box
                ref={cardsContainerRef}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "25px",
                    flex: 1,  // Allow this box to grow and fill available space
                    overflowX: "hidden",
                    overflowY: "scroll",  // Allow scrolling
                    scrollbarWidth: "none",  // Hide scrollbar for Firefox
                    "&::-webkit-scrollbar": {
                        display: "none",  // Hide scrollbar for Chrome, Safari, and Edge
                    },

                }}
            >
                {paginatedNews.map((news) => {
                    return (
                        <NewsCard
                            key={news.id}
                            newsMarker={news}
                            setReadMoreClicked={setReadMoreClicked}
                            idMap={idMap}
                        />
                    );
                })}
            </Box>

            {/* Pagination buttons */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "16px",
                }}
            >
                <Button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0} // Disable button if on the first page
                    variant="contained"
                    color="secondary"
                >
                    Up
                </Button>
                <Button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={currentPage >= totalPages - 1} // Disable button if on the last page
                    variant="contained"
                    color="secondary"
                >
                    Down
                </Button>
            </Box>

            {readMoreClicked && (
    <Box
    sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        zIndex: 20,
        overflowY: "scroll",  // Allow scrolling within the NewsPage
        scrollbarWidth: "none",  // Hide scrollbar for Firefox
        "&::-webkit-scrollbar": {
            display: "none",  // Hide scrollbar for Chrome, Safari, and Edge
        },
    }}
>
    <NewsPage 
        newsMarker={selectedNews} 
        onBack={() => setReadMoreClicked(false)} 
    />
</Box>
            )}
        </Box>
    );
}

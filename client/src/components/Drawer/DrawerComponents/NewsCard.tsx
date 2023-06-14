import "./NewsCard.css";
import { Box, IconButton, Typography } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

type NewsCardProps = {
  id: string;
  title: string;
  selectedNewsCard: string | null;
  setSelectedNewsCard: (id: string | null) => void;
};

export function NewsCard({
  id,
  title,
  selectedNewsCard,
  setSelectedNewsCard,
}: NewsCardProps) {
  const handleSelectedNewsCard = () => {
    if (id == selectedNewsCard) {
      setSelectedNewsCard(null);
    } else {
      setSelectedNewsCard(id);
    }
  };

  return (
    <Box
      onClick={handleSelectedNewsCard}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        backgroundColor: "secondary.main",
        boxSizing: "border-box",
        width: "100%",
        border:
          selectedNewsCard == id ? "4px #5182ff solid" : "4px #ffffff solid",
        transition: "border 0.1s ease-in-out",
        cursor: "pointer",
      }}
    >
      <img
        className="newsCard-image"
        src="https://rnz-ressh.cloudinary.com/image/upload/s--94wj79Rj--/ar_16:10,c_fill,f_auto,g_auto,q_auto,w_1050/v1683600881/4L99UKY_MicrosoftTeams_image_21_png"
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingTop: "8px",
        }}
      >
        <Typography variant="h2">{title}</Typography>
        <ReadMoreIcon sx={{ marginLeft: "auto", cursor: "pointer" }} />
      </Box>
    </Box>
  );
}

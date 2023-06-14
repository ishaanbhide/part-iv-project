import { Box, Typography } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

type NewsCardProps = {
  id: string;
  title: string;
  source: string;
  description: string;
  image: string;
};

export function NewsPage({ title, source, description }: NewsCardProps) {
  return (
    <Box>
      <img
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
        src="https://rnz-ressh.cloudinary.com/image/upload/s--94wj79Rj--/ar_16:10,c_fill,f_auto,g_auto,q_auto,w_1050/v1683600881/4L99UKY_MicrosoftTeams_image_21_png"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "8px 16px 16px 16px",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h2">{title}</Typography>
        <Typography fontSize="12px">{source}</Typography>
        <Typography paragraph paddingTop="6px">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
        secondary: {
            main: "#D9D9D9",
        },
    },
    typography: {
        h1: {
            fontWeight: 600,
            fontSize: "20px",
        },
        h2: {
            fontSize: "16px",
        },
        h3: {
            fontSize: "14px",
        },
        h4: {
            fontSize: "12px",
            fontWeight: "500",
        },
    },
});

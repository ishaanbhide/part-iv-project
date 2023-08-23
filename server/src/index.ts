import express from "express";
import dotenv from "dotenv";
import api from "./routes";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api", api);

// serve static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../client-map/dist")));
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../../client-map/dist/index.html")
        );
    });
}

// mongodb connection
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING + "disastermap")
    .then(() => {
        console.log("Database connected!");
    })
    .catch(error => {
        console.log(`Failed to connect to database: ${error}`);
    });

app.listen(PORT, () => console.log(`App server listening on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import api from "./routes";
import mongoose from "mongoose";
import path from "path";

const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// routes
app.use("/api", api);

// serve static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../../client/build/index.html"));
    });
}

// mongodb connection
console.log("Connecting to database...");
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING + "disastermap" || "")
    .then(() => {
        console.log("Database connected!");
        app.listen(PORT, () =>
            console.log(`App server listening on port ${PORT}`)
        );
    });

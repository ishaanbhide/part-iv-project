import express from "express";
import dotenv from "dotenv";
import api from "./routes";

const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// routes
app.use("/api", api);

app.listen(PORT, () => console.log(`App server listening on port ${PORT}`));

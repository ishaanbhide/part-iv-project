import express from "express";
import newsRouter from "./news.route";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("You have reached disaster app API");
});

router.use("/news", newsRouter);

export default router;

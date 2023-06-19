import express, { Request, Response } from "express";
import News from "../models/news.model";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Getting news");
});

router.post("/", async (req, res) => {
    const { title, body, source, image, location } = req.body;
    const news = new News({
        title,
        body,
        source,
        image,
        location,
    });

    await news.save();

    res.send(news);
});

export default router;

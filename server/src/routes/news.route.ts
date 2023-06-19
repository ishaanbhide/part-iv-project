import express, { Request, Response } from "express";
import { News, INews } from "../models";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const news = await News.find();
        res.send(news);
    } catch (e) {
        console.error(e);
    }
});

router.post("/", async (req: Request, res: Response) => {
    const { title, body, source, image, location } = req.body;

    try {
        const news = new News({
            title,
            body,
            source,
            image,
            location,
        });

        await news.save();
        res.send(news);
    } catch (e) {
        console.error(e);
    }
});

router.post("/list", async (req: Request, res: Response) => {
    try {
        for (let news of req.body) {
            const { title, body, source, image, location } = news;
            const newsDocument = new News({
                title,
                body,
                source,
                image,
                location,
            });
            await newsDocument.save();
        }

        res.send(req.body);
    } catch (e) {
        console.error(e);
    }
});

export default router;

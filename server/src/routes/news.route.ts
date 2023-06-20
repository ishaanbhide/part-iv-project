import express, { Request, Response } from "express";
import { News } from "../models";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const news = await News.find();
        res.send(news);
    } catch (e) {
        console.error(e);
    }
});

router.get("/near", async (req: Request, res: Response) => {
    const { longitude, latitude, proximity } = req.query;

    if (!longitude || !latitude) {
        res.status(400).send("Invalid query parameters");
        return;
    }

    try {
        const news = await News.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [
                            parseFloat(longitude as string),
                            parseFloat(latitude as string),
                        ],
                    },
                    $maxDistance: parseInt(proximity as string) || 10000,
                },
            },
        }).limit(100);

        res.json(news);
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
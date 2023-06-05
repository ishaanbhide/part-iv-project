import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("You have reached the api");
});

export default router;

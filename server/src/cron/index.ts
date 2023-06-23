import cron from "node-cron";
import { fetchAndSaveFeeds } from "./rss";

export default function startCronJobs() {
    console.log("Starting cron jobs...");
    cron.schedule("*/5 * * * * *", fetchAndSaveFeeds);
}

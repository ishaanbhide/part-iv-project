import Parser from "rss-parser";

const parser = new Parser();
const NZ_HERALD_RSS =
    "https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/nz/?outputType=xml&_website=nzh";

export async function fetchAndSaveFeeds() {
    console.log("getting rss feed");

    const feed = await parser.parseURL(NZ_HERALD_RSS);
    console.log(feed);

    // TODO: webscraping link
    // TODO: geoparse text
    // TODO: save to database
}

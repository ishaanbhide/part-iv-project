import { NewsItem } from "../models/NewsItem";
import { groupObjectsByProximity } from "./groupObjectsByProximity";

interface MapNewsArticlesProps {
  disasterNews: any;
  setNews: (modifiedNews: NewsItem[][]) => void;
  zoom: number;
  proximity: number;
}

export function mapNewsArticles({
  disasterNews,
  setNews,
  zoom,
  proximity,
}: MapNewsArticlesProps) {
  const modifiedNews: NewsItem[] = disasterNews.map((news: any) => {
    return {
      id: news._id,
      title: news.title,
      description: news.body,
      source: news.source,
      image: news.image,
      location: {
        lat: news.location.coordinates[1],
        lng: news.location.coordinates[0],
      },
      createdAt: news.createdAt,
    };
  });

  if (zoom > 14) {
    const newsArr: NewsItem[][] = [];
    modifiedNews.map((mNews) => {
      newsArr.push([mNews]);
    });
    setNews(newsArr);
  } else {
    const groupedNews = groupObjectsByProximity(modifiedNews, proximity);
    setNews(groupedNews);
  }
}

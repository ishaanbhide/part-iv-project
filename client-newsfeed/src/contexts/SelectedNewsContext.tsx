import { createContext, useState } from "react";
import { NewsItem } from "../models/NewsItem";

type SelectedNewsContextType = {
  selectedNews: NewsItem | null;
  updateSelectedNews: (newsMarker: NewsItem | null) => void;
};

export const SelectedNewsContext = createContext<SelectedNewsContextType>({
  selectedNews: null,
  updateSelectedNews: () => {},
});

type SelectedNewsProviderProps = {
  children: React.ReactNode;
};

export const SelectedNewsProvider: React.FC<SelectedNewsProviderProps> = ({
  children,
}) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const updateSelectedNews = (newsMarker: NewsItem | null) => {
    setSelectedNews(newsMarker);
  };

  return (
    <SelectedNewsContext.Provider value={{ selectedNews, updateSelectedNews }}>
      {children}
    </SelectedNewsContext.Provider>
  );
};

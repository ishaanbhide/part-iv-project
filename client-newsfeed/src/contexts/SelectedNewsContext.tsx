import { createContext, useState } from "react";
import { NewsItem } from "../models/NewsItem";
import { NewNewsItem } from "../models/NewNewsItem";

type SelectedNewsContextType = {
  selectedNews: NewNewsItem | null;
  updateSelectedNews: (newsMarker: NewNewsItem | null) => void;
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
  const [selectedNews, setSelectedNews] = useState<NewNewsItem | null>(null);

  const updateSelectedNews = (newsMarker: NewNewsItem | null) => {
    setSelectedNews(newsMarker);
  };

  return (
    <SelectedNewsContext.Provider value={{ selectedNews, updateSelectedNews }}>
      {children}
    </SelectedNewsContext.Provider>
  );
};

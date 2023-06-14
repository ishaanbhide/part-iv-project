import { useContext } from "react";
import { CenterContext } from "../../../contexts/CenterContext";
import { MarkerF } from "@react-google-maps/api";
import { NewsItem } from "../../../models/NewsItem";
import { SelectedNewsContext } from "../../../contexts/SelectedNewsContext";

type NewsMarkerProps = {
  newsMarker: NewsItem;
};

export function NewsMarker({ newsMarker }: NewsMarkerProps) {
  const { center, updateCenter } = useContext(CenterContext);
  const { selectedNews, updateSelectedNews } = useContext(SelectedNewsContext);

  const handleMarkerClick = () => {
    updateCenter(newsMarker.location);
    updateSelectedNews(newsMarker);
  };

  return <MarkerF position={newsMarker.location} onClick={handleMarkerClick} />;
}

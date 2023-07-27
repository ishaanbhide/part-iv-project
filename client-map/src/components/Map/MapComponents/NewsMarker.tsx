import { useContext } from "react";
import { CenterContext } from "../../../contexts/CenterContext";
import { MarkerF } from "@react-google-maps/api";
import { NewsItem } from "../../../models/NewsItem";
import { SelectedNewsContext } from "../../../contexts/SelectedNewsContext";
import { DrawerContext } from "../../../contexts/DrawerContext";

type NewsMarkerProps = {
  newsMarker: NewsItem;
};

export function NewsMarker({ newsMarker }: NewsMarkerProps) {
  const { center, updateCenter } = useContext(CenterContext);
  const { selectedNews, updateSelectedNews } = useContext(SelectedNewsContext);
  const { isDrawerOpen, toggleDrawer } = useContext(DrawerContext);

  const handleMarkerClick = () => {
    updateCenter(newsMarker.location);
    updateSelectedNews(newsMarker);
    toggleDrawer(true);
  };

  return <MarkerF position={newsMarker.location} onClick={handleMarkerClick} />;
}

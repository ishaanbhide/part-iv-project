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
  const { updateCenter } = useContext(CenterContext);
  const { selectedNews, updateSelectedNews } = useContext(SelectedNewsContext);
  const { isDrawerOpen, toggleDrawer } = useContext(DrawerContext);

  const handleMarkerClick = () => {
    !isDrawerOpen && updateCenter(newsMarker.location);
    toggleDrawer(true);
    updateSelectedNews(newsMarker);
  };

  const isSelected = selectedNews?.id === newsMarker.id;

  return (
    <MarkerF
      key={isSelected ? "selected" : "not-selected"}
      position={newsMarker.location}
      onClick={handleMarkerClick}
      icon={{
        path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
        fillColor: isSelected ? "#000000" : "#f7726d",
        fillOpacity: 1,
      }}
    />
  );
}

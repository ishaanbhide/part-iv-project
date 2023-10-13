import "./Map.css";
import { Box } from "@mui/material";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";
import { DrawerContext } from "../../contexts/DrawerContext";
import { UserLocationMarker } from "./MapComponents/UserLocation";
import { CenterContext } from "../../contexts/CenterContext";
import { mapOptions } from "../../utils/mapOptions";
import { Oval } from "react-loader-spinner";
import { Coordinates } from "../../models/Coordinates";
import { getUserLocation } from "../../utils/getUserLocation";
import { NewsMarker } from "./MapComponents/NewsMarker";
import { NewsItem } from "../../models/NewsItem";
import CircleMarkerWithText from "./MapComponents/CircleMarkerWithText";
import { calculateProximityValue } from "../../utils/calculateProximityValue";
import { getMapAreaDisasterNews } from "../../api/news";
import { mapNewsArticles } from "../../utils/mapNewsArticles";

type MapPropsType = {
  news: NewsItem[][];
  setNews: (modifiedNews: NewsItem[][]) => void;
};

export function Map({ news, setNews }: MapPropsType) {
  const { isDrawerOpen } = useContext(DrawerContext);
  const { loading, updateLoading } = useContext(DrawerContext);
  const {
    center,
    updateCenter,
    updateUserLocation,
    updateMapBounds,
    updateZoom,
    zoom,
    proximity,
    updateProximity,
  } = useContext(CenterContext);
  const [mapLoading, setMapLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBVMfNn5ls36xpl3z_2CL19GD__JwkZR1M",
  });

  useEffect(() => {
    async function fetchUserLocation() {
      const location: Coordinates | null = await getUserLocation();
      location && updateUserLocation(location);
      location && updateCenter(location);
      location?.lat != 0 && setMapLoading(false);
    }
    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (map) {
      updateProximity(calculateProximityValue(zoom));
      handleMapBoundsChanged();
    }
  }, [zoom]);

  useEffect(() => {
    if (center.lat != 0) {
      setMapLoading(false);
      handleMapBoundsChanged();
    }
  }, [center]);

  const handleMapBoundsChanged = async () => {
    if (map) {
      updateLoading(true);
      const mapBounds: any = map.getBounds()?.toJSON();
      updateMapBounds(mapBounds);
      updateZoom(map.getZoom()!);
    }
  };

  const handleMapLoad = async (map: google.maps.Map) => {
    setMap(map);
  };

  async function fetchInitialDisasterNews(mapBounds: any) {
    const disasterNews = await getMapAreaDisasterNews(mapBounds);
    mapNewsArticles({
      disasterNews: disasterNews,
      setNews: setNews,
      zoom: zoom,
      proximity: proximity,
    });
    updateLoading(false);
    setFirstLoad(false);
  }

  return (
    <Box className={`map ${!isDrawerOpen && "full-width"}`}>
      {!isLoaded || mapLoading ? (
        <Oval
          height={80}
          width={80}
          color="#000000"
          secondaryColor="#fffff"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={handleMapLoad}
          center={center}
          zoom={zoom}
          options={mapOptions}
          onZoomChanged={() => {
            if (map) {
              handleMapBoundsChanged();
            }
          }}
          onDragEnd={() => {
            updateCenter(map?.getCenter()?.toJSON()!);
            handleMapBoundsChanged();
          }}
          onBoundsChanged={() => {
            firstLoad && fetchInitialDisasterNews(map?.getBounds()?.toJSON());
          }}
        >
          <UserLocationMarker />

          {news.map((markerArray) => {
            if (markerArray.length == 1) {
              return (
                <NewsMarker
                  key={markerArray[0].id}
                  newsMarker={markerArray[0]}
                />
              );
            } else {
              return (
                <CircleMarkerWithText
                  key={markerArray[0].id}
                  position={markerArray[0].location}
                  text={markerArray.length.toString()}
                />
              );
            }
          })}
        </GoogleMap>
      )}
    </Box>
  );
}

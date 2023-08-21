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
import ClusterMarker from "./MapComponents/ClusterMarker";
import CircleMarkerWithText from "./MapComponents/CircleMarkerWithText";
import { calculateProximityValue } from "../../utils/calculateProximityValue";

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
    homeButtonClicked,
    updateMapBounds,
    updateZoom,
    zoom,
    proximity,
    updateProximity,
  } = useContext(CenterContext);
  const [mapLoading, setMapLoading] = useState(true);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBVMfNn5ls36xpl3z_2CL19GD__JwkZR1M",
  });

  useEffect(() => {
    async function fetchUserLocation() {
      const location: Coordinates | null = await getUserLocation();
      location && updateCenter(location);
      location && updateUserLocation(location);
    }
    fetchUserLocation();
  }, []);

  useEffect(() => {
    updateProximity(calculateProximityValue(zoom));
    handleMapBoundsChanged();
  }, [zoom]);

  useEffect(() => {
    if (center.lat != 0) {
      setMapLoading(false);
    }
  }, [center]);

  const handleMapBoundsChanged = async () => {
    updateLoading(true);
    updateZoom(map?.getZoom()!);
    const mapBounds: any = map?.getBounds()?.toJSON();
    mapBounds && updateMapBounds(mapBounds);
  };

  const handleMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const handleCenterReset = () => {
    map && map.setCenter(center);
  };

  return (
    <Box className={`map ${!isDrawerOpen && "full-width"}`}>
      {!isLoaded || mapLoading ? (
        <Oval
          height={80}
          width={80}
          color="#5182ff"
          secondaryColor="#fffff"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={handleMapLoad}
          center={center}
          options={mapOptions}
          onDragEnd={handleMapBoundsChanged}
          onZoomChanged={handleMapBoundsChanged}
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
                <>
                  {/*<ClusterMarker
                    key={markerArray[0].id}
                    position={markerArray[0].location}
                    text={markerArray.length.toString()}
                    radius={proximity}
              />*/}
                  <CircleMarkerWithText
                    key={markerArray[0].id + 1}
                    position={markerArray[0].location}
                    text={markerArray.length.toString()}
                  />
                </>
              );
            }
          })}
        </GoogleMap>
      )}
    </Box>
  );
}

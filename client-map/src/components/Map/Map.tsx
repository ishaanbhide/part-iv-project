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

type MapPropsType = {
  news: NewsItem[];
};

export function Map({ news }: MapPropsType) {
  const { isDrawerOpen } = useContext(DrawerContext);
  const {
    center,
    updateCenter,
    updateUserLocation,
    homeButtonClicked,
    updateMapBounds,
  } = useContext(CenterContext);
  const [loading, setLoading] = useState(true);
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
    if (center.lat != 0) {
      setLoading(false);
    }
  }, [center]);

  const handleMapBoundsChanged = async () => {
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
      {!isLoaded || loading ? (
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
          onCenterChanged={handleMapBoundsChanged}
          onBoundsChanged={handleMapBoundsChanged}
        >
          <UserLocationMarker />

          {news.map((marker) => {
            return <NewsMarker key={marker.id} newsMarker={marker} />;
          })}
        </GoogleMap>
      )}
    </Box>
  );
}

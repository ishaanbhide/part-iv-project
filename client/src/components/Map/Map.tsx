import "./Map.css";
import { Box } from "@mui/material";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useContext, useEffect, useRef, useState } from "react";
import { DrawerContext } from "../../contexts/DrawerContext";
import { UserLocationMarker } from "./MapComponents/UserLocation";
import { CenterContext } from "../../contexts/CenterContext";
import { mapOptions } from "../../utils/mapOptions";
import { Oval } from "react-loader-spinner";
import { Coordinates } from "../../models/Coordinates";
import { getUserLocation } from "../../utils/getUserLocation";
import { newsMarkers } from "../../utils/dummy-data";
import { NewsMarker } from "./MapComponents/NewsMarker";

export function Map() {
  const { isDrawerOpen } = useContext(DrawerContext);
  const { center, updateCenter } = useContext(CenterContext);
  const [loading, setLoading] = useState(true);
  const [visibleMarkers, setVisibleMarkers] = useState<string[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBVMfNn5ls36xpl3z_2CL19GD__JwkZR1M",
  });

  useEffect(() => {
    async function fetchUserLocation() {
      const userLocation: Coordinates | null = await getUserLocation();
      userLocation && updateCenter(userLocation);
    }
    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (center.lat != 0) {
      setLoading(false);
    }
  }, [center]);

  useEffect(() => {
    map && map.panTo(center);
  }, [center]);

  useEffect(() => {
    handleCenterReset();
  }, [isDrawerOpen]);

  const updateVisibleMarkers = () => {
    const visibleMarkerIds: string[] = newsMarkers
      .filter((marker) =>
        map
          ?.getBounds()
          .contains({ lat: marker.location.lat, lng: marker.location.lng })
      )
      .map((marker) => marker.id);

    setVisibleMarkers(visibleMarkerIds);
  };

  const handleMapLoad = (map: google.maps.Map) => {
    setMap(map);

    map.addListener("tilesloaded", () => {
      const visibleMarkerIds: string[] = newsMarkers
        .filter((marker) => map.getBounds().contains(marker.location))
        .map((marker) => marker.id);

      setVisibleMarkers(visibleMarkerIds);
    });
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
          onDragEnd={updateVisibleMarkers}
          onZoomChanged={updateVisibleMarkers}
        >
          <UserLocationMarker />

          {newsMarkers.map((marker) => {
            if (visibleMarkers.includes(marker.id)) {
              return <NewsMarker key={marker.id} newsMarker={marker} />;
            }
            return null;
          })}
        </GoogleMap>
      )}
    </Box>
  );
}

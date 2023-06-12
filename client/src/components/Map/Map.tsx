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

export function Map() {
  const { isDrawerOpen, toggleDrawer } = useContext(DrawerContext);
  const { center, updateCenter } = useContext(CenterContext);
  const [loading, setLoading] = useState(true);

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
          center={center}
          options={mapOptions}
        >
          <UserLocationMarker />
        </GoogleMap>
      )}
    </Box>
  );
}

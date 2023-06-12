import { Box } from "@mui/material";
import {
  CircleF,
  GoogleMap,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";
import "./Map.css";
import { DrawerContext } from "../../contexts/DrawerContext";

export function Map() {
  const { isDrawerOpen, toggleDrawer } = useContext(DrawerContext);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBVMfNn5ls36xpl3z_2CL19GD__JwkZR1M",
  });

  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const options = {
    disableDefaultUI: true,
    clickableIcons: false,
    center: center,
    zoom: 15,
    minZoom: 10,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
    ],
  };

  const yourLocationMarkerOptions = {
    icon: {
      url: "../../../public/your-location.png",
      anchor: { x: 60, y: 60 },
      scaledSize: { height: 120, width: 120 },
    },
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  function successCallback(position: GeolocationPosition) {
    setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  }

  function errorCallback(error: GeolocationPositionError) {
    console.log("Error:", error.message);
  }

  return (
    <Box className={`map ${!isDrawerOpen && "full-width"}`}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap mapContainerClassName="map-container" options={options}>
          <MarkerF position={center} options={yourLocationMarkerOptions} />
          <CircleF
            center={center}
            radius={1000}
            options={{ fillOpacity: 0, strokeColor: "red" }}
          />
        </GoogleMap>
      )}
    </Box>
  );
}

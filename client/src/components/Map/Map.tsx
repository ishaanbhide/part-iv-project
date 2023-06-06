import { Box } from "@mui/material";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import "./Map.css";

export function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
  });

  const [center, setCenter] = useState({ lat: 0, lng: 0 });

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
    <Box className="map">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={15}
        />
      )}
    </Box>
  );
}

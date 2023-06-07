import { Box } from "@mui/material";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import "./Map.css";

export function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
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

  const markerOptions = {
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
    <Box className="map">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap mapContainerClassName="map-container" options={options}>
          <MarkerF position={center} options={markerOptions} />
        </GoogleMap>
      )}
    </Box>
  );
}

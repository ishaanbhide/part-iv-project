import { createContext, useState } from "react";
import { Coordinates } from "../models/Coordinates";
import { MapBounds } from "../models/MapBounds";

type CenterContextType = {
  center: Coordinates;
  updateCenter: (newCenter: Coordinates) => void;
  userLocation: Coordinates | null;
  updateUserLocation: (newLocation: Coordinates) => void;
  homeButtonClicked: boolean;
  toggleHomeClicked: () => void;
  mapBounds: MapBounds;
  updateMapBounds: (newMapBounds: MapBounds) => void;
};

export const CenterContext = createContext<CenterContextType>({
  center: { lat: 0, lng: 0 },
  updateCenter: () => {},
  userLocation: null,
  updateUserLocation: () => {},
  homeButtonClicked: false,
  toggleHomeClicked: () => {},
  mapBounds: {
    south: 0,
    west: 0,
    north: 0,
    east: 0,
  },
  updateMapBounds: () => {},
});

type CenterProviderProps = {
  children: React.ReactNode;
};

export const CenterProvider: React.FC<CenterProviderProps> = ({ children }) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [homeButtonClicked, setHomeButtonClicked] = useState(false);
  const [mapBounds, setMapBounds] = useState({
    south: 0,
    west: 0,
    north: 0,
    east: 0,
  });

  const updateCenter = (newCenter: Coordinates) => {
    setCenter(newCenter);
  };

  const updateUserLocation = (newLocation: Coordinates) => {
    setUserLocation(newLocation);
  };

  const toggleHomeClicked = () => {
    setHomeButtonClicked(!homeButtonClicked);
  };

  const updateMapBounds = (newMapBounds: MapBounds) => {
    setMapBounds(newMapBounds);
  };

  return (
    <CenterContext.Provider
      value={{
        center,
        updateCenter,
        userLocation,
        updateUserLocation,
        homeButtonClicked,
        toggleHomeClicked,
        mapBounds,
        updateMapBounds,
      }}
    >
      {children}
    </CenterContext.Provider>
  );
};

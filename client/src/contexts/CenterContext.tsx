import { createContext, useState } from "react";
import { Coordinates } from "../models/Coordinates";

type CenterContextType = {
  center: Coordinates;
  updateCenter: (newCenter: Coordinates) => void;
  userLocation: Coordinates | null;
  updateUserLocation: (newLocation: Coordinates) => void;
  homeButtonClicked: boolean;
  toggleHomeClicked: () => void;
};

export const CenterContext = createContext<CenterContextType>({
  center: { lat: 0, lng: 0 },
  updateCenter: () => {},
  userLocation: null,
  updateUserLocation: () => {},
  homeButtonClicked: false,
  toggleHomeClicked: () => {},
});

type CenterProviderProps = {
  children: React.ReactNode;
};

export const CenterProvider: React.FC<CenterProviderProps> = ({ children }) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [homeButtonClicked, setHomeButtonClicked] = useState(false);

  const updateCenter = (newCenter: Coordinates) => {
    setCenter(newCenter);
  };

  const updateUserLocation = (newLocation: Coordinates) => {
    setUserLocation(newLocation);
  };

  const toggleHomeClicked = () => {
    setHomeButtonClicked(!homeButtonClicked);
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
      }}
    >
      {children}
    </CenterContext.Provider>
  );
};

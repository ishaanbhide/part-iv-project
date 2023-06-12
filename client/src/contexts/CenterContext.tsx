import { createContext, useState } from "react";
import { Coordinates } from "../models/Coordinates";

type CenterContextType = {
  center: Coordinates;
  updateCenter: (newCenter: Coordinates) => void;
};

export const CenterContext = createContext<CenterContextType>({
  center: { lat: 0, lng: 0 },
  updateCenter: () => {},
});

type CenterProviderProps = {
  children: React.ReactNode;
};

export const CenterProvider: React.FC<CenterProviderProps> = ({ children }) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const updateCenter = (newCenter: Coordinates) => {
    setCenter(newCenter);
  };

  return (
    <CenterContext.Provider value={{ center, updateCenter }}>
      {children}
    </CenterContext.Provider>
  );
};

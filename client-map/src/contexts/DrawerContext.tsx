import { createContext, useState } from "react";

type DrawerContextType = {
  isDrawerOpen: boolean;
  toggleDrawer: (isOpen: boolean) => void;
};

export const DrawerContext = createContext<DrawerContextType>({
  isDrawerOpen: false,
  toggleDrawer: () => {},
});

type DrawerProviderProps = {
  children: React.ReactNode;
};

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (isOpen: boolean) => {
    setDrawerOpen(isOpen);
  };

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

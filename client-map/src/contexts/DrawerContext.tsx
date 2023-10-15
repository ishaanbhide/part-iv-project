import { createContext, useState } from "react";

type DrawerContextType = {
    isDrawerOpen: boolean;
    toggleDrawer: (isOpen: boolean) => void;
    loading: boolean;
    updateLoading: (loading: boolean) => void;
};

export const DrawerContext = createContext<DrawerContextType>({
    isDrawerOpen: false,
    toggleDrawer: () => {},
    loading: true,
    updateLoading: () => {},
});

type DrawerProviderProps = {
    children: React.ReactNode;
};

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const toggleDrawer = (isOpen: boolean) => {
        setDrawerOpen(isOpen);
    };

    const updateLoading = (newLoading: boolean) => {
        setLoading(newLoading);
    };

    return (
        <DrawerContext.Provider
            value={{ isDrawerOpen, toggleDrawer, loading, updateLoading }}
        >
            {children}
        </DrawerContext.Provider>
    );
};

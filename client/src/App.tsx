import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { Map } from "./components/Map/Map";
import { Drawer } from "./components/Drawer/Drawer";
import { DrawerProvider } from "./contexts/DrawerContext";
import { CenterProvider } from "./contexts/CenterContext";
import { SelectedNewsProvider } from "./contexts/SelectedNewsContext";

export default function App() {
  return (
    <div className="App">
      <DrawerProvider>
        <SelectedNewsProvider>
          <CenterProvider>
            <NavigationBar />
            <Map />
            <Drawer />
          </CenterProvider>
        </SelectedNewsProvider>
      </DrawerProvider>
    </div>
  );
}

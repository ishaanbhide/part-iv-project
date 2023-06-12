import "./App.css";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { Map } from "./components/Map/Map";
import { Drawer } from "./components/Drawer/Drawer";
import { DrawerProvider } from "./contexts/DrawerContext";
import { CenterProvider } from "./contexts/CenterContext";

export default function App() {
  return (
    <div className="App">
      <DrawerProvider>
        <CenterProvider>
          <NavigationBar />
          <Map />
          <Drawer />
        </CenterProvider>
      </DrawerProvider>
    </div>
  );
}

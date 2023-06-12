import "./App.css";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { Map } from "./components/Map/Map";
import { Drawer } from "./components/Drawer/Drawer";
import { DrawerProvider } from "./contexts/DrawerContext";

export default function App() {
  return (
    <div className="App">
      <DrawerProvider>
        <NavigationBar />
        <Map />
        <Drawer />
      </DrawerProvider>
    </div>
  );
}

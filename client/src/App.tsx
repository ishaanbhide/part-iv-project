import "./App.css";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { Map } from "./components/Map/Map";
import { Drawer } from "./components/Drawer/Drawer";

export default function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Map />
      <Drawer />
    </div>
  );
}

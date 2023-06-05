import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Page1 } from "./pages/Page1/Page1";
import { Page2 } from "./pages/Page2/Page2";
import { Page3 } from "./pages/Page3/Page3";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { NavigationBar } from "./shared/NavigationBar/NavigationBar";
import { Footer } from "./shared/Footer/Footer";

export default function App() {
  return (
    <div className="App">
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Page1 />} />

        <Route path="/page1" element={<Page1 />} />

        <Route path="/page2" element={<Page2 />} />

        <Route path="/page3" element={<Page3 />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

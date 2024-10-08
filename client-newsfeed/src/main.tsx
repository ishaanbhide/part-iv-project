import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./utils/theme";
import { CenterProvider } from "./contexts/CenterContext";
import { DrawerProvider } from "./contexts/DrawerContext";
import { SelectedNewsProvider } from "./contexts/SelectedNewsContext";
import { QuizProvider } from './contexts/QuizContext';

declare global {
  interface Window {
    google: typeof google;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <QuizProvider>
        <DrawerProvider>
          <SelectedNewsProvider>
            <CenterProvider>
              <App />
            </CenterProvider>
          </SelectedNewsProvider>
        </DrawerProvider>
      </QuizProvider>
    </ThemeProvider>
  </BrowserRouter>
);

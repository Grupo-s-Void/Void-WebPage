import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Global primeiro: assim o CSS de cada seção pode sobrescrevê-lo.
import "./styles/globals.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

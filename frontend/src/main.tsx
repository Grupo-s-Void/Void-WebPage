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

// PWA: só em produção, para o cache não atrapalhar o `npm run dev`.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL })
      .catch(() => {
        /* sem service worker o site continua funcionando normalmente */
      });
  });
}

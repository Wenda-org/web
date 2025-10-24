import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/Admin/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { I18nProvider } from "./i18n/useI18n.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <ThemeProvider>
        <AppWrapper>
          <App />
        </AppWrapper>
      </ThemeProvider>
    </I18nProvider>
  </StrictMode>,
);

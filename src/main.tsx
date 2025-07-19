import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../public/localization/i18-next.ts";
import ThemeWrapper from "./theme/ThemeWrapper";


const lang = localStorage.getItem("lang") || "en";
const direction = lang === "ar" ? "rtl" : "ltr";


const Queryclient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={Queryclient}>
      <Provider store={store}>
        <ThemeWrapper direction={direction}>
          <App />
        </ThemeWrapper>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);

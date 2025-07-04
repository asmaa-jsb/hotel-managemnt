import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Queryclient=new QueryClient()
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={Queryclient}>
          <App />
    </QueryClientProvider>
 
  </StrictMode>
);

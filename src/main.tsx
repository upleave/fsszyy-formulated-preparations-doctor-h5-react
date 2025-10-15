import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import NiceModal from "@ebay/nice-modal-react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <NiceModal.Provider>
      <App />
    </NiceModal.Provider>
    </QueryClientProvider>
  </StrictMode>
);


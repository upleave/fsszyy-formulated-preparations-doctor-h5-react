import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "./index.css";
import NiceModal from "@ebay/nice-modal-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from '@/utils/router.utils';

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NiceModal.Provider>
        <RouterProvider router={router}></RouterProvider>
      </NiceModal.Provider>
    </QueryClientProvider>
  </StrictMode>
);

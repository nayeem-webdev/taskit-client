import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import AllProvider from "./provider/AllProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AllProvider>
        <RouterProvider router={routes} />
      </AllProvider>
    </QueryClientProvider>
  </StrictMode>
);
